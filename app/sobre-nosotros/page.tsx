import type { Metadata } from "next";
import AboutIntro from "@/components/about-page/AboutIntro";
import AboutPhilosophy from "@/components/about-page/AboutPhilosophy";
import AboutCta from "@/components/about-page/AboutCta";
import AboutProcess from "@/components/about-page/AboutProcess";
import AboutVision from "@/components/about-page/AboutVision";
import InnerPage from "@/components/layout/InnerPage";

export const metadata: Metadata = {
  title: "Sobre nosotros · Estudio Lúmina",
  description: "Estudio de arquitectura y diseño interior.",
};

export default function AboutPage() {
  return (
    <InnerPage>
      <AboutIntro />
      <AboutPhilosophy />
      <AboutProcess />
      <AboutVision />
      <AboutCta />
    </InnerPage>
  );
}
