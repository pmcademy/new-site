import {createServerClient} from '@supabase/ssr';
import {NextResponse,type NextRequest} from 'next/server';
import {authConfig} from '@/lib/supabase/config';
export async function proxy(request:NextRequest){const config=authConfig();if(!config)return NextResponse.next();let response=NextResponse.next({request});const db=createServerClient(config.url,config.key,{cookies:{getAll:()=>request.cookies.getAll(),setAll:values=>{values.forEach(({name,value})=>request.cookies.set(name,value));response=NextResponse.next({request});values.forEach(({name,value,options})=>response.cookies.set(name,value,options));response.headers.set('Cache-Control','private, no-store');}}});try{await db.auth.getClaims();}catch{}return response;}
export const config={matcher:['/api/account','/api/progress','/api/capstones/:path*','/auth/:path*','/signin']};
