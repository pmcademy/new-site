import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import PublicWorkspace from '@/components/workspace/PublicWorkspace';
import {publicWorkspace} from '@/lib/workspace/server';
export const dynamic='force-dynamic';
type Props={params:Promise<{username:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {username}=await params;const state=await publicWorkspace(username);
 if(!state)return {title:'Workspace unavailable',robots:{index:false,follow:false}};
 const index=state.profile.visibility==='public';
 return {title:`${state.profile.displayName}'s product workspace`,description:state.profile.bio||'Projects, reading and product management practice at PMcademy.',robots:{index,follow:index},alternates:index?{canonical:`/u/${username}`}:undefined,openGraph:index?{title:`${state.profile.displayName}'s workspace`,images:['/workspace/study-interior.webp']}:undefined};
}
export default async function Page({params}:Props){const {username}=await params;const state=await publicWorkspace(username);if(!state)notFound();return <section className="section-top"><PublicWorkspace state={state}/></section>;}
