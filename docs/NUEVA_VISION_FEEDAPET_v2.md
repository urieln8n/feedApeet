# NUEVA VISIÓN FEEDAPET — Análisis Estratégico v2
**Fecha:** 2026-08-10
**Elaborado por:** Claude Code — rol: Product Manager + Arquitecto de Sistemas + Experto en Modelos Económicos Web3
**Basado en:** FeedAPet_Master_Spec_Claude_Code_v1.md + GAP_ANALYSIS.md + DECISIONS_REQUIRED.md + Nueva Visión comunicada por Andrés y Annie

> **Advertencia:** Este documento contiene hipótesis numéricas que DEBEN ser validadas con datos reales antes de tomar decisiones de inversión. Ninguna cifra de este documento es un pronóstico ni una garantía. Los aspectos regulatorios requieren consulta legal profesional. No se ha escrito ni se escribirá código hasta cerrar las decisiones marcadas al final.

---

## A — NUEVA VISIÓN DE FEEDAPET

### El cambio fundamental

El modelo anterior definía a FeedAPet como una **DApp financiera con propósito social**: el usuario depositaba capital esperando un ROI diario y, como efecto secundario, algunos fondos ayudaban a animales.

El nuevo modelo invierte completamente esta lógica:

FeedAPet es una **plataforma de comunidad e impacto animal** que, como efecto secundario de su escala y actividad, genera ingresos reales que financian ese impacto.

**Antes:** capital → rendimiento → (quizás) impacto
**Ahora:** propósito → comunidad → actividad real → ingresos reales → impacto verificable

### Propuesta de valor redefinida

| Para quién | Qué propone FeedAPet |
|------------|---------------------|
| **Usuario amante de animales** | Una comunidad donde su amor por los animales tiene impacto real y verificable, y donde puede ahorrar dinero en los productos y servicios que ya compra |
| **Usuario que quiere apadrinar** | Canal directo y transparente para apoyar a animales específicos en refugios verificados |
| **Refugio/protectora** | Acceso a financiación, visibilidad y una red de personas comprometidas |
| **Marca/proveedor pet** | Acceso a una comunidad altamente segmentada de propietarios de mascotas comprometidos, con contexto de impacto social que añade valor a la marca |
| **Empresa patrocinadora** | Vehículo de RSE verificable y medible, no solo una donación opaca |

### El círculo virtuoso

```
PROPÓSITO (quiero ayudar a los animales)
         ↓
COMUNIDAD (me uno a personas con los mismos valores)
         ↓
ESCALA (la comunidad crece y gana poder de negociación)
         ↓
PARTNERS Y ACUERDOS (marcas y servicios quieren acceso a esta comunidad)
         ↓
AHORRO PARA EL USUARIO (mejores condiciones en lo que ya compra)
         ↓
INGRESOS REALES PARA FEEDAPET (comisiones, sponsors, membresías)
         ↓
IMPACTO ANIMAL FINANCIADO (alimentación, esterilización, veterinaria, adopción)
         ↓
IMPACTO MEDIDO Y VISIBLE (credibilidad y confianza aumentan)
         ↓
MÁS COMUNIDAD (el impacto visible atrae a más personas)
```

### Crítica honesta de esta visión

La nueva visión es significativamente más sólida que la anterior. Sin embargo, tiene un problema central que debe ser reconocido desde el inicio:

**El problema del arranque en frío (cold start problem).**

El círculo virtuoso solo funciona cuando hay suficiente masa crítica. Específicamente:
- Los partners quieren acceso a una comunidad grande y activa. Con 100 o 200 usuarios, los partners más relevantes no se sentarán a negociar.
- Los usuarios vienen por el valor que aportan los partners. Sin partners buenos, los usuarios no tienen razón para quedarse.
- El impacto animal depende de los ingresos. Sin ingresos suficientes, el impacto es simbólico.

Esto es exactamente el mismo problema que enfrentan todos los marketplaces (Airbnb, Uber, Etsy). La pregunta crítica que Andrés y Annie deben responder es: **¿cómo arrancamos el volante cuando todavía no hay comunidad ni partners?**

La respuesta honesta a esta pregunta es lo que determinará si el proyecto tiene posibilidades reales.

---

## B — NUEVO MODELO DE NEGOCIO

### Fundamento: ingresos de actividad económica real

El nuevo modelo elimina completamente la promesa de rendimiento financiero. Los ingresos de FeedAPet provienen exclusivamente de:

1. **Comisiones de partners** — cuando un usuario de FeedAPet compra un servicio o producto de un partner, FeedAPet recibe una comisión.
2. **Patrocinios de empresas** — empresas pagan para asociar su marca a campañas de impacto verificable.
3. **Membresías premium** — usuarios pagan por acceso a beneficios adicionales (a estudiar con cuidado).
4. **Donaciones directas** — usuarios o empresas donan directamente a campañas o animales específicos.

### Fuentes de ingresos analizadas

#### 1. Comisiones de partners

**Cómo funciona:**
El usuario de FeedAPet accede a una sección de "partners" donde encuentra proveedores de productos y servicios para mascotas con condiciones especiales. Cuando realiza una compra, FeedAPet recibe una comisión del partner. El usuario puede recibir un descuento o no, dependiendo del acuerdo.

**Categorías y comisiones típicas del sector (hipótesis — requieren validación con partners reales):**

| Categoría | Comisión típica de mercado | Notas |
|-----------|---------------------------|-------|
| Alimentación (pienso, snacks) | 5-15% | Volumen alto, margen bajo en marcas premium |
| Veterinarios | 3-8% | Difícil de rastrear, requiere sistema propio |
| Seguros de mascotas | 15-25% de primera prima | Buena comisión, producto de ciclo largo |
| Accesorios y juguetes | 10-20% | Margen más alto, compra menos frecuente |
| Peluquería y grooming | 5-10% | Servicio local, difícil de agregar a escala |
| Residencias/hospedaje | 5-10% | Estacional, buena frecuencia en urbanos |
| Adiestramiento | 5-10% | Servicio de nicho, ticket medio |
| Medicamentos/suplementos | 8-15% | Regulación sanitaria a considerar |

