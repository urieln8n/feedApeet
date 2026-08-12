# DECISIONS REQUIRED — FeedAPet
**Fecha:** 2026-08-10
**Para:** Andrés y Annie
**Estado:** PENDIENTE DE APROBACIÓN

> Ninguna de estas decisiones ha sido tomada por Claude Code. Ninguna implementación comenzará hasta que estén resueltas las marcadas como BLOQUEO TOTAL. Las decisiones están ordenadas por prioridad — las primeras bloquean todo lo demás.

---

## ACTUALIZACIÓN — DECISIONES APROBADAS (2026-08-10)

> Este bloque resume las decisiones que Andrés y Annie tomaron tras revisar `NUEVA_VISION_FEEDAPET_v2.md`. Sustituye, para el Modelo B, muchas de las preguntas originales de este documento (que estaban diseñadas para el modelo de ROI diario). Las preguntas originales se conservan íntegras más abajo por trazabilidad — se marcan como "NO APLICA (modelo cambiado)" donde corresponde.

| Decisión | Resolución aprobada |
|---|---|
| Mercado inicial | España |
| Modelo económico | Modelo B — Comunidad + Partners + Sponsors. Membresía pospuesta, no forma parte del MVP |
| Validación previa a construir | Sí — 30 usuarios, 10 partners, 5 refugios, 3 sponsors (ver `ROADMAP_VALIDACION.md`) |
| Lotería | Sin dinero, sin vínculo a retiros. Si se construye en el futuro: solo gamificación con premios de partner, y requiere validación legal previa |
| Gobernanza del fondo de impacto (fase 1) | Equipo fundador + transparencia pública + reporting de impacto. Evolución a gobernanza comunitaria queda abierta para una fase posterior, sin fecha definida |
| Blockchain en el MVP | No. Arquitectura del backend debe registrar donaciones/campañas de forma estructurada y auditable para facilitar una futura migración a on-chain, sin construir el smart contract ahora |
| Consulta legal | Se realizará antes de aceptar dinero real (donaciones, patrocinios o cualquier mecanismo que lo requiera) |
| Captación de partners y sponsors (fase inicial) | La lideran los fundadores directamente |
| Impact Score | Aprobado conceptualmente como pieza central: multi-variable (donaciones, apadrinamientos, compras, ahorro, participación, constancia, acciones verificables), no depende solo de dinero, desbloquea niveles (Cachorro → Protector → Guardián → Héroe → Embajador) y beneficios no financieros |

**Pendiente crítico sin resolver en esta ronda:** la financiación del período de arranque (18-36 meses estimados hasta break-even hipotético) — corresponde a la pregunta original D-00-01/D-00-02 de nivel de negocio, no fue abordada explícitamente por Andrés y Annie todavía. Se marca como bloqueo abierto.

---

## NIVEL 0 — BLOQUEO TOTAL DEL PROYECTO
*Estas decisiones deben resolverse antes de cualquier reunión técnica o de diseño.*

---

### D-00-01 — ¿De dónde viene el rendimiento?
**Refs:** GAP-BIZ-01, GAP-ECO-01
**Pregunta:** El ROI prometido (1.5%-2.0% diario = ~547-730% APY) es económicamente imposible de pagar de forma sostenible a menos que exista una fuente de rendimiento real. ¿Cuál es esa fuente?

**Opciones:**
- A) El rendimiento viene de [actividad específica: staking, DeFi, fees, patrocinadores] — describir exactamente con números.
- B) El ROI se reduce a un nivel sostenible (¿cuál?).
- C) El modelo cambia: no hay ROI, solo impacto social y gamificación.
- D) Otra fuente que no está documentada — describir.

**Implicación:** Si no hay respuesta a esta pregunta, FeedAPet tiene la estructura matemática de un esquema Ponzi, independientemente de la intención. No es posible construir el smart contract hasta tener esta respuesta.

**Decisión de Andrés:** _______________
**Decisión de Annie:** _______________
**Fecha de decisión:** _______________

---

### D-00-02 — ¿Han consultado con un abogado especializado en cripto-finanzas?
**Refs:** GAP-BIZ-02, GAP-REG-01, GAP-REG-02, GAP-REG-03
**Pregunta:** FeedAPet combina tres elementos con regulación compleja en la mayoría de países:
1. Promesa de rendimiento financiero diario (posible security).
2. Lotería con tickets (juego de azar).
3. Sistema de referidos de dos niveles (posible MLM).

