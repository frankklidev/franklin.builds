import SEO from "../components/SEO";

import Hero from "../sections/Hero";
import Services from "../sections/Services";
import About from "../sections/About";
import CTA from "../sections/CTA";
import ComoTrabajo from "../sections/HowWork";
import Testimonios from "../sections/Testimonios";
import Projects from "./Projects";

export default function Home() {
  return (
    <>
      <SEO
        title="franklin.builds | Webs y soluciones digitales para negocios"
        description="Desarrollo webs, catálogos digitales y sistemas para negocios que quieren verse más profesionales, generar confianza y vender mejor."
        url="https://franklinbuilds.tuplataformaweb.com/"
        image="https://franklinbuilds.tuplataformaweb.com/images/logo-share.png"
      />

      <main className="flex min-h-screen flex-col bg-[#070707] text-white">
        <Hero />

        <section className="relative min-h-screen overflow-hidden">
          <Services />
        </section>

        <Projects />

        <ComoTrabajo />
        <Testimonios />
        <About />
        <CTA />
      </main>
    </>
  );
}