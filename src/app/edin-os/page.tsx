import { Metadata } from "next";
import EdinOSComponent from "../../components/EdinOSComponent";

export const metadata: Metadata = {
  title: "EdinOS Platform Roadmap | Investor Dashboard",
  description: "EdinOS: Our internal operational platform powering the Venture Bond — from profit-sharing calculations to portfolio intelligence.",
};

export default function EdinOSPage() {
  return <EdinOSComponent />;
} 