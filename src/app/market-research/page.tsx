import { Metadata } from "next";
import MarketResearch from "@/components/MarketResearch";

export const metadata: Metadata = {
  title: "Market Research | Investor Dashboard",
  description: "Curated research and data from authoritative sources supporting the Edin Capital investment thesis.",
};

export default function MarketResearchPage() {
  return <MarketResearch />;
}