**Problemas a resolver:**
- ¿Cómo se rastrean las compras? ¿Código de descuento único? ¿Link de afiliado? ¿Integración directa con el partner?
- ¿El usuario sabe que FeedAPet recibe comisión? (Obligatorio revelar — ver regulación).
- ¿El ahorro para el usuario y la comisión para FeedAPet son compatibles con el margen del partner?

**Hipótesis que necesita validación:**
> Si un usuario gasta en promedio €600-1.200/año en productos y servicios para su mascota, y un 30-40% de esas compras pasan por FeedAPet a medida que el catálogo de partners crece, el gasto medio canalizado sería €200-500/usuario/año. A una comisión media del 10%, eso representa **€20-50 de ingreso por usuario activo por año**.

Esta hipótesis necesita contrastarse con: (a) cuánto gastan realmente los propietarios de mascotas en España/LATAM, (b) qué parte están dispuestos a canalizar por FeedAPet, y (c) qué comisiones aceptan los partners.

#### 2. Patrocinios de empresas

**Cómo funciona:**
Empresas pagan a FeedAPet para financiar campañas de impacto verificable. Por ejemplo: "Marca X financia la alimentación de 50 perros en el refugio Y durante 3 meses". FeedAPet gestiona la distribución, mide el impacto y produce contenido que la empresa puede usar para RSE.

**Tipos de patrocinio:**
- Campañas de alimentación (modelo sencillo, verificable)
- Campañas de esterilización (coste unitario definible)
- Apadrinamiento corporativo de un refugio (relación duradera)
- Eventos y maratones (modelo por evento)
- Contenido co-creado con impacto (la empresa aparece en historias de animales ayudados)

**Hipótesis de precio:**
- Campaña pequeña (empresa local): €500-2.000
- Campaña mediana (empresa regional): €2.000-10.000
- Patrocinio anual de refugio (empresa grande): €10.000-50.000

**Lo que la empresa recibe:**
- Logo en la campaña y en la comunicación de FeedAPet
- Reporte de impacto verificable (animales ayudados, fotos, métricas)
- Acceso a visibilidad ante la comunidad de FeedAPet
- Contenido para RSE

**Obstáculos reales:**
- Para vender patrocinios de €10.000+ se necesita una comunidad con masa crítica y métricas de engagement demostrables.
- Los ciclos de venta B2B son largos (3-6 meses).
- Se necesita alguien dedicado a la venta de patrocinios.
- Las marcas pequeñas tienen presupuestos pequeños.

**Hipótesis de ingresos por patrocinios:**
- Año 1 (0-500 usuarios): 2-3 campañas pequeñas locales → €3.000-6.000
- Año 2 (500-2.000 usuarios): 4-6 campañas mixtas → €15.000-30.000
- Año 3 (2.000-5.000 usuarios): campañas mayores + patrocinios → €40.000-100.000

#### 3. Membresías premium

**¿Tiene sentido?** — Hipótesis, no decisión.

Una membresía solo tiene sentido si el valor que recibe el miembro premium es claramente mayor que el precio que paga. En este modelo, los posibles beneficios premium serían:
- Acceso a mejores descuentos con partners (si el volumen lo permite negociar dos niveles)
- Contenido exclusivo (guías, webinars con veterinarios)
- Participación en votaciones sobre qué causas financiar
- Badge o reconocimiento visible en la comunidad
- Prioridad en acceso a adopciones
- Descuento en eventos

**Precio hipotético:** €5-10/mes

**Problema principal:** Para que la membresía sea atractiva, el tier gratuito debe ser suficientemente valioso para atraer usuarios, pero el tier premium debe ofrecer algo genuinamente mejor. Esta línea es difícil de trazar y, si se hace mal, puede hacerse que el producto se sienta "freemium trampa".

**Recomendación:** No lanzar membresía en la fase inicial. Primero construir la comunidad con modelo gratuito, después introducir premium cuando haya valor claro que ofrecer.

#### 4. Donaciones directas

**Modelo:** Los usuarios pueden hacer donaciones únicas o recurrentes a campañas específicas (animal concreto, refugio concreto, causa concreta). FeedAPet puede retener un porcentaje de gestión o gestionar sin fee para maximizar confianza.

**Consideración legal importante:** La gestión de donaciones puede requerir registro como entidad sin ánimo de lucro en la jurisdicción correspondiente. Consultar con abogado.

**Ingreso para FeedAPet:** 0-15% de fee de gestión, o modelo en que FeedAPet no retiene nada de las donaciones y los ingresos vienen de los otros canales.

### Costes estimados del negocio

**Hipótesis — requieren validación:**

| Concepto | Año 1 | Año 2 | Año 3 |
|----------|-------|-------|-------|
| Equipo fundador (2 personas, sin sueldo de mercado) | €0-40.000 | €40.000-80.000 | €60.000-120.000 |
| Desarrollo técnico (freelance/agencia o interno) | €20.000-50.000 | €15.000-30.000 | €20.000-40.000 |
| Infraestructura tecnológica | €3.000-8.000 | €5.000-15.000 | €8.000-25.000 |
| Adquisición de usuarios (marketing) | €5.000-15.000 | €10.000-30.000 | €20.000-60.000 |
| Operaciones de refugios y campañas | €5.000-10.000 | €10.000-20.000 | €20.000-40.000 |
| Legal y compliance | €5.000-10.000 | €3.000-5.000 | €3.000-5.000 |
| **Total aproximado** | **€38.000-133.000** | **€83.000-180.000** | **€131.000-290.000** |

Estas cifras varían enormemente según si los fundadores cobran salario, si el desarrollo es externo o interno, y la agresividad del marketing.

---

## C — MODELOS ECONÓMICOS A / B / C

### MODELO A — Comunidad + Partners

**Descripción:** FeedAPet genera ingresos exclusivamente a través de comisiones de partners. Sin membresías, sin patrocinios corporativos, sin donaciones gestionadas.

**Fuente de ingresos:** Comisiones de compras de usuarios con partners.

