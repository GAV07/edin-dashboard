import { Container } from "@/components/Container";
import { Metadata } from "next";
import VentureBondCalculator from "@/components/VentureBond";

export const metadata: Metadata = {
  title: "Venture Bond | Investor Dashboard",
  description: "Venture Bond",
};

export default function VentureBondPage() {
  return (
    <>
      <VentureBondCalculator />
    </>
  );
}
