import 'server-only';
import { cache } from 'react';
import { randomUUID } from 'node:crypto';
import { adminDatabase, serverAuth } from '@/lib/supabase/server';
import { levels, levelLessons } from '@/lib/course';
import { caseLibrary } from '@/lib/case-library';
import { emptyRecord } from './defaults';
import { buildWorkspaceState, publicView } from './buildWorkspaceState';
import { safeUrl, textValue, validTimezone, zonedDay, WorkspaceInputError } from './validation';
import type { WorkspaceRecord, ProjectType, PublishedWork } from './types';

type Db = ReturnType<typeof adminDatabase>;
type Row = {user_id:string;username:string;document:WorkspaceRecord;revision:number;referral_code:string};
const lessonNames = new Map<string,string>(levels.flatMap(l=>levelLessons(l).map(x=>[`${l.slug}/${x.slug}`, x.title] as const)));
async function rowFor(userId: string, name = 'Learner'): Promise<Row> {
 const db = adminDatabase();
 let result = await db.from('learner_workspaces').select('*').eq('user_id',userId).maybeSingle();
 if(result.error) throw result.error;
 if(!result.data) {
  const username = `learner-${userId.replaceAll('-','')}`;
  const created = await db.from('learner_workspaces').upsert({user_id:userId,username,document:emptyRecord(name,username)}, {onConflict:'user_id',ignoreDuplicates:true});
  if(created.error) throw created.error;
  result = await db.from('learner_workspaces').select('*').eq('user_id',userId).single();
  if(result.error) throw result.error;
 }
 return result.data as Row;
}
async function allRows(db:Db, table:string,userId:string) {
 const rows: Record<string,unknown>[] = [];
 for(let start=0;;start+=1000) {
  const result = await db.from(table).select('*').eq('user_id',userId).order(table==='lesson_progress'?'lesson_key':'event_key').range(start,start+999);
  if(result.error) throw result.error;
  rows.push(...result.data);
  if(result.data.length<1000) return rows;
 }
}
export async function loadWorkspace(userId:string, name?:string) {
 const row = await rowFor(userId,name), db=adminDatabase();
 const [progress, events] = await Promise.all([allRows(db,'lesson_progress',userId),allRows(db,'workspace_activity',userId)]);
 const record:WorkspaceRecord=structuredClone(row.document);
 const referrals=await db.from('workspace_referrals').select('id,converted_at').eq('referrer_id',userId).not('converted_at','is',null).limit(1000);
 if(referrals.error)throw referrals.error;
 record.referrals=referrals.data.map(r=>({id:r.id,code:'',createdAt:r.converted_at,convertedAt:r.converted_at}));
 record.referralCode=row.referral_code;
 record.profile.username=row.username;
 const keys=progress.map(p=>String(p.lesson_key)).filter(k=>lessonNames.has(k));
 const existing = new Set(events.map(e=>String(e.lesson_key)));
 const lessonActivity = events.filter(e=>lessonNames.has(String(e.lesson_key))).map(e=>({id:String(e.event_key),type:'lesson_completed' as const,entityId:String(e.lesson_key),label:lessonNames.get(String(e.lesson_key))!,occurredAt:String(e.occurred_at),day:zonedDay(new Date(String(e.occurred_at)),record.profile.timezone)}));
 for(const entry of progress) {
  const key=String(entry.lesson_key), date=entry.completed_at ?? entry.created_at;
  if(!existing.has(key) && lessonNames.has(key) && typeof date==='string' && Number.isFinite(Date.parse(date))) lessonActivity.push({id:`lesson:${key}`,type:'lesson_completed',entityId:key,label:lessonNames.get(key)!,occurredAt:date,day:zonedDay(new Date(date),record.profile.timezone)});
 }
 record.activity=[...record.activity,...lessonActivity,...record.referrals.map(r=>({id:`referral:${r.id}`,type:'referral' as const,label:'A learner you invited completed their first lesson',occurredAt:r.convertedAt!,day:zonedDay(new Date(r.convertedAt!),record.profile.timezone)}))];
 const state=buildWorkspaceState(record,keys);
 const known=new Set(row.document.badges.map(b=>b.badgeId));
 const fresh=state.badges.filter(b=>!known.has(b.id));
 if(fresh.length){
  const document={...row.document,badges:[...row.document.badges,...fresh.map(b=>({badgeId:b.id,earnedAt:b.earnedAt}))]};
  const result=await db.from('learner_workspaces').update({document,revision:row.revision+1}).eq('user_id',userId).eq('revision',row.revision).select('user_id');
  if(result.error)throw result.error;
  if(result.data?.length)record.badges=document.badges;
 }
 const hour=Number(new Intl.DateTimeFormat('en-GB',{timeZone:record.profile.timezone||'UTC',hour:'numeric',hourCycle:'h23'}).format(new Date()));
 if(!record.profile.timeOverride)state.environment.timeOfDay=hour<6||hour>=21?'night':hour<12?'morning':hour<17?'afternoon':'evening';
 return {record,state,revision:row.revision};
}

