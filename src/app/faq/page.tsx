import { Container } from "@/components/Container";
import { Metadata } from "next";
import ProFormaDashboard from "@/components/ProFormaDashboard";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
  title: "Pro Forma | Investor Dashboard",
  description: "Edin Capital Fund 1 Pro Forma Model & Growth Projections",
};

export default function FAQPage() {
  return <FAQ />;
}