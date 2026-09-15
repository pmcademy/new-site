"use client";
import WorkspacePreview from './WorkspacePreview';
import {useEffect,useState} from 'react';
import {useStore} from '@/lib/progress';
import {useWorkspace,updateProfile,refreshWorkspace} from '@/lib/workspace/store';
import {timeOfDay} from '@/lib/workspace/activity';
import type {PanelId} from '@/lib/workspace/scene';
import WorkspaceScene from './WorkspaceScene';
import WorkspaceIndex from './WorkspaceIndex';
import Panel from './Panel';
import {WorkspacePanel,PANEL_TITLES} from './panels';
export default function Workspace() {
 const {account,ready}=useStore();const {state,record,error,busy}=useWorkspace();
 const [panel,setPanel]=useState<PanelId|null>(null),[clock,setClock]=useState(()=>timeOfDay()),[paused,setPaused]=useState(false);
 useEffect(()=>{const timer=setInterval(()=>setClock(timeOfDay()),60000);return()=>clearInterval(timer);},[]);
 useEffect(()=>{if(record&&record.profile.timezone!==Intl.DateTimeFormat().resolvedOptions().timeZone)void updateProfile({timezone:Intl.DateTimeFormat().resolvedOptions().timeZone});},[record]);
 if(ready&&!account)return <WorkspacePreview/>;
 if(!state||!record)return <section className="ws-welcome" aria-live="polite"><h1>{error?'Your room is taking a moment.':'Opening your workspace…'}</h1>{error&&<><p>{error}</p><button className="btn btn-primary" onClick={()=>void refreshWorkspace()}>Try again</button></>}</section>;
 const room={...state,environment:{...state.environment,timeOfDay:state.profile.timeOverride??clock}};
 return <div className="ws-immersive" data-paused={paused}>
 <header className="ws-toolbar"><div><span className="eyebrow">Your product practice</span><h1>{state.profile.displayName.split(' ')[0]}’s study</h1></div><div className="ws-controls"><span className="ws-saved" role="status">{busy?'Saving…':'Saved to your account'}</span><button className="btn btn-outline" onClick={()=>setPanel('share')}>Share room ↗</button><button className="icobtn" onClick={()=>setPaused(!paused)} aria-label={paused?'Resume room animations':'Pause room animations'} aria-pressed={paused}>{paused?'▷':'Ⅱ'}</button></div></header>
 {error&&<div role="alert" className="ws-error">{error}</div>}
 <WorkspaceScene state={room} onOpen={setPanel} paused={paused}/>
 <div className="ws-room-bottom"><p>{state.environment.stage===0?'Make yourself at home. Open the laptop to begin.':`${state.progress.lessonsCompleted} lessons · ${state.caseStudies.length} books · ${state.projects.length} projects`}<span> Explore the objects in your room.</span></p><fieldset className="ws-light-switch"><legend className="sr-only">Room lighting</legend>{(['morning','afternoon','evening','night'] as const).map(t=><button key={t} disabled={busy} aria-pressed={room.environment.timeOfDay===t} onClick={()=>void updateProfile({timeOverride:t})}>{t}</button>)}<button disabled={busy} aria-pressed={!state.profile.timeOverride} onClick={()=>void updateProfile({timeOverride:null})}>Auto</button></fieldset></div>
 <details className="ws-quick"><summary>Quick navigation</summary><WorkspaceIndex state={room} onOpen={setPanel}/></details>
 <Panel open={panel!==null} title={panel?PANEL_TITLES[panel]:''} onClose={()=>setPanel(null)} wide={panel==='calendar'||panel==='badges'}><WorkspacePanel panel={panel} state={room} record={record} busy={busy}/>{error&&<p role="alert" className="ws-error">{error}</p>}</Panel>
 </div>;
}
