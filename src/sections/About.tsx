import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const title = sectionRef.current!.querySelector(".about-title");
      const text  = sectionRef.current!.querySelector(".about-text");

      // Estado inicial consistente
      gsap.set([title, text], { opacity: 0, y: 24 });

      // Reveal del título
      gsap.to(title, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: "top 85%",
          once: true, // corre una sola vez
        },
      });

      // Reveal del párrafo (apenas después)
      gsap.to(text, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: "top 85%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 md:py-28 border-t border-neutral-200/60"
    >
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="about-title text-3xl md:text-5xl font-semibold tracking-tight mb-6">
          Sobre mí
        </h2>
        <p className="about-text text-neutral-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          Soy Franklin, fundador de <span className="font-semibold">franklin.builds</span>.
          Ayudo a negocios cubanos y latinoamericanos a modernizar su imagen digital.
          No solo construyo sitios web, sino experiencias que generan resultados reales.
        </p>
      </div>
    </section>
  );
}