¿Han obtenido una opinión legal escrita antes de continuar?

**Opciones:**
- A) Sí, tenemos opinión legal escrita. Adjuntar resumen.
- B) No, lo haremos antes de Devnet.
- C) No, lo haremos antes de Mainnet.
- D) Queremos rediseñar el producto para evitar estas categorías regulatorias.

**Nota:** Claude Code no puede determinar la legalidad de este producto. Esta pregunta es un requisito, no una recomendación.

**Decisión de Andrés:** _______________
**Decisión de Annie:** _______________
**Fecha de decisión:** _______________

---

## NIVEL 1 — BLOQUEO DEL MODELO ECONÓMICO
*Sin estas decisiones, el smart contract no puede diseñarse correctamente.*

---

### D-01-01 — Distribución exacta de fondos (el 100%)
**Ref:** GAP-ECO-02
**Pregunta:** El documento actual asigna 94% + 5% + 1% = 100%, y también 3% L1 + 1% L2 = 4% de referidos. ¿De dónde salen los referidos?

**Opciones:**
- A) Los referidos salen del pool: pool real = 90%, ajustar spec.
- B) Los referidos son un bonus adicional que el protocolo paga aparte (¿de dónde?).
- C) Los referidos solo se pagan en el momento del retiro del referido, no en el depósito.
- D) Otro esquema — describir.

**Tabla a completar (debe sumar 100% de cada depósito):**

| Destino | Porcentaje |
|---------|------------|
| Pool principal | ___% |
| CEO/Marketing | ___% |
| Fundación | ___% |
| Referido L1 | ___% |
| Referido L2 | ___% |
| Lotería/Tickets | ___% |
| Otros | ___% |
| **TOTAL** | **100%** |

**Decisión de Andrés:** _______________
**Decisión de Annie:** _______________
**Fecha de decisión:** _______________

---

### D-01-02 — ¿Qué pasa si el pool no puede pagar un retiro?
**Ref:** GAP-ECO-04
**Pregunta:** Si la liquidez del pool es insuficiente para cubrir un retiro, ¿cuál es el comportamiento exacto del sistema?

**Opciones:**
- A) El retiro se encola y se procesa cuando haya liquidez (FIFO).
- B) Se procesa un retiro parcial proporcional.
- C) Se activa automáticamente una pausa de emergencia.
- D) El usuario espera indefinidamente (inaceptable — descartar).
- E) Hay un fondo de reserva separado que cubre la diferencia — especificar origen y tamaño.

**Decisión de Andrés:** _______________
**Decisión de Annie:** _______________
**Fecha de decisión:** _______________

---

### D-01-03 — Fórmula exacta del umbral de liquidez
**Ref:** GAP-ECO-05
**Pregunta:** "Si la liquidez cae por debajo del 50%..." — ¿50% de qué exactamente?

**Opciones:**
- A) 50% del total depositado en ciclos activos en ese momento.
- B) 50% del total histórico depositado (nunca sube una vez baja).
- C) 50% del máximo histórico del pool.
- D) Otra fórmula — definir exactamente.

**Decisión de Andrés:** _______________
**Decisión de Annie:** _______________
**Fecha de decisión:** _______________

---

### D-01-04 — Mecánica completa de la Lotería Paws
**Ref:** GAP-ECO-03
**Pregunta:** Definir completamente:

| Parámetro | Respuesta |
|-----------|-----------|
| ¿Cómo se obtiene un ticket? | ___ |
| ¿Cuánto cuesta un ticket (en SOL)? | ___ |
| ¿Frecuencia de la lotería? | ___ |
| ¿Tamaño del premio? | ___ |
| ¿Quién recibe el % restante del fondo de lotería? | ___ |
| ¿Qué pasa si nadie tiene ticket en un ciclo? | ___ |
| ¿Es obligatorio tener ticket para retirar? ¿Por qué? | ___ |
| ¿Cómo se selecciona el ganador de forma verificable? | ___ |

**Decisión de Andrés:** _______________
**Decisión de Annie:** _______________
**Fecha de decisión:** _______________

---