**Flujo de valor:**
```
Usuario compra en partner → Partner paga comisión → FeedAPet retiene % operativo → Resto va a fondo de impacto
```

**Ventajas:**
- Modelo más simple de implementar y de entender
- Ingresos directamente correlacionados con actividad real de usuarios
- Sin dependencia de ciclos de venta B2B largos
- Menor complejidad operativa

**Desventajas:**
- Ingresos crecen lentamente al inicio (necesita masa crítica)
- Completamente dependiente de que los partners ofrezcan condiciones atractivas
- Poco margen para financiar operaciones en los primeros meses/años
- Sin palanca de ingresos adicional si el volumen de compras es bajo

**Break-even hipotético:**
- Ingreso por usuario activo: €30-50/año
- Coste operativo mínimo: €80.000/año
- Usuarios necesarios para break-even: ~1.600-2.600 activos con compras regulares

**Viabilidad:** MEDIA — funciona solo si se consigue masa crítica y buenos partners rápidamente.

---

### MODELO B — Comunidad + Partners + Sponsors

**Descripción:** MODELO A más ingresos por patrocinios corporativos de campañas de impacto.

**Fuentes de ingresos:**
1. Comisiones de partners (igual que Modelo A)
2. Campañas patrocinadas por empresas

**Flujo de valor:**
```
[Usuarios] → compras con partners → comisiones
[Empresas] → pagan campaña → FeedAPet gestiona impacto → empresa recibe visibilidad y reporte RSE
```

**Ventajas:**
- Dos fuentes de ingresos independientes reduce el riesgo
- Los patrocinios tienen tickets mucho más altos que las comisiones individuales
- El modelo de impacto verificable hace los patrocinios genuinamente atractivos
- La comunidad comprometida es un activo que las marcas valoran

**Desventajas:**
- Añade complejidad operativa (ventas B2B, gestión de campañas, reporting)
- Requiere al menos 1 persona dedicada a venta de patrocinios
- Los ingresos de patrocinio son menos predecibles (ciclos de venta largos)
- La masa crítica necesaria para atraer patrocinadores relevantes es mayor

**Break-even hipotético:**
- Año 1: 3-4 campañas pequeñas (€10.000-20.000) + comisiones mínimas (€2.000-5.000) = €12.000-25.000 ingresos vs. €80.000+ costes → déficit esperado
- Año 2: escala a €30.000-60.000 ingresos combinados
- Año 3: potencial de €80.000-150.000+ con 2.000-5.000 usuarios activos

**Viabilidad:** ALTA — combina ingresos de usuario con ingresos corporativos, más resiliente.

---

### MODELO C — Comunidad + Partners + Sponsors + Membresía

**Descripción:** MODELO B más una membresía premium opcional para usuarios que quieren mayor acceso o beneficios.

**Fuentes de ingresos:**
1. Comisiones de partners
2. Patrocinios corporativos
3. Membresía premium (~€5-10/mes)

**Flujo de valor:**
```
[Usuarios gratuitos] → comunidad + impacto básico + acceso a algunos partners
[Usuarios premium] → todo lo anterior + mejores descuentos + features exclusivos + mayor participación
[Empresas] → patrocinios + visibilidad
```

**Ventajas:**
- Tercera fuente de ingresos con revenue predecible (suscripciones)
- Incentiva a usuarios más comprometidos
- Crea un segmento de usuarios de mayor valor

**Desventajas:**
- Requiere que el valor del premium sea genuino y claro desde el día uno
- Si el free tier es bueno, la conversión a premium será baja
- Añade complejidad al producto (dos experiencias distintas)
- Puede crear una percepción de "modelo de dos velocidades" que daña la comunidad
- Prematura si no hay suficiente masa crítica para que los beneficios premium sean reales

**Conversión estimada:** 8-15% de usuarios activos

**Break-even con membresía:**
- A 1.000 usuarios activos, 10% premium × €7/mes × 12 = €8.400/año de membresías
- Contribución significativa pero no determinante en las primeras fases

**Viabilidad:** MEDIA-ALTA — viable pero prematura para el MVP.

---

### COMPARATIVA DE MODELOS

| Criterio | MODELO A | MODELO B | MODELO C |
|----------|----------|----------|----------|
| Simplicidad | ★★★★★ | ★★★☆☆ | ★★☆☆☆ |
| Ingresos en fase temprana | ★★☆☆☆ | ★★★☆☆ | ★★★☆☆ |
| Potencial de escala | ★★★☆☆ | ★★★★☆ | ★★★★★ |
| Riesgo operativo | ★★☆☆☆ | ★★★☆☆ | ★★★★☆ |
| Alineación con misión | ★★★★★ | ★★★★★ | ★★★★☆ |
| Viabilidad en cold start | ★★☆☆☆ | ★★★☆☆ | ★★★☆☆ |
| Complejidad de implementación | ★★☆☆☆ | ★★★☆☆ | ★★★★☆ |

**Recomendación:** Empezar con **MODELO B** como objetivo, pero hacer el MVP con la infraestructura del **MODELO A**. Incorporar patrocinios cuando haya suficiente comunidad para venderlos. Posponer membresía para una segunda fase.

Razón: El Modelo B es el más equilibrado entre ingresos reales y complejidad operativa. La membresía (Modelo C) se puede añadir después sin rediseñar la base. Empezar directamente con el Modelo C es prematuro y puede diluir el foco del equipo.

---

## D — TABLA DE ESCENARIOS

**IMPORTANTE: Todas las cifras siguientes son hipótesis de trabajo. Los números reales dependen de: (a) tasa de conversión de usuarios a compradores activos, (b) comisiones reales que acepten los partners, (c) gasto medio real de los usuarios, (d) capacidad del equipo para vender patrocinios. NADA de esto debe tratarse como proyección financiera hasta validar con datos reales.**

### Definiciones de métricas

