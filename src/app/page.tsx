import { Metadata } from "next";
import DashboardClient from "@/components/DashboardClient";

export const metadata: Metadata = {
  title: "Edin Investor Dashboard",
  description: "Investor portal covering key data, metrics, and documents for Edin Capital.",
};

export default function HomePage() {
  return <DashboardClient />;
}
