import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {cache} from 'react';
import {publicWorkspace,loadWorkspace} from '@/lib/workspace/server';
import {serverAuth} from '@/lib/supabase/server';
import ProjectView from '@/components/workspace/ProjectView';
export const dynamic='force-dynamic';
type Props={params:Promise<{username:string;slug:string}>};
const getProject=cache(async(username:string,slug:string)=>{
 const auth=await serverAuth();const {data:{user}}=await auth.auth.getUser();
 if(user){const own=await loadWorkspace(user.id);if(own.state.profile.username===username){const project=own.state.projects.find(p=>p.slug===slug);if(project)return {project,profile:own.state.profile,index:project.status!=='draft'&&project.visible&&!own.state.profile.hidden.includes(project.id)&&own.state.profile.visibility==='public'};}}
 const state=await publicWorkspace(username),project=state?.projects.find(p=>p.slug===slug);
 return state&&project?{project,profile:state.profile,index:state.profile.visibility==='public'}:null;
});
export async function generateMetadata({params}:Props):Promise<Metadata>{const {username,slug}=await params;const data=await getProject(username,slug);return data?{title:`${data.project.title} by ${data.profile.displayName}`,robots:{index:data.index,follow:data.index}}:{title:'Project unavailable',robots:{index:false,follow:false}};}
export default async function Page({params}:Props){const {username,slug}=await params;const data=await getProject(username,slug);if(!data)notFound();return <section className="section-top"><div className="shell-narrow"><ProjectView project={data.project} username={username} name={data.profile.displayName}/></div></section>;}
