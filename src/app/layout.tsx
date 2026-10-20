import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
export const metadata: Metadata = {title:{default:'NEXPLAY | عالم الألعاب',template:'%s | NEXPLAY'},description:'اكتشف ألعاب PlayStation وXbox، وتواريخ إصدارها وأسعارها الاسترشادية والصور والعروض الرسمية.',robots:{index:true,follow:true}};
export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="ar" dir="rtl"><body><div className="ambient ambient-one"/><div className="ambient ambient-two"/><Header/><main id="main">{children}</main><Footer/></body></html>
}
