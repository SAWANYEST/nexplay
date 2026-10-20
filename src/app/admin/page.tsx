import {redirect} from 'next/navigation';
import {serverClient} from '@/lib/supabase/server';
import {AdminPanel} from '@/components/AdminPanel';
import type {Game} from '@/lib/types';
export const dynamic='force-dynamic';
export default async function AdminPage(){const sb=await serverClient();if(!sb)redirect('/auth');const {data:{user},error:authError}=await sb.auth.getUser();if(authError||!user)redirect('/auth');const {data:admin,error:adminErr}=await sb.from('admins').select('user_id').eq('user_id',user.id).maybeSingle();if(adminErr||!admin)redirect('/');const {data:games,error}=await sb.from('games').select('*').order('created_at',{ascending:false});return <div className="container admin-page"><AdminPanel initialGames={(games||[]) as Game[]} loadingError={error?.message||''}/></div>}
