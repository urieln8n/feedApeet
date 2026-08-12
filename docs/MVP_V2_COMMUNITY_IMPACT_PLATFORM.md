# FeedAPet MVP v2 — Community & Impact Platform
**Fecha:** 2026-08-12
**Estado:** APROBADO por Andrés y Annie (2026-08-12) — alcance de features, arquitectura (D), esquema de datos (E) y decisiones de F/K quedan aprobados como diseño. **Ningún código de producto ha sido escrito.** Por instrucción explícita de Andrés: no se añaden más funcionalidades sociales ni sobrearquitectura sobre este alcance — la sección L es un techo, no un punto de partida para seguir sumando. Ver sección N para el siguiente paso.
**Encargo:** incorporar una capa social/comunitaria como elemento central del producto, sin romper ninguna decisión ya aprobada.
**Basado en:** `NUEVA_VISION_FEEDAPET_v2.md`, `DECISIONS_REQUIRED.md`, `GAP_ANALYSIS.md`, `MODELO_ECONOMICO_B.md`, `ROADMAP_VALIDACION.md`, `PARTNER_FUNDADOR.md`, `MVP_SCOPE.md`, `FeedAPet_Master_Spec_Claude_Code_v1.md`, el esquema real `supabase/migrations/0001_init.sql`, y el código ya construido en `src/`.

> Todas las cifras y ejemplos de este documento son hipótesis o ilustraciones, no datos validados. Cuando una pregunta no tiene respuesta aprobada, se marca explícitamente como **DECISIÓN PENDIENTE**. No se inventa ninguna decisión no tomada por Andrés y Annie.

---

## 0. Advertencia de contexto — antes de leer el resto

Este documento diseña **alcance nuevo** en un momento en que la decisión vigente (reconfirmada el 2026-08-11) es: *"priorizar ejecutar `ROADMAP_VALIDACION.md` antes de cualquier desarrollo nuevo"*. Esta propuesta no viola esa decisión — es análisis y diseño, exactamente el mismo tipo de trabajo que ya produjo `NUEVA_VISION_FEEDAPET_v2.md` o `MVP_SCOPE.md` antes de que existiera aprobación para construir. Pero sí hay una tensión real que quiero dejar visible en vez de ocultarla:

**RESUELTO 2026-08-12 (0.1):** Andrés y Annie aprobaron la opción (a) — se añadió la pregunta V-08 al guion de las 30 entrevistas de usuario en `ROADMAP_VALIDACION.md`, sin abrir un ciclo de validación aparte ni retrasar el calendario ya planeado.

Con eso dicho, el resto del documento asume que la capa social se diseña ahora y se valida junto con — no después de — el resto del modelo.

---

## A. AUDITORÍA — qué se mantiene sin cambios

Nada de lo siguiente se toca:

| Elemento | Estado |
|---|---|
| Modelo económico B (comisiones partners + patrocinios; sin membresía en MVP) | Se mantiene tal cual |
| Sin ROI, sin staking, sin depósitos, sin wallets, sin capital activo | Se mantiene tal cual |
| Sin blockchain/Smart Contract en el MVP; Anchor/Solana como línea técnica futura (no Solidity/EVM) | Se mantiene tal cual |
| Gobernanza del fondo de impacto: equipo fundador + transparencia pública (fase 1) | Se mantiene tal cual |
| Impact Score: multivariable, no depende solo de dinero, niveles Cachorro→Protector→Guardián→Héroe→Embajador, beneficios no financieros | Se mantiene tal cual — ver sección F para cómo convive con lo social |
| Frase de esencia: *"No queremos que la gente venga a FeedAPet para ganar dinero..."* | Es el principio rector de todo este documento |
| Mercado inicial España, captación de partners liderada por fundadores, verificación legal antes de dinero real | Se mantiene tal cual |
| Stack técnico aprobado (Next.js/TS/Tailwind/shadcn/Supabase/Vercel/Cloudflare, sin blockchain) | Se mantiene tal cual — ver sección D |
| Código ya construido: App Shell, Dashboard con `ImpactFlow`, Marketplace (`/partners` + ficha), Admin CRUD, esquema Supabase (`profiles`, `shelters`, `cases`, `partners`, `offers`, `donations`, `campaigns`, `impact_reports`, `impact_score_events`) | Se mantiene y se **extiende**, no se rehace |
| Rutas públicas `/refugios`, `/muro`, `/partners` y privadas `(app)/dashboard`, `(app)/perfil` | Se mantiene la estructura; `/muro` (hoy placeholder) es donde aterriza el Feed — ver sección D |

