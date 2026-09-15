"use client";
import Link from 'next/link';
import {useEffect,useRef,useState} from 'react';
import {useWorkspace,workspaceAction} from '@/lib/workspace/store';
export default function ReadTracker({id,seconds=45,depth=.7}:{id:string;title:string;href:string;seconds?:number;depth?:number}) {
 const {accountId,record,error,busy}=useWorkspace();const saved=Boolean(record?.caseStudies.find(c=>c.caseStudyId===id)?.completedAt);
 const loaded=Boolean(record);
 const [percent,setPercent]=useState(0);const elapsed=useRef(0),deepest=useRef(0),inFlight=useRef(false);
 useEffect(()=>{
  elapsed.current=0;deepest.current=0;inFlight.current=false;
  if(!accountId||!loaded||saved)return;
  let active=true;
  void workspaceAction('case',{caseStudyId:id,readPercent:0});
  const measure=()=>{const root=document.documentElement,range=root.scrollHeight-root.clientHeight;deepest.current=Math.max(deepest.current,range>0?Math.min(1,root.scrollTop/range):1);setPercent(Math.round(deepest.current*100));};
  const timer=setInterval(async()=>{
   if(document.visibilityState==='visible'&&document.hasFocus())elapsed.current++;
   if(active&&!inFlight.current&&elapsed.current>=Math.max(45,seconds)&&deepest.current>=Math.max(.7,depth)){
    inFlight.current=true;const ok=await workspaceAction('case',{caseStudyId:id,readPercent:Math.round(deepest.current*100),activeSeconds:elapsed.current,complete:true});if(active&&!ok)inFlight.current=false;
   }
  },1000);
  measure();window.addEventListener('scroll',measure,{passive:true});
  return()=>{active=false;clearInterval(timer);window.removeEventListener('scroll',measure);};
 },[accountId,id,loaded,saved,seconds,depth]);
 return <div className="ws-read" aria-live="polite">{!accountId?<p><Link href="/signin">Sign in</Link> to keep this case study on your reading shelf.</p>:saved?<p>Added to your shelf. Your book is waiting in <Link href="/workspace">your workspace</Link>.</p>:<><p>{percent>=70?'Your reading progress is counted while this tab is active.':'Read the case study to add a book to your workspace.'}</p><button className="btn btn-outline" disabled={busy||!record} onClick={()=>void workspaceAction('case',{caseStudyId:id,readPercent:100,complete:true,explicit:true})}>Mark as read</button></>}{error&&<p role="alert">{error}</p>}</div>;
}
