'use client';
import {useId,useState} from 'react';
import type {CaseStory} from '@/lib/case-stories';
import {useBrowserStorage} from '@/lib/useBrowserStorage';
import {CopyPrompt} from '@/components/course/LessonParts';
export function CaseDecision({story}:{story:CaseStory}){const [choice,setChoice]=useState<number|null>(null);return <div className="case-decision"><h3>Choose a next move</h3>{story.options.map((o,i)=><button type="button" key={o.label} aria-pressed={i===choice} onClick={()=>setChoice(i)}>{o.label}</button>)}{choice!==null&&<p role="status" className="case-choice-feedback">{story.options[choice].feedback}</p>}</div>;}
export function CaseBuild({story}:{story:CaseStory}){const id=useId(),[saved,save]=useBrowserStorage(`pmc-case:${story.slug}`),[draft,setDraft]=useState<string|null>(null),[status,setStatus]=useState('');return <div className="case-build"><h3>Your artifact</h3><p>{story.build}</p><CopyPrompt text={story.prompt}/><label htmlFor={id}>Your project notes</label><textarea id={id} rows={8} maxLength={12000} value={draft??saved} onChange={e=>setDraft(e.target.value)}/><button className="btn btn-primary" onClick={()=>{try{save(draft??saved);setStatus('Saved in this browser. Keep a copy with your project.');}catch{setStatus('Could not save. Copy your notes before leaving.');}}}>Save project notes</button><p role="status">{status}</p></div>;}