---

## B. CAMBIOS — qué se modifica para convertir FeedAPet en plataforma social de impacto

1. **`/muro` deja de ser un placeholder genérico y se convierte en el Feed.** Ya existe como ruta pública (`src/app/(public)/muro/page.tsx`); es la ubicación natural en vez de crear una ruta nueva.
2. **El Dashboard/`ImpactFlow` gana un botón "compartir al muro".** Hoy es 100% privado ("Has comprado X → has generado Y de impacto"). Se mantiene privado por defecto; el usuario decide si ese logro se publica como post en el feed. No se cambia su lógica interna, solo se le añade una acción de publicación opcional.
3. **`shelters` y `partners` ganan la capacidad de publicar.** Ya son entidades con perfil (ficha `/partners/[slug]`, y refugios verificados). Se les añade un canal de publicación (posts) sobre esa misma identidad — no se crean perfiles nuevos separados.
4. **La navegación del App Shell (`nav-config.ts`) incorpora el Feed como entrada principal**, junto a Dashboard, Marketplace, Perfil.
5. **El Marketplace no desaparece ni se disuelve dentro del feed — se conecta con él.** Ver recomendación en sección H.
6. **La página pública `/` (home) puede mostrar un extracto del feed** como gancho para visitantes no registrados, reforzando el bucle "impacto visible atrae más comunidad" ya descrito en `NUEVA_VISION_FEEDAPET_v2.md`.

---

## C. NUEVAS FUNCIONALIDADES — clasificación

### MVP

| Funcionalidad | Por qué entra ahora |
|---|---|
| Feed principal (cronológico/curado, no algorítmico) | Es el encargo central; técnicamente barato si se alimenta de datos que ya existen (`cases`, `campaigns`, `impact_reports`) |
| Posts de tipo: caso de refugio, campaña patrocinada, logro de comunidad (agregado), impacto de compra compartido por el usuario | Reutilizan datos que el esquema actual ya captura; no requieren UGC libre |
| Héroes del Mes (curado editorial por el equipo, no votación) | Ya estaba en el Master Spec original como concepto válido; una versión editorial simple es barata y de bajo riesgo de moderación |
| Reacciones (un solo tipo, ej. "me importa") | Señal de engagement barata, bajo riesgo de abuso, alimenta el Impact Score como participación (con peso bajo, ver sección F) |
| Compartir | Es el paso explícito del bucle pedido ("compartir → atraer más comunidad"); técnicamente es solo un link |
| Seguir refugios y partners (no usuarios) | Personaliza el feed sin construir un grafo social persona-a-persona |
| Categorías del feed reutilizando `categories` (ya existe en el esquema) | Evita construir un sistema de hashtags libres nuevo |
| Reporte de contenido (botón "reportar" + cola de revisión admin) | Obligatorio desde el día 1 en cuanto hay cualquier contenido público, aunque sea curado |
| Perfil de usuario extendido con badge de nivel e historial de impacto (sin posts propios libres) | Extiende el perfil ya construido en `(app)/perfil`, no lo rehace |

### Fase 2