export async function mutateWorkspace(userId:string, action:string, input:Record<string,unknown>) {
 if(action==='referral') {
  const code=textValue(input.code,40,true), db=adminDatabase();
  const result=await db.rpc('claim_workspace_referral',{learner_id:userId,invite_code:code});
  if(result.error)throw new WorkspaceInputError('This invite cannot be applied. It is for new learners before their first lesson.');
  return loadWorkspace(userId);
 }
 for(let attempt=0;attempt<5;attempt++) {
  const row=await rowFor(userId), record=structuredClone(row.document), now=new Date().toISOString();
  const event=(type:WorkspaceRecord['activity'][number]['type'],entityId:string,label:string)=>{
   const id=`${type}:${entityId}`;
   if(!record.activity.some(a=>a.id===id)) record.activity.push({id,type,entityId,label,occurredAt:now,day:zonedDay(new Date(now),record.profile.timezone)});
  };
  if(action==='profile') {
   if(input.displayName!==undefined) record.profile.displayName=textValue(input.displayName,80,true);
   if(input.username!==undefined) {const name=textValue(input.username,40,true).toLowerCase();if(!/^[a-z0-9][a-z0-9-]{2,39}$/.test(name)) throw new WorkspaceInputError('Username must be 3–40 lowercase letters, numbers or hyphens.');record.profile.username=name;}
   if(input.bio!==undefined) record.profile.bio=textValue(input.bio,320);
   if(input.timezone!==undefined) record.profile.timezone=validTimezone(input.timezone);
   if(input.visibility!==undefined){if(!['private','community','public'].includes(String(input.visibility))) throw new WorkspaceInputError('Invalid visibility.');record.profile.visibility=input.visibility as typeof record.profile.visibility;}
   if(input.timeOverride!==undefined){if(input.timeOverride!==null&&!['morning','afternoon','evening','night'].includes(String(input.timeOverride))) throw new WorkspaceInputError('Invalid light.');record.profile.timeOverride=input.timeOverride as typeof record.profile.timeOverride;}
   if(input.avatarUrl!==undefined) record.profile.avatarUrl=input.avatarUrl?safeUrl(input.avatarUrl):undefined;
  } else if(action==='hidden') {
   const id=textValue(input.id,200,true);record.profile.hidden=record.profile.hidden.includes(id)?record.profile.hidden.filter(x=>x!==id):[...record.profile.hidden,id];
  } else if(action==='notes') record.notes=textValue(input.text,20000);
  else if(action==='case') {
   const id=textValue(input.caseStudyId,150,true), item=caseLibrary.find(c=>c.href===`/case-studies/${id}`);
   if(!item) throw new WorkspaceInputError('Case study not found.');
   let entry=record.caseStudies.find(c=>c.caseStudyId===id);
   if(!entry){entry={caseStudyId:id,title:`${item.brand}: ${item.title}`,href:item.href,firstOpenedAt:now,readPercent:0};record.caseStudies.push(entry);}
   const percent=Number(input.readPercent);
   if(!Number.isFinite(percent)||percent<0||percent>100) throw new WorkspaceInputError('Invalid reading progress.');
   entry.readPercent=Math.max(entry.readPercent,percent);
   if(input.complete===true && !entry.completedAt){
    if(input.explicit!==true && (percent<70 || Number(input.activeSeconds)<45 || Date.now()-Date.parse(entry.firstOpenedAt)<45000)) throw new WorkspaceInputError('Keep reading, then try again.');
    entry.completedAt=now;event('case_study_read',id,entry.title);
   }
  } else if(action==='project') {
   const types:ProjectType[]=['teardown','research','prd','experiment','metrics','prototype','gtm','ai-concept','memo'];
   if(!types.includes(input.type as ProjectType)||!['draft','submitted'].includes(String(input.status))) throw new WorkspaceInputError('Choose a project type and status.');
   const id=input.id?textValue(input.id,80,true):randomUUID(), previous=record.projects.find(p=>p.id===id);
   const title=textValue(input.title,160,true), slug=previous?.slug??`${title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,50)||'project'}-${id.slice(0,8)}`;
   const entry={id,slug,title,type:input.type as ProjectType,status:input.status as 'draft'|'submitted',summary:textValue(input.summary??'',4000),url:input.url?safeUrl(input.url):undefined,createdAt:previous?.createdAt??now,updatedAt:now,visible:input.visible!==false};
   record.projects=[...record.projects.filter(p=>p.id!==id),entry];
   if(entry.status==='submitted') event('project_submitted',id,title);
  } else if(action==='published') {
   const url=safeUrl(input.url), title=textValue(input.title,160,true);
   const existing=record.published.find(w=>w.url===url);
   const host=new URL(url).hostname;
   let platform:PublishedWork['platform']='other';
   for(const candidate of ['medium','substack','linkedin','reddit'] as const) if(host===`${candidate}.com`||host.endsWith(`.${candidate}.com`)) platform=candidate;
   if(!existing){const id=randomUUID();record.published.push({id,title,url,platform,createdAt:now,visible:true});event('article_published',id,title);}
  } else throw new WorkspaceInputError('Unknown workspace action.');
  if(JSON.stringify(record).length>900000) throw new WorkspaceInputError('Your workspace is full. Contact hello@pmcademy.com.');
  const result=await adminDatabase().from('learner_workspaces').update({username:record.profile.username,document:record,revision:row.revision+1,updated_at:now}).eq('user_id',userId).eq('revision',row.revision).select('user_id');
  if(result.error){if(result.error.code==='23505') throw new WorkspaceInputError('That username is taken. Try another.');throw result.error;}
  if(result.data?.length) return loadWorkspace(userId);
 }
 throw new WorkspaceInputError('Your workspace changed in another tab. Please try again.');
}

export const publicWorkspace=cache(async(username:string)=>{
 const db=adminDatabase();
 const found=await db.from('learner_workspaces').select('user_id,document').eq('username',username).maybeSingle();
 if(found.error) throw found.error;
 if(!found.data) return null;
 const profile=(found.data.document as WorkspaceRecord).profile;
 if(profile.visibility!=='public'){
  const auth=await serverAuth();const {data:{user}}=await auth.auth.getUser();
  if(!user || (profile.visibility==='private'&&user.id!==found.data.user_id)) return null;
 }
 return publicView((await loadWorkspace(found.data.user_id)).state);
});
