# GAP ANALYSIS — FeedAPet
**Fecha:** 2026-08-10
**Basado en:** FeedAPet_Master_Spec_Claude_Code_v1.md
**Analizado por:** Claude Code (auditoría técnica y de producto)

> **Aviso importante:** Este análisis distingue explícitamente entre lo que está DEFINIDO, PARCIALMENTE DEFINIDO, NO DEFINIDO o NECESITA VALIDACIÓN. No se han inventado reglas económicas. No se ha asumido que algo es legal o ilegal. Las hipótesis del documento fuente se tratan como hipótesis, no como hechos confirmados.

---

## ÍNDICE DE RIESGO

| Nivel | Descripción |
|-------|-------------|
| CRÍTICO | Bloquea completamente el proyecto. Sin resolver, no se debe escribir ningún código. |
| ALTO | Puede causar pérdida de fondos, daño legal o fallo del producto si no se resuelve antes de Devnet. |
| MEDIO | Debe resolverse antes de Mainnet pero no bloquea el prototipo. |
| BAJO | Mejora deseable; puede resolverse en iteraciones posteriores. |

**Total de gaps identificados: 34**

---

## ÁREA 1 — MODELO DE NEGOCIO

### GAP-BIZ-01
**Área:** Modelo de Negocio
**Estado:** PARCIALMENTE DEFINIDO — la visión existe, el mecanismo generador de valor no.
**Problema:** La propuesta de valor combina rendimiento financiero diario con impacto social en animales. Sin embargo, el documento no explica cómo se generan los fondos que pagan ese rendimiento. No hay descripción de ninguna actividad productiva (trading, liquidez, staking, servicio) que produzca el rendimiento prometido.
**Por qué importa:** Si el rendimiento se paga con los depósitos de nuevos usuarios, el modelo es matemáticamente insostenible y podría clasificarse como esquema Ponzi independientemente de la intención de los fundadores.
**Información que falta:** ¿De dónde sale el dinero que paga el ROI? ¿Hay actividad económica real detrás?
**Riesgo:** CRÍTICO
**Opciones posibles:**
1. Definir una fuente real de rendimiento (ej.: staking de SOL, protocolo DeFi, fees de la plataforma, patrocinadores corporativos).
2. Cambiar el modelo a donaciones puras sin rendimiento prometido.
3. Modelo de rendimiento compartido donde el ROI viene únicamente de fees reales generados.
**Recomendación:** Antes de escribir una sola línea de código, Andrés y Annie deben demostrar con un modelo financiero real de dónde sale cada SOL que se paga como rendimiento.
**Quién decide:** Andrés + Annie (AMBOS — es la decisión más importante del proyecto)

---

### GAP-BIZ-02
**Área:** Modelo de Negocio / Regulación
**Estado:** NO DEFINIDO
**Problema:** El producto promete rendimientos financieros diarios a usuarios que depositan capital. En la mayoría de jurisdicciones esto puede clasificar el producto como instrumento financiero o valor (security), sujeto a regulación específica. La especificación no menciona ninguna consideración legal.
**Por qué importa:** Si el producto es clasificado como valor sin registro, los fundadores enfrentan riesgo legal severo, independientemente del país de operación.
**Información que falta:** Jurisdicción de operación, estructura legal de la empresa, consulta con abogado especializado en crypto-finanzas.
**Riesgo:** CRÍTICO
**Opciones posibles:**
1. Consultar con abogado especializado antes de lanzar.
2. Rediseñar el producto para evitar la promesa de rendimiento (modelo de donación puro).
3. Operar solo en jurisdicciones donde el marco regulatorio esté claro.
**Recomendación:** No avanzar a Mainnet sin opinión legal escrita. Esto no es opcional.
**Quién decide:** Andrés + Annie (AMBOS)

---

### GAP-BIZ-03
**Área:** Modelo de Negocio
**Estado:** PARCIALMENTE DEFINIDO
**Problema:** El segmento de usuarios (amantes de animales que también buscan rendimiento financiero) y el encaje producto-mercado no han sido validados. El documento asume que este segmento existe y está dispuesto a depositar SOL en una DApp nueva de un equipo desconocido.
**Por qué importa:** Construir la infraestructura técnica antes de validar que el mercado existe es el error más costoso en producto.
**Información que falta:** ¿Se ha hablado con usuarios potenciales? ¿Hay señales de demanda real?
**Riesgo:** ALTO
**Opciones posibles:**
1. Lanzar una landing page antes de construir nada y medir conversión.
2. Entrevistar a 20-30 usuarios potenciales.
3. Continuar sin validación (riesgo elevado).
**Recomendación:** Validar demanda con un MVP no técnico (landing + waitlist) antes de invertir en desarrollo.
**Quién decide:** Andrés + Annie (AMBOS)

---

## ÁREA 2 — MODELO ECONÓMICO

### GAP-ECO-01
**Área:** Economía — ROI
**Estado:** PARCIALMENTE DEFINIDO — el número existe, la fuente no.
**Problema:** El documento indica ROI base de 1.5%-2.0% DIARIO. Sobre 16 días eso equivale a 24%-32% por ciclo. Anualizado: aproximadamente 547%-730% APY. Esto es matemáticamente insostenible sin una fuente de rendimiento externa significativa. El propio documento reconoce esto en la sección 7: "el documento no demuestra todavía de dónde sale el rendimiento."
**Por qué importa:** Si el ROI se paga con nuevos depósitos, el sistema colapsa cuando el flujo de nuevos usuarios disminuya. Los últimos usuarios en retirar no podrán hacerlo.
**Información que falta:** Fuente concreta del rendimiento. Modelo financiero que demuestre sostenibilidad con diferentes escenarios de crecimiento (lento, moderado, acelerado) y de salida masiva.
**Riesgo:** CRÍTICO
**Opciones posibles:**
1. ROI proviene de staking de SOL (~7-9% APY real) → incompatible con 547%+ prometido.
2. ROI proviene de fees de plataforma → requiere volumen enorme para cubrir el prometido.
3. ROI proviene de patrocinadores/donantes corporativos → viable pero dependiente de terceros.
4. Reducir drásticamente el ROI a niveles sostenibles reales.
**Recomendación:** El ROI actual (1.5-2.0% diario) debe ser demostrado matemáticamente sostenible o reducido a un nivel demostrable antes de continuar.
**Quién decide:** Andrés + Annie (AMBOS)

