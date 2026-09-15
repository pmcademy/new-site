"use client";
import Link from 'next/link';
import {useState} from 'react';
import type {WorkspaceState} from '@/lib/workspace/types';
import type {PanelId} from '@/lib/workspace/scene';
import WorkspaceScene from './WorkspaceScene';
import Panel from './Panel';
import {CasesPanel,CalendarPanel,BadgesPanel,StreakPanel,PANEL_TITLES} from './panels';
export default function PublicWorkspace({state}:{state:WorkspaceState}) {
 const [panel,setPanel]=useState<PanelId|null>(null);
 const projects=<ul className="ws-evidence-list">{state.projects.map(p=><li key={p.id}><Link href={`/u/${state.profile.username}/projects/${p.slug}`}><strong>{p.title}</strong><span>{p.type} · View project ↗</span></Link></li>)}</ul>;
 const published=<ul className="ws-evidence-list">{state.published.map(p=><li key={p.id}><a href={p.url} target="_blank" rel="noopener noreferrer"><strong>{p.title}</strong><span>{p.platform} ↗</span></a></li>)}</ul>;
 return <div className="ws-immersive"><header className="ws-toolbar"><div><span className="eyebrow">A product management practice</span><h1>{state.profile.displayName}</h1><p>{state.profile.bio}</p></div><Link href="/workspace" className="btn btn-outline">Create your room ↗</Link></header><WorkspaceScene state={state} onOpen={setPanel} interactive={false}/><div className="ws-room-bottom"><p>{state.progress.lessonsCompleted} lessons · {state.caseStudies.length} case studies · {state.projects.length} shared projects</p><span>{state.streak.longest} day personal best</span></div><section className="grid gap-8 md:grid-cols-2"><div><h2>Product work</h2>{projects}</div><div><h2>Published thinking</h2>{published}</div></section><Panel open={panel!==null} title={panel?PANEL_TITLES[panel]:''} onClose={()=>setPanel(null)}><div className="ws-panel-stack">{panel==='cases'&&<CasesPanel state={state}/ >}{panel==='calendar'&&<CalendarPanel state={state}/>}{panel==='badges'&&<BadgesPanel state={state}/>}{panel==='streak'&&<StreakPanel state={state}/>}{panel==='projects'&&projects}{panel==='published'&&published}</div></Panel></div>;
}
