import Link from 'next/link';
import { ArrowLeft, ArrowUpLeft, ChevronLeft, Gamepad2, ShieldCheck, MonitorPlay, Sparkles, Zap } from 'lucide-react';
import { GameImage } from '@/components/GameImage';
import { Explorer } from '@/components/Explorer';
import { getPublicGames } from '@/lib/games';
import { currency, upcoming } from '@/lib/seed';
export const revalidate=0;
export default async function Home(){const games=await getPublicGames();const hero=games.find(g=>g.slug==='gta-vi')??games[0];return <>
 <section className="hero"><div className="container hero-grid"><div className="hero-copy"><div className="hero-label"><span className="live-dot"/> عالم الألعاب يبدأ من هنا <Sparkles size={14}/></div><h1>كل الألعاب.<br/><span className="hero-gradient">في عالم واحد.</span></h1><p>اكتشف أحدث ألعاب PlayStation وXbox، تابع الإصدارات القادمة، واستكشف الصور والعروض الرسمية والمعلومات والأسعار بالريال السعودي.</p><div className="hero-actions"><Link className="btn btn-primary btn-large" href="#games">استكشف الألعاب <ArrowLeft size={20}/></Link><Link className="btn btn-ghost btn-large" href="/favorites">قائمتي المفضلة <ChevronLeft size={18}/></Link></div><div className="hero-trust"><span><Zap size={15}/> تصفح سريع</span><span><ShieldCheck size={15}/> معلومات منظمة</span><span><MonitorPlay size={15}/> جميع الأجهزة</span></div></div>
 <div className="hero-art">{hero&&<><div className="hero-picture"><GameImage src={hero.backdrop_url} alt={`صورة لعبة ${hero.title}`} priority/><div className="hero-picture-shade"/><div className="hero-picture-caption"><span className="hero-hot">{upcoming(hero.release_date)?'الإصدار المنتظر':'لعبة مميزة'}</span><h2 dir="ltr">{hero.title}</h2><p>{hero.genre} • {hero.platforms.slice(0,2).join(' / ')}</p><div className="hero-picture-footer"><strong>{currency(hero.price_sar)}</strong><Link href={`/game/${hero.slug}`} aria-label={`تفاصيل ${hero.title}`}><ArrowUpLeft size={22}/></Link></div></div></div><div className="hero-art-glow"/></>}</div>
 </div><div className="container stats-line"><span><strong>{games.length}</strong> ألعاب متنوعة</span><span><strong>2</strong> منصات رئيسية</span><span><strong>100%</strong> باللغة العربية</span></div></section>
 <Explorer games={games}/>
 <section className="feature-banner"><div className="container"><div className="feature-panel"><div className="feature-icon"><Gamepad2 size={38}/></div><div><span className="eyebrow">NEXPLAY COMMUNITY</span><h2>احتفظ بألعابك المفضلة في مكان واحد</h2><p>أنشئ حسابك مجانًا، واحفظ الألعاب التي تهمك لتعود لها لاحقًا.</p></div><Link href="/auth" className="btn btn-primary">إنشاء حساب <ArrowLeft size={18}/></Link></div></div></section>
 </>}
