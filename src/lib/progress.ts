'use client';
import {useSyncExternalStore} from 'react';
import {levels} from './course';
import {levelLessons} from './course/types';
import {browserAuth} from './supabase/client';
import {authConfig} from './supabase/config';
export type Provider='google'|'apple'|'email';
export type Account={id:string;name:string;email:string;provider:Provider;domain?:string};
export type Progress={done:string[]};
type State={account:Account|null;progress:Progress;ready:boolean;paid:boolean;syncError:string};
const initial:State={account:null,progress:{done:[]},ready:false,paid:false,syncError:''};
let state=initial,started=false,revision=0;let loading:Promise<void>|null=null;let writes:Promise<void>=Promise.resolve();
const listeners=new Set<()=>void>();
function publish(next:Partial<State>){state={...state,...next};listeners.forEach(fn=>fn());}
function guestProgress():Progress{try{const p=JSON.parse(localStorage.getItem('pmc-progress')||'null');return{done:Array.isArray(p?.done)?p.done.filter((x:unknown):x is string=>typeof x==='string'):[]};}catch{return{done:[]};}}
type Pending=Record<string,boolean>;
const memory=new Map<string,Pending>();
function pendingFor(id:string):Pending{if(memory.has(id))return memory.get(id)!;try{const raw=JSON.parse(localStorage.getItem(`pmc-pending:${id}`)||'{}');const clean=Object.fromEntries(Object.entries(raw).filter(([k,v])=>/^0[1-6]\/[a-z0-9-]+$/.test(k)&&typeof v==='boolean')) as Pending;memory.set(id,clean);return clean;}catch{return {};}}
function savePending(id:string,p:Pending){memory.set(id,p);try{localStorage.setItem(`pmc-pending:${id}`,JSON.stringify(p));}catch{publish({syncError:'Keep this tab open until progress finishes syncing.'});}}
function merge(p:Progress,pending:Pending):Progress{const done=new Set(p.done);Object.entries(pending).forEach(([k,v])=>{if(v)done.add(k);else done.delete(k);});return{done:[...done]};}
function queueSync(id:string){writes=writes.then(async()=>{if(state.account?.id!==id)return;for(const [key,done] of Object.entries(pendingFor(id))){if(state.account?.id!==id)return;try{const response=await fetch('/api/progress',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({key,done,accountId:id})});if(!response.ok)throw new Error('save');const pending={...pendingFor(id)};if(pending[key]===done)delete pending[key];savePending(id,pending);}catch{if(state.account?.id===id)publish({syncError:'Your progress is saved in this browser and waiting to sync.'});return;}}if(state.account?.id===id)publish({syncError:Object.keys(pendingFor(id)).length?'Your progress is waiting to sync.':''});});return writes;}
export async function refreshAccount(){if(loading)return loading;const rev=revision;loading=(async()=>{try{await writes;const response=await fetch('/api/account',{cache:'no-store',credentials:'same-origin'});if(rev!==revision)return;if(response.status===401){publish({account:null,paid:false,progress:guestProgress(),ready:true,syncError:''});return;}if(!response.ok)throw new Error('unavailable');const data=await response.json();if(rev===revision){const pending=pendingFor(data.account.id);publish({account:data.account,paid:data.paid===true,progress:merge(data.progress,pending),ready:true,syncError:Object.keys(pending).length?'Your progress is waiting to sync.':''});if(Object.keys(pending).length)void queueSync(data.account.id);}}catch{if(rev===revision)publish({ready:true,syncError:authConfig()?'Account sync is unavailable. Please retry.':''});}})().finally(()=>{loading=null;if(rev!==revision)setTimeout(()=>{void refreshAccount();},0);});return loading;}
export async function retrySync(){if(state.account)await queueSync(state.account.id);await refreshAccount();}
function start(){if(started)return;started=true;try{localStorage.removeItem('pmc-account');}catch{}publish({progress:guestProgress(),ready:true});if(authConfig()){browserAuth().auth.onAuthStateChange(()=>{setTimeout(()=>{revision++;void refreshAccount();},0);});void refreshAccount();}window.addEventListener('storage',e=>{if(e.key==='pmc-progress'&&!state.account)publish({progress:guestProgress()});});window.addEventListener('online',()=>{if(authConfig())void retrySync();});document.addEventListener('visibilitychange',()=>{if(!document.hidden&&authConfig())void refreshAccount();});}
const subscribe=(fn:()=>void)=>{listeners.add(fn);start();return()=>{listeners.delete(fn);};};
export function useStore(){return useSyncExternalStore(subscribe,()=>state,()=>initial);}
export async function signOut(){await writes;const {error}=await browserAuth().auth.signOut({scope:'local'});if(error)throw error;revision++;publish({account:null,paid:false,progress:guestProgress(),syncError:''});}
export async function setDomain(domain:string){if(!state.account)return;const {error}=await browserAuth().auth.updateUser({data:{domain}});if(!error&&state.account)publish({account:{...state.account,domain}});}
export async function importGuestProgress(){const response=await fetch('/api/progress',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({import:guestProgress().done,accountId:state.account?.id})});if(!response.ok)throw new Error('Progress could not be imported. Please retry.');await refreshAccount();}
export function markDone(levelSlug:string,lessonSlug:string,done:boolean){const key=`${levelSlug}/${lessonSlug}`,next={done:done?[...new Set([...state.progress.done,key])]:state.progress.done.filter(x=>x!==key)};publish({progress:next});if(!state.account){try{localStorage.setItem('pmc-progress',JSON.stringify(next));}catch{publish({syncError:'This browser could not save your progress.'});}return;}const id=state.account.id;savePending(id,{...pendingFor(id),[key]:done});void queueSync(id);}
export function levelComplete(slug: string, done: string[]) {
  const level = levels.find((l) => l.slug === slug);
  if (!level) return false;
  const all = levelLessons(level);
  return all.length > 0 && all.every((x) => done.includes(`${slug}/${x.slug}`));
}

export function levelUnlocked(slug: string, done: string[]) {
  const i = levels.findIndex((l) => l.slug === slug);
  if (i < 0) return false;
  return levels.slice(0, i).every(level => levelComplete(level.slug, done));
}

export function levelPercent(slug: string, done: string[]) {
  const level = levels.find((l) => l.slug === slug);
  if (!level) return 0;
  const all = levelLessons(level);
  if (!all.length) return 0;
  const n = all.filter((x) => done.includes(`${slug}/${x.slug}`)).length;
  return Math.round((n / all.length) * 100);
}

