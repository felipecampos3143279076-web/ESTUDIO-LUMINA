import AboutSummary from "@/components/about/AboutSummary";
import Contact from "@/components/contact/Contact";
import Hero from "@/components/hero/Hero";
import FeaturedProjects from "@/components/projects/FeaturedProjects";
import Stats from "@/components/stats/Stats";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <AboutSummary />
      <FeaturedProjects />
      <Stats />
      <Contact />
    </main>
  );
}
