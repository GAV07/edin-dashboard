import { Container } from "@/components/Container";
import { Metadata } from "next";
import ProFormaDashboard from "@/components/ProFormaDashboard";

export const metadata: Metadata = {
  title: "Pro Forma | Investor Dashboard",
  description: "Edin Capital Fund 1 Pro Forma Model & Growth Projections",
};

export default function ProFormaPage() {
  return <ProFormaDashboard />;
}
