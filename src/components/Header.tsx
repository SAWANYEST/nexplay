"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Gamepad2, Heart, LayoutDashboard, Menu, X, UserRound } from 'lucide-react';
import { useEffect,useState } from 'react';
import { browserClient } from '@/lib/supabase/browser';
export function Header(){
 const path=usePathname();const [opened,setOpened]=useState(false);const [signed,setSigned]=useState(false);const [isAdmin,setIsAdmin]=useState(false);
 useEffect(()=>{const sb=browserClient();if(!sb)return;let ok=true;
  const refresh=async()=>{const {data:{user}}=await sb.auth.getUser();if(!ok)return;setSigned(Boolean(user));if(user){const {data}=await sb.from('admins').select('user_id').eq('user_id',user.id).maybeSingle();if(ok)setIsAdmin(Boolean(data));}else setIsAdmin(false)};
  void refresh();const {data:{subscription}}=sb.auth.onAuthStateChange(()=>{void refresh()});return()=>{ok=false;subscription.unsubscribe()};
 },[path]);
 const links=[{href:'/',text:'الرئيسية'},{href:'/#games',text:'الألعاب'},{href:'/favorites',text:'المفضلة'}];
 return <header className="site-header"><div className="container nav">
  <Link className="brand" href="/" aria-label="NEXPLAY الرئيسية"><span className="brand-icon"><Gamepad2 size={25} strokeWidth={2.4}/></span><span>NEX<span className="accent">PLAY</span><small>GAMING UNIVERSE</small></span></Link>
  <nav className={'nav-links '+(opened?'active':'')} aria-label="القائمة الرئيسية">{links.map(l=><Link key={l.href} href={l.href} className={path===l.href?'active':''} onClick={()=>setOpened(false)}>{l.text}</Link>)}{isAdmin&&<Link href="/admin" onClick={()=>setOpened(false)}><LayoutDashboard size={17}/> لوحة الإدارة</Link>}</nav>
  <div className="nav-actions"><Link href="/favorites" className="icon-button heart-nav" aria-label="المفضلة"><Heart size={19}/></Link><Link className="btn btn-small btn-outline" href="/auth"><UserRound size={17}/>{signed?'حسابي':'دخول'}</Link><button className="icon-button mobile-menu" aria-label={opened?'إغلاق القائمة':'فتح القائمة'} onClick={()=>setOpened(!opened)}>{opened?<X/>:<Menu/>}</button></div>
 </div></header>
}