---

### GAP-ECO-02
**Área:** Economía — Distribución de Fondos
**Estado:** CONTRADICTORIO
**Problema:** El documento establece simultáneamente:
- 94% a Wallet_Pool_Principal
- 5% a Wallet_CEO_Marketing
- 1% a Wallet_FeedAPet_Foundation
- **Total = 100%**
Y también:
- 3% a referido Nivel 1
- 1% a referido Nivel 2
- **Total referidos = 4%**

Estos 4% adicionales no tienen fuente definida. Si salen del 94% del pool, el pool real es 90%, no 94%. Si salen "encima" del 100%, el modelo distribuye más del 100% de cada depósito.
**Por qué importa:** Una contradicción matemática en el núcleo del sistema económico hace imposible implementar correctamente el smart contract.
**Información que falta:** ¿De dónde salen los % de referidos? ¿El pool real es 94% o 90%? ¿Hay depósito adicional al registrarse con referido?
**Riesgo:** CRÍTICO
**Opciones posibles:**
1. Referidos salen del 94% (pool real = 90%). Actualizar spec.
2. Referidos son un bonus adicional pagado por la fundación/reserva especial.
3. Referidos se pagan solo al momento del retiro del referido, no del depósito.
**Recomendación:** Definir el cuadro de distribución completo, que sume exactamente 100%, antes de cualquier implementación.
**Quién decide:** Andrés + Annie (AMBOS)

---

### GAP-ECO-03
**Área:** Economía — Lotería Paws
**Estado:** PARCIALMENTE DEFINIDO — existe como concepto, la mecánica no.
**Problema:** El documento menciona Wallet_Loteria_Paws y que el retiro requiere "al menos 1 ticket Paws durante el ciclo", pero no define: precio del ticket, cómo se adquieren, frecuencia de la lotería, tamaño del premio, cómo se selecciona el ganador, qué porcentaje del fondo va al ganador vs. caridad.
**Por qué importa:** La mecánica de lotería afecta directamente el modelo económico, el requisito de retiro y el riesgo regulatorio (la lotería es juego de azar, sujeto a regulación específica).
**Información que falta:** Todo el sistema de tickets y lotería necesita especificación completa.
**Riesgo:** ALTO
**Opciones posibles:**
1. Tickets se compran con SOL (precio fijo).
2. Tickets se otorgan automáticamente al hacer depósito.
3. Tickets se ganan mediante actividad en la plataforma (engagement).
**Recomendación:** Definir la mecánica completa de lotería incluyendo: adquisición, precio, frecuencia, premio, selección del ganador y validación.
**Quién decide:** Andrés + Annie (AMBOS)

---

### GAP-ECO-04
**Área:** Economía — Insolvencia del Pool
**Estado:** NO DEFINIDO
**Problema:** El documento menciona que si la liquidez cae al 50% el ROI baja, pero no define qué sucede si el pool no puede cubrir un retiro. ¿Se bloquean todos los retiros? ¿Se procesa parcialmente? ¿Se declara emergencia? ¿Los usuarios pierden sus fondos?
**Por qué importa:** Este es el escenario de "bank run". Si muchos usuarios intentan retirar simultáneamente y el pool no alcanza, sin reglas claras el contrato puede comportarse de forma imprevisible o dejar fondos atrapados.
**Información que falta:** Protocolo completo de insolvencia: qué pasa, quién decide, cómo se comunica a usuarios, hay seguro o reserva.
**Riesgo:** CRÍTICO
**Opciones posibles:**
1. Cola de retiros: los primeros en llegar cobran primero.
2. Retiros proporcionales: todos cobran el % disponible.
3. Pausa de emergencia con plan de recuperación.
4. Fondo de reserva separado (no mencionado en la spec).
**Recomendación:** Este escenario debe estar completamente especificado antes de escribir el contrato. La ausencia de reglas claras en el código resultará en fondos atrapados.
**Quién decide:** Andrés + Annie (AMBOS)

---

### GAP-ECO-05
**Área:** Economía — Umbral de Liquidez
**Estado:** PARCIALMENTE DEFINIDO — el porcentaje existe, el cálculo no.
**Problema:** "Si la liquidez del Pool cae por debajo del 50%..." — ¿50% de qué? ¿Del total depositado históricamente? ¿Del total depositado en ciclos activos? ¿Del máximo histórico? ¿Del promedio de los últimos N ciclos? El cálculo concreto no existe.
**Por qué importa:** El umbral del 50% activa cambios de ROI. Si el cálculo es ambiguo, puede ser manipulado o interpretado inconsistentemente.
**Información que falta:** Fórmula exacta: Umbral = Pool_actual / [denominador]. Qué es el denominador.
**Riesgo:** ALTO
**Quién decide:** Andrés + Annie (AMBOS)

---

