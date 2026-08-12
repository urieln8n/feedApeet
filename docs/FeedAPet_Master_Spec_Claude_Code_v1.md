# FeedAPet — Master Specification para Claude Code

Documento basado en el PRD + Smart Contract Specification aportado por el equipo.

**Regla principal:** no inventar reglas. Las contradicciones y decisiones pendientes deben convertirse en preguntas antes de programar.

## 0. PROPÓSITO

- Documento maestro para Claude Code durante el desarrollo de FeedAPet.
- No inventar reglas económicas, permisos, funciones ni comportamientos no definidos.
- Ante una contradicción o ambigüedad, detener esa parte, explicarla y pedir una decisión a Andrés y Annie.
- No sustituye auditoría profesional de seguridad, económica o legal.

## 1. VISIÓN

- FeedAPet se plantea como una DApp sobre Solana integrada con responsabilidad social gamificada.
- Busca combinar un modelo financiero con financiación transparente de alimentación, esterilización y atención médica de animales en refugios y protectoras aliadas.

## 2. PRODUCTO Y UX

- Perfil: Team Perro / Team Gato / Team Ambos.
- Nivel de Padrino basado en capital activo e historial de ciclos.
- Dashboard de impacto con animales ayudados, refugio, adopción e insignias.
- Héroes del Mes: propuestas, votaciones y casos urgentes.
- Ficha de caso: foto/vídeo, protectora, diagnóstico, objetivo, cuenta atrás y progreso.
- Muro de historias y actualizaciones.
- Backoffice de refugios con estados: EN PROCESO, OBJETIVO CUMPLIDO, EN EJECUCIÓN y ADOPTADO/CASO CERRADO.

## 3. ARQUITECTURA

- Separar claramente ON-CHAIN, OFF-CHAIN y HÍBRIDO.
- Frontend: experiencia, navegación y presentación.
- Backend/base de datos: perfiles, contenido, fotos, vídeos, refugios y metadatos.
- Smart Contract: reglas económicas, transferencias, estados y validaciones verificables.
- Wallet: firma de transacciones.
- Antes de implementar cada función, clasificarla como ON-CHAIN, OFF-CHAIN o HÍBRIDA.

## 4. SMART CONTRACT — SCS ACTUAL

- Wallet_Pool_Principal: el documento fuente indica 94% de depósitos.
- Wallet_CEO_Marketing: 5% de comisiones de entrada/salida.
- Wallet_FeedAPet_Foundation: 1% de cada movimiento.
- Wallet_Loteria_Paws: 100% de tickets de lotería.
- Wallet_Maratones_Eventos: campañas especiales.
- Estas reglas son provisionales hasta cerrar los bloqueos económicos.

## 5. FUNCIONES

- deposit(), calculateROI(), withdraw(), executeLottery(), claimLotteryPrize(), triggerEventBoost().
- Referidos, donaciones y apadrinamiento también aparecen en el ecosistema y necesitan especificación formal.
- Para cada instrucción definir: objetivo, caller, parámetros, cuentas, precondiciones, validaciones, transferencias, estado, eventos, errores y casos límite.

## 6. REGLAS ECONÓMICAS DEL DOCUMENTO FUENTE

- MIN_DEPOSIT = 0,1 SOL.
- MAX_DEPOSIT = 1,0 SOL por wallet.
- Ciclo de 16 días.
- ROI base indicado: 1,5%-2,0% diario.
- Si la liquidez del Pool cae por debajo del 50%, el documento propone 1,0%-0,8%.
- Boost máximo indicado: +0,5% temporal.
- Retiro después de 16 días y con al menos 1 ticket Paws durante el ciclo.
- Beneficio bruto indicado: aprox. 24%-32%.
- Comisión de salida indicada: 6% (5% Marketing/CEO y 1% Fundación).
- Tras el ciclo: CYCLE_EXPIRED y nuevo depósito para reactivar.

## 7. BLOQUEOS ANTES DE PROGRAMAR

