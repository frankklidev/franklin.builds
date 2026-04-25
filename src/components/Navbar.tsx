import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const linkBase =
    "relative text-sm md:text-[15px] font-medium text-neutral-300 hover:text-white transition-colors " +
    "after:content-[''] after:absolute after:left-0 after:-bottom-1.5 " +
    "after:h-[2px] after:w-full after:bg-[#C6A66B] after:origin-left " +
    "after:scale-x-0 after:opacity-0 after:transition-all after:duration-200 " +
    "hover:after:scale-x-100 hover:after:opacity-100";

  const activeClass = "text-white after:scale-x-100 after:opacity-100";

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);

      if (progressRef.current) {
        const doc = document.documentElement;
        const h = doc.scrollHeight - doc.clientHeight;
        const pct = h > 0 ? (y / h) * 100 : 0;
        progressRef.current.style.width = `${pct}%`;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.replace("#", "");
    const el = document.getElementById(id);

    if (!el) {
      requestAnimationFrame(() => {
        const el2 = document.getElementById(id);
        if (el2) el2.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return;
    }

    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [location.pathname, location.hash]);

  const isHashActive = (hash: string) =>
    location.pathname === "/" && location.hash === hash;

  const closeAnd = (fn?: () => void) => () => {
    setOpen(false);
    fn?.();
  };

  const goHome = closeAnd(() => {
    if (location.pathname !== "/") {
      navigate("/");
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  const goToHash = (hash: string) =>
    closeAnd(() => {
      if (location.pathname !== "/") {
        navigate(`/${hash}`);
      }
    });

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-[#C6A66B]/20 bg-[#070707]/90 shadow-[0_16px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl"
          : "border-b border-[#C6A66B]/10 bg-[#070707]/80 backdrop-blur-md"
      )}
    >
      <div
        ref={progressRef}
        className="pointer-events-none h-[2px] w-0 bg-[#C6A66B]"
      />

      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-[76px]">
        <NavLink
          to="/"
          onClick={goHome}
          className="group flex items-center gap-3"
          aria-label="Ir al inicio"
        >
          <div className="leading-tight">
            <p className="font-alfa text-[17px] tracking-tight text-white md:text-[19px]">
              franklin.builds
            </p>
            <p className="hidden text-[11px] font-medium uppercase tracking-[0.18em] text-[#C6A66B]/80 sm:block">
              Webs · Sistemas · Presencia digital
            </p>
          </div>
        </NavLink>

        <div className="hidden items-center gap-8 md:flex">
          <NavLink
            to="/"
            end
            className={({ isActive }) => cn(linkBase, isActive && activeClass)}
            onClick={goHome}
          >
            Inicio
          </NavLink>

          <NavLink
            to="/#servicios"
            className={cn(linkBase, isHashActive("#servicios") && activeClass)}
            onClick={goToHash("#servicios")}
          >
            Servicios
          </NavLink>

          <NavLink
            to="/proyectos"
            className={({ isActive }) => cn(linkBase, isActive && activeClass)}
            onClick={closeAnd()}
          >
            Proyectos
          </NavLink>

          <NavLink
            to="/#about"
            className={cn(linkBase, isHashActive("#about") && activeClass)}
            onClick={goToHash("#about")}
          >
            Sobre mí
          </NavLink>

          <NavLink
            to="/#contacto"
            className="rounded-full border border-[#C6A66B]/50 bg-[#C6A66B] px-5 py-2.5 text-sm font-semibold text-black shadow-[0_14px_35px_rgba(198,166,107,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#D9BB7A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A66B]/40"
            onClick={goToHash("#contacto")}
          >
            Hablemos
          </NavLink>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#C6A66B]/30 bg-[#111] shadow-sm md:hidden"
        >
          <div className="relative h-3.5 w-5">
            <span
              className={cn(
                "absolute inset-x-0 top-0 h-0.5 rounded-full bg-[#C6A66B] transition-transform",
                open && "translate-y-1.5 rotate-45"
              )}
            />
            <span
              className={cn(
                "absolute inset-x-0 top-1.5 h-0.5 rounded-full bg-[#C6A66B] transition-opacity",
                open && "opacity-0"
              )}
            />
            <span
              className={cn(
                "absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-[#C6A66B] transition-transform",
                open && "-translate-y-1.5 -rotate-45"
              )}
            />
          </div>
        </button>
      </nav>

      {open && (
        <button
          aria-label="Cerrar menú"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] md:hidden"
        />
      )}

      <div
        ref={panelRef}
        className={cn(
          "relative z-50 overflow-hidden border-t border-[#C6A66B]/15 bg-[#070707] transition-[max-height,opacity,transform] duration-300 md:hidden",
          open
            ? "max-h-[430px] opacity-100 scale-y-100"
            : "max-h-0 opacity-0 scale-y-95"
        )}
      >
        <div className="px-4 pb-6 pt-4">
          <div className="mb-5 rounded-3xl border border-[#C6A66B]/20 bg-white/[0.03] p-4 shadow-[0_14px_40px_rgba(0,0,0,0.35)]">
            <p className="text-sm font-semibold text-white">
              Construyo presencia digital seria para negocios que quieren vender mejor.
            </p>
            <p className="mt-1 text-sm text-neutral-400">
              Webs, catálogos, sistemas y automatización.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                cn(linkBase, "w-fit text-base", isActive && activeClass)
              }
              onClick={goHome}
            >
              Inicio
            </NavLink>

            <NavLink
              to="/#servicios"
              className={cn(
                linkBase,
                "w-fit text-base",
                isHashActive("#servicios") && activeClass
              )}
              onClick={goToHash("#servicios")}
            >
              Servicios
            </NavLink>

            <NavLink
              to="/proyectos"
              className={({ isActive }) =>
                cn(linkBase, "w-fit text-base", isActive && activeClass)
              }
              onClick={closeAnd()}
            >
              Proyectos
            </NavLink>

            <NavLink
              to="/#about"
              className={cn(
                linkBase,
                "w-fit text-base",
                isHashActive("#about") && activeClass
              )}
              onClick={goToHash("#about")}
            >
              Sobre mí
            </NavLink>

            <NavLink
              to="/#contacto"
              className="mt-2 rounded-full border border-[#C6A66B]/50 bg-[#C6A66B] px-5 py-3 text-center text-sm font-semibold text-black shadow-[0_14px_35px_rgba(198,166,107,0.22)] transition-all duration-200 hover:bg-[#D9BB7A]"
              onClick={goToHash("#contacto")}
            >
              Hablemos de tu negocio
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}