### D-01-05 — ¿El ROI es garantizado, objetivo o variable?
**Ref:** GAP-BIZ-01, GAP-ECO-01
**Pregunta:** El documento indica "ROI base 1.5-2.0% diario". ¿Qué significa exactamente?

**Opciones:**
- A) **Garantizado:** el protocolo siempre paga este % (implica colateral o reserva).
- B) **Objetivo:** el protocolo intenta pagar este %, pero puede variar sin garantía.
- C) **Variable con floor:** hay un mínimo garantizado y un máximo según condiciones.
- D) **Solo cuando hay liquidez:** si el pool no alcanza, no se paga y no hay garantía.

**Nota:** Esta decisión es crítica para comunicar honestamente el riesgo a los usuarios y para el diseño del smart contract.

**Decisión de Andrés:** _______________
**Decisión de Annie:** _______________
**Fecha de decisión:** _______________

---

## NIVEL 2 — BLOQUEO DEL SMART CONTRACT
*Sin estas decisiones, no se puede escribir el contrato.*

---

### D-02-01 — Control de administración: ¿multisig o single key?
**Ref:** GAP-SC-07
**Pregunta:** ¿Quién controla las funciones administrativas del contrato (triggerEventBoost, pausar, cambiar parámetros)?

**Opciones:**
- A) Una sola wallet de los fundadores (simple, riesgoso).
- B) Multisig 2-de-3 con Squads Protocol (recomendado para seguridad).
- C) Multisig 3-de-5 para mayor decentralización.
- D) DAO on-chain desde el inicio (complejo, recomendado solo en v2+).

**Si eligen multisig:**
- ¿Quiénes son los firmantes (nombres/roles)?
- ¿Hay timelock para cambios de parámetros económicos? ¿Cuántas horas?

**Decisión de Andrés:** _______________
**Decisión de Annie:** _______________
**Fecha de decisión:** _______________

---

### D-02-02 — ¿El programa de Solana es upgradeable o immutable?
**Ref:** GAP-SC-06
**Pregunta:** Esta decisión determina si se pueden corregir bugs después del deploy.

**Opciones:**
- A) **Upgradeable:** el equipo puede actualizar el código (flexibilidad, requiere confianza en el equipo).
- B) **Upgradeable con timelock:** las actualizaciones tienen un delay de N días para que usuarios puedan salir.
- C) **Immutable:** el código nunca cambia (mayor confianza, requiere auditoría perfecta primero).

**Decisión de Andrés:** _______________
**Decisión de Annie:** _______________
**Fecha de decisión:** _______________

---

### D-02-03 — Validación del video testimonial para lotería
**Ref:** GAP-SC-08
**Pregunta:** ¿Cómo autoriza un video off-chain el cobro de un premio on-chain?

**Opciones:**
- A) Un admin firma la aprobación (centralizado, puede ser arbitrario o abusado).
- B) Multisig firma la aprobación (más seguro pero más lento).
- C) Se elimina el requisito de video — el premio es automático al ganar.
- D) Otro mecanismo — definir.

**Decisión de Andrés:** _______________
**Decisión de Annie:** _______________
**Fecha de decisión:** _______________

---

### D-02-04 — ¿Qué pasa con el boost de eventos?
**Ref:** GAP-ECO-06
**Pregunta:** Definir completamente triggerEventBoost():

| Parámetro | Respuesta |
|-----------|-----------|
| ¿Quién puede activarlo? | ___ |
| ¿Cuántas veces por ciclo máximo? | ___ |
| ¿Cuánto tiempo dura? | ___ |
| ¿Boost máximo? | ___% |
| ¿Puede superponerse con otro boost activo? | ___ |
| ¿De dónde sale el rendimiento adicional del boost? | ___ |

**Decisión de Andrés:** _______________
**Decisión de Annie:** _______________
**Fecha de decisión:** _______________

---

## NIVEL 3 — BLOQUEO DE ARQUITECTURA Y UX

---

### D-03-01 — Stack tecnológico
**Ref:** GAP-ARCH-01
**Estado:** ✅ RESUELTA (2026-08-10) — aprobado por Andrés y Annie tras revisión de arquitectura técnica del MVP