- **Usuarios registrados:** tienen cuenta en FeedAPet
- **Usuarios activos:** al menos 1 acción/mes (visita, interacción, compra)
- **Usuarios compradores:** han realizado al menos 1 compra con un partner en los últimos 3 meses
- **Gasto medio canalizado:** estimado €250/año por usuario comprador (hipótesis inicial, requiere validación)
- **Comisión media:** 10% (hipótesis — mezcla de categorías)
- **Ingreso por usuario comprador/año:** €25 (hipótesis)
- **Conversión registrado → activo:** 60% (hipótesis)
- **Conversión activo → comprador:** 25% (hipótesis — muy conservador en fase inicial)

### Escenarios

| Escenario | Usuarios registrados | Usuarios activos | Usuarios compradores | Ingreso comisiones/año | Ingreso patrocinios/año | Ingreso total hipotético/año | Coste operativo estimado | Balance hipotético |
|-----------|---------------------|-----------------|---------------------|----------------------|------------------------|-----------------------------|--------------------------|--------------------|
| **100 usuarios** | 100 | 60 | 15 | €375 | €0-3.000 | €375-3.375 | €40.000-80.000 | Déficit severo |
| **500 usuarios** | 500 | 300 | 75 | €1.875 | €3.000-10.000 | €4.875-11.875 | €50.000-100.000 | Déficit significativo |
| **1.000 usuarios** | 1.000 | 600 | 150 | €3.750 | €10.000-25.000 | €13.750-28.750 | €70.000-130.000 | Déficit reducido |
| **5.000 usuarios** | 5.000 | 3.000 | 750 | €18.750 | €30.000-80.000 | €48.750-98.750 | €100.000-180.000 | Cerca del break-even o positivo |
| **10.000 usuarios** | 10.000 | 6.000 | 1.500 | €37.500 | €60.000-150.000 | €97.500-187.500 | €130.000-220.000 | Positivo en escenario optimista |

### Interpretación de los escenarios

**Conclusión incómoda pero honesta:** Con el modelo propuesto, FeedAPet necesita aproximadamente **5.000-8.000 usuarios activos** para aproximarse al break-even operativo, asumiendo que se consigan patrocinios significativos. Esto es un objetivo realista pero que requiere 18-36 meses de desarrollo y financiación inicial.

**Pregunta clave para Andrés y Annie:** ¿Tienen (o pueden conseguir) financiación para operar durante 2-3 años mientras se construye la masa crítica?

**Palancas que pueden acelerar el camino al break-even:**
1. Conseguir 2-3 partners grandes desde el inicio que paguen un "fee de lanzamiento" como primeros colaboradores.
2. Comenzar con un nicho muy específico (ej: solo alimentación de perros en una ciudad) antes de escalar.
3. Arrancar con patrocinios de empresas locales que tengan presupuestos de RSE accesibles.
4. Minimizar costes operativos al máximo en la fase inicial.

---

## E — NUEVO FLUJO ECONÓMICO

### Flujo completo de un euro que entra en FeedAPet

**Canal 1: Comisión de partner**
```
Usuario compra €100 en pienso con Partner A
→ Partner A paga 10% de comisión a FeedAPet = €10
→ FeedAPet distribuye internamente:
   → 40-50% a reserva operativa (€4-5)
   → 30-40% a fondo de impacto animal (€3-4)
   → 10-20% a reserva de crecimiento/marketing (€1-2)
```

**Canal 2: Patrocinio corporativo**
```
Empresa X paga €5.000 por campaña "Alimenta a 100 perros en enero"
→ FeedAPet recibe €5.000
→ Distribución:
   → €3.500 van directamente a los refugios participantes (70%)
   → €1.000 cubre costes de gestión, medición e impacto (20%)
   → €500 va a reserva operativa de FeedAPet (10%)
```

**Canal 3: Donación directa**
```
Usuario dona €20 a "Caso: Max, perro con parvo en Refugio Z"
→ FeedAPet puede gestionar sin fee (100% al refugio) → mayor confianza
→ O retener fee de gestión del 5-10% → ingreso pequeño pero reduce confianza
→ Recomendación: 100% al refugio en donaciones directas; ingresos de otros canales
```

### Estructura de distribución del fondo de impacto

Cuando hay fondos disponibles para impacto animal:

| Destino | % hipotético | Criterio de distribución |
|---------|--------------|--------------------------|
| Alimentación de refugios activos | 40-50% | Basado en número de animales y necesidad verificada |
| Esterilización y control reproductivo | 20-30% | Campañas programadas |
| Atención veterinaria urgente | 15-20% | Casos validados por el equipo |
| Proyectos de adopción | 10-15% | Apoyo a campañas de adopción |

**Nota:** Esta distribución es una hipótesis. La decisión final sobre cómo se distribuye el fondo de impacto es una de las más importantes del proyecto y debe ser aprobada por Andrés y Annie.

### ¿Tiene sentido blockchain en este flujo?

**Respuesta honesta:** Parcialmente, y de forma diferente a lo que se planteó antes.

En el nuevo modelo, blockchain no sirve para generar rendimiento. Puede aportar valor en:

| Función | ¿Blockchain aporta valor real? | Alternativa off-chain |
|---------|-------------------------------|----------------------|
| Registro público de donaciones | Sí — transparencia verificable por cualquiera | Base de datos pública en web |
| Distribución automática de fondos de campaña | Sí — si el volumen justifica el coste | Transferencia bancaria manual con reporte |
| Registro de impacto verificado | Posiblemente — si se necesita inmutabilidad | Dashboard web con auditoria externa |
| Membresía/credenciales de usuario | Posiblemente — NFTs como insignias | Base de datos off-chain |
| Gobernanza de decisiones de comunidad | Posiblemente — en fase más madura | Votación off-chain (Snapshot, etc.) |
| Pagos a partners | No — añade fricción sin valor | Transferencia bancaria estándar |
| Gestión de perfiles de usuario | No | Base de datos centralizada |
| Contenido (fotos, videos) | No | Almacenamiento en la nube |

**Conclusión provisional:** En la nueva visión, blockchain es una herramienta de transparencia y credibilidad, no el motor económico. Su uso debe ser justificado caso por caso. No todo debe estar on-chain.

---

## F — QUÉ CAMBIA DEL DOCUMENTO MAESTRO

### Secciones que quedan OBSOLETAS