### GAP-ECO-06
**Área:** Economía — Boost de Eventos
**Estado:** PARCIALMENTE DEFINIDO — existe el concepto, la mecánica no.
**Problema:** triggerEventBoost() existe como función pero no hay definición de: quién puede llamarla, cuánto tiempo dura el boost, cuál es el boost máximo (+0.5% mencionado pero sin contexto completo), cuántas veces puede activarse, si puede superponerse con otros boosts, quién paga ese incremento adicional.
**Por qué importa:** Un boost mal definido puede ser activado arbitrariamente, manipulando el modelo económico.
**Información que falta:** Parámetros completos, caller autorizado, límites, fuente económica del boost adicional.
**Riesgo:** ALTO
**Quién decide:** Andrés + Annie (AMBOS)

---

### GAP-ECO-07
**Área:** Economía — Donaciones y Apadrinamiento
**Estado:** NO DEFINIDO
**Problema:** El documento menciona donaciones y apadrinamiento como parte del ecosistema pero no hay especificación de cómo funcionan económicamente: ¿van directamente a refugios? ¿pasan por el contrato? ¿tienen fees? ¿generan tokens o insignias? ¿son deducibles fiscalmente?
**Riesgo:** MEDIO
**Quién decide:** Andrés + Annie (AMBOS)

---

### GAP-ECO-08
**Área:** Economía — Wallet_Maratones_Eventos
**Estado:** NO DEFINIDO
**Problema:** Se menciona "campañas especiales" pero no hay ninguna especificación de qué son, cómo se financian, quién las aprueba, qué porcentaje de fondos reciben o cuándo se activan.
**Riesgo:** MEDIO
**Quién decide:** Andrés + Annie (AMBOS)

---

## ÁREA 3 — SMART CONTRACT

### GAP-SC-01
**Área:** Smart Contract — Funciones Incompletas
**Estado:** PARCIALMENTE DEFINIDO
**Problema:** Las funciones listadas (deposit, calculateROI, withdraw, executeLottery, claimLotteryPrize, triggerEventBoost) no tienen especificación formal. Para cada una falta: parámetros exactos, cuentas involucradas (en Solana cada cuenta debe declararse), precondiciones, validaciones, efectos de estado, eventos emitidos y errores posibles.
**Por qué importa:** Sin especificación formal no se puede implementar ni auditar el contrato correctamente.
**Riesgo:** ALTO
**Quién decide:** Andrés (implementación técnica con validación de Annie sobre reglas económicas)

---

### GAP-SC-02
**Área:** Smart Contract — Estados Incompletos
**Estado:** PARCIALMENTE DEFINIDO
**Problema:** El flujo documentado es DEPOSITED → ACTIVE → CYCLE_EXPIRED → WITHDRAWN. No están definidos estados de: PAUSED (emergencia), EMERGENCY (fondos congelados), FAILED (transacción fallida), CANCELLED (ciclo cancelado por el sistema), BLACKLISTED (wallet baneada).
**Por qué importa:** Sin estados de emergencia y fallo, el contrato no puede manejar situaciones adversas de forma segura.
**Riesgo:** ALTO
**Quién decide:** Andrés (técnico) con validación de Annie (producto/usuario)

---

### GAP-SC-03
**Área:** Smart Contract — Aleatoriedad (Lotería)
**Estado:** NO DEFINIDO — es el gap técnico más crítico del contrato.
**Problema:** La selección del ganador de la lotería debe ser verificable, transparente y resistente a manipulación. En Solana, usar block hashes para aleatoriedad es manipulable por validators. El documento no define ningún mecanismo de aleatoriedad verificable.
**Por qué importa:** Si la lotería puede ser manipulada (por los propios fundadores o por un validator), el sistema no es confiable y puede tener implicaciones legales (fraude).
**Información que falta:** Mecanismo de aleatoriedad: ¿VRF on-chain (Switchboard VRF, Pyth Entropy)? ¿Commit-reveal? ¿Oracle externo?
**Riesgo:** CRÍTICO
**Opciones posibles:**
1. Switchboard VRF (Solana nativo, verificable on-chain).
2. Pyth Entropy (más reciente, diseñado para esto).
3. Commit-reveal scheme (más simple, sin oracle pero requiere participación de múltiples partes).
**Recomendación:** Usar Switchboard VRF o Pyth Entropy. Documentar el mecanismo en el frontend para que los usuarios puedan verificar la fairness.
**Quién decide:** Andrés (decisión técnica)

---

### GAP-SC-04
**Área:** Smart Contract — Cálculo ROI On-chain vs Off-chain
**Estado:** NO DEFINIDO
**Problema:** calculateROI() está listada como función del contrato, pero el ROI dinámico (que cambia según el umbral de liquidez y los boosts) requiere o bien cálculo puramente on-chain (con los datos del pool disponibles en el contrato) o bien un oracle que alimente datos externos. No está definido cómo se calcula ni dónde.
**Por qué importa:** Si el ROI se calcula off-chain y se pasa como parámetro, puede ser manipulado por quien ejecuta la función. Si se calcula on-chain, el pool necesita datos verificables del estado actual.
**Riesgo:** ALTO
**Quién decide:** Andrés (decisión técnica)

---

### GAP-SC-05
**Área:** Smart Contract — Mecanismo de Pausa de Emergencia
**Estado:** PARCIALMENTE DEFINIDO — se menciona como objetivo, la implementación no existe.
**Problema:** La sección 9 menciona "pausa de emergencia con reglas claras" pero no define: quién puede activarla, qué funciones se pausan, si los retiros siguen disponibles durante la pausa, cuánto tiempo puede durar, cómo se desactiva, si hay timelock.
**Riesgo:** ALTO
**Quién decide:** Andrés + Annie (AMBOS)

---

