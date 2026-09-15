import {serverAuth,sameOrigin,privateHeaders} from '@/lib/supabase/server';
import {loadWorkspace,mutateWorkspace} from '@/lib/workspace/server';
import {WorkspaceInputError} from '@/lib/workspace/validation';
export async function GET() {
 try {const db=await serverAuth();const {data:{user}}=await db.auth.getUser();if(!user)return Response.json({error:'Please sign in.'},{status:401,headers:privateHeaders});return Response.json(await loadWorkspace(user.id,String(user.user_metadata.full_name||user.user_metadata.name||'Learner')),{headers:privateHeaders});}
 catch{return Response.json({error:'Your workspace could not load. Please try again.'},{status:503,headers:privateHeaders});}
}
export async function POST(request:Request) {
 if(!sameOrigin(request))return Response.json({error:'Request not allowed.'},{status:403,headers:privateHeaders});
 try {
  const raw=await request.text();if(raw.length>30000)return Response.json({error:'Request is too large.'},{status:413,headers:privateHeaders});
  const body=JSON.parse(raw);if(!body||typeof body.action!=='string'||!body.input||typeof body.input!=='object'||Array.isArray(body.input))throw new WorkspaceInputError('Invalid request.');
  const db=await serverAuth();const {data:{user}}=await db.auth.getUser();if(!user)return Response.json({error:'Please sign in.'},{status:401,headers:privateHeaders});
  if(body.accountId!==user.id)return Response.json({error:'Your account changed. Reload the page.'},{status:409,headers:privateHeaders});
  return Response.json(await mutateWorkspace(user.id,body.action,body.input),{headers:privateHeaders});
 } catch(error) {const input=error instanceof WorkspaceInputError||error instanceof SyntaxError;return Response.json({error:input?error.message:'Could not save. Please try again.'},{status:input?400:503,headers:privateHeaders});}
}
