import Link from 'next/link';
import {Gamepad2} from 'lucide-react';
export function Footer(){return <footer className="site-footer"><div className="container footer-inner"><div className="footer-brand"><Gamepad2 size={23}/> <strong>NEXPLAY</strong><span>وجهتك لاكتشاف الألعاب</span></div><div><Link href="/">الرئيسية</Link><Link href="/favorites">المفضلة</Link></div><p>الأسعار تقديرية وليست عروض بيع. أسماء الألعاب وصورها ملك لأصحاب حقوقها.</p><small>© {new Date().getFullYear()} NEXPLAY</small></div></footer>}
