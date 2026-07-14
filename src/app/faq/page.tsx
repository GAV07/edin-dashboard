import { Metadata } from "next";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
  title: "FAQ | Investor Dashboard",
  description: "Edin Capital Fund I — Frequently Asked Questions",
};

export default function FAQPage() {
  return <FAQ />;
}