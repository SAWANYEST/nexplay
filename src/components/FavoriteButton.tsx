"use client";
import {useEffect,useState} from 'react';
import {Heart,LoaderCircle} from 'lucide-react';
import Link from 'next/link';
import {browserClient} from '@/lib/supabase/browser';
export function FavoriteButton({gameId}:{gameId:string}){const [status,setStatus]=useState<'loading'|'signedout'|'ready'>('loading');const [fav,setFav]=useState(false);const [busy,setBusy]=useState(false);const [error,setError]=useState('');
 useEffect(()=>{let mounted=true;const sb=browserClient();if(!sb){setStatus('signedout');return}void(async()=>{const {data:{user}}=await sb.auth.getUser();if(!mounted)return;if(!user){setStatus('signedout');return}const {data}=await sb.from('favorites').select('game_id').eq('game_id',gameId).eq('user_id',user.id).maybeSingle();if(mounted){setFav(Boolean(data));setStatus('ready')}})();return()=>{mounted=false}},[gameId]);
 const toggle=async()=>{const sb=browserClient();if(!sb)return;setBusy(true);setError('');const {data:{user}}=await sb.auth.getUser();if(!user){setStatus('signedout');setBusy(false);return}const r=fav?await sb.from('favorites').delete().eq('game_id',gameId).eq('user_id',user.id):await sb.from('favorites').insert({game_id:gameId,user_id:user.id});if(r.error)setError('تعذر حفظ المفضلة، حاول مجددًا.');else setFav(!fav);setBusy(false)};
 if(status==='signedout')return <Link className="btn btn-primary" href="/auth"><Heart size={18}/> سجّل الدخول للحفظ</Link>;
 return <div><button className={'btn '+(fav?'btn-outline':'btn-primary')} onClick={toggle} disabled={busy||status==='loading'}>{busy||status==='loading'?<LoaderCircle className="spin" size={18}/>:<Heart size={18} fill={fav?'currentColor':'none'}/>} {fav?'إزالة من المفضلة':'أضف إلى المفضلة'}</button>{error&&<p className="form-error">{error}</p>}</div>
}