| Funcionalidad | Por qué se pospone |
|---|---|
| Posts libres de usuario (fotos de mascota, texto libre) | Multiplica la superficie de moderación antes de tener equipo/proceso para sostenerla; no es necesaria para demostrar el círculo de valor |
| Comentarios | **Confirmado 2026-08-12.** Mismo motivo — moderación en tiempo real es cara con equipo de 2 personas |
| Guardar publicaciones | Nice-to-have, no bloquea el bucle central |
| Notificaciones | Útil pero no crítico para validar si el modelo funciona |
| Contenido educativo sobre animales | Barato de producir pero no es diferencial; se añade cuando haya ancho de banda editorial |
| Apadrinamientos y voluntariado como tipo de post | El dato del Impact Score ya los contempla conceptualmente, pero como contenido publicable necesitan flujo de verificación propio, aún no diseñado (ver GAP-NEW-12 en `GAP_ANALYSIS.md`) |
| Contenido co-creado por partners (posts propios de marca) | Requiere proceso de certificación de partners (GAP-NEW-06), todavía sin definir |

### Futuro (sin fecha)

| Funcionalidad | Nota |
|---|---|
| Badges/insignias como NFT | Ya estaba marcado como futuro por la decisión de blockchain del 2026-08-11 — no cambia |
| Gobernanza comunitaria del fondo de impacto (votación) | Ya marcado futuro en `DECISIONS_REQUIRED.md` (DN-05) — no cambia |
| Eventos/maratones con feed en tiempo real | Sin caso de uso claro todavía |
| Integración profunda de compra dentro del feed (checkout in-feed) | Evaluar solo si el marketplace actual demuestra tracción |

### No recomendado

| Funcionalidad | Por qué |
|---|---|
| Mensajería privada usuario-usuario (DMs) | No aporta al propósito (impacto animal); alto riesgo de abuso/spam; convierte FeedAPet en mensajería genérica |
| Stories efímeras (tipo Instagram/TikTok) | Complejidad técnica alta, sin relación clara con el diferencial de FeedAPet |
| Feed algorítmico personalizado tipo "For You" | Optimiza por enganche, no por propósito — contradice directamente la frase de esencia del proyecto ("no venir a ganar/consumir") |
| Rachas/streaks de tipo red social adictiva | Mismo motivo — mecánica de retención manipuladora, reintroduce por la puerta trasera el problema que motivó abandonar el modelo de ROI |
| Hashtags libres de usuario | Fragmenta sin curación a la escala inicial de FeedAPet; `categories` ya cubre la necesidad de forma controlada |
| Seguir a otros usuarios (grafo social persona-a-persona) | **Confirmado 2026-08-12.** Solo se sigue a refugios y partners en el MVP. Revisitar en Fase 2 solo si los datos de validación lo piden explícitamente |

---

## D. ARQUITECTURA ACTUALIZADA

### Frontend

- Se mantiene Next.js App Router + TypeScript. Sin cambios de stack.
- `src/app/(public)/muro/page.tsx` pasa de placeholder a Feed real.
- Nuevos componentes en `src/components/feature/feed/` (mismo patrón que `feature/partner-card.tsx`, `feature/case-mini-card.tsx` ya existentes): `post-card.tsx`, `feed-list.tsx`, `reaction-button.tsx`, `share-button.tsx`, `follow-button.tsx`.
- `src/components/app-shell/nav-config.ts` gana la entrada "Muro"/"Comunidad" (naming a decidir con Annie).

### Backend / dominio

- Se mantiene Supabase (Postgres + Auth + Storage + RLS), Server Actions, Vercel, Cloudflare. Sin cambios.
- Ya existe `src/lib/domain/` como capa desacoplada (`impact-fund.ts`, `impact-summary.ts`, con sus tests) — es precisamente la capa que `DECISIONS_REQUIRED.md` (D-03-01) previó para poder incorporar blockchain después sin rediseñar. Se propone seguir el mismo patrón: `src/lib/domain/social/` con la lógica de feed, reacciones y follows, separada de los Server Actions y de Supabase directamente — mantiene la arquitectura preparada para una futura capa de transparencia on-chain (posts/reacciones podrían anclarse a un registro verificable el día que tenga sentido, sin tocar esta capa de dominio).
- `src/lib/fixtures/` gana fixtures de feed para desarrollo sin proyecto Supabase real conectado (sigue sin haber uno, ver estado del proyecto).

### Punto de extensión para blockchain futuro (sección 10 del encargo)

