import Hero from '../sections/Hero';
import Services from '../sections/Services';
import About from '../sections/About';
import CTA from '../sections/CTA';
import { useDocumentTitle, useMeta, useOG } from '../lib/usePage';
import ComoTrabajo from '../sections/HowWork';
import Testimonios from '../sections/Testimonios';
import Projects from './Projects';

export default function Home() {
  // SEO básico
  useDocumentTitle('franklin.builds — Diseño, Web & Estrategia');
  useMeta(
    'description',
    'Diseño minimalista, desarrollo web y estrategia para marcas que quieren crecer.'
  );
  useOG('og:title', 'franklin.builds — Diseño, Web & Estrategia');
  useOG(
    'og:description',
    'Diseño minimalista, desarrollo web y estrategia para marcas que quieren crecer.'
  );
  useOG('og:image', '/cover.jpg');

  return (
    <main className='flex flex-col min-h-screen bg-white text-black'>
      {/* HERO (tu componente ya maneja altura/estilos) */}
      <Hero />

      {/* SERVICES: ocupa toda la pantalla, sin márgenes extras */}
      <section className='relative h-screen overflow-hidden'>
        <Services />
      </section>

      {/* PROJECTS: full-bleed, sin wrapper con padding/bordes para no cortar el fondo */}
      <Projects  />

      <ComoTrabajo />
      <Testimonios />
      <About />
      <CTA />
    </main>
  );
}
