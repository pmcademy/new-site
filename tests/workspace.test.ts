import assert from 'node:assert/strict';
import {test} from 'node:test';
import {emptyRecord} from '../src/lib/workspace/defaults';
import {computeStreak} from '../src/lib/workspace/activity';
import {buildWorkspaceState,publicView} from '../src/lib/workspace/buildWorkspaceState';
import {safeUrl,validTimezone,zonedDay} from '../src/lib/workspace/validation';
import {levels,levelLessons} from '../src/lib/course';
const now='2026-09-15T10:00:00Z';
test('streak counts meaningful consecutive days, survives overnight and breaks after a missed day',()=>{
 const record=emptyRecord();
 record.activity=['2026-09-12','2026-09-13','2026-09-14'].map(day=>({id:day,type:'lesson_completed',label:'Lesson',occurredAt:now,day}));
 record.activity.push({id:'badge',type:'badge_earned',label:'Badge',occurredAt:now,day:'2026-09-15'});
 assert.deepEqual(computeStreak(record.activity,'2026-09-15'),{current:3,longest:3,activeToday:false});
 assert.equal(computeStreak(record.activity,'2026-09-16').current,0);
});
test('invalid and duplicate lesson keys cannot inflate progress; a completed chapter is derived',()=>{
 const keys=levelLessons(levels[0]).map(x=>`${levels[0].slug}/${x.slug}`);
 const state=buildWorkspaceState(emptyRecord(),[...keys,...keys,'fake/lesson']);
 assert.equal(state.progress.lessonsCompleted,keys.length);assert.equal(state.progress.levelsCompleted,1);assert.ok(state.progress.completedChapters?.length);
 assert.equal(state.totals.minutesLearned,0);
});
test('public projection removes drafts, hidden objects, matching activity and private notebook',()=>{
 const r=emptyRecord();r.notes='PRIVATE NOTE';
 r.projects=[{id:'hidden',slug:'hidden',title:'SECRET',type:'prd',status:'submitted',visible:true,createdAt:now,updatedAt:now},{id:'draft',slug:'draft',title:'DRAFT',type:'prd',status:'draft',visible:true,createdAt:now,updatedAt:now}];
 r.profile.hidden=['hidden'];r.activity=[{id:'a',entityId:'hidden',label:'SECRET',type:'project_submitted',day:'2026-09-15',occurredAt:now,metadata:{private:'PRIVATE'}}];
 const result=publicView(buildWorkspaceState(r,[]));
 assert.equal(result.projects.length,0);assert.equal(result.activity.length,0);assert.equal(result.progress.nextLesson,undefined);
 assert.doesNotMatch(JSON.stringify(result),/SECRET|PRIVATE|DRAFT/);
});
test('earned streak badges remain after a break; generated invitations do not earn a referral badge',()=>{
 const r=emptyRecord();r.badges=[{badgeId:'streak-7',earnedAt:now}];r.referrals=[{id:'r',code:'invite',createdAt:now}];
 const state=buildWorkspaceState(r,[]);assert.ok(state.badges.some(b=>b.id==='streak-7'));assert.ok(!state.badges.some(b=>b.id==='first-referral'));
});
test('outbound links reject executable schemes and timezone handles midnight correctly',()=>{
 assert.throws(()=>safeUrl('javascript:alert(1)'));assert.throws(()=>safeUrl('data:text/html,hello'));assert.throws(()=>safeUrl('https://user:password@example.com'));
 assert.equal(safeUrl('https://example.com/work'),'https://example.com/work');assert.throws(()=>validTimezone('invalid/zone'));
 assert.equal(zonedDay(new Date('2026-09-14T20:00:00Z'),'Asia/Kolkata'),'2026-09-15');
});
