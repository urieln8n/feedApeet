-- FeedAPet — esquema inicial del MVP (Modelo B + Marketplace)
-- Basado en la arquitectura aprobada el 2026-08-10 (docs/MVP_SCOPE.md, docs/MODELO_ECONOMICO_B.md)
-- y en el diseño de Marketplace aprobado el 2026-08-10.
-- Sin tablas de capital, ROI, staking, referidos ni membresía: excluidas explícitamente del MVP.
-- Sin tabla `products`: el marketplace opera a nivel de ofertas de partner, no de catálogo/stock propio.

-- ============ IDENTIDAD ============

create type public.user_role as enum ('user', 'admin');
create type public.team_preference as enum ('perro', 'gato', 'ambos');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  team public.team_preference,
  role public.user_role not null default 'user',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Los usuarios ven su propio perfil"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Los usuarios actualizan su propio perfil"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Los admins ven todos los perfiles"
  on public.profiles for select
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- ============ REFUGIOS Y CASOS ============

create type public.shelter_status as enum ('pending_review', 'verified', 'rejected');
create type public.case_status as enum ('en_proceso', 'objetivo_cumplido', 'en_ejecucion', 'adoptado_cerrado');

create table public.shelters (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  legal_id text,
  country text not null default 'ES',
  status public.shelter_status not null default 'pending_review',
  contact_email text,
  contact_phone text,
  description text,
  created_at timestamptz not null default now()
);

create table public.cases (
  id uuid primary key default gen_random_uuid(),
  shelter_id uuid not null references public.shelters(id) on delete cascade,
  title text not null,
  description text,
  status public.case_status not null default 'en_proceso',
  goal_amount numeric(10,2),
  raised_amount numeric(10,2) not null default 0,
  created_at timestamptz not null default now()
);

alter table public.shelters enable row level security;
alter table public.cases enable row level security;

create policy "Refugios verificados son públicos"
  on public.shelters for select
  using (status = 'verified' or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Solo admins gestionan refugios"
  on public.shelters for insert with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Solo admins actualizan refugios"
  on public.shelters for update using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Casos de refugios verificados son públicos"
  on public.cases for select
  using (exists (select 1 from public.shelters s where s.id = shelter_id and s.status = 'verified')
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Solo admins gestionan casos"
  on public.cases for insert with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Solo admins actualizan casos"
  on public.cases for update using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- ============ MARKETPLACE: CATEGORÍAS ============

create type public.category_kind as enum ('producto', 'servicio', 'ambos');

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  kind public.category_kind not null default 'ambos',
  icon text,
  created_at timestamptz not null default now()
);

alter table public.categories enable row level security;

create policy "Categorías son públicas"
  on public.categories for select using (true);

create policy "Solo admins gestionan categorías"
  on public.categories for insert with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Solo admins actualizan categorías"
  on public.categories for update using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- ============ MARKETPLACE: PARTNERS Y OFERTAS ============

create type public.partner_status as enum ('pending', 'active', 'inactive');

create table public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  category_id uuid references public.categories(id),
  status public.partner_status not null default 'pending',
  commission_rate numeric(5,2), -- tasa por defecto/fallback; cada oferta puede definir la suya
  is_founding_partner boolean not null default false,
  logo_url text,
  website_url text,
  short_description text,
  long_description text,
  contact_email text,
  created_at timestamptz not null default now()
);

create type public.discount_type as enum ('percentage', 'fixed', 'other');
create type public.offer_status as enum ('draft', 'active', 'inactive');

create table public.offers (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references public.partners(id) on delete cascade,
  category_id uuid references public.categories(id), -- si es null, hereda la categoría del partner
  title text not null,
  description text,
  discount_type public.discount_type not null,
  discount_value numeric(10,2), -- null permitido cuando discount_type = 'other'
  commission_rate numeric(5,2) not null,
  terms text,
  status public.offer_status not null default 'draft',
  valid_from date,
  valid_until date,
  created_at timestamptz not null default now()
);

alter table public.partners enable row level security;
alter table public.offers enable row level security;

