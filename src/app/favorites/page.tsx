"use client";
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {Heart,ArrowLeft,LoaderCircle} from 'lucide-react';
import {browserClient} from '@/lib/supabase/browser';
import {GameCard} from '@/components/GameCard';
import type {Game} from '@/lib/types';
export default function Favorites(){const [games,setGames]=useState<Game[]>([]);const [status,setStatus]=useState<'loading'|'guest'|'ready'|'error'>('loading');
 useEffect(()=>{let live=true;const sb=browserClient();if(!sb){setStatus('guest');return}void(async()=>{const {data:{user}}=await sb.auth.getUser();if(!live)return;if(!user){setStatus('guest');return}const {data,error}=await sb.from('favorites').select('games(*)').eq('user_id',user.id);if(!live)return;if(error){setStatus('error');return}const rows=(data||[]).map((r:{games:unknown})=>r.games).filter(Boolean) as Game[];setGames(rows.filter(g=>g.is_published&&!g.is_deleted));setStatus('ready')})();return()=>{live=false}},[]);
 return <div className="container favorites-page"><div className="eyebrow">قائمتك الشخصية</div><h1>الألعاب <span className="accent">المفضلة</span></h1>{status==='loading'?<div className="empty-state"><LoaderCircle className="spin"/></div>:status==='guest'?<div className="empty-state"><Heart size={44}/><h2>احفظ ألعابك المفضلة</h2><p>سجّل الدخول لتحتفظ بقائمة الألعاب الخاصة بك.</p><Link href="/auth" className="btn btn-primary">تسجيل الدخول <ArrowLeft size={17}/></Link></div>:status==='error'?<div className="empty-state">تعذر تحميل المفضلة. تحقق من الاتصال وحاول مجددًا.</div>:games.length?<div className="game-grid">{games.map(g=><GameCard key={g.id} game={g}/>)}</div>:<div className="empty-state"><Heart size={44}/><h2>قائمتك فارغة</h2><p>اضغط «أضف إلى المفضلة» داخل أي لعبة.</p><Link href="/#games" className="btn btn-primary">تصفح الألعاب <ArrowLeft size={17}/></Link></div>}</div>}