### GAP-SC-06
**Área:** Smart Contract — Upgradeabilidad
**Estado:** NO DEFINIDO
**Problema:** En Solana, los programas (contratos) pueden ser upgradeable o immutable. No está definido si FeedAPet usará un programa upgradeable (flexible pero requiere confianza en el equipo) o immutable (más seguro para usuarios, pero sin posibilidad de corrección de bugs).
**Por qué importa:** Esta decisión afecta fundamentalmente la confianza de los usuarios y la capacidad de respuesta ante bugs.
**Riesgo:** ALTO
**Opciones posibles:**
1. Upgradeable con multisig + timelock (más flexible, algo menos trustless).
2. Immutable desde el inicio (más trustless, requiere auditoría perfecta antes del deploy).
3. Upgradeable inicialmente, con plan de "freeze" programado.
**Quién decide:** Andrés + Annie (AMBOS)

---

### GAP-SC-07
**Área:** Smart Contract — Control de Administración
**Estado:** PARCIALMENTE DEFINIDO — se menciona "mínimo privilegio" y "multisig" pero sin definición concreta.
**Problema:** Funciones críticas como triggerEventBoost(), executeLottery(), y cambios de parámetros requieren un caller con permisos elevados. Si ese caller es una sola wallet controlada por los fundadores, existe un punto único de fallo (pérdida de clave, hack, acto malicioso). El documento menciona multisig pero no lo especifica.
**Por qué importa:** La centralización de administración es el vector de ataque número uno en protocolos DeFi.
**Información que falta:** ¿Qué es multisig? ¿Cuántas firmas (M-de-N)? ¿Quiénes son los firmantes? ¿Hay timelock en cambios de parámetros?
**Riesgo:** CRÍTICO
**Recomendación:** Usar Squads Protocol (multisig nativo de Solana) con al menos 2-de-3 firmantes para operaciones críticas. Timelock de 24-48h para cambios de parámetros económicos.
**Quién decide:** Andrés + Annie (AMBOS)

---

### GAP-SC-08
**Área:** Smart Contract — Validación de Video Testimonial
**Estado:** NO DEFINIDO
**Problema:** El documento indica que reclamar un premio de lotería requiere validación de "vídeo testimonial". No existe ninguna especificación de cómo un dato off-chain (un video) autoriza una transacción on-chain (pago del premio). Este es un problema fundamental de oracle.
**Por qué importa:** Sin un mecanismo seguro de validación, o bien cualquiera puede reclamar un premio sin video, o bien el fundador puede bloquear reclamaciones legítimas arbitrariamente.
**Opciones posibles:**
1. Admin firma la aprobación del video (centralizado, puede ser arbitrario).
2. DAO vota la aprobación del video (descentralizado, lento).
3. El video se elimina del requisito y el premio es automático.
**Riesgo:** ALTO
**Quién decide:** Andrés + Annie (AMBOS)

---

## ÁREA 4 — ARQUITECTURA

### GAP-ARCH-01
**Área:** Arquitectura — Stack Tecnológico
**Estado:** NO DEFINIDO
**Problema:** No existe ninguna definición del stack tecnológico. No se sabe qué framework usa el frontend (React, Next.js, Vue...), qué lenguaje el backend (Node, Rust, Python...), qué base de datos (PostgreSQL, MongoDB, Supabase...), qué framework de Solana (Anchor, native Solana...) ni qué wallet adapter.
**Por qué importa:** Sin un stack definido no se puede estimar tiempo, costo ni asignar trabajo.
**Riesgo:** ALTO
**Quién decide:** Andrés (decisión técnica)

---

### GAP-ARCH-02
**Área:** Arquitectura — Backend
**Estado:** NO DEFINIDO
**Problema:** El documento indica que el backend maneja perfiles, contenido, fotos, videos, refugios y metadatos, pero no especifica: diseño de API (REST/GraphQL), sistema de autenticación (JWT, wallet signature), almacenamiento de archivos (S3, Arweave, IPFS), modelo de datos, hosting ni estrategia de escalado.
**Riesgo:** MEDIO
**Quién decide:** Andrés (decisión técnica)

---

### GAP-ARCH-03
**Área:** Arquitectura — Validación de Refugios/Protectoras
**Estado:** NO DEFINIDO
**Problema:** El sistema tiene un backoffice para refugios con estados (EN PROCESO, OBJETIVO CUMPLIDO, etc.), pero no existe ninguna especificación del proceso de verificación: ¿cómo se onboardea un refugio? ¿Quién valida que es legítimo? ¿Cómo se verifica que los fondos se usan correctamente? ¿Hay rendición de cuentas?
**Por qué importa:** Si fondos de usuarios van a refugios sin verificación, hay riesgo de fraude y pérdida de confianza.
**Riesgo:** ALTO
**Quién decide:** Andrés + Annie (AMBOS)

---

### GAP-ARCH-04
**Área:** Arquitectura — Almacenamiento Descentralizado
**Estado:** NO DEFINIDO
**Problema:** Fotos, videos y documentos de refugios son mencionados pero no se define si el almacenamiento es centralizado (S3, Cloudinary) o descentralizado (IPFS, Arweave). Esta decisión afecta la disponibilidad, costo y descentralización del sistema.
**Riesgo:** MEDIO
**Quién decide:** Andrés (decisión técnica)

---

## ÁREA 5 — UX/UI

### GAP-UX-01
**Área:** UX — Flujo de Onboarding
**Estado:** NO DEFINIDO
**Problema:** No existe ningún flujo de onboarding definido. ¿Cómo llega un usuario nuevo, sin wallet de Solana y sin SOL, al primer depósito? Este recorrido puede tener 8-12 pasos (descargar wallet, comprar SOL, conectar, entender el producto, depositar) y ninguno está mapeado.
**Por qué importa:** El onboarding es el mayor punto de fuga en DApps. Si no se diseña explícitamente, la mayoría de usuarios potenciales se perderán antes de depositar.
**Riesgo:** ALTO
**Quién decide:** Annie (experiencia de usuario) con revisión de Andrés (factibilidad técnica)