create policy "Partners activos son públicos"
  on public.partners for select
  using (status = 'active' or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Solo admins gestionan partners"
  on public.partners for insert with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Solo admins actualizan partners"
  on public.partners for update using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Ofertas activas de partners activos son públicas"
  on public.offers for select
  using (
    status = 'active'
    and exists (select 1 from public.partners pt where pt.id = partner_id and pt.status = 'active')
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "Solo admins gestionan ofertas"
  on public.offers for insert with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Solo admins actualizan ofertas"
  on public.offers for update using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- ============ MARKETPLACE: ATRIBUCIÓN DE COMPRAS ============
-- Mecanismo del MVP: código de descuento manual por (usuario, oferta).
-- link_type y external_ref dejan hueco para URL de afiliado / integración directa / tracking
-- automático en el futuro, sin requerir cambios de esquema (GAP-NEW-02).

create type public.link_type as enum ('code', 'url', 'manual');

create table public.partner_links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  offer_id uuid not null references public.offers(id) on delete cascade,
  link_type public.link_type not null default 'code',
  value text not null, -- el código, o la URL de afiliado
  external_ref jsonb, -- reservado para integraciones/afiliación futuras
  created_at timestamptz not null default now(),
  redeemed_at timestamptz
);

create type public.attribution_status as enum ('pending', 'confirmed', 'paid');

create table public.purchase_attributions (
  id uuid primary key default gen_random_uuid(),
  partner_link_id uuid not null references public.partner_links(id) on delete cascade,
  amount numeric(10,2) not null,
  savings_amount numeric(10,2) not null default 0, -- lo que ahorró el usuario gracias a la oferta
  commission_amount numeric(10,2) not null, -- lo que paga el partner a FeedAPet
  status public.attribution_status not null default 'pending',
  confirmed_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

alter table public.partner_links enable row level security;
alter table public.purchase_attributions enable row level security;

create policy "Los usuarios ven sus propios partner_links"
  on public.partner_links for select using (auth.uid() = user_id);

create policy "Los usuarios crean sus propios partner_links"
  on public.partner_links for insert with check (auth.uid() = user_id);

create policy "Los usuarios ven sus propias atribuciones"
  on public.purchase_attributions for select
  using (exists (
    select 1 from public.partner_links pl
    where pl.id = partner_link_id and pl.user_id = auth.uid()
  ));

create policy "Solo admins crean/confirman atribuciones"
  on public.purchase_attributions for insert with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Solo admins actualizan atribuciones"
  on public.purchase_attributions for update using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- ============ DONACIONES Y PATROCINIOS ============

create table public.donations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id),
  case_id uuid references public.cases(id),
  shelter_id uuid references public.shelters(id),
  amount numeric(10,2) not null,
  created_at timestamptz not null default now(),
  constraint donation_target check (case_id is not null or shelter_id is not null)
);

create type public.campaign_status as enum ('prospecting', 'active', 'completed');

create table public.campaigns (
  id uuid primary key default gen_random_uuid(),
  sponsor_name text not null,
  sponsor_contact text,
  amount numeric(10,2) not null,
  status public.campaign_status not null default 'prospecting',
  created_at timestamptz not null default now()
);

create table public.campaign_shelters (
  campaign_id uuid not null references public.campaigns(id) on delete cascade,
  shelter_id uuid not null references public.shelters(id) on delete cascade,
  primary key (campaign_id, shelter_id)
);

alter table public.donations enable row level security;
alter table public.campaigns enable row level security;
alter table public.campaign_shelters enable row level security;

create policy "Los usuarios ven sus propias donaciones"
  on public.donations for select using (auth.uid() = user_id or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Los usuarios registran sus propias donaciones"
  on public.donations for insert with check (auth.uid() = user_id);

create policy "Las campañas activas son públicas"
  on public.campaigns for select
  using (status in ('active', 'completed') or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Solo admins gestionan campañas"
  on public.campaigns for insert with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Campaign_shelters visible si la campaña es pública"
  on public.campaign_shelters for select
  using (exists (select 1 from public.campaigns c where c.id = campaign_id and c.status in ('active','completed')));

-- ============ REPORTING DE IMPACTO ============

create type public.evidence_type as enum ('foto', 'factura', 'reporte');

create table public.impact_reports (
  id uuid primary key default gen_random_uuid(),
  case_id uuid references public.cases(id),
  campaign_id uuid references public.campaigns(id),
  shelter_id uuid references public.shelters(id),
  evidence_type public.evidence_type not null,
  media_url text,
  description text not null,
  verified_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  constraint report_target check (case_id is not null or campaign_id is not null or shelter_id is not null)
);

alter table public.impact_reports enable row level security;

create policy "Reportes verificados son públicos"
  on public.impact_reports for select
  using (verified_by is not null or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Solo admins crean reportes"
  on public.impact_reports for insert with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- ============ IMPACT SCORE (estructura preparada, uso simplificado en el MVP) ============
-- Ver docs/DECISIONES: fórmula y pesos definitivos aún no decididos (GAP-NEW-11).
-- Este MVP solo registra el evento crudo; no calcula niveles ni badges todavía.
-- Se alimenta también de compras del marketplace (purchase_attributions confirmadas).

create table public.impact_score_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  event_type text not null,
  points numeric(10,2) not null default 0,
  source_table text,
  source_id uuid,
  created_at timestamptz not null default now()
);

alter table public.impact_score_events enable row level security;

create policy "Los usuarios ven sus propios eventos de impacto"
  on public.impact_score_events for select using (auth.uid() = user_id);