| Sección | Contenido | Estado |
|---------|-----------|--------|
| §6 — Reglas Económicas | ROI 1.5-2.0% diario, ciclo 16 días, MAX_DEPOSIT 1 SOL | OBSOLETO — eliminar |
| §4 — Wallets del SCS | Pool_Principal 94%, CEO_Marketing 5%, Loteria_Paws 100% tickets | OBSOLETO — rediseñar completamente |
| §5 — deposit(), calculateROI(), withdraw() | Funciones del modelo anterior | OBSOLETO — no aplican |
| §5 — executeLottery(), claimLotteryPrize() | Si se mantiene lotería, rediseñar desde cero | EN REVISIÓN |
| §6 — CYCLE_EXPIRED, MIN_DEPOSIT, MAX_DEPOSIT | Lógica de ciclos de capital | OBSOLETO |

### Secciones que PERMANECEN VÁLIDAS (con adaptaciones)

| Sección | Contenido | Estado |
|---------|-----------|--------|
| §1 — Visión | Combinar financiero con responsabilidad social gamificada | PARCIALMENTE — la parte social permanece, lo financiero cambia |
| §2 — Producto y UX | Team Perro/Gato, Dashboard de impacto, Héroes del Mes, Muro de historias | VÁLIDO — es el núcleo de comunidad |
| §3 — Arquitectura | Separar on-chain / off-chain / híbrido | VÁLIDO — pero el contenido de cada capa cambia |
| §8 — Estados | Flujo de estados de campañas y refugios | VÁLIDO — adaptar a nuevo contexto |
| §9 — Seguridad | Mínimo privilegio, multisig, pausa de emergencia | VÁLIDO — sigue siendo principio guía |
| §10 — On-chain/Off-chain | Criterios de clasificación | VÁLIDO — pero las decisiones concretas cambian |
| §11 — UX/UI | User journey primero | VÁLIDO |
| §12 — Tests | Tests de seguridad, acceso no autorizado | VÁLIDO — añadir tests de modelo de negocio |
| §13 — Reglas para Claude Code | No inventar, no asumir | VÁLIDO — permanece como principio |
| §14 — Orden de implementación | Secuencia lógica | VÁLIDO — ajustar prioridades |

### Secciones que necesitan REDISEÑO COMPLETO

| Sección | Razón |
|---------|-------|
| §4 — Smart Contract (SCS) | El contrato ya no es una máquina de rendimiento. Rediseñar para transparencia e impacto |
| §6 — Reglas Económicas | Reemplazar completamente con nuevo modelo |
| §7 — Bloqueos antes de programar | Muchos ya no aplican; añadir los nuevos bloqueos del modelo B |

---

## G — REVISIÓN DE LOS 34 GAPS ANTERIORES

### Gaps RESUELTOS POR LA NUEVA VISIÓN

| ID | Gap original | Resolución |
|----|-------------|------------|
| GAP-ECO-01 | ROI insostenible (547-730% APY) | Resuelto: no hay promesa de ROI |
| GAP-ECO-02 | Contradicción en distribución de fondos (suma >100%) | Resuelto: la distribución de fondos se rediseña desde cero |
| GAP-ECO-04 | Insolvencia del pool | Resuelto: no hay pool de capital de usuarios |
| GAP-ECO-05 | Cálculo del umbral de liquidez | Resuelto: no aplica en el nuevo modelo |
| GAP-SC-04 | ROI on-chain vs off-chain | Resuelto: no hay cálculo de ROI |
| GAP-REG-01 | Riesgo de securities law | Significativamente reducido: sin promesa de rendimiento financiero |

### Gaps SIGUE SIENDO UN GAP (con nuevo contexto)

| ID | Gap original | Nuevo contexto |
|----|-------------|----------------|
| GAP-BIZ-02 | Riesgo legal | Sigue siendo gap — ahora enfocado en: disclosure de afiliados, gestión de donaciones, jurisdicción. Menos grave que antes pero requiere consulta |
| GAP-BIZ-03 | Validación de mercado | Sigue siendo el gap más importante. La nueva visión es mejor pero sin datos de usuarios reales |
| GAP-ECO-06 | Boost de eventos | Sigue siendo gap — si se mantiene alguna mecánica de boost, necesita rediseño |
| GAP-SC-05 | Pausa de emergencia | Sigue siendo gap si se usa blockchain |
| GAP-SC-06 | Upgradeabilidad del contrato | Sigue siendo gap si se usa blockchain |
| GAP-SC-07 | Control de administración | Sigue siendo gap — quién controla fondos y decisiones de impacto |
| GAP-SC-08 | Validación de video testimonial | Sigue siendo gap si se mantienen reclamaciones basadas en evidencia |
| GAP-ARCH-01 | Stack tecnológico | Sigue siendo gap — ninguna decisión técnica tomada |
| GAP-ARCH-02 | Backend | Sigue siendo gap |
| GAP-ARCH-03 | Verificación de refugios | Sigue siendo gap — crítico en el nuevo modelo |
| GAP-ARCH-04 | Almacenamiento | Sigue siendo gap |
| GAP-UX-01 a 05 | Todos los gaps de UX | Siguen siendo gaps — el flujo de usuario cambia radicalmente |
| GAP-SEC-01 | Ataque Sybil | Reducido — sin MAX_DEPOSIT ya no es crítico, pero si hay membresías sí |
| GAP-SEC-04 | Centralización económica | Sigue siendo gap — quién controla el fondo de impacto |
| GAP-TEST-01 a 03 | Testing | Siguen siendo gaps |
| GAP-REG-04 | Fundación/Donaciones | Sigue siendo gap — más relevante ahora que las donaciones son centrales |

### Gaps YA NO APLICAN

