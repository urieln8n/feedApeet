-- FeedAPet — capa social/comunitaria (MVP v2 Community & Impact Platform)
-- Basado en docs/MVP_V2_COMMUNITY_IMPACT_PLATFORM.md (aprobado 2026-08-12) y en el
-- patrón de RLS de 0001_init.sql — mismo estilo, mismas convenciones de nombres.
-- No modifica 0001_init.sql. No requiere un proyecto Supabase real conectado para
-- existir como archivo; queda preparada para ejecutarse cuando haya uno.
--
-- Solo 4 tablas nuevas: posts, reactions, follows, reports. Todo lo demás reutiliza
-- el esquema existente (categories, impact_score_events) sin duplicar tablas.
--
-- Explícitamente fuera de esta migración (ver docs/MVP_V2_COMMUNITY_IMPACT_PLATFORM.md):
-- comentarios, posts libres de usuario, guardados, notificaciones, hashtags libres,
-- mensajería, tabla post_media separada (media es un array jsonb en posts), tabla
-- shares/social_events separada (compartir se registra en impact_score_events, sin
-- cambios de esquema aquí — esa integración es lógica de aplicación, no de base de
-- datos, y se implementa en Fase 3/5, no en esta migración).
--
-- Sin blockchain, Solana, Anchor, wallets, ROI, staking ni ningún componente
-- financiero — excluidos explícitamente del MVP.

-- ============ POSTS ============

create type public.post_author_type as enum ('user', 'shelter', 'partner', 'system');

-- Tipos de post aprobados para el MVP (ver sección C del documento de alcance).
-- Sin comentarios ni posts libres de usuario: solo estos 5 tipos curados.
create type public.post_type as enum (
  'caso_refugio',
  'campana',
  'logro_comunidad',
  'impacto_compartido',
  'heroe_del_mes'
);

create type public.post_status as enum ('draft', 'published', 'hidden');

-- author_id polimórfico no es representable como una única FK en Postgres.
-- En vez de eso, se reutilizan las columnas de referencia de origen
-- (shelter_id / partner_id) también como el autor cuando author_type lo indica,
-- y author_user_id cuando el autor es un usuario. La constraint de abajo
-- garantiza que la columna correcta esté rellena según author_type.
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  author_type public.post_author_type not null,
  author_user_id uuid references public.profiles(id) on delete cascade,
  post_type public.post_type not null,
  category_id uuid references public.categories(id),
  case_id uuid references public.cases(id),
  campaign_id uuid references public.campaigns(id),
  shelter_id uuid references public.shelters(id),
  partner_id uuid references public.partners(id),
  title text not null,
  body text,
  -- Array de URLs de imagen/vídeo. Sin tabla post_media aparte en el MVP
  -- (ver docs/MVP_V2_COMMUNITY_IMPACT_PLATFORM.md, sección E).
  media jsonb not null default '[]'::jsonb,
  status public.post_status not null default 'draft',
  created_at timestamptz not null default now(),
  constraint posts_author_consistency check (
    (author_type = 'user' and author_user_id is not null)
    or (author_type = 'shelter' and shelter_id is not null)
    or (author_type = 'partner' and partner_id is not null)
    or (author_type = 'system')
  )
);

create index posts_status_created_at_idx on public.posts (status, created_at desc);
create index posts_shelter_id_idx on public.posts (shelter_id);
create index posts_partner_id_idx on public.posts (partner_id);
create index posts_category_id_idx on public.posts (category_id);
create index posts_author_user_id_idx on public.posts (author_user_id);

alter table public.posts enable row level security;