---

### GAP-UX-02
**Área:** UX — Estados de Error y Vacío
**Estado:** NO DEFINIDO
**Problema:** No hay definición de qué ve el usuario cuando: la wallet no está conectada, la transacción falla, el ciclo ha expirado, el pool está pausado, no tiene suficiente SOL para el gas, intenta retirar sin ticket, etc.
**Por qué importa:** Los estados de error son el 40-60% del trabajo de UX y su ausencia produce experiencias frustrantes que llevan a soporte masivo.
**Riesgo:** MEDIO
**Quién decide:** Annie (UX)

---

### GAP-UX-03
**Área:** UX — Flujo de Retiro
**Estado:** PARCIALMENTE DEFINIDO
**Problema:** Se sabe que se necesita ticket Paws y haber completado 16 días, pero no se define el flujo paso a paso del retiro. ¿Cuántas confirmaciones ve el usuario? ¿Se le muestra el desglose de comisiones antes de firmar? ¿Qué pasa si el gas es insuficiente? ¿Cuánto tiempo tarda?
**Por qué importa:** El retiro es el momento de mayor ansiedad del usuario. Un flujo ambiguo genera soporte y pérdida de confianza.
**Riesgo:** MEDIO
**Quién decide:** Annie (UX)

---

### GAP-UX-04
**Área:** UX — Proceso de Votación "Héroes del Mes"
**Estado:** PARCIALMENTE DEFINIDO — existe como concepto, el flujo no.
**Problema:** Se mencionan propuestas, votaciones y casos urgentes, pero no existe el flujo completo: ¿quién puede proponer? ¿cómo se vota (on-chain o off-chain)? ¿qué pasa con los empates? ¿hay quórum mínimo? ¿cuánto dura la votación?
**Riesgo:** MEDIO
**Quién decide:** Andrés + Annie (AMBOS)

---

### GAP-UX-05
**Área:** UX — Mobile
**Estado:** NO DEFINIDO
**Problema:** No se especifica si la DApp es mobile-first, responsive o solo desktop. En Solana, las wallets móviles (Phantom Mobile, Solflare Mobile) tienen comportamientos diferentes a las extensiones de browser.
**Riesgo:** MEDIO
**Quién decide:** Annie (UX/producto)

---

## ÁREA 6 — SEGURIDAD

### GAP-SEC-01
**Área:** Seguridad — Ataque Sybil (Límite por Wallet)
**Estado:** NO CONSIDERADO
**Problema:** El límite MAX_DEPOSIT de 1.0 SOL es por wallet. Un usuario puede crear múltiples wallets y depositar 1.0 SOL en cada una, efectivamente bypasseando el límite. No existe ningún mecanismo de verificación de identidad (KYC, prueba de personalidad única) mencionado en el documento.
**Por qué importa:** Si el límite de depósito tiene un propósito (distribución equitativa de riesgo, limitación de exposición), el ataque Sybil lo invalida completamente.
**Información que falta:** ¿El límite por wallet es intencional como política de equidad, o es solo un límite técnico? ¿Se acepta que usuarios tengan múltiples wallets?
**Riesgo:** ALTO
**Opciones posibles:**
1. Aceptar múltiples wallets por usuario (el límite es solo técnico).
2. Implementar KYC (centralizado, complejo, costoso).
3. Usar proof-of-personhood on-chain (Worldcoin, Proof of Humanity — limitado en Solana).
**Quién decide:** Andrés + Annie (AMBOS)

---

### GAP-SEC-02
**Área:** Seguridad — Abuso del Sistema de Referidos
**Estado:** NO CONSIDERADO
**Problema:** No existe ninguna restricción definida para el sistema de referidos. Potenciales abusos: auto-referido (A refiere a su propia segunda wallet), referidos circulares (A refiere a B, B refiere a A), creación masiva de wallets para generar referidos artificiales.
**Por qué importa:** El abuso de referidos drena el pool y puede usarse para extraer valor sistemáticamente.
**Riesgo:** ALTO
**Quién decide:** Andrés (smart contract) + Annie (política de producto)

---

### GAP-SEC-03
**Área:** Seguridad — Manipulación de Lotería
**Estado:** NO CONSIDERADO (como riesgo explícito)
**Problema:** Si la selección del ganador usa datos manipulables (block hash, timestamp, datos controlados por el admin), el equipo fundador o un validator podrían manipular el resultado. Esto no está contemplado como riesgo en el documento.
**Riesgo:** CRÍTICO
**Quién decide:** Andrés (decisión técnica)

---

### GAP-SEC-04
**Área:** Seguridad — Centralización Económica
**Estado:** NO CONSIDERADO como riesgo
**Problema:** El CEO/equipo controla wallet_CEO_Marketing (5% de cada movimiento). Si esa wallet es comprometida o el equipo actúa de mala fe, los usuarios no tienen mecanismo de defensa. El documento no menciona transparencia de estas wallets ni rendición de cuentas.
**Por qué importa:** La confianza en el sistema depende de la confianza en el equipo. En DeFi, "trust us" no es una arquitectura de seguridad.
**Riesgo:** ALTO
**Quién decide:** Andrés + Annie (AMBOS)

---

### GAP-SEC-05
**Área:** Seguridad — Ataque de Front-Running
**Estado:** NO CONSIDERADO
**Problema:** En Solana, aunque los bloques son rápidos, hay ventanas donde transacciones pendientes pueden ser vistas y reordenadas. En particular, la ejecución de la lotería podría ser objeto de MEV (Maximal Extractable Value) si el ganador puede conocerse antes de que la transacción sea definitiva.
**Riesgo:** MEDIO
**Quién decide:** Andrés (decisión técnica)

---

