import 'server-only';
import {createServerClient} from '@supabase/ssr';
import {createClient} from '@supabase/supabase-js';
import {cookies} from 'next/headers';
import {authConfig} from './config';
export async function serverAuth(){const config=authConfig();if(!config)throw new Error('Unavailable');const store=await cookies();return createServerClient(config.url,config.key,{cookies:{getAll:()=>store.getAll(),setAll:values=>{values.forEach(({name,value,options})=>store.set(name,value,options));}}});}
export function adminDatabase(){const config=authConfig(),key=process.env.SUPABASE_SERVICE_ROLE_KEY;if(!config||!key)throw new Error('Unavailable');return createClient(config.url,key,{auth:{persistSession:false,autoRefreshToken:false},global:{fetch:(url,init)=>fetch(url,{...init,signal:AbortSignal.timeout(7000),cache:'no-store'})}});}
export const privateHeaders={'Cache-Control':'private, no-store, max-age=0',Vary:'Cookie'};
export function sameOrigin(request:Request){return request.headers.get('origin')===new URL(process.env.NEXT_PUBLIC_SITE_URL||request.url).origin&&request.headers.get('sec-fetch-site')!=='cross-site';}
