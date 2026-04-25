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
  url?: string;
};

const featuredProjects: Project[] = [
  {
    slug: "fulltech23",
    name: "Fulltech23",
    summary:
      "Sitio web moderno para una agencia tecnológica. Diseño profesional, estructura clara y experiencia enfocada en generar confianza comercial.",
    image: "/images/logoFulltech.jpeg",
    tags: ["Next.js", "UI/UX", "SEO", "Performance"],
    url: "https://www.fulltech23.com/",
  },
  {
    slug: "luxdrive",
    name: "LuxDrive",
    summary:
      "Plataforma premium de renta de autos con reservas online, dashboard administrativo y experiencia visual orientada a confianza.",
    image: "/images/luxDrive.png",
    tags: ["React", "Supabase", "Mantine", "Vite", "Performance"],
    url: "https://luxdrive.tuplataformaweb.com/",
  },
];

const FILTER_TAGS: Record<string, string[]> = {
  Todos: [],
  Branding: ["UI/UX", "Branding"],
  Web: ["React", "Next.js", "Vite", "Supabase", "Mantine"],
  Estrategia: ["SEO", "Performance"],
};

export default function ProjectsSection({
  limit,
  filter = "Todos",
}: {
  limit?: number;
  filter?: "Todos" | "Branding" | "Web" | "Estrategia";
}) {
  const sectionRef = useRef<HTMLElement | null>(null);

  const projects = useMemo(() => {
    const base = featuredProjects.slice(0, limit ?? featuredProjects.length);

    if (filter === "Todos") return base;

    const needles = FILTER_TAGS[filter] ?? [];

    return base.filter((p) =>
      needles.length ? (p.tags ?? []).some((t) => needles.includes(t)) : true
    );
  }, [limit, filter]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");

      gsap.set(cards, { y: 30, opacity: 0 });

      gsap.to(cards, {
        y: 0,
        opacity: 1,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: "top 85%",
          once: true,
        },
      });

      if (!reduce) {
        gsap.utils.toArray<HTMLElement>(".project-parallax").forEach((el) => {
          gsap.to(el, {
            scale: 1.08,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [filter]);

  const openExternal = (url?: string) => (e: React.MouseEvent) => {
    e.preventDefault();

    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {!projects.length ? (
        <div className="grid gap-8 md:grid-cols-2">
          <article className="project-card rounded-3xl border border-[#C6A66B]/15 bg-white/[0.04] p-6 text-white backdrop-blur-md">
            <h3 className="mb-2 text-lg font-semibold">
              Sin proyectos para este filtro
            </h3>
            <p className="text-sm text-neutral-400">
              Prueba con otro filtro o vuelve a “Todos”.
            </p>
          </article>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((p) => (
            <article
              key={p.slug}
              className="project-card group overflow-hidden rounded-3xl border border-[#C6A66B]/15 bg-white/[0.04] shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#C6A66B]/45 hover:bg-white/[0.06] hover:shadow-[0_28px_90px_rgba(198,166,107,0.12)]"
            >
              <NavLink
                to={`/proyecto/${p.slug}`}
                onClick={openExternal(p.url)}
                className="relative block aspect-video overflow-hidden bg-black"
              >
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="project-parallax h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                ) : (
                  <div className="project-parallax relative h-full w-full transition-transform duration-700 group-hover:scale-[1.03]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(198,166,107,0.22),transparent_50%)]" />
                    <div className="absolute inset-0 bg-[#0D0D0D]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="rounded-full border border-[#C6A66B]/30 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-[#C6A66B] backdrop-blur-md md:text-base">
                        {p.name}
                      </span>
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute left-5 top-5 rounded-full border border-[#C6A66B]/30 bg-black/50 px-3 py-1 text-xs font-semibold text-[#C6A66B] backdrop-blur-md">
                  Caso real
                </div>
              </NavLink>

              <div className="p-6">
                <NavLink
                  to={`/proyecto/${p.slug}`}
                  onClick={openExternal(p.url)}
                  className="inline-block"
                >
                  <h3 className="text-2xl font-semibold text-white transition-colors hover:text-[#C6A66B]">
                    {p.name}
                  </h3>
                </NavLink>

                <p className="mt-3 text-sm leading-7 text-neutral-400">
                  {p.summary}
                </p>

                {p.tags?.length ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-[#C6A66B]/20 bg-[#C6A66B]/10 px-3 py-1.5 text-xs font-medium text-[#C6A66B]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="mt-6 flex items-center justify-between gap-4 border-t border-[#C6A66B]/10 pt-5">
                  <p className="text-xs text-neutral-500">
                    Diseño · Desarrollo · Conversión
                  </p>

                  <NavLink
                    to={`/proyecto/${p.slug}`}
                    onClick={openExternal(p.url)}
                    className="inline-flex items-center rounded-full border border-[#C6A66B]/40 bg-[#C6A66B] px-4 py-2 text-sm font-semibold text-black transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#D9BB7A]"
                  >
                    Ver sitio
                  </NavLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}