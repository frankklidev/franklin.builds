import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const elements = sectionRef.current!.querySelectorAll(".cta-item");

      // Estado inicial (invisibles y desplazados)
      gsap.set(elements, { opacity: 0, y: 24 });

      // Animación en cascada al entrar en viewport
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: "top 85%",
          once: true, // solo se ejecuta una vez
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 border-t border-neutral-200/60 text-center"
    >
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="cta-item text-3xl md:text-5xl font-semibold tracking-tight mb-6">
          ¿Listo para transformar tu marca?
        </h2>
        <p className="cta-item text-neutral-600 text-lg mb-10">
          Escríbeme y hagamos crecer tu negocio con diseño, estrategia y tecnología.
        </p>
        <a
          href="https://wa.me/+5352929141" 
          target="_blank"
          rel="noreferrer"
          className="cta-item inline-block border border-black rounded-xl px-6 py-3 text-sm font-medium hover:bg-black hover:text-white transition-colors"
        >
          💬 Hablar por WhatsApp
        </a>
      </div>
    </section>
  );
}