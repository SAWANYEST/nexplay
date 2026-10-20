"use client";
import {useState} from 'react';
import {Gamepad2} from 'lucide-react';
export function GameImage({src,alt,priority=false,className=''}:{src:string;alt:string;priority?:boolean;className?:string}){
 const [broken,setBroken]=useState(false);
 if(!src||broken)return <div className={'game-img-fallback '+className}><Gamepad2 size={46}/><span>{alt}</span></div>;
 // External official-store image assets are editorial references. Admin can replace links with licensed originals.
 return <img className={className} loading={priority?'eager':'lazy'} decoding="async" src={src} alt={alt} onError={()=>setBroken(true)}/>;
}