| Capa | Decisión |
|------|----------|
| Framework | Next.js (App Router) + TypeScript, frontend y backend ligero unificados (Server Actions) |
| UI | Tailwind CSS + shadcn/ui |
| Base de datos / Auth / Storage | Supabase (Postgres + Auth con magic link + Storage + Row Level Security) |
| Hosting de la app | Vercel |
| DNS / CDN / anti-bot | Cloudflare — únicamente DNS, proxy/CDN delante de Vercel, y Turnstile en formularios públicos (no hosting, no storage) |
| Gestor de paquetes | npm |
| Control de versiones | Git/GitHub |
| Smart Contract / Solana / Rust / Anchor | **NO en el MVP.** Arquitectura preparada para incorporarlo después (capa `lib/domain` desacoplada + datos estructurados para poder anclarse on-chain) — ver diseño de arquitectura del 2026-08-10 |

**Decisión de Andrés:** Aprobado — Next.js/TS/Tailwind/shadcn/Supabase/Vercel/Cloudflare(DNS+CDN+Turnstile)/npm. Sin blockchain en MVP.
**Fecha de decisión:** 2026-08-10

---

### D-03-02 — Verificación y onboarding de refugios
**Ref:** GAP-ARCH-03
**Pregunta:** ¿Cómo se verifica que un refugio es legítimo antes de recibir fondos?

**Opciones:**
- A) Verificación manual por el equipo FeedAPet (centralizado, escalable inicialmente).
- B) Proceso de aplicación con documentación oficial (más robusto).
- C) Listado curado desde el inicio — el equipo selecciona los primeros refugios aliados.
- D) Refugios se verifican on-chain con votación de usuarios.

**¿Hay rendición de cuentas?** (fotos, videos, reportes de los refugios sobre uso de fondos) — ¿quién los valida?

**Decisión de Andrés:** _______________
**Decisión de Annie:** _______________
**Fecha de decisión:** _______________

---

### D-03-03 — Política de múltiples wallets (Sybil)
**Ref:** GAP-SEC-01
**Pregunta:** El MAX_DEPOSIT de 1.0 SOL es por wallet, no por persona. ¿Se acepta o se quiere prevenir?

**Opciones:**
- A) Se acepta: el límite es técnico, no de equidad. Los usuarios pueden tener múltiples wallets.
- B) Se quiere prevenir: implementar algún mecanismo (KYC, proof-of-personhood).
- C) Se acepta para el MVP pero se añade restricción en v2.

**Decisión de Andrés:** _______________
**Decisión de Annie:** _______________
**Fecha de decisión:** _______________

---

### D-03-04 — ¿Hay validación de mercado antes de construir?
**Ref:** GAP-BIZ-03
**Pregunta:** ¿Se quiere validar demanda real antes de invertir en desarrollo?

**Opciones:**
- A) Sí — lanzar landing page + waitlist primero.
- B) No — tenemos suficiente validación cualitativa para continuar.
- C) Ya hemos hablado con usuarios potenciales — adjuntar resumen de feedback.

**Decisión de Andrés:** _______________
**Decisión de Annie:** _______________
**Fecha de decisión:** _______________

---

## NIVEL 4 — DECISIONES DE SEGURIDAD OPERACIONAL

---

### D-04-01 — Pausa de emergencia
**Ref:** GAP-SC-05
**Pregunta:** ¿Cómo funciona la pausa de emergencia?

| Parámetro | Respuesta |
|-----------|-----------|
| ¿Quién puede pausar? | ___ |
| ¿Qué funciones se bloquean durante la pausa? | ___ |
| ¿Los retiros siguen disponibles durante pausa? | ___ |
| ¿Hay límite de tiempo máximo para una pausa? | ___ |
| ¿Quién puede despausar? | ___ |

**Decisión de Andrés:** _______________
**Decisión de Annie:** _______________
**Fecha de decisión:** _______________

---

### D-04-02 — Transparencia de wallets del equipo
**Ref:** GAP-SEC-04
**Pregunta:** Las wallets CEO_Marketing y FeedAPet_Foundation son controladas por el equipo. ¿Se harán públicas estas direcciones para que los usuarios puedan verificar los flujos on-chain?

**Opciones:**
- A) Sí — publicar todas las wallets del protocolo en el frontend y documentación.
- B) No — mantener privadas (reduce confianza de usuarios sofisticados).
- C) Sí, pero solo la dirección de la fundación. La de marketing es privada.

