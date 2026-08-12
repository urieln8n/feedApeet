# MODELO ECONÓMICO B — FeedAPet
**Fecha:** 2026-08-10
**Estado:** Aprobado como punto de partida por Andrés y Annie
**Basado en:** `NUEVA_VISION_FEEDAPET_v2.md` (secciones B, C, D, E)

> Todas las cifras de este documento son hipótesis de trabajo ya documentadas en `NUEVA_VISION_FEEDAPET_v2.md`, no datos nuevos ni validados. Se reutilizan aquí, no se inventan. Deben confirmarse o corregirse con los resultados de `ROADMAP_VALIDACION.md`.

---

## Esencia del modelo

> "No queremos que la gente venga a FeedAPet para ganar dinero. Queremos que venga porque ama a los animales, y que sus compras, ahorro y participación ayuden a generar impacto real." — Andrés y Annie

```
PERSONA AMA A SU MASCOTA
        ↓
Se une a FeedAPet
        ↓
Compra productos que ya necesita
        ↓
Consigue ahorro/descuentos
        ↓
La compra genera ingresos para FeedAPet
        ↓
Una parte financia impacto animal
        ↓
El usuario ve dónde llegó su impacto
        ↓
Se siente parte de una comunidad
        ↓
Vuelve a comprar / participar / ayudar
```

Ninguna variable de este modelo depende de que el usuario deposite capital ni espere un rendimiento financiero. El dinero que mueve el sistema es dinero que el usuario ya iba a gastar en su mascota — no dinero nuevo puesto a rendir.

---

## Fuentes de ingreso (Modelo B)

| Fuente | Descripción | Prioridad de esfuerzo inicial |
|---|---|---|
| Comisiones de partners | % sobre compras que el usuario ya haría, canalizadas a través de FeedAPet | 1 — motor base, crece con la comunidad |
| Patrocinios corporativos | Empresas pagan por campañas de impacto verificable + visibilidad ante la comunidad | 2 — ticket alto, ciclo de venta B2B largo |
| Donaciones directas | Usuario o empresa dona a un caso/refugio específico | 3 — recomendación: 0% fee, prioriza confianza sobre ingreso |

Membresía premium: **excluida del MVP**, pospuesta a una fase futura sujeta a validar que aporta valor real (DN-02).

---

## Distribución propuesta de una comisión de partner

Hipótesis de trabajo, sujeta a lo que acepten los partners reales en la validación:

| Destino | % propuesto | Función |
|---|---|---|
| Reserva operativa FeedAPet | 40-50% | Sostener equipo/infraestructura hasta el break-even |
| Fondo de impacto animal | 30-40% | El propósito central — debe ser visible y auditable |
| Reserva de crecimiento/marketing | 10-20% | Adquisición de usuarios y partners |

**Ejemplo ilustrativo (hipótesis, no dato real):** usuario compra €100 en pienso con un partner → partner paga 10% de comisión = €10 → de esos €10: €4-5 a reserva operativa, €3-4 a fondo de impacto, €1-2 a crecimiento.

## Distribución propuesta de un patrocinio corporativo

| Destino | % propuesto |
|---|---|
| Refugios participantes (directo) | 70% |
| Gestión, medición y reporting de impacto | 20% |
| Reserva operativa FeedAPet | 10% |

**Ejemplo ilustrativo (hipótesis, no dato real):** empresa paga €5.000 por campaña "Alimenta a 100 perros en enero" → €3.500 a refugios, €1.000 a gestión/medición, €500 a reserva operativa.

## Donaciones directas

Recomendación: **100% al refugio/caso, 0% fee de gestión** — maximiza confianza en la fase donde la confianza es el activo más escaso. Ingreso de FeedAPet viene de las otras dos fuentes, no de las donaciones. Pendiente de confirmar viabilidad con la consulta legal (DN-07) — la gestión de donaciones puede requerir estructura legal específica (fundación / entidad sin ánimo de lucro).

---

## Escenarios (conservador / base / ambicioso)

Reutilizando exactamente la tabla de hipótesis de `NUEVA_VISION_FEEDAPET_v2.md` (sección D), con los supuestos allí documentados: gasto medio canalizado €250/año por usuario comprador, comisión media 10%, conversión registrado→activo 60%, conversión activo→comprador 25%.

| Escenario | Usuarios registrados | Usuarios activos | Usuarios compradores | Ingreso comisiones/año | Ingreso patrocinios/año | Ingreso total hipotético/año | Coste operativo estimado | Balance hipotético |
|---|---|---|---|---|---|---|---|---|
| **Conservador** (500 usuarios) | 500 | 300 | 75 | €1.875 | €3.000-10.000 | €4.875-11.875 | €50.000-100.000 | Déficit significativo |
| **Base** (1.000-5.000 usuarios) | 1.000 → 5.000 | 600 → 3.000 | 150 → 750 | €3.750 → €18.750 | €10.000-25.000 → €30.000-80.000 | €13.750-28.750 → €48.750-98.750 | €70.000-130.000 → €100.000-180.000 | Déficit reducido → cerca del break-even |
| **Ambicioso** (10.000 usuarios) | 10.000 | 6.000 | 1.500 | €37.500 | €60.000-150.000 | €97.500-187.500 | €130.000-220.000 | Positivo en el caso optimista |

**Lectura honesta (ya señalada en la Nueva Visión y que se mantiene):** el break-even hipotético requiere aproximadamente 5.000-8.000 usuarios activos, lo que implica 18-36 meses de desarrollo. Esto es exactamente el motivo por el que la financiación del período de arranque (pendiente, ver `DECISIONS_REQUIRED.md`) es una decisión crítica sin resolver todavía.

---

## Palancas que pueden acelerar el camino al break-even

1. Conseguir 2-3 partners fundadores desde el inicio con condiciones especiales (`PARTNER_FUNDADOR.md`).
2. Empezar con un nicho concreto (ej. alimentación de perros/gatos en una ciudad española) antes de escalar geográfica o categóricamente.
3. Buscar patrocinios de empresas locales con presupuesto de RSE accesible antes que grandes cuentas.
4. Minimizar costes operativos al máximo durante la fase de validación y el MVP inicial.

---

## Qué queda explícitamente fuera de este modelo

Por instrucción directa de Andrés y Annie, no forman parte del Modelo B ni del MVP: blockchain, smart contract, staking, ROI, sistema de referidos, membresía premium. Ver `MVP_SCOPE.md` para el detalle de alcance.

---

*Documento generado el 2026-08-10 — Claude Code*
*Cifras hipotéticas heredadas de `NUEVA_VISION_FEEDAPET_v2.md`. Ninguna ha sido validada con datos reales todavía.*