No se construye nada ahora. Se deja preparado así:
- Los eventos que algún día podrían anclarse on-chain (donaciones, distribución de fondos de campaña, reportes de impacto verificados) ya están estructurados como filas auditable en Postgres desde la migración `0001_init.sql` (`donations`, `campaigns`, `impact_reports`), no como texto libre.
- Los posts del feed que documentan esos eventos referencian su fila origen (`case_id`, `campaign_id`, `shelter_id`) en vez de duplicar el dato — si en el futuro esa fila origen se ancla on-chain, el post no necesita rediseñarse.
- No se añade ningún campo de wallet, hash de transacción ni dependencia de librería blockchain en este MVP.

---

## E. BASE DE DATOS — qué se añade y por qué

Principio aplicado: **no se crea ninguna tabla que pueda resolverse reutilizando lo que ya existe.**

### Tablas nuevas (justificadas una por una)

**`posts`**
Necesaria porque el feed necesita una unidad de contenido única que pueda representar tipos heterogéneos (caso de refugio, campaña, logro agregado, impacto compartido por un usuario, Héroe del Mes) ordenados en una sola línea de tiempo. Campos conceptuales: autor (`author_type`: user/shelter/partner/system, `author_id`), `post_type`, referencia opcional a la entidad origen (`case_id`/`campaign_id`/`shelter_id`), `category_id` (reutiliza `categories`, no hashtags nuevos), título, cuerpo, medios (array, no tabla separada — ver nota abajo), estado (`draft`/`published`/`hidden`), timestamps.
*Nota de simplificación:* no se crea una tabla `post_media` separada en el MVP — un array de URLs en el propio post es suficiente a esta escala. Se revisita si la moderación necesita granularidad por imagen individual.

**`reactions`**
Necesaria para la señal de engagement pedida explícitamente (reacciones) y porque alimenta el Impact Score como participación. Campos: `post_id`, `user_id`, `reaction_type` (un solo tipo en MVP), único por (`user_id`, `post_id`) para evitar spam de reacciones repetidas.

**`follows`**
Necesaria para personalizar el feed sin construir un grafo social completo. Campos: `follower_id`, `target_type` (`shelter`/`partner` en MVP — diseñado como polimórfico para poder añadir `user` en Fase 2 sin migración de esquema), `target_id`.

**`reports`**
Necesaria desde el día 1 en cuanto existe cualquier contenido público, aunque sea curado (un refugio podría subir una foto inapropiada por error; un partner podría publicar algo fuera de tono). Es una tabla pequeña y barata de añadir ahora, y cara de retrofit una vez exista una cola de moderación real. Campos: `target_type`, `target_id`, `reporter_id`, `reason`, `status` (`pending`/`reviewed`/`actioned`), `reviewed_by`.

### Lo que NO se añade (y se reutiliza en su lugar)

| Tabla que el encargo sugería estudiar | Decisión | Por qué |
|---|---|---|
| `comments` | No en MVP | Movida a Fase 2 — ver sección C |
| `saves` | No en MVP | Movida a Fase 2 |
| `notifications` | No en MVP | Movida a Fase 2 |
| `post_media` | No en MVP | Un array en `posts` es suficiente a esta escala; revisitar si se necesita moderación por imagen |
| `hashtags`/`categories` nuevas | No — se reutiliza `categories`, ya existente en `0001_init.sql` | Ya cubre la necesidad de clasificación sin construir un sistema nuevo |
| `social_events` | No — se reutiliza `impact_score_events`, ya existente | Ya tiene exactamente la forma necesaria (`event_type`, `points`, `source_table`, `source_id`); crear una tabla paralela duplicaría lógica |

### Separación de capas (pedida explícitamente en el encargo)

- **social/community:** `posts`, `reactions`, `follows`, `reports`
- **business/partners:** `partners`, `offers`, `partner_links`, `purchase_attributions` (sin cambios)
- **impact/shelters:** `shelters`, `cases`, `donations`, `campaigns`, `campaign_shelters`, `impact_reports` (sin cambios)
- **auth/users:** `profiles` (sin cambios; el "perfil social" es una vista sobre `profiles` + sus posts/reactions/follows, no una tabla nueva de identidad)

