# lib/domain

Lógica de negocio pura (cálculo de comisiones, reglas de distribución del Modelo B), desacoplada de Next.js y de Supabase.

Se mantiene separada a propósito: cuando llegue el momento de evaluar blockchain (Solana + Rust + Anchor, ver `docs/DECISIONS_REQUIRED.md` DN-06), esta capa es el punto de conexión — no requiere reescribir rutas, componentes ni acciones de servidor.

Sin lógica de ROI, staking, ni rendimiento al usuario — excluido explícitamente del Modelo B (ver `docs/MVP_SCOPE.md`).

## Contenido actual

- `impact-fund.ts` — reparto de una comisión de partner entre reserva operativa/fondo de impacto/crecimiento, según `docs/MODELO_ECONOMICO_B.md`. Los porcentajes son un punto medio de las hipótesis documentadas, no datos validados — ajustar en ese archivo cuando haya cifras reales.
