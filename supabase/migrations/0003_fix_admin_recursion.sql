-- FeedAPet — corrección de recursión infinita en RLS (bug pre-existente de 0001_init.sql)
--
-- Síntoma real observado contra el proyecto Supabase ya desplegado:
--   {"code":"42P17","message":"infinite recursion detected in policy for relation \"profiles\""}
--
-- Causa: la política "Los admins ven todos los perfiles" de `profiles` (0001_init.sql)
-- consulta `profiles` desde dentro de una política de `profiles`. Evaluarla exige
-- volver a aplicar RLS a `profiles`, lo que vuelve a disparar la misma política —
-- recursión infinita que Postgres detecta y rechaza. Como el mismo patrón
-- `exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')`
-- se reutiliza como comprobación de "admin" en otras 27 políticas (0001 y 0002), esa
-- consulta interna también dispara la recursión — inutilizando el acceso admin en
-- prácticamente todo el esquema, no solo en `profiles`.
--
-- Fix: una función SECURITY DEFINER que comprueba el rol admin del usuario actual
-- sin volver a pasar por las políticas de `profiles` (un SECURITY DEFINER se
-- ejecuta con los privilegios del propietario de la función, que no está sujeto a
-- las políticas RLS de `profiles`, rompiendo así la recursión). Las 28 políticas
-- que usaban la subconsulta inline se reemplazan por una llamada a esta función,
-- manteniendo exactamente la misma regla de autorización.
--
-- No modifica 0001_init.sql ni 0002_social.sql. No borra ni recrea tablas. No
-- cambia el modelo de datos. Solo reemplaza políticas RLS y añade una función.
-- Segura de ejecutar más de una vez (drop-if-exists + create, create-or-replace).

-- ============ FUNCIÓN AUXILIAR: ¿ES ADMIN EL USUARIO ACTUAL? ============

-- Sin parámetros a propósito: solo puede comprobar auth.uid() (el usuario
-- autenticado según el JWT verificado por Supabase), nunca un id arbitrario
-- pasado por el cliente. Un cliente no puede usar esta función para consultar
-- el rol de otro usuario, porque no hay forma de pedírselo.
--
-- SECURITY DEFINER: se ejecuta con los privilegios de quien la crea (el rol
-- propietario, no sujeto a las políticas RLS de `profiles`), que es precisamente
-- lo que rompe la recursión. No es una puerta trasera hacia más datos: el cuerpo
-- de la función solo devuelve un booleano (es o no es admin), nunca expone filas
-- de `profiles` al llamante.
--
-- search_path fijado explícitamente a `public` para evitar el ataque clásico de
-- secuestro de search_path sobre funciones SECURITY DEFINER (que un rol con menos
-- privilegios cree un objeto con el mismo nombre en un esquema anterior en el
-- search_path del llamante). Con search_path fijo, la función siempre resuelve
-- `public.profiles`, sin importar el search_path de quien la invoca.
--
-- STABLE (no VOLATILE): el resultado no cambia dentro de la misma sentencia/
-- transacción y no modifica datos — permite además que el planificador la evalúe
-- una sola vez quiere por sentencia en vez de por fila.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

-- Ejecutable por cualquier usuario autenticado o anónimo (necesario: se llama
-- desde políticas de tablas que también son legibles sin sesión, como
-- `shelters`/`partners`/`posts`). No abre nada nuevo: antes esa misma comprobación
-- ya se ejecutaba inline con los mismos permisos implícitos de PostgREST.
grant execute on function public.is_admin() to anon, authenticated;

-- ============ PROFILES ============

drop policy if exists "Los admins ven todos los perfiles" on public.profiles;
create policy "Los admins ven todos los perfiles"
  on public.profiles for select
  using (public.is_admin());

-- ============ SHELTERS ============

drop policy if exists "Refugios verificados son públicos" on public.shelters;
create policy "Refugios verificados son públicos"
  on public.shelters for select
  using (status = 'verified' or public.is_admin());

drop policy if exists "Solo admins gestionan refugios" on public.shelters;
create policy "Solo admins gestionan refugios"
  on public.shelters for insert with check (public.is_admin());

drop policy if exists "Solo admins actualizan refugios" on public.shelters;
create policy "Solo admins actualizan refugios"
  on public.shelters for update using (public.is_admin());

-- ============ CASES ============

drop policy if exists "Casos de refugios verificados son públicos" on public.cases;
create policy "Casos de refugios verificados son públicos"
  on public.cases for select
  using (
    exists (select 1 from public.shelters s where s.id = shelter_id and s.status = 'verified')
    or public.is_admin()
  );

drop policy if exists "Solo admins gestionan casos" on public.cases;
create policy "Solo admins gestionan casos"
  on public.cases for insert with check (public.is_admin());