---

## F. IMPACT SCORE — cómo convive con lo social (sin definir fórmula todavía, como se pidió)

Principios propuestos, no pesos ni fórmula:

1. **Dos ejes conceptuales separados, no uno solo:** contribución económica/verificable (compras, donaciones, apadrinamientos, acciones validadas por refugio) y participación comunitaria (reacciones, shares, seguir refugios, constancia de visitas). El eje económico debe seguir siendo el peso dominante — es lo que ya se aprobó conceptualmente — y el eje de participación social debe actuar como *modificador*, no como vía paralela de conseguir el mismo nivel.
2. **Techo de contribución social por periodo** (sin definir el número): evita que alguien "farmee" reacciones o shares para escalar de nivel sin contribuir realmente. La constancia (volver semana tras semana) debería pesar más que el volumen de acciones sociales en un solo día.
3. **Héroe del Mes no debería ser solo "quien más gastó".** Con datos de participación social disponibles, el reconocimiento editorial puede combinar señales (constancia, ayuda verificada, participación) — pero esto sigue siendo curación editorial del equipo en el MVP, no un ranking automático.
4. **RESUELTO 2026-08-12 (F.1):** las reacciones y shares sí suman al Impact Score, pero con techo bajo por periodo (evita farmeo) y como modificador menor — el eje económico/verificable sigue dominando el score. El número exacto del techo y los pesos siguen sin definir (GAP-NEW-11, sin cambios), solo se aprobó el principio.

No se propone ninguna fórmula ni tabla de pesos — sigue pendiente (GAP-NEW-11 en `GAP_ANALYSIS.md`), tal como se pidió explícitamente no cerrar en este documento.

---

## G. NIVELES EN LA EXPERIENCIA SOCIAL

Cachorro → Protector → Guardián → Héroe → Embajador se mantienen conceptualmente sin cambios. Cómo aparecen:

- Badge visible en el perfil de usuario (extiende el perfil ya construido, no lo rehace).
- El badge puede mostrarse junto al nombre del autor cuando un usuario comparte su impacto en el feed (refuerza reconocimiento sin ser el foco).
- "Héroe del Mes" como sección destacada del feed, curada por el equipo — reutiliza el nivel más alto como narrativa, no como automatismo.
- Niveles más altos podrían desbloquear beneficios ya aprobados (descuentos de partner, acceso anticipado a campañas) — sin cambios respecto a lo ya decidido.
- Explícitamente fuera, sin excepción: ROI, intereses, dinero por reaccionar/compartir, cualquier lenguaje que sugiera rentabilidad.

---

## H. MARKETPLACE — posición respecto al Feed

**Recomendación: ambas cosas, con el Feed como punto de entrada narrativo y el Marketplace (`/partners`, ya construido) como catálogo completo.**

- Los posts de tipo campaña/oferta destacada en el feed enlazan a la ficha de partner ya existente (`/partners/[slug]`) — no se duplica la lógica de catálogo dentro del feed.
- El feed nunca se comporta como escaparate de productos suelto; siempre aparece en el contexto de una historia o campaña ("Partner X financia la alimentación de 50 perros este mes" → enlaza a su ficha).
- `/partners` se mantiene como sección independiente para el usuario que ya sabe que busca ahorrar en algo concreto (búsqueda + filtros, ya funcionando).
- Esto respeta el flujo pedido explícitamente: *Comunidad → necesidad → recomendación → partner → ahorro → impacto*, sin que FeedAPet se sienta como tienda.

---

## I. PRIVACIDAD Y SEGURIDAD

Extiende el patrón de RLS ya usado en todo `0001_init.sql` (cada tabla nueva sigue el mismo estilo de políticas por rol):

