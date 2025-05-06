import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import DashboardCTA from "@/components/DashboardCTA";
import Stats from "@/components/Stats";
import DashboardMaterials from "@/components/DashboardMaterials";
export default function Home() {
  return (
    <Container>
      <Heading className="font-black">Edin Capital Dashboard</Heading>
      <div className="overflow-hidden my-8 rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:p-6">
          <DashboardCTA />
        </div>
      </div>
      <Stats />
      <DashboardMaterials />
      
    </Container>
  );
}
