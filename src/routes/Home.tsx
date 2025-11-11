import Hero from "../sections/Hero";
import Services from "../sections/Services";
import Projects from "../sections/Projects";
import About from "../sections/About";
import CTA from "../sections/CTA";
import { useDocumentTitle, useMeta, useOG } from "../lib/usePage";

export default function Home() {
  // SEO básico
  useDocumentTitle("franklin.builds — Diseño, Web & Estrategia");
  useMeta(
    "description",
    "Diseño minimalista, desarrollo web y estrategia para marcas que quieren crecer."
  );
  useOG("og:title", "franklin.builds — Diseño, Web & Estrategia");
  useOG(
    "og:description",
    "Diseño minimalista, desarrollo web y estrategia para marcas que quieren crecer."
  );
  useOG("og:image", "/cover.jpg");

  return (
    <main className="flex flex-col min-h-screen bg-white text-black">
      {/* HERO (tu componente ya maneja altura/estilos) */}
      <Hero />

      {/* SERVICES: ocupa toda la pantalla, sin márgenes extras */}
      <section className="relative h-screen overflow-hidden">
        <Services />
      </section>

      {/* PROJECTS: full-bleed, sin wrapper con padding/bordes para no cortar el fondo */}
      <Projects limit={3} />

      {/* ABOUT y CTA quedan tal cual (si quieres que About también llene más, 
          puedes darle min-h-[80vh] dentro del componente About) */}
      <About />
      <CTA />
    </main>
  );
}