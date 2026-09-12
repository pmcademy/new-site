import type { Metadata } from "next";

import LegacyPage from "@/components/layout/LegacyPage";

export const metadata: Metadata = { title: "Product Manager Foundations" };

/**
 * PRESERVED ROUTE, /product-manager-foundations
 * Live on pmcademy.com today. Kept so links, ads and search results keep
 * resolving. Port the real content in by passing children to <LegacyPage>.
 */
export default function Page() {
  return <LegacyPage href="/product-manager-foundations" />;
}