| ID | Gap original | Razón |
|----|-------------|-------|
| GAP-ECO-03 | Mecánica lotería Paws como requisito de retiro | La lotería deja de ser un mecanismo financiero central |
| GAP-SC-01 | Funciones deposit/withdraw/calculateROI | Estas funciones desaparecen en el nuevo modelo |
| GAP-SC-02 | Estados DEPOSITED/ACTIVE/CYCLE_EXPIRED | El ciclo de capital no existe en el nuevo modelo |
| GAP-SC-03 | Aleatoriedad de lotería | Si se elimina la lotería, este gap desaparece. Si se mantiene como feature gamificado opcional, reducir su prioridad |
| GAP-SEC-02 | Abuso del sistema de referidos como extracción de capital | Si los referidos no generan pagos en dinero, el vector de abuso es menor |
| GAP-SEC-05 | Front-running en lotería financiera | Sin mecanismo financiero de lotería, este riesgo desaparece |
| GAP-SEC-06 | Reentrancy en modelo de capital | Sin modelo de capital, este ataque no aplica de la misma forma |
| GAP-ECO-08 | Wallet Maratones/Eventos sin definición | El concepto cambia; ahora son campañas patrocinadas con diseño propio |

---

## H — NUEVOS GAPS QUE APARECEN CON LA NUEVA VISIÓN

### GAP-NEW-01 — El problema del arranque en frío (CRÍTICO)
**Área:** Modelo de Negocio
**Problema:** El círculo virtuoso (comunidad → partners → ahorro → más comunidad) solo funciona con masa crítica. Sin usuarios, los partners no vienen. Sin partners, los usuarios no tienen razón para quedarse. ¿Cómo se rompe este bloqueo inicial?
**Información que falta:** ¿Qué ofrece FeedAPet a los primeros 100 usuarios antes de tener partners? ¿Qué ofrece a los primeros partners antes de tener comunidad?
**Riesgo:** CRÍTICO
**Quién decide:** Andrés + Annie

### GAP-NEW-02 — Modelo de atribución de comisiones (ALTO)
**Área:** Técnico / Negocio
**Problema:** Para pagar comisiones, FeedAPet necesita saber que una compra en un partner vino de un usuario de FeedAPet. ¿Cómo se rastrean? ¿Código de descuento? ¿Link de afiliado con cookie? ¿Integración técnica directa con el partner? Cada opción tiene implicaciones técnicas, de privacidad y de negociación.
**Riesgo:** ALTO
**Quién decide:** Andrés (técnico) + Annie (producto/partners)

### GAP-NEW-03 — Disclosure de relaciones de afiliado (ALTO)
**Área:** Regulación / Confianza
**Problema:** En la mayoría de jurisdicciones (EU, España, LATAM) es obligatorio informar al usuario de que FeedAPet recibe comisión cuando compra en un partner. Si no se hace, hay riesgo regulatorio y, más importante, de pérdida de confianza cuando los usuarios lo descubran.
**Riesgo:** ALTO — tanto legal como de confianza de usuario
**Quién decide:** Andrés + Annie + Abogado

### GAP-NEW-04 — Gobernanza del fondo de impacto (CRÍTICO)
**Área:** Negocio / Regulación
**Problema:** ¿Quién decide cómo se gasta el fondo de impacto animal? ¿El equipo fundador? ¿Una votación de la comunidad? ¿Un comité? Esta decisión afecta la confianza de usuarios, sponsors y refugios. Si el equipo lo decide unilateralmente, hay riesgo de centralización y opacidad.
**Riesgo:** ALTO
**Quién decide:** Andrés + Annie

### GAP-NEW-05 — Medición y verificación del impacto (ALTO)
**Área:** Operaciones / Confianza
**Problema:** Si el valor diferencial de FeedAPet frente a otras plataformas de comunidad pet es el impacto verificable, ese impacto debe ser genuinamente verificable. ¿Cómo se demuestra que €X fue a alimentar a Y animales en Z refugio? ¿Facturas? ¿Fotos con timestamp? ¿Auditoría externa?
**Riesgo:** ALTO — si el impacto no es verificable, el diferencial desaparece
**Quién decide:** Andrés + Annie

### GAP-NEW-06 — Proceso de certificación de partners (ALTO)
**Área:** Operaciones
**Problema:** No cualquier proveedor de servicios pet debe ser un partner de FeedAPet. Si un partner tiene mala calidad o trata mal a los animales, contamina la marca. ¿Cómo se valida, certifica y monitorizan los partners?
**Riesgo:** ALTO
**Quién decide:** Annie (producto) + Andrés (operaciones)

### GAP-NEW-07 — Financiación del período de arranque (CRÍTICO)
**Área:** Negocio
**Problema:** El break-even hipotético está a 5.000-8.000 usuarios activos. Llegar ahí puede tomar 18-36 meses. ¿Con qué capital se financia ese período? ¿Ahorros del equipo? ¿Inversores? ¿Subvenciones? ¿Preventa de membresías? Sin respuesta a esto, el proyecto no puede iniciarse responsablemente.
**Riesgo:** CRÍTICO
**Quién decide:** Andrés + Annie

### GAP-NEW-08 — Propuesta de valor para partners en la fase de 0 usuarios (ALTO)
**Área:** Modelo de Negocio / Ventas
**Problema:** ¿Por qué un partner aceptaría un acuerdo de comisión con FeedAPet cuando aún tiene pocos o ningún usuario? Se necesita una propuesta de valor alternativa para la fase de arranque (ej: fee fijo de "partner fundador", visibilidad en el lanzamiento, acceso prioritario cuando la comunidad crezca).
**Riesgo:** ALTO
**Quién decide:** Andrés + Annie

### GAP-NEW-09 — Competencia con plataformas establecidas (MEDIO)
**Área:** Modelo de Negocio
**Problema:** El modelo de afiliación/partners en el sector pet ya tiene actores establecidos (Amazon afiliados, Zooplus, PetShop, Tiendanimal con programas propios, etc.). FeedAPet necesita un diferencial claro. La hipótesis es que el componente de impacto animal y comunidad es ese diferencial. ¿Es suficiente para atraer usuarios y partners?
**Riesgo:** MEDIO
**Quién decide:** Andrés + Annie (validar con usuarios reales)

