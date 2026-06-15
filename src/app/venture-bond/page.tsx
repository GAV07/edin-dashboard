import { Metadata } from "next";
import VentureBondCalculator from "@/components/VentureBond";

export const metadata: Metadata = {
  title: "Venture Bond | Investor Dashboard",
  description: "Venture Bond structure and return calculator.",
};

export default function VentureBondPage() {
  return <VentureBondCalculator />;
}