- `posts`: lectura pública solo si `status = 'published'`; escritura restringida por `author_type` (en MVP, solo `shelter`/`partner` verificados y `system`; posts de usuario quedan fuera hasta Fase 2, ver sección C).
- `reactions`/`follows`: el usuario solo puede crear/borrar las suyas propias (mismo patrón que `donations`, `partner_links`).
- `reports`: cualquier usuario autenticado puede crear; solo admins pueden leer/actualizar (mismo patrón que `purchase_attributions`).
- **Rate limiting:** único constraint por (`user_id`, `post_id`) en `reactions` ya previene el abuso más obvio sin necesitar infraestructura adicional; revisar si se necesita throttling a nivel de Server Action para `follows`/`reports` si aparece abuso real.
- **Subida de medios:** Supabase Storage con URLs firmadas, igual que se recomienda para `impact_reports`; sin cambios de proveedor.
- **Verificación de refugios se vuelve más crítica**, no menos: ya era un gap abierto (GAP-ARCH-03); ahora que los refugios publican directamente en un feed público, solo `shelters.status = 'verified'` debería poder publicar — la columna ya existe, solo falta el proceso operativo de verificación (sigue sin definir, mismo gap de siempre).

---

## J. NUEVO FLUJO DE USUARIO

```
Registro
   ↓
Onboarding ligero (Team Perro/Gato/Ambos — ya existe)
   ↓
Feed (antes /muro placeholder, ahora home de la experiencia logueada)
   ↓
Interactúa: reacciona / comparte / sigue un refugio o partner
   ↓
Descubre un partner — vía un post de campaña en el feed, o vía /partners directamente
   ↓
Compra / ahorra con el partner (mecanismo de atribución ya existente: código de descuento)
   ↓
Se registra el impacto generado (reutiliza purchase_attributions + impact_score_events, sin cambios)
   ↓
El usuario lo ve en su ImpactFlow privado (ya construido)
   ↓
Opcionalmente lo comparte al feed
   ↓
La comunidad ve el resultado → refuerza confianza → atrae más comunidad (visitantes no registrados ven un extracto del feed en la home pública)
```

---

## K. RIESGOS NUEVOS

| Riesgo | Mitigación propuesta en este diseño |
|---|---|
| Moderación de contenido | En MVP solo publican refugios verificados, partners y el sistema — no usuarios libres. Reduce drásticamente la superficie desde el día 1 |
| Contenido falso / fraude de impacto | Reutiliza el patrón ya existente de `impact_reports.verified_by`; un post que afirma impacto debe enlazar a una fila verificada, no a texto libre |
| Spam | Constraint único en `reactions`; posts limitados a autores curados en MVP |
| Privacidad de datos personales | Ningún dato personal de terceros en posts; medios vía Storage con URLs firmadas |
| Abuso de promociones (códigos de descuento más visibles al estar en un feed público) | **RESUELTO 2026-08-12 (K.1):** el código de descuento solo se muestra tras hacer clic y autenticarse, nunca directo en el post del feed — reduce el riesgo de que se comparta fuera de FeedAPet |
| Manipulación del Impact Score vía reacciones/shares fabricadas | Techo por periodo (sección F) + peso bajo frente al eje económico; sin definir el número exacto todavía |
| Verificación de refugios | Se vuelve más urgente (gap ya existente, GAP-ARCH-03) — solo refugios `verified` publican |
| Contenido generado por usuarios | Diferido a Fase 2 explícitamente; cuando se active, necesitará su propio diseño de moderación (cola de revisión, no solo reportes) |

---

## L. PROPUESTA FINAL — "FeedAPet MVP v2 — Community & Impact Platform"

**Aprobado por Andrés y Annie el 2026-08-12.** Esta lista es un techo de alcance, no un punto de partida para seguir sumando — instrucción explícita: no añadir más funcionalidades sociales ni sobrearquitectura en esta fase. Cualquier función que no esté en esta lista se trata como Fase 2/Futuro/No recomendado según las tablas de la sección C, y requiere una nueva ronda de aprobación explícita para entrar al alcance de MVP.

**Alcance a construir primero, una vez termine la fase de validación (ver sección N):**

