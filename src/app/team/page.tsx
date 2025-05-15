import { Container } from "@/components/Container";
import { Metadata } from "next";
import Team from "@/components/Team";

export const metadata: Metadata = {
  title: "Team | Investor Dashboard",
  description: "Meet the team behind Edin Capital.",
};

export default function TeamPage() {
  return (
    <>
      <Team />
    </>
  );
}
