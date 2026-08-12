# MVP SCOPE — FeedAPet
**Fecha:** 2026-08-10
**Estado:** Propuesta de alcance — a construir SOLO si `ROADMAP_VALIDACION.md` da señales positivas
**Principio rector:** demostrar que el flujo usuario → compra/ahorro → partner → comisión → impacto funciona, con la menor complejidad técnica posible

---

## Qué SÍ entra en el MVP

- **Web tradicional, no DApp.** Registro de usuario simple (email o equivalente), sin wallet cripto.
- **Perfil de usuario** con Team Perro / Gato / Ambos.
- **Muro de historias** y perfiles de refugios/casos, con sus estados (EN PROCESO, OBJETIVO CUMPLIDO, EN EJECUCIÓN, ADOPTADO/CASO CERRADO).
- **Dashboard de impacto básico** — agregados simples (cuánto se ha destinado a qué, cuántos animales ayudados), sin el Impact Score completo todavía.
- **Catálogo de 1-2 partners piloto**, con atribución manual o semi-manual (la opción más simple y menos costosa: código de descuento único por usuario).
- **Reporting de impacto** en nivel básico/intermedio: fotos/vídeo con timestamp y facturas o comprobantes aportados por el refugio.
- **Backend con registro estructurado y auditable** de donaciones y campañas, pensado para poder migrarse a un registro on-chain en el futuro sin rediseñar desde cero — sin implementar esa capa on-chain ahora.

## Qué NO entra en el MVP (exclusión explícita de Andrés y Annie)

| Excluido | Motivo |
|---|---|
| Blockchain / Smart Contract | Se aparca como infraestructura de transparencia futura, no como motor del producto. Se retoma cuando haya volumen real que lo justifique (ver `NUEVA_VISION_FEEDAPET_v2.md`, sección E) |
| Staking | No existe promesa de rendimiento financiero en el Modelo B |
| ROI / rendimiento diario | Descartado — es el modelo abandonado que originó todo este proceso de revisión |
| Sistema de referidos | Excluido explícitamente; reduce además el riesgo regulatorio de MLM |
| Membresía premium | Pospuesta a fase futura, sujeta a validar que aporta valor real una vez exista comunidad |
| Impact Score completo (todas las variables y niveles) | Se construye una versión simplificada o se pospone hasta tener datos de comportamiento real de los primeros usuarios |
| Lotería/gamificación con premios | Aparcada — si se retoma, es sin dinero y requiere validación legal previa (DN-04) |

## Decisiones técnicas que el MVP necesita antes de construirse (todavía abiertas)

- **Mecanismo de atribución de comisiones** (GAP-NEW-02): código de descuento único es la opción más simple recomendada para empezar, pero no está decidido formalmente.
- **Stack tecnológico** (GAP-ARCH-01): sin definir todavía — pendiente de decisión técnica de Andrés.
- **Proceso de verificación de refugios** (GAP-ARCH-03): sin definir el flujo operativo, aunque es prioritario porque condiciona los 5 refugios de la fase de validación.

## Criterio de salida del MVP hacia la siguiente fase

El MVP se considera validado cuando exista evidencia real de:
- Usuarios registrándose y volviendo a usar la plataforma.
- Al menos 1-2 partners piloto con comisiones efectivamente pagadas (no solo acordadas).
- Al menos un caso de impacto reportado con evidencia verificable de principio a fin.

Solo con esa evidencia tiene sentido evaluar la Fase 2 (ampliar catálogo de partners, primeras campañas patrocinadas de mayor ticket) descrita en `NUEVA_VISION_FEEDAPET_v2.md`, sección K.

---

*Documento generado el 2026-08-10 — Claude Code*
*Alcance propuesto, no construido. Ninguna línea de código ha sido escrita.*