### GAP-NEW-10 — GDPR y privacidad en tracking de compras (ALTO)
**Área:** Regulación / Técnico
**Problema:** Rastrear las compras de usuarios con partners para calcular comisiones implica recopilar y procesar datos de comportamiento de compra. En la UE, esto está sujeto a GDPR. Se necesita: aviso de privacidad adecuado, base legal para el procesamiento, y en algunos casos, consentimiento explícito.
**Riesgo:** ALTO (si operan en UE o para usuarios de UE)
**Quién decide:** Andrés + Annie + Abogado

---

## I — QUÉ DEBEMOS VALIDAR CON DATOS REALES

### Antes de comprometer dinero de desarrollo

**V-01: ¿Existe demanda real?**
- Hablar con 30-50 propietarios de mascotas en el mercado objetivo
- Pregunta clave: "Si existiera una plataforma donde tu amor por los animales tiene impacto verificable Y puedes ahorrar en lo que ya compras para tu mascota, ¿la usarías? ¿Cuánto valdría para ti?"
- Objetivo: NPS informal > 50, al menos 20 personas que digan "definitivamente sí"

**V-02: ¿Qué gasto real hacen en mascotas?**
- Datos de mercado del sector pet en la jurisdicción objetivo
- Encuesta de gasto real mensual/anual: alimentación, vet, accesorios, seguros, etc.
- Validar la hipótesis de €600-1.200/año/usuario

**V-03: ¿Qué parte canalizarían por FeedAPet?**
- Pregunta directa: si FeedAPet tuviera acuerdos con las marcas que ya compras, ¿comprarías a través de FeedAPet?
- Contexto: con o sin descuento adicional, solo porque el beneficio va a animales

**V-04: ¿Los partners hablan?**
- Contactar 5-10 potenciales partners (tienda de alimentación, clínica veterinaria, seguro de mascotas)
- Pregunta: ¿Estarían dispuestos a pagar comisión por acceso a clientes cualificados de FeedAPet?
- ¿Cuánto? ¿Qué condiciones necesitan?
- Esto es la prueba de fuego del modelo antes de construir nada

**V-05: ¿Los refugios necesitan esto y lo valoran?**
- Contactar 3-5 refugios o protectoras reales
- Pregunta: ¿Qué necesitan que FeedAPet les aporte? ¿Qué les falta ahora?
- ¿Están dispuestos a ser transparentes con el uso de fondos?

**V-06: ¿Tienen sponsors interesados?**
- 2-3 conversaciones con empresas medianas con presupuesto de RSE
- ¿Pagarían por impacto animal verificable + visibilidad ante comunidad de propietarios de mascotas?
- ¿A qué precio? ¿Qué necesitan para cerrar un acuerdo?

**V-07: ¿Qué es el mercado objetivo exacto?**
- País/región de lanzamiento inicial
- Tipo de usuario: amante de animales genérico / propietario de mascota activo / adoptante
- ¿Es un producto para España, LATAM, ambos? ¿Qué implicaciones tiene cada opción?

---

## J — DECISIONES QUE DEBEN TOMAR ANDRÉS Y ANNIE

### Decisiones bloqueantes (antes de cualquier cosa)

**DN-01: ¿Cuál es el mercado objetivo inicial?**
Un producto para España y uno para México son productos diferentes en términos de partners, regulación, idioma formal y cultura. La primera decisión estratégica es dónde se lanza primero.
- Opciones: España / México / Colombia / Otro / Ambos desde el inicio (riesgo: diluir foco)

**DN-02: ¿Tienen financiación para el período de arranque?**
El modelo necesita 18-36 meses para llegar a break-even. ¿Con qué se paga ese período? Esta es la segunda pregunta más importante después de la fuente de ingresos.
- Opciones: ahorros propios / inversores / subvenciones / ingresos externos mientras se construye / otro

**DN-03: ¿Van a hacer las entrevistas de validación antes de construir?**
Recomendación fuerte: sí. Pero es una decisión de Andrés y Annie. Construir sin validar es aceptar el riesgo de construir algo que nadie quiere.

**DN-04: ¿Mantienen o eliminan la lotería Paws?**
En el nuevo modelo, la lotería no es un mecanismo financiero. Podría mantenerse como mecánica de gamificación (ganar un "Paws Prize" de producto de partner, no dinero). Esto cambia completamente el perfil regulatorio. ¿Se mantiene, se elimina o se rediseña?

**DN-05: ¿Cómo se gobierna el fondo de impacto?**
¿El equipo decide cómo se gasta? ¿La comunidad vota? ¿Un comité externo? Esta decisión afecta la confianza de todos los stakeholders.

**DN-06: ¿Quieren usar blockchain en el MVP?**
La nueva visión no requiere blockchain para funcionar. Blockchain puede añadirse después para transparencia. ¿Es blockchain una prioridad para el MVP o se construye primero la plataforma web tradicional y se añade blockchain después?

**DN-07: ¿Cuándo entra la consulta legal?**
El nuevo modelo tiene un perfil legal más limpio que el anterior, pero sigue habiendo aspectos que requieren consulta: gestión de donaciones, disclosure de afiliados, privacidad de datos. ¿Cuándo y con quién?

**DN-08: ¿Quién hace las ventas de partners y patrocinios?**
Este modelo requiere capacidad comercial B2B. ¿Lo hace uno de los fundadores? ¿Se contrata a alguien? ¿Se trabaja con un agente?

---

## K — PROPUESTA DE ROADMAP ACTUALIZADO

### Fase 0 — Validación (4-8 semanas, sin código)
**Objetivo:** Confirmar que el modelo tiene demanda real antes de invertir en desarrollo.

- Semana 1-2: Definir mercado objetivo (país, tipo de usuario)
- Semana 1-2: Consulta legal inicial (modelo de afiliados, donaciones, privacidad)
- Semana 2-4: 30 entrevistas con usuarios potenciales
- Semana 3-5: 10 conversaciones con potenciales partners
- Semana 4-6: 3-5 conversaciones con refugios/protectoras
- Semana 5-7: 2-3 conversaciones con potenciales sponsors
- Semana 7-8: Análisis de resultados y decisión de continuar / pivotar / detener

**Output esperado:** Datos reales que confirmen o refuten las hipótesis del modelo. Sin este output, cualquier paso siguiente es especulación.

