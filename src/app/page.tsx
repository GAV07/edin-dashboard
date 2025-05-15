import { Metadata } from "next";
import DashboardClient from "@/components/DashboardClient";

export const metadata: Metadata = {
  title: "Home | Investor Dashboard",
  description: "Dashboard overview of key metrics and data from our portfolio.",
};

export default function HomePage() {
  return <DashboardClient />;
}
