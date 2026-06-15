import { Metadata } from "next";
import ProFormaDashboard from "@/components/ProFormaDashboard";

export const metadata: Metadata = {
  title: "Pro Forma | Investor Dashboard",
  description: "Venture Bond Pro Forma Dashboard with scenario analysis.",
};

export default function ProFormaPage() {
  return <ProFormaDashboard />;
}
