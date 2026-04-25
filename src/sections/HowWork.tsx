import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  // MdAssessment,
  // MdOutlineStarRate,
  // MdRocketLaunch,
  MdTrendingUp,
} from "react-icons/md";
import { FaWhatsapp, FaGoogle } from "react-icons/fa";
// import { SiReact } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

// type ProcessStep = {
//   number: string;
//   title: string;
//   subtitle: string;
//   desc: string;
//   icon: JSX.Element;
//   points: string[];
// };

// const processSteps: ProcessStep[] = [
//   {
//     number: "01",
//     title: "Diagnóstico del negocio",
//     subtitle: "Antes de diseñar, entendemos qué debe vender.",
//     desc: "Analizo tu negocio, tus clientes, tus servicios y cómo estás captando oportunidades actualmente.",
//     icon: <MdAssessment className="text-2xl" aria-hidden="true" />,
//     points: [
//       "Qué vendes y a quién le vendes",
//       "Qué dudas frenan al cliente",
//       "Qué canales usas actualmente",
//       "Qué oportunidad digital podemos aprovechar",
//     ],
//   },
//   {
//     number: "02",
//     title: "Estrategia comercial digital",
//     subtitle: "Definimos una solución con intención de negocio.",
//     desc: "No se trata de hacer una web por hacerla. Definimos qué herramienta necesita tu negocio para vender, captar o automatizar mejor.",
//     icon: <MdOutlineStarRate className="text-2xl" aria-hidden="true" />,
//     points: [
//       "Web corporativa o landing de venta",
//       "Catálogo conectado a WhatsApp",
//       "Sistema de reservas o pedidos",
//       "Presencia preparada para Google",
//     ],
//   },
//   {
//     number: "03",
//     title: "Diseño y desarrollo",
//     subtitle: "Construimos una experiencia clara, premium y funcional.",
//     desc: "Diseño y desarrollo una solución rápida, responsive y orientada a generar confianza desde el primer contacto.",
//     icon: <SiReact className="text-2xl" aria-hidden="true" />,
//     points: [
//       "Diseño visual profesional",
//       "Copy enfocado en conversión",
//       "Desarrollo responsive",
//       "Integración con WhatsApp y analítica",
//     ],
//   },
//   {
//     number: "04",
//     title: "Lanzamiento y mejora",
//     subtitle: "Publicamos, medimos y dejamos base para crecer.",
//     desc: "Revisamos que todo funcione correctamente y dejamos una estructura lista para seguir mejorando con datos reales.",
//     icon: <MdRocketLaunch className="text-2xl" aria-hidden="true" />,
//     points: [
//       "Checklist de publicación",
//       "Optimización de velocidad",
//       "SEO técnico inicial",
//       "Recomendaciones de mejora continua",
//     ],
//   },
// ];

const deliverables = [
  {
    icon: <FaWhatsapp aria-hidden="true" />,
    title: "WhatsApp listo",
    desc: "Flujos pensados para que el cliente te escriba fácil.",
  },
  {
    icon: <FaGoogle aria-hidden="true" />,
    title: "Base para Google",
    desc: "Estructura inicial para mejorar presencia y confianza.",
  },
  {
    icon: <MdTrendingUp aria-hidden="true" />,
    title: "Enfoque comercial",
    desc: "Cada sección debe ayudar a explicar, convencer o vender.",
  },
];

export default function ComoTrabajo() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  cardsRef.current = [];

  // const setCardRef = (i: number) => (el: HTMLDivElement | null): void => {
  //   if (el) cardsRef.current[i] = el;
  // };

  useEffect(() => {
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
        y: 36,
        autoAlpha: 0,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.12,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="proceso"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-[#C6A66B]/15 bg-[#070707] py-20 text-white scroll-mt-24 md:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(198,166,107,0.18),transparent_42%)]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <header className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mx-auto mb-5 w-fit rounded-full border border-[#C6A66B]/30 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C6A66B]">
            Proceso de trabajo
          </div>

          <h2 className="font-alfa text-3xl font-semibold tracking-tight md:text-5xl">
            Una metodología pensada para convertir presencia digital en negocio
          </h2>

          <p className="mt-5 text-base leading-relaxed text-neutral-400 md:text-lg">
            Trabajo cada proyecto como una herramienta comercial: primero
            entendemos el negocio, luego diseñamos una solución clara y después
            la lanzamos con enfoque en conversión.
          </p>
        </header>



        <div className="mt-10 rounded-3xl border border-[#C6A66B]/20 bg-[#0D0D0D] p-6 shadow-[0_24px_80px_rgba(198,166,107,0.10)] md:p-8">
          <div className="grid gap-6 md:grid-cols-[1.1fr_1.4fr] md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C6A66B]">
                Resultado final
              </p>

              <h3 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
                No entrego solo una web. Entrego una base digital para vender mejor.
              </h3>

              <p className="mt-4 text-sm leading-7 text-neutral-400">
                El objetivo es que tu negocio se vea más serio, explique mejor
                su oferta y facilite que el cliente tome acción.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {deliverables.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#C6A66B]/15 bg-white/4 p-4"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-[#C6A66B]/25 bg-[#C6A66B]/10 text-[#C6A66B]">
                    {item.icon}
                  </div>

                  <h4 className="text-sm font-semibold text-white">
                    {item.title}
                  </h4>

                  <p className="mt-2 text-xs leading-5 text-neutral-400">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}