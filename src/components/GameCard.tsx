import Link from 'next/link';
import {ArrowUpLeft,CalendarDays} from 'lucide-react';
import {GameImage} from '@/components/GameImage';
import {currency,upcoming} from '@/lib/seed';
import type {Game} from '@/lib/types';
export function GameCard({game,index=0}:{game:Game,index?:number}){return <Link href={`/game/${game.slug}`} className="game-card" style={{animationDelay:`${index*45}ms`}}>
 <div className="card-art"><GameImage src={game.cover_url} alt={`صورة لعبة ${game.title}`}/><span className="card-icon"><ArrowUpLeft size={20}/></span>{upcoming(game.release_date)&&<span className="badge badge-upcoming">قريبًا</span>}</div>
 <div className="card-body"><span className="genre">{game.genre}</span><h3 dir="ltr">{game.title}</h3><div className="card-platforms">{game.platforms.slice(0,3).map(x=><span key={x}>{x}</span>)}</div><div className="card-bottom"><strong>{currency(game.price_sar)}</strong><span><CalendarDays size={14}/>{new Date(`${game.release_date}T12:00:00Z`).getUTCFullYear()}</span></div></div>
 </Link>}