- Demostrar la sostenibilidad económica del ROI; el documento no demuestra todavía de dónde sale el rendimiento.
- Resolver la contradicción entre 94% al Pool y 3% Nivel 1 + 1% Nivel 2 de referidos.
- Definir exactamente el cálculo del umbral de liquidez del 50%.
- Definir qué sucede si el Pool no puede cubrir un retiro.
- Definir si el ROI es garantizado, objetivo o variable; no asumirlo.
- Definir permisos, límites y duración de triggerEventBoost.
- Definir verificación de tickets.
- Definir cómo se valida el vídeo testimonial antes de reclamar un premio.
- Definir selección de ganador de lotería de forma verificable y resistente a manipulación.
- Definir quién designa casos/protectoras y cómo se controlan los fondos.

## 8. ESTADOS

- Propuesta no aprobada: DEPOSITED -> ACTIVE -> CYCLE_EXPIRED -> WITHDRAWN.
- Definir también pausa, emergencia, fallo y cancelación si aplican.
- Cada transición debe tener caller, condición, efecto y evento.
- Claude Code no debe inventar estados definitivos.

## 9. SEGURIDAD

- Mínimo privilegio.
- Separar administración y tesorería cuando sea posible.
- Evaluar multisig y timelock para operaciones críticas.
- Registrar cambios administrativos.
- Limitar parámetros dinámicos.
- Pausa de emergencia con reglas claras.
- No guardar claves privadas ni secretos en Git.
- Tests unitarios, integración y escenarios adversos antes de fondos reales.

## 10. ON-CHAIN / OFF-CHAIN

- On-chain: movimientos de SOL, reglas económicas, estados críticos, transferencias, eventos y datos mínimos verificables.
- Off-chain: fotos, vídeos, perfiles, historias y metadatos pesados.
- Si un dato off-chain afecta a dinero, definir explícitamente autorización/oráculo/firmante.

## 11. UX/UI

- Primero User Journey, luego mapa de pantallas, flujos, wireframes y diseño visual.
- Definir estados vacíos, errores, cargas, confirmaciones y bloqueos.
- Las operaciones económicas deben mostrar qué firma el usuario, importe, comisiones, destino y resultado esperado.

## 12. TESTS MÍNIMOS

- Depósitos mínimo/máximo y fuera de rango.
- Depósitos repetidos.
- Retiro antes/después de 16 días.
- Retiro sin ticket válido.
- Comisiones.
- Referidos L1/L2.
- Pool por encima/debajo del umbral.
- Boost válido, expirado y fuera de límites.
- Accesos no autorizados.
- Fallos de transferencia.
- Doble ejecución/reentrancia donde aplique.
- Manipulación administrativa.
- Lotería y selección del ganador.
- Claim con y sin validación requerida.

## 13. REGLAS PARA CLAUDE CODE

- No implementar funciones no especificadas sin pedir confirmación.
- No asumir que algo es económicamente seguro porque sea programable.
- No usar fondos reales durante desarrollo.
- Trabajar en entorno de pruebas.
- Tests junto a cada instrucción crítica.
- Documentar decisiones y mantener commits pequeños.
- Antes de cada módulo: explicar alcance, archivos, riesgos y tests.
- Después: listar cambios, tests, resultados y pendientes.

## 14. ORDEN DE IMPLEMENTACIÓN

- 1) Auditoría/cierre económico.
- 2) SCS v2.0.
- 3) Threat Model y seguridad.
- 4) Arquitectura técnica.
- 5) UX/UI.
- 6) Scaffold del repositorio.
- 7) Smart Contract en pruebas.
- 8) Backend/base de datos.
- 9) Frontend.
- 10) Wallet + contrato.
- 11) Tests y simulación económica.
- 12) Auditoría profesional antes de fondos reales.

## 15. PRIMERA TAREA DE CLAUDE CODE

- NO empieces programando el Smart Contract.
- Analiza este documento y genera un GAP ANALYSIS dividido en Economía, Smart Contract, Seguridad, Backend, Frontend, UX/UI, Datos, Administración y Testing.
- Para cada gap: problema, impacto, información que falta y propuesta.
- Genera una lista de decisiones que Andrés y Annie deben aprobar.
- Solo después de esas aprobaciones generar la especificación técnica definitiva y comenzar implementación.