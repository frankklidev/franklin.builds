import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NavLink } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  slug: string;
  name: string;
  summary: string;
  image?: string;
  tags?: string[];
  url?: string; // externo
};

const featuredProjects: Project[] = [
  {
    slug: "fulltech23",
    name: "Fulltech23",
    summary:
      "Sitio web moderno para una agencia tecnológica. Diseño limpio, profesional y responsivo, enfocado en generar confianza y captar clientes.",
    image: "/src/assets/images/logoFulltech.jpeg",
    tags: ["Next.js", "UI/UX", "SEO", "Performance"],
    url: "https://www.fulltech23.com/",
  },
  {
    slug: "luxdrive",
    name: "LuxDrive",
    summary:
      "Plataforma de renta de autos con reservas online y un diseño premium.",
    image: "/src/assets/images/luxdrive.png", 
    tags: ["React", "Supabase", "Mantine", "Vite"],
    url: "https://luxdrive.tuplataformaweb.com/",
  },
];

export default function Projects({ limit }: { limit?: number }) {
  const projects = useMemo(() => {
    const arr = featuredProjects ?? [];
    return arr.slice(0, limit ?? arr.length);
  }, [limit]);

  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");
      gsap.set(cards, { y: 40, opacity: 0 });
      gsap.to(cards, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: "top 85%",
          once: true,
        },
      });

      gsap.utils.toArray<HTMLImageElement>(".project-image").forEach((img) => {
        gsap.to(img, {
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // helper para abrir externo pero mantener NavLink
  const openExternal = (url?: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-b from-white via-neutral-50 to-neutral-100 border-t border-neutral-200/60"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 md:py-28">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-12 font-alfa text-center">
          Proyectos destacados
        </h2>

        <div className="grid gap-10 md:grid-cols-2">
          {projects.map((p) => (
            <article
              key={p.slug}
              className="project-card group border border-neutral-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Imagen clickeable con fallback */}
              <NavLink
                to={`/proyecto/${p.slug}`}
                onClick={openExternal(p.url)}
                className="block aspect-video overflow-hidden bg-neutral-100  items-center justify-center"
              >
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    onError={(e) => {
                      // Si la imagen falla, ocultamos el <img>
                      (e.currentTarget.style.display = "none");
                      // Creamos un elemento fallback dinámico
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        const fallback = document.createElement("div");
                        fallback.textContent = p.name;
                        fallback.className =
                          "w-full h-full flex items-center justify-center text-neutral-400 text-2xl font-alfa";
                        parent.appendChild(fallback);
                      }
                    }}
                    className="project-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-400 text-2xl font-alfa">
                    {p.name}
                  </div>
                )}
              </NavLink>

              {/* Contenido */}
              <div className="p-6">
                <NavLink
                  to={`/proyecto/${p.slug}`}
                  onClick={openExternal(p.url)}
                  className="inline-block"
                >
                  <h3 className="text-xl font-semibold mb-2 hover:underline underline-offset-4">
                    {p.name}
                  </h3>
                </NavLink>

                <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                  {p.summary}
                </p>

                {p.tags?.length ? (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs border border-neutral-300 rounded-full px-2 py-0.5 text-neutral-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}

                <NavLink
                  to={`/proyecto/${p.slug}`}
                  onClick={openExternal(p.url)}
                  className="inline-block text-sm font-medium border border-black rounded-xl px-4 py-2 hover:bg-black hover:text-white transition-colors"
                >
                  Ver sitio
                </NavLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}