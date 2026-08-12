export default function AdminPartnersPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-xl font-semibold">Partners (admin)</h1>
      <p className="text-muted-foreground mt-2 text-sm">
        Alta y edición de partners (ficha, categoría por defecto, tasa de
        comisión de fallback). Las ofertas de cada partner se gestionan en{" "}
        <code>/admin/ofertas</code> — pendiente de implementar.
      </p>
    </main>
  );
}