drop policy if exists "Solo admins actualizan casos" on public.cases;
create policy "Solo admins actualizan casos"
  on public.cases for update using (public.is_admin());

-- ============ CATEGORIES ============

drop policy if exists "Solo admins gestionan categorías" on public.categories;
create policy "Solo admins gestionan categorías"
  on public.categories for insert with check (public.is_admin());

drop policy if exists "Solo admins actualizan categorías" on public.categories;
create policy "Solo admins actualizan categorías"
  on public.categories for update using (public.is_admin());

-- ============ PARTNERS ============

drop policy if exists "Partners activos son públicos" on public.partners;
create policy "Partners activos son públicos"
  on public.partners for select
  using (status = 'active' or public.is_admin());

drop policy if exists "Solo admins gestionan partners" on public.partners;
create policy "Solo admins gestionan partners"
  on public.partners for insert with check (public.is_admin());

drop policy if exists "Solo admins actualizan partners" on public.partners;
create policy "Solo admins actualizan partners"
  on public.partners for update using (public.is_admin());

-- ============ OFFERS ============

drop policy if exists "Ofertas activas de partners activos son públicas" on public.offers;
create policy "Ofertas activas de partners activos son públicas"
  on public.offers for select
  using (
    status = 'active'
    and exists (select 1 from public.partners pt where pt.id = partner_id and pt.status = 'active')
    or public.is_admin()
  );

drop policy if exists "Solo admins gestionan ofertas" on public.offers;
create policy "Solo admins gestionan ofertas"
  on public.offers for insert with check (public.is_admin());

drop policy if exists "Solo admins actualizan ofertas" on public.offers;
create policy "Solo admins actualizan ofertas"
  on public.offers for update using (public.is_admin());

-- ============ PURCHASE_ATTRIBUTIONS ============

drop policy if exists "Solo admins crean/confirman atribuciones" on public.purchase_attributions;
create policy "Solo admins crean/confirman atribuciones"
  on public.purchase_attributions for insert with check (public.is_admin());

drop policy if exists "Solo admins actualizan atribuciones" on public.purchase_attributions;
create policy "Solo admins actualizan atribuciones"
  on public.purchase_attributions for update using (public.is_admin());

-- ============ DONATIONS ============

drop policy if exists "Los usuarios ven sus propias donaciones" on public.donations;
create policy "Los usuarios ven sus propias donaciones"
  on public.donations for select
  using (auth.uid() = user_id or public.is_admin());

-- ============ CAMPAIGNS ============

drop policy if exists "Las campañas activas son públicas" on public.campaigns;
create policy "Las campañas activas son públicas"
  on public.campaigns for select
  using (status in ('active', 'completed') or public.is_admin());

drop policy if exists "Solo admins gestionan campañas" on public.campaigns;
create policy "Solo admins gestionan campañas"
  on public.campaigns for insert with check (public.is_admin());

-- ============ IMPACT_REPORTS ============

drop policy if exists "Reportes verificados son públicos" on public.impact_reports;
create policy "Reportes verificados son públicos"
  on public.impact_reports for select
  using (verified_by is not null or public.is_admin());

drop policy if exists "Solo admins crean reportes" on public.impact_reports;
create policy "Solo admins crean reportes"
  on public.impact_reports for insert with check (public.is_admin());

-- ============ POSTS (0002_social.sql) ============

drop policy if exists "Posts publicados son públicos" on public.posts;
create policy "Posts publicados son públicos"
  on public.posts for select
  using (status = 'published' or public.is_admin());

drop policy if exists "Solo admins crean posts institucionales" on public.posts;
create policy "Solo admins crean posts institucionales"
  on public.posts for insert
  with check (
    public.is_admin()
    and author_type in ('shelter', 'partner', 'system')
    and (
      author_type <> 'shelter'
      or exists (select 1 from public.shelters s where s.id = shelter_id and s.status = 'verified')
    )
  );

drop policy if exists "Solo admins actualizan posts" on public.posts;
create policy "Solo admins actualizan posts"
  on public.posts for update using (public.is_admin());

-- ============ FOLLOWS (0002_social.sql) ============

drop policy if exists "Los usuarios ven sus propios follows" on public.follows;
create policy "Los usuarios ven sus propios follows"
  on public.follows for select
  using (auth.uid() = follower_id or public.is_admin());

-- ============ REPORTS (0002_social.sql) ============

drop policy if exists "Los usuarios ven sus propios reports" on public.reports;
create policy "Los usuarios ven sus propios reports"
  on public.reports for select
  using (auth.uid() = reporter_id or public.is_admin());

drop policy if exists "Solo admins actualizan reports" on public.reports;
create policy "Solo admins actualizan reports"
  on public.reports for update using (public.is_admin());
