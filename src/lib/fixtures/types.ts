/**
 * Tipos de los datos de ejemplo — misma forma que las tablas de
 * supabase/migrations/0001_init.sql, para que sustituir fixtures por
 * consultas reales sea un cambio de origen de datos, no de pantalla.
 */

export type CategoryKind = "producto" | "servicio" | "ambos";

export interface Category {
  id: string;
  name: string;
  slug: string;
  kind: CategoryKind;
}

export type PartnerStatus = "pending" | "active" | "inactive";

export interface Partner {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  status: PartnerStatus;
  isFoundingPartner: boolean;
  logoInitial: string;
  websiteUrl: string;
  shortDescription: string;
  longDescription: string;
  city: string;
}

export type DiscountType = "percentage" | "fixed" | "other";
export type OfferStatus = "draft" | "active" | "inactive";

export interface Offer {
  id: string;
  partnerId: string;
  categoryId: string | null;
  title: string;
  description: string;
  discountType: DiscountType;
  discountValue: number | null;
  commissionRate: number;
  terms: string;
  status: OfferStatus;
  averageTicket: number;
}

export type ActivityEventType = "compra" | "donacion" | "score";

export interface ActivityEvent {
  id: string;
  type: ActivityEventType;
  label: string;
  detail: string;
  amount?: number;
  date: string;
}

export interface FeaturedCase {
  id: string;
  title: string;
  shelterName: string;
  status: "en_proceso" | "objetivo_cumplido" | "en_ejecucion";
  goalAmount: number;
  raisedAmount: number;
}

export interface FeaturedCampaign {
  id: string;
  sponsorName: string;
  title: string;
  shelterCount: number;
  status: "prospecting" | "active" | "completed";
}
