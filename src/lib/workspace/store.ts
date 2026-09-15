"use client";
import {useEffect,useSyncExternalStore} from 'react';
import {useStore} from '@/lib/progress';
import type {WorkspaceRecord,WorkspaceState,WorkspaceProfile,ProjectSubmission,PublishedWork} from './types';
export {emptyRecord,toUsername} from './defaults';
type Snapshot={accountId:string|null;record:WorkspaceRecord|null;state:WorkspaceState|null;error:string;busy:boolean};
const initial:Snapshot={accountId:null,record:null,state:null,error:'',busy:false};
let snapshot=initial;
let requestVersion=0;
const listeners=new Set<()=>void>();
const subscribe=(listener:()=>void)=>{listeners.add(listener);return()=>{listeners.delete(listener);};};
const publish=(next:Snapshot)=>{snapshot=next;listeners.forEach(fn=>fn());};
export async function refreshWorkspace() {
 const accountId=snapshot.accountId;if(!accountId||snapshot.busy)return;
 const version=++requestVersion;
 try {
  const response=await fetch('/api/workspace',{cache:'no-store'});const data=await response.json();
  if(!response.ok)throw new Error(data.error);
  if(snapshot.accountId===accountId&&version===requestVersion)publish({...snapshot,record:data.record,state:data.state,error:''});
 }catch(error){if(snapshot.accountId===accountId&&version===requestVersion)publish({...snapshot,error:error instanceof Error?error.message:'Could not load your workspace.'});}
}
export async function workspaceAction(action:string,input:Record<string,unknown>):Promise<boolean> {
 const accountId=snapshot.accountId;
 if(!accountId||snapshot.busy)return false;
 const version=++requestVersion;
 publish({...snapshot,busy:true,error:''});
 try {
  const response=await fetch('/api/workspace',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,input,accountId})});const data=await response.json();
  if(!response.ok)throw new Error(data.error);
  if(snapshot.accountId!==accountId)return false;
  publish({...snapshot,record:data.record,state:data.state,error:'',busy:false});return true;
 }catch(error){if(snapshot.accountId===accountId&&version<=requestVersion)publish({...snapshot,busy:false,error:error instanceof Error?error.message:'Could not save.'});return false;}
}
export function useWorkspace() {
 const {account}=useStore();const id=account?.id??null;
 const current=useSyncExternalStore(subscribe,()=>snapshot,()=>initial);
 useEffect(()=>{
  if(snapshot.accountId!==id){requestVersion++;publish({...initial,accountId:id});}
  if(!id)return;
  void refreshWorkspace();
  const refresh=()=>{if(document.visibilityState==='visible'&&!snapshot.busy)void refreshWorkspace();};
  const timer=setInterval(refresh,30000);window.addEventListener('focus',refresh);
  return()=>{clearInterval(timer);window.removeEventListener('focus',refresh);};
 },[id]);
 return current.accountId===id?current:initial;
}
export const updateProfile=(patch:Partial<WorkspaceProfile>)=>workspaceAction('profile',patch);
export const toggleHidden=(id:string)=>workspaceAction('hidden',{id});
export const saveProject=(input:Partial<ProjectSubmission>)=>workspaceAction('project',input);
export const savePublished=(input:Partial<PublishedWork>)=>workspaceAction('published',input);
