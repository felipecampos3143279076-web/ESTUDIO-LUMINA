import type { Metadata } from "next";
import InnerPage from "@/components/layout/InnerPage";
import ServicesArchitecture from "@/components/services-page/ServicesArchitecture";
import ServicesCta from "@/components/services-page/ServicesCta";
import ServicesInteriors from "@/components/services-page/ServicesInteriors";
import ServicesIntro from "@/components/services-page/ServicesIntro";
import ServicesProcess from "@/components/services-page/ServicesProcess";
import ServicesVisualization from "@/components/services-page/ServicesVisualization";

export const metadata: Metadata = {
  title: "Servicios · Estudio Lúmina",
  description: "Servicios de arquitectura y diseño interior.",
};

export default function ServicesPage() {
  return (
    <InnerPage>
      <ServicesIntro />
      <ServicesArchitecture />
      <ServicesInteriors />
      <ServicesVisualization />
      <ServicesProcess />
      <ServicesCta />
    </InnerPage>
  );
}
