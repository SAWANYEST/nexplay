import { serverClient } from "@/lib/supabase/server";
import { seedGames } from "@/lib/seed";
import type { Game } from "@/lib/types";
export async function getPublicGames():Promise<Game[]> {
  const sb=await serverClient();
  if(!sb) return seedGames;
  const {data,error}=await sb.from('games').select('*').eq('is_published',true).eq('is_deleted',false).order('featured',{ascending:false}).order('release_date',{ascending:false});
  if(error){console.error('Games query failed:',error.message);return []}
  return (data||[]) as Game[];
}
export async function getGame(slug:string):Promise<Game|null> {
  const sb=await serverClient();
  if(!sb) return seedGames.find(g=>g.slug===slug)||null;
  const {data,error}=await sb.from('games').select('*').eq('slug',slug).eq('is_published',true).eq('is_deleted',false).maybeSingle();
  if(error){console.error('Game query failed:',error.message);return null}
  return data as Game|null;
}
