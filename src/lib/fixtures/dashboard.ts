import type { ConfirmedPurchase } from "@/lib/domain/impact-summary";
import type { ActivityEvent, FeaturedCampaign, FeaturedCase } from "./types";

/** Compras confirmadas de ejemplo — misma forma que purchase_attributions. */
export const confirmedPurchases: ConfirmedPurchase[] = [
  { amount: 47.9, savingsAmount: 7.19, commissionAmount: 5.75 },
  { amount: 58.0, savingsAmount: 11.6, commissionAmount: 6.96 },
  { amount: 32.0, savingsAmount: 3.2, commissionAmount: 1.92 },
];

export const activityFeed: ActivityEvent[] = [
  {
    id: "act-1",
    type: "compra",
    label: "Compra en PetFood Ibérica",
    detail: "20% en tu primer pedido",
    amount: 47.9,
    date: "2026-08-08",
  },
  {
    id: "act-2",
    type: "donacion",
    label: "Donación a caso de Max",
    detail: "Refugio San Roque",
    amount: 20,
    date: "2026-08-05",
  },
  {
    id: "act-3",
    type: "score",
    label: "Subiste a nivel Guardián",
    detail: "Por constancia y compras verificadas",
    date: "2026-08-03",
  },
  {
    id: "act-4",
    type: "compra",
    label: "Compra en Mundo Animal",
    detail: "10% en accesorios y juguetes",
    amount: 32.0,
    date: "2026-07-29",
  },
];

export const featuredCases: FeaturedCase[] = [
  {
    id: "case-max",
    title: "Max necesita cirugía",
    shelterName: "Refugio San Roque",
    status: "en_proceso",
    goalAmount: 500,
    raisedAmount: 320,
  },
  {
    id: "case-luna",
    title: "Luna busca hogar",
    shelterName: "Protectora Els Amics",
    status: "en_ejecucion",
    goalAmount: 200,
    raisedAmount: 180,
  },
];

export const featuredCampaigns: FeaturedCampaign[] = [
  {
    id: "camp-1",
    sponsorName: "Marca X",
    title: "Alimenta a 50 perros en agosto",
    shelterCount: 3,
    status: "active",
  },
];