### Fase 1 — MVP de Comunidad (3-4 meses)
**Solo si Fase 0 valida la demanda.**
**Objetivo:** Plataforma mínima con comunidad real y 1-2 partners.

- Plataforma web sencilla (no DApp todavía): perfil de usuario, perfiles de refugios, casos de animales
- Dashboard de impacto básico
- Integración con 1-2 partners (sistema de afiliados básico)
- Muro de historias y actualizaciones de refugios
- Sin blockchain en esta fase — construir confianza con transparencia simple primero

**Output esperado:** 100-500 usuarios registrados, 1-2 acuerdos de partner en marcha, primeros ingresos (pequeños).

### Fase 2 — Escala de Partners y Primeros Sponsors (4-6 meses)
**Solo si Fase 1 consigue tracción real.**
**Objetivo:** 500-2.000 usuarios, catálogo de partners ampliado, primeras campañas patrocinadas.

- Incorporar 5-10 partners en diferentes categorías
- Primeras campañas de sponsor (€1.000-5.000)
- Sistema de medición de impacto
- Gamificación básica (insignias, niveles de padrino)
- Empieza el análisis de si blockchain añade valor real en esta fase

### Fase 3 — Transparencia Blockchain (3-4 meses)
**Solo si el modelo de negocio está funcionando.**
**Objetivo:** Añadir capa de transparencia on-chain donde genuinamente aporte valor.

- Registro on-chain de donaciones y distribución de fondos de campañas
- NFT-badges de impacto (opcional)
- Smart contract para distribución automática de fondos de campaña (si el volumen lo justifica)
- Gobernanza on-chain (versión beta)

### Fase 4 — Crecimiento y Membresía (ongoing)
- Marketplace de servicios (si tiene sentido en este punto)
- Membresía premium cuando el valor sea claro
- Expansión geográfica
- Patrocinios de gran escala

---

## L — RECOMENDACIÓN FINAL

### Lo que funciona en la nueva visión

**1. El diagnóstico es correcto.** El abandono del modelo de ROI diario es la decisión correcta. Era insostenible económicamente y riesgoso legalmente. Esta es la mejor decisión que Andrés y Annie han tomado hasta ahora.

**2. El círculo virtuoso tiene sentido.** El modelo de comunidad → partners → ahorro → impacto es un modelo de negocio probado. Empresas como Costco, BuyWithMe, o modelos de compra colectiva han demostrado que el poder de negociación colectivo crea valor real.

**3. El diferencial de impacto es genuino.** En un mercado saturado de afiliados y comparadores, el componente de impacto animal verificable es un diferencial real. Si el impacto es real, medible y transparente, puede convertirse en el motor de crecimiento más potente del producto.

**4. El orden de implementación propuesto (primero validar, luego construir) es correcto.** Nadie debería escribir una sola línea de código hasta tener conversaciones reales con usuarios y partners.

### Lo que no funciona todavía (crítica honesta)

**1. El problema del arranque en frío no tiene solución todavía.** La visión describe un volante que funciona con escala, pero no explica cómo arrancar el volante. Esta es la pregunta más importante sin respuesta.

**2. Las cifras de break-even son preocupantes.** Necesitar 5.000-8.000 usuarios activos para equilibrar costes implica una inversión significativa y tiempo (18-36 meses). Sin un plan de financiación del período de arranque, el proyecto corre el riesgo de quedarse sin recursos antes de alcanzar la masa crítica.

**3. La cadena de valor con partners es más compleja de lo que parece.** Conseguir comisiones de partners requiere: negociación B2B, contratos, sistema técnico de atribución, gestión de relaciones, y tiempo. No es un proceso automático.

**4. El uso de blockchain en el nuevo modelo debe justificarse, no asumirse.** El modelo nuevo puede funcionar perfectamente como una plataforma web tradicional con buena transparencia. Añadir blockchain antes de demostrar que el producto tiene demanda puede dilapidar tiempo y dinero en infraestructura innecesaria.

**5. El riesgo regulatorio en donaciones es real.** Si FeedAPet gestiona donaciones de usuarios a refugios, puede estar sujeta a regulación de entidades sin ánimo de lucro. Esto varía por jurisdicción pero no puede ignorarse.

### La recomendación en 6 puntos

1. **Primero, hagan las entrevistas de validación.** 30 usuarios, 10 partners, 5 refugios, 3 sponsors. Tómese 4-6 semanas. Este paso no requiere código ni inversión y puede ahorrar meses de trabajo en la dirección equivocada.

2. **Definan cómo financian el período de arranque.** Sin respuesta a esto, no hay proyecto viable.

3. **Definan el mercado objetivo inicial.** Un producto para todos los mercados hispanohablantes simultáneamente es un producto para ningún mercado. Escojan uno, consigan tracción, después expandan.

4. **No empiecen con blockchain.** Construyan la plataforma como producto web tradicional. Añadan blockchain cuando (a) el modelo esté funcionando y (b) tengan un caso de uso específico donde blockchain añada valor que no se puede conseguir de otra forma.

5. **Diseñen la propuesta de valor para los primeros partners.** ¿Por qué un partner debería unirse cuando aún no hay comunidad? Esta es la pregunta de ventas más difícil y debe tener respuesta antes del primer acuerdo.

6. **Hagan la consulta legal antes de aceptar dinero real.** El nuevo modelo es significativamente más limpio que el anterior, pero la gestión de donaciones, el disclosure de afiliados y la privacidad de datos son áreas que requieren orientación legal en la jurisdicción donde operen.

**Veredicto:** La nueva visión de FeedAPet es un modelo de negocio plausible y éticamente sólido. Pero "plausible" no es lo mismo que "validado". El siguiente paso no es escribir código. Es salir a hablar con las personas reales que deberían usar y financiar este producto.

---

*Documento generado el 2026-08-10 — Claude Code*
*Estado: ANÁLISIS ESTRATÉGICO — sin código escrito, sin contratos creados, sin decisiones económicas tomadas*
*Próximo paso: decisiones de Andrés y Annie*