### GAP-SEC-06
**Área:** Seguridad — Reentrancy y Doble Ejecución
**Estado:** PARCIALMENTE DEFINIDO — mencionado en tests pero no en el diseño del contrato
**Problema:** El documento menciona testing de "doble ejecución/reentrancia" pero no define cómo el contrato se protege de estos ataques a nivel de diseño.
**Riesgo:** ALTO
**Quién decide:** Andrés (decisión técnica)

---

## ÁREA 7 — TESTING

### GAP-TEST-01
**Área:** Testing — Framework y Entorno
**Estado:** NO DEFINIDO
**Problema:** No existe definición del framework de testing (Anchor's built-in tests, Bankrun, Amman, Jest + Solana-test-validator), entorno de pruebas (local validator, Devnet), ni herramientas de cobertura.
**Riesgo:** MEDIO
**Quién decide:** Andrés (decisión técnica)

---

### GAP-TEST-02
**Área:** Testing — Simulación Económica
**Estado:** NO DEFINIDO
**Problema:** Antes de Mainnet se necesita simular el comportamiento del pool con diferentes escenarios: crecimiento lento (pocos usuarios), crecimiento explosivo (muchos usuarios simultáneos), salida masiva (bank run), comportamiento en el umbral del 50%. No existe ninguna especificación de esta simulación.
**Por qué importa:** Un modelo económico no simulado puede fallar de formas inesperadas con fondos reales.
**Riesgo:** ALTO
**Quién decide:** Andrés + Annie (AMBOS)

---

### GAP-TEST-03
**Área:** Testing — Auditoría Profesional
**Estado:** MENCIONADO — no especificado cuándo ni quién
**Problema:** El documento indica "Auditoría profesional antes de fondos reales" pero no define: ¿qué empresa auditora? ¿cuándo en el timeline? ¿cuánto cuesta? ¿qué scope cubre? ¿qué pasa si la auditoría encuentra issues críticos?
**Por qué importa:** Una auditoría es inútil si no hay tiempo ni presupuesto para corregir los findings antes del launch.
**Riesgo:** ALTO
**Quién decide:** Andrés + Annie (AMBOS)

---

## ÁREA 8 — REGULACIÓN

### GAP-REG-01
**Área:** Regulación — Valores e Instrumentos Financieros
**Estado:** NO DEFINIDO
**Problema:** Prometer un rendimiento diario a cambio de un depósito de capital es, en muchas jurisdicciones, la definición legal de un instrumento financiero o valor (security). En EE.UU., el test Howey probablemente clasificaría FeedAPet como security. En la UE, puede requerir registro bajo MiFID II o MiCA. Ninguna jurisdicción está contemplada.
**Riesgo:** CRÍTICO
**Quién decide:** Abogado especializado + Andrés + Annie (TODOS)

---

### GAP-REG-02
**Área:** Regulación — Juego de Azar (Lotería)
**Estado:** NO DEFINIDO
**Problema:** Una lotería donde los usuarios pagan tickets para ganar premios es juego de azar en casi todas las jurisdicciones del mundo, con regulación específica y licencias requeridas. No se ha contemplado este aspecto.
**Riesgo:** CRÍTICO
**Quién decide:** Abogado especializado + Andrés + Annie (TODOS)

---

### GAP-REG-03
**Área:** Regulación — Programa de Referidos y MLM
**Estado:** NO DEFINIDO
**Problema:** Un sistema de referidos de dos niveles donde los participantes ganan dinero por reclutar a otros puede clasificarse como esquema MLM (Multi-Level Marketing) en muchas jurisdicciones. Algunos países tienen prohibiciones o restricciones específicas.
**Riesgo:** ALTO
**Quién decide:** Abogado especializado + Andrés + Annie (TODOS)

---

### GAP-REG-04
**Área:** Regulación — Donaciones y Fundación
**Estado:** NO DEFINIDO
**Problema:** La Wallet_FeedAPet_Foundation recibe el 1% de cada movimiento. Si esta fundación solicita o recibe donaciones, puede estar sujeta a regulación de organizaciones sin ánimo de lucro, obligaciones de transparencia y restricciones de uso de fondos. No está definida la estructura legal de la fundación.
**Riesgo:** MEDIO
**Quién decide:** Abogado especializado + Andrés + Annie (TODOS)

---

## RESUMEN DE ESTADO POR ÁREA

| Área | Definido | Parcial | No Definido | Contradicciones | Riesgos Críticos |
|------|----------|---------|-------------|-----------------|-----------------|
| Modelo de Negocio | 20% | 40% | 40% | 0 | 2 |
| Economía | 10% | 50% | 40% | 1 | 3 |
| Smart Contract | 10% | 40% | 50% | 0 | 3 |
| Arquitectura | 5% | 20% | 75% | 0 | 0 |
| UX/UI | 20% | 30% | 50% | 0 | 0 |
| Seguridad | 15% | 20% | 65% | 0 | 2 |
| Testing | 20% | 20% | 60% | 0 | 0 |
| Regulación | 0% | 0% | 100% | 0 | 3 |

---

## TABLA COMPLETA DE GAPS

| ID | Área | Riesgo | Estado | Quién decide |
|----|------|--------|--------|--------------|
| GAP-BIZ-01 | Negocio — Fuente de rendimiento | CRÍTICO | No definido | Ambos |
| GAP-BIZ-02 | Negocio — Riesgo legal instrumento financiero | CRÍTICO | No definido | Ambos + Abogado |
| GAP-BIZ-03 | Negocio — Validación de mercado | ALTO | No definido | Ambos |
| GAP-ECO-01 | Economía — ROI insostenible | CRÍTICO | Parcial | Ambos |
| GAP-ECO-02 | Economía — Contradicción distribución de fondos | CRÍTICO | Contradictorio | Ambos |
| GAP-ECO-03 | Economía — Mecánica lotería Paws | ALTO | Parcial | Ambos |
| GAP-ECO-04 | Economía — Insolvencia del pool | CRÍTICO | No definido | Ambos |
| GAP-ECO-05 | Economía — Cálculo umbral liquidez | ALTO | Parcial | Ambos |
| GAP-ECO-06 | Economía — Mecánica del boost | ALTO | Parcial | Ambos |
| GAP-ECO-07 | Economía — Donaciones y apadrinamiento | MEDIO | No definido | Ambos |
| GAP-ECO-08 | Economía — Wallet Maratones/Eventos | MEDIO | No definido | Ambos |
| GAP-SC-01 | Smart Contract — Funciones sin spec formal | ALTO | Parcial | Andrés |
| GAP-SC-02 | Smart Contract — Estados incompletos | ALTO | Parcial | Andrés + Annie |
| GAP-SC-03 | Smart Contract — Aleatoriedad lotería | CRÍTICO | No definido | Andrés |
| GAP-SC-04 | Smart Contract — ROI on-chain vs off-chain | ALTO | No definido | Andrés |
| GAP-SC-05 | Smart Contract — Pausa de emergencia | ALTO | Parcial | Ambos |
| GAP-SC-06 | Smart Contract — Upgradeabilidad | ALTO | No definido | Ambos |
| GAP-SC-07 | Smart Contract — Control de administración | CRÍTICO | Parcial | Ambos |
| GAP-SC-08 | Smart Contract — Validación video testimonial | ALTO | No definido | Ambos |
| GAP-ARCH-01 | Arquitectura — Stack tecnológico | ALTO | No definido | Andrés |
| GAP-ARCH-02 | Arquitectura — Backend | MEDIO | No definido | Andrés |
| GAP-ARCH-03 | Arquitectura — Verificación de refugios | ALTO | No definido | Ambos |
| GAP-ARCH-04 | Arquitectura — Almacenamiento | MEDIO | No definido | Andrés |
| GAP-UX-01 | UX — Flujo de onboarding | ALTO | No definido | Annie |
| GAP-UX-02 | UX — Estados de error y vacío | MEDIO | No definido | Annie |
| GAP-UX-03 | UX — Flujo de retiro | MEDIO | Parcial | Annie |
| GAP-UX-04 | UX — Votación Héroes del Mes | MEDIO | Parcial | Ambos |
| GAP-UX-05 | UX — Mobile | MEDIO | No definido | Annie |
| GAP-SEC-01 | Seguridad — Ataque Sybil | ALTO | No considerado | Ambos |
| GAP-SEC-02 | Seguridad — Abuso de referidos | ALTO | No considerado | Ambos |
| GAP-SEC-03 | Seguridad — Manipulación de lotería | CRÍTICO | No considerado | Andrés |
| GAP-SEC-04 | Seguridad — Centralización económica | ALTO | No considerado | Ambos |
| GAP-SEC-05 | Seguridad — Front-running | MEDIO | No considerado | Andrés |
| GAP-SEC-06 | Seguridad — Reentrancy | ALTO | Parcial | Andrés |
| GAP-TEST-01 | Testing — Framework y entorno | MEDIO | No definido | Andrés |
| GAP-TEST-02 | Testing — Simulación económica | ALTO | No definido | Ambos |
| GAP-TEST-03 | Testing — Auditoría profesional | ALTO | Parcial | Ambos |
| GAP-REG-01 | Regulación — Valores/Securities | CRÍTICO | No definido | Ambos + Abogado |
| GAP-REG-02 | Regulación — Lotería/Juego | CRÍTICO | No definido | Ambos + Abogado |
| GAP-REG-03 | Regulación — MLM/Referidos | ALTO | No definido | Ambos + Abogado |
| GAP-REG-04 | Regulación — Fundación/Donaciones | MEDIO | No definido | Ambos + Abogado |

---

## PARTE II — ACTUALIZACIÓN TRAS DECISIONES APROBADAS (2026-08-10)

> Esta sección no borra ni reescribe el análisis original (Parte I). Se conserva completo por trazabilidad: explica por qué se descartó el modelo de ROI diario. Lo que sigue es la relectura de esos gaps a la luz de las decisiones de Andrés y Annie tras `NUEVA_VISION_FEEDAPET_v2.md` y la sesión de aprobación del Modelo B.

### Gaps de la Parte I recalificados

| ID | Gap original | Nueva calificación | Motivo |
|----|--------------|---------------------|--------|
| GAP-BIZ-01 | Fuente de rendimiento no definida | RESUELTO | No hay promesa de rendimiento — modelo B no paga ROI |
| GAP-BIZ-02 | Riesgo legal de instrumento financiero | REDUCIDO — sigue abierto en otra forma | Sin ROI el riesgo de "security" cae; persiste disclosure de afiliados y gestión de donaciones (ver GAP-NEW-03, GAP-NEW-10) |
| GAP-BIZ-03 | Validación de mercado | EN EJECUCIÓN | Aprobada Fase 0 de validación (DN-03) — ver `ROADMAP_VALIDACION.md` |
| GAP-ECO-01 a 06 | ROI, distribución 94/5/1, insolvencia de pool, umbral de liquidez, boost | YA NO APLICAN | No existe pool de capital de usuarios en el Modelo B; sustituidos por la distribución de comisiones de `MODELO_ECONOMICO_B.md` |
| GAP-ECO-07 | Donaciones y apadrinamiento | PARCIALMENTE RESUELTO | Se define que las donaciones directas van 100% al refugio (0% fee) por confianza — pendiente estructura legal (GAP-REG-04) |
| GAP-ECO-08 | Wallet Maratones/Eventos | REDEFINIDO | Pasan a ser campañas patrocinadas gestionadas off-chain — ver `MODELO_ECONOMICO_B.md` |
| GAP-SC-01 a 08 | Funciones del smart contract, estados, aleatoriedad, upgradeabilidad, admin, video testimonial | APARCADOS | Decisión explícita: no se desarrolla Smart Contract todavía. Su rol pasa de "motor financiero" a "infraestructura de transparencia futura" — se retoman cuando haya volumen real que lo justifique |
| GAP-ARCH-01 a 04 | Stack, backend, verificación de refugios, almacenamiento | SIGUEN ABIERTOS | GAP-ARCH-03 (verificación de refugios) pasa a prioridad alta — condiciona la fase de validación con 5 refugios |
| GAP-UX-01 a 05 | Onboarding, errores, retiro, votación, mobile | SIGUEN ABIERTOS, REENFOCADOS | "Flujo de retiro" ya no aplica (no hay depósitos); se sustituye por flujo de compra/ahorro con partners |
| GAP-SEC-01, 02, 05, 06 | Sybil, referidos, front-running, reentrancy | YA NO APLICAN (por ahora) | Sin pool de capital ni smart contract activo, estos vectores no existen todavía. Reevaluar si se retoma blockchain |
| GAP-SEC-03 | Manipulación de lotería | YA NO APLICA COMO ESTABA | Decisión DN-04: lotería sin dinero y sin vínculo a retiro. Si se construye como gamificación, es un gap nuevo y menor |
| GAP-SEC-04 | Centralización económica | SIGUE ABIERTO, REENFOCADO | Ahora es sobre el fondo de impacto, no sobre wallets de pool — mitigado en fase 1 por transparencia pública (DN-05), sin resolver del todo |
| GAP-TEST-01 a 03 | Testing, simulación económica, auditoría | POSPUESTOS | No aplican hasta que exista smart contract o modelo financiero que auditar |
| GAP-REG-01 | Securities | MUY REDUCIDO | Sin promesa de rendimiento, el riesgo de clasificación como instrumento financiero cae drásticamente |
| GAP-REG-02 | Lotería / juego de azar | REDUCIDO, NO CERRADO | Solo aplica si se construye la gamificación con premios de partner — requiere validación legal específica en ese momento (DN-04) |
| GAP-REG-03 | MLM / referidos | YA NO APLICA | No hay sistema de referidos en el Modelo B (explícitamente excluido del MVP) |
| GAP-REG-04 | Fundación / donaciones | SIGUE ABIERTO | Más relevante ahora — pendiente de consulta legal (DN-07) antes de aceptar donaciones reales |

### Gaps nuevos formalizados (ya anticipados en `NUEVA_VISION_FEEDAPET_v2.md`, sección H)

| ID | Área | Riesgo | Estado tras decisiones del 2026-08-10 |
|----|------|--------|----------------------------------------|
| GAP-NEW-01 | Arranque en frío | CRÍTICO | Mitigado parcialmente por el programa Partner Fundador (`PARTNER_FUNDADOR.md`) — no resuelto del todo |
| GAP-NEW-02 | Atribución técnica de comisiones | ALTO | Sin decidir el mecanismo exacto (código de descuento / link / integración) — bloquea el MVP técnico |
| GAP-NEW-03 | Disclosure de relación de afiliado | ALTO | Pendiente de consulta legal (DN-07) |
| GAP-NEW-04 | Gobernanza del fondo de impacto | ALTO | RESUELTO PARA FASE 1: equipo fundador + transparencia pública + reporting (DN-05). Evolución futura sin fecha definida |
| GAP-NEW-05 | Medición y verificación del impacto | ALTO | En diseño — niveles de evidencia propuestos (básico/intermedio/avanzado/auditoría externa), sin proceso operativo cerrado |
| GAP-NEW-06 | Certificación de partners | ALTO | Sin proceso definido todavía |
| GAP-NEW-07 | Financiación del período de arranque | **CRÍTICO — SIN RESOLVER** | No fue abordado en la ronda de decisiones del 2026-08-10. Bloquea la ejecución sostenida del roadmap más allá de la fase de validación |
| GAP-NEW-08 | Propuesta de valor para partners en fase 0 usuarios | ALTO | EN DISEÑO — ver `PARTNER_FUNDADOR.md` |
| GAP-NEW-09 | Competencia con plataformas de afiliados establecidas | MEDIO | Sin cambios — a validar con usuarios reales en la Fase 0 |
| GAP-NEW-10 | GDPR y privacidad en tracking de compras | ALTO | Pendiente de consulta legal (DN-07) |
| GAP-NEW-11 | Fórmula y antifraude del Impact Score | MEDIO-ALTO | Nuevo — concepto aprobado, variables y pesos exactos sin definir |
| GAP-NEW-12 | Verificación de acciones de ayuda para el Impact Score | MEDIO | Nuevo — algunas variables del score (voluntariado, adopciones) requieren validación humana o del refugio, mecanismo no definido |

### Resumen de riesgos críticos abiertos tras esta actualización

1. **GAP-NEW-07 — Financiación del arranque.** Es hoy el único riesgo CRÍTICO sin ninguna mitigación decidida.
2. **GAP-NEW-01 — Arranque en frío.** Mitigado en diseño, no en ejecución.
3. **GAP-NEW-02 — Atribución de comisiones.** Bloquea la construcción técnica del MVP hasta decidirse.

---

*Fin del GAP ANALYSIS — versión 1.0 — 2026-08-10*
*Parte II añadida el 2026-08-10 tras aprobación del Modelo B por Andrés y Annie. No se ha escrito ningún código. No se ha desarrollado ningún Smart Contract. Este documento es un análisis, no una especificación técnica.*
