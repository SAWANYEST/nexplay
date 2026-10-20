# NEXPLAY — Governance & Master Registry

## Vision (approved)
موقع عربي منظم لاكتشاف ألعاب السوني والإكس بوكس، يعتمد هوية أزرق مائل للأسود، ويعرض 10 ألعاب أولية بصور ومقاطع ومعلومات وأسعار استرشادية بالريال السعودي، مع تسجيل دخول ولوحة إدارة منفصلة.

## Architecture (implemented in source / pending integration)
- Next.js App Router + TypeScript
- Supabase Auth + PostgreSQL RLS + Storage
- GitHub source of truth — https://github.com/SAWANYEST/nexplay
- Vercel preview ثم إنتاج
- مدير واحد مبدئيًا عبر public.admins، ولا يجوز منح الصلاحية من واجهة التسجيل.

## Stages
| Stage | Goal | State | Acceptance criteria |
|------|------|-------|---------------------|
| 01 | Design and requirements | approved | Arabic RTL, responsive dark blue visual system |
| 02 | Frontend and game catalog | coded, needs build tests | Homepage, search, filters, detail pages, video embedding |
| 03 | Auth and database | coded, not connected | Signup/login/email, admin RLS, favorites, media uploads |
| 04 | Verification | pending | Typecheck, build, RLS negative tests, browser review |
| 05 | GitHub & Vercel | GitHub source uploaded; Preview/Production pending | Repository source, preview, production, exact commit confirmation |

## Safeguards
- لا تلمس مشروع car-world على GitHub أو مشروع Supabase السابق غير النشط.
- لا تنفذ migrations على قاعدة موجودة؛ أنشئ مشروعًا جديدًا باسم NEXPLAY.
- لا تنقل بيانات ولا تحذف موارد ولا تنشر إلى Production دون موافقة صريحة.
- احفظ مفاتيح الخدمة السرية خارج الكود.
- راجع صلاحيات RLS وتأكيد البريد الإلكتروني قبل الإطلاق.

## Execution Ledger (2026-10-20)
- created complete frontend/backend integration source tree in standalone archive;
- no dependency install/build (package network unavailable in execution sandbox);
- verified 33 source files uploaded to GitHub repository SAWANYEST/nexplay on branch main; base source commit 3ba023f6c48e0034118eac63fac8d3c89aef24a4;
- no Supabase project created (requires org/cost consent);
- no Vercel deployment performed.

## Handoff Record
- Work directory: nexplay/
- SQL scripts: supabase/migrations/
- Next action: confirm target Supabase organization and any project cost; create independent Supabase project, apply reviewed migrations, connect Vercel Preview, and test acceptance flows.
- Latest main source commit: 3ba023f6c48e0034118eac63fac8d3c89aef24a4 (before this governance documentation update).\n- Production commit SHA: not available; never deployed.