1. Feed público/logueado en `/muro` (reutilizando la ruta ya existente), con posts de tipo caso-refugio, campaña, logro-de-comunidad e impacto-compartido-por-usuario — sin posts libres ni comentarios.
2. Reacciones (un tipo), compartir, seguir refugios y partners.
3. Héroes del Mes curado editorialmente.
4. Reporte de contenido + cola de revisión admin (reutiliza el patrón admin ya construido).
5. 4 tablas nuevas: `posts`, `reactions`, `follows`, `reports` — todo lo demás se reutiliza del esquema existente.
6. Marketplace se mantiene como está, conectado al feed por enlace, no fusionado.
7. Impact Score sigue sin fórmula definitiva; se añaden solo los principios de convivencia con lo social (sección F), no pesos.
8. Nada de blockchain, ROI, membresía, staking ni wallets — sin cambios respecto a lo ya decidido.

**Explícitamente fuera de este primer alcance:** posts libres de usuario, comentarios, mensajería privada, notificaciones, guardar, hashtags libres, feed algorítmico, seguir usuarios entre sí.

---

## M. DECISIONES — resueltas el 2026-08-12

| # | Pregunta | Resolución | Dónde se explica |
|---|---|---|---|
| 0.1 | ¿Se añaden preguntas sobre el feed al guion de validación antes de construir? | Sí — pregunta V-08 añadida a `ROADMAP_VALIDACION.md`, sin retrasar el calendario | Sección 0 |
| C (comentarios) | ¿Comentarios en MVP o Fase 2? | Fase 2 — confirmado | Sección C |
| C (seguir usuarios) | ¿Seguir usuarios entre sí en MVP? | No recomendado, fuera por ahora — confirmado | Sección C |
| F.1 | ¿Reacciones/shares suman al Impact Score? | Sí, con techo bajo por periodo; eje económico sigue dominando | Sección F |
| K.1 | ¿Código de descuento visible directo en el feed? | No — solo tras clic + autenticación | Sección K |

No quedan decisiones abiertas de este documento. Lo único que sigue sin definir son gaps ya identificados antes de este documento y que no se cierran aquí (fórmula/pesos exactos del Impact Score — GAP-NEW-11; mecanismo técnico de atribución de comisiones — GAP-NEW-02; proceso operativo de verificación de refugios — GAP-ARCH-03; financiación del período de arranque — GAP-NEW-07). Ninguno de estos bloquea el diseño ya aprobado en este documento, pero sí condicionan cuándo tiene sentido empezar a programar (ver sección N).

---

## N. SIGUIENTE PASO ANTES DE PROGRAMAR

Este documento aprueba **diseño y alcance**, no autoriza empezar a escribir código de producto. Antes de programar la capa social:

1. **Ejecutar `ROADMAP_VALIDACION.md`** (incluida ya la pregunta V-08 sobre el feed) — sigue siendo la decisión vigente desde el 2026-08-11: ningún desarrollo de producto nuevo empieza hasta tener resultados reales de esa fase. Este documento no cambia esa prioridad, solo asegura que cuando la validación ocurra, también valide la capa social.
2. **Proteger el trabajo ya construido.** El código de Fase 1 (App Shell, Dashboard, Marketplace, Admin, esquema Supabase) sigue sin ningún commit de git — es trabajo real ya hecho, sin historial. Esto es independiente de la capa social y no requiere esperar a la validación: es housekeeping sobre lo que ya existe.
3. **Financiación del período de arranque (GAP-NEW-07) sigue sin resolver** — no se cierra con este documento, sigue siendo un bloqueo crítico de negocio en paralelo.

Cuando la fase de validación (con V-08 incluida) dé señales reales, este documento pasa de "diseño aprobado" a "listo para implementar" sin necesitar una nueva ronda de revisión de arquitectura — solo confirmar que las señales de la entrevista no contradicen lo aquí decidido.

---

*Documento generado el 2026-08-10 — Claude Code. Actualizado el 2026-08-12 con las decisiones aprobadas por Andrés y Annie.*
*Diseño y alcance aprobados. Ningún código de producto ha sido escrito. Ninguna tabla ha sido creada en Supabase.*