create policy "Posts publicados son públicos"
  on public.posts for select
  using (status = 'published' or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- Vía principal de publicación en el MVP: el equipo fundador (admin) publica en
-- nombre de refugios/partners/sistema. Si el post es de un refugio, el refugio
-- referenciado debe estar verificado — condición de seguridad pedida explícitamente.
create policy "Solo admins crean posts institucionales"
  on public.posts for insert
  with check (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
    and author_type in ('shelter', 'partner', 'system')
    and (
      author_type <> 'shelter'
      or exists (select 1 from public.shelters s where s.id = shelter_id and s.status = 'verified')
    )
  );

-- Segunda vía, más estrecha: un usuario autenticado solo puede publicar su propio
-- "impacto compartido" (el botón "compartir al muro" del Dashboard, sección B del
-- documento de alcance). Ningún otro post_type ni author_type queda abierto a un
-- usuario no-admin. Ver resumen de Fase 2 — esta es una decisión ambigua en el
-- documento aprobado (sección I dice "solo shelter/partner/system"; secciones B/L
-- incluyen "impacto compartido por el usuario" dentro del alcance del MVP) resuelta
-- aquí de la forma más restrictiva posible, pendiente de confirmación.
create policy "Los usuarios comparten su propio impacto"
  on public.posts for insert
  with check (
    author_type = 'user'
    and author_user_id = auth.uid()
    and post_type = 'impacto_compartido'
  );

create policy "Solo admins actualizan posts"
  on public.posts for update
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- ============ REACCIONES ============

-- Un solo tipo de reacción en el MVP (ver sección C del documento de alcance).
-- Enum en vez de booleano para poder añadir tipos después con ALTER TYPE ... ADD
-- VALUE, sin migrar la tabla.
create type public.reaction_type as enum ('me_importa');

create table public.reactions (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  reaction_type public.reaction_type not null default 'me_importa',
  created_at timestamptz not null default now(),
  unique (user_id, post_id)
);

create index reactions_post_id_idx on public.reactions (post_id);

alter table public.reactions enable row level security;

-- Lectura pública: el conteo de reacciones es la señal de engagement visible en
-- el post. No expone más que el user_id crudo — el perfil (nombre) sigue privado
-- por la RLS de `profiles`, así que no hay fuga de identidad adicional.
create policy "Las reacciones son públicas"
  on public.reactions for select using (true);

create policy "Los usuarios crean sus propias reacciones"
  on public.reactions for insert with check (auth.uid() = user_id);

create policy "Los usuarios borran sus propias reacciones"
  on public.reactions for delete using (auth.uid() = user_id);

-- ============ SEGUIMIENTOS (FOLLOWS) ============

-- Solo refugios y partners en el MVP — sin seguir a otros usuarios (decisión
-- confirmada en la revisión del 2026-08-12). El enum queda abierto a añadir
-- 'user' en Fase 2 con ALTER TYPE ... ADD VALUE, sin rediseñar la tabla.
create type public.follow_target_type as enum ('shelter', 'partner');

create table public.follows (
  id uuid primary key default gen_random_uuid(),
  follower_id uuid not null references public.profiles(id) on delete cascade,
  target_type public.follow_target_type not null,
  shelter_id uuid references public.shelters(id) on delete cascade,
  partner_id uuid references public.partners(id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint follows_target_consistency check (
    (target_type = 'shelter' and shelter_id is not null and partner_id is null)
    or (target_type = 'partner' and partner_id is not null and shelter_id is null)
  )
);

-- Un usuario no puede seguir el mismo refugio/partner dos veces. Se usan índices
-- únicos parciales (no una unique constraint simple) porque con columnas nullable
-- una unique constraint normal no evita duplicados: Postgres trata cada NULL como
-- distinto de otro NULL, así que dos filas con partner_id = NULL no chocarían.
create unique index follows_unique_shelter_idx on public.follows (follower_id, shelter_id) where target_type = 'shelter';
create unique index follows_unique_partner_idx on public.follows (follower_id, partner_id) where target_type = 'partner';
create index follows_follower_id_idx on public.follows (follower_id);

alter table public.follows enable row level security;

-- Privado por defecto (mismo patrón que `donations`): el propio usuario y los
-- admins pueden ver los follows. No se expone un contador público de seguidores
-- todavía — no estaba en el alcance aprobado; añadirlo después es solo un cambio
-- de política, sin tocar el esquema.
create policy "Los usuarios ven sus propios follows"
  on public.follows for select
  using (auth.uid() = follower_id or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Los usuarios crean sus propios follows"
  on public.follows for insert with check (auth.uid() = follower_id);

create policy "Los usuarios borran sus propios follows"
  on public.follows for delete using (auth.uid() = follower_id);

-- ============ REPORTES Y MODERACIÓN ============

-- Un solo target posible en el MVP: posts (no hay comentarios que reportar
-- todavía). Enum abierto a extender en Fase 2 igual que los anteriores.
create type public.report_target_type as enum ('post');
create type public.report_status as enum ('pending', 'reviewed', 'actioned');

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  target_type public.report_target_type not null default 'post',
  post_id uuid references public.posts(id) on delete cascade,
  reporter_id uuid not null references public.profiles(id) on delete cascade,
  reason text not null,
  status public.report_status not null default 'pending',
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  constraint reports_target_consistency check (
    target_type <> 'post' or post_id is not null
  )
);

create index reports_post_id_idx on public.reports (post_id);
create index reports_status_idx on public.reports (status);

alter table public.reports enable row level security;

create policy "Los usuarios ven sus propios reports"
  on public.reports for select
  using (auth.uid() = reporter_id or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Los usuarios autenticados crean reports"
  on public.reports for insert with check (auth.uid() = reporter_id);

create policy "Solo admins actualizan reports"
  on public.reports for update
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));