**Decisión de Andrés:** _______________
**Decisión de Annie:** _______________
**Fecha de decisión:** _______________

---

## CHECKLIST DE ESTADO

| # | Decisión | Nivel | Estado |
|---|----------|-------|--------|
| D-00-01 | Fuente del rendimiento | BLOQUEO TOTAL | ✅ Resuelta — Opción C: no hay ROI, solo impacto social y comunidad (Modelo B) |
| D-00-02 | Consulta legal | BLOQUEO TOTAL | ☐ Pendiente de ejecutar — aprobado que se hará antes de aceptar dinero real |
| D-01-01 | Distribución exacta de fondos | BLOQUEO ECONÓMICO | ⚠️ No aplica como estaba — reemplazada por la distribución de comisiones del Modelo B, ver `MODELO_ECONOMICO_B.md` |
| D-01-02 | Insolvencia del pool | BLOQUEO ECONÓMICO | ⚠️ No aplica — no existe pool de capital de usuarios en el Modelo B |
| D-01-03 | Fórmula umbral de liquidez | BLOQUEO ECONÓMICO | ⚠️ No aplica — sin pool no hay umbral de liquidez |
| D-01-04 | Mecánica lotería Paws | BLOQUEO ECONÓMICO | ⚠️ Redefinida — sin dinero, sin vínculo a retiro (DN-04). Mecánica completa sin diseñar si se retoma |
| D-01-05 | ROI garantizado vs variable | BLOQUEO ECONÓMICO | ⚠️ No aplica — no hay ROI en el Modelo B |
| D-02-01 | Control de administración | BLOQUEO SC | ⏸️ Aparcada — no hay Smart Contract en desarrollo |
| D-02-02 | Upgradeable vs immutable | BLOQUEO SC | ⏸️ Aparcada — no hay Smart Contract en desarrollo |
| D-02-03 | Validación video testimonial | BLOQUEO SC | ⏸️ Aparcada — no aplica sin lotería financiera |
| D-02-04 | Parámetros del boost | BLOQUEO SC | ⏸️ Aparcada — el boost de ROI no existe en el Modelo B |
| D-03-01 | Stack tecnológico | BLOQUEO ARQUITECTURA | ✅ Resuelta (2026-08-10) — Next.js/TS/Tailwind/shadcn/Supabase/Vercel/Cloudflare/npm, sin blockchain en MVP |
| D-03-02 | Verificación de refugios | BLOQUEO ARQUITECTURA | ☐ Pendiente — prioritaria, condiciona los 5 refugios de la fase de validación |
| D-03-03 | Política de múltiples wallets | BLOQUEO ARQUITECTURA | ⚠️ No aplica — no hay wallets ni depósitos en el MVP |
| D-03-04 | Validación de mercado | BLOQUEO ARQUITECTURA | ✅ Resuelta — Opción A: sí, se valida antes de construir (DN-03) |
| D-04-01 | Pausa de emergencia | SEGURIDAD | ⏸️ Aparcada — no aplica sin Smart Contract activo |
| D-04-02 | Transparencia de wallets | SEGURIDAD | ⏸️ Aparcada — el principio de transparencia se mantiene vía reporting público (DN-05), no vía wallets on-chain todavía |
| **NUEVO** | Financiación del período de arranque | BLOQUEO TOTAL | ☐ **PENDIENTE — no abordada en la ronda de decisiones del 2026-08-10** |
| **NUEVO** | Mecanismo técnico de atribución de comisiones | BLOQUEO ARQUITECTURA | ☐ Pendiente — condiciona el MVP técnico (GAP-NEW-02) |
| **NUEVO** | Fórmula y antifraude del Impact Score | BLOQUEO PRODUCTO | ☐ Pendiente — concepto aprobado, pesos y verificación sin definir |

---

*Documento generado el 2026-08-10 — Claude Code*
*Actualizado el 2026-08-10 tras aprobación del Modelo B por Andrés y Annie.*
*NINGUNA implementación de Smart Contract comenzará hasta nueva decisión explícita. El MVP del Modelo B puede avanzar sobre las decisiones ya resueltas, sujeto a cerrar la financiación del arranque y el mecanismo de atribución de comisiones.*
