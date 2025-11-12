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
    "relative text-sm md:text-[15px] text-neutral-800 hover:text-black transition-colors " +
    "after:content-[''] after:absolute after:left-0 after:-bottom-1 " +
    "after:h-[2px] after:w-full after:bg-neutral-900 after:origin-left " +
    "after:scale-x-0 after:opacity-0 after:transition-transform after:duration-200 " +
    "hover:after:scale-x-100 hover:after:opacity-100";
  const activeClass = "text-black after:scale-x-100 after:opacity-100";

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 6);
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

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-white transition-all",
        scrolled
          ? "border-b border-neutral-200/70 shadow-[0_6px_20px_rgba(0,0,0,0.06)]"
          : "border-b border-transparent"
      )}
    >
      {/* Barra de progreso */}
      <div ref={progressRef} className="pointer-events-none h-[1.5px] w-0 bg-[#4f39f6]" />

      <nav className="max-w-6xl mx-auto px-4 h-16 md:h-[72px] flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <NavLink
            to="/"
            className="font-alfa tracking-tight text-[18px] md:text-[20px]"
            onClick={closeAnd()}
          >
            franklin.builds
          </NavLink>
        </div>

        {/* Links Desktop */}
        <div className="hidden md:flex items-center gap-8 font-alfa">
          <NavLink
            to="/"
            end
            className={({ isActive }) => cn(linkBase, isActive && activeClass)}
            onClick={closeAnd()}
          >
            Inicio
          </NavLink>

          <NavLink
            to="/#servicios"
            className={cn(linkBase, isHashActive("#servicios") && activeClass)}
            onClick={closeAnd(() => {
              if (location.pathname !== "/") navigate("/#servicios");
            })}
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
            onClick={closeAnd(() => {
              if (location.pathname !== "/") navigate("/#about");
            })}
          >
            Sobre mí
          </NavLink>

          {/* CTA que lleva a la sección de proyectos (no abre nueva pestaña) */}
          <NavLink
            to="/proyectos"
            className={({ isActive }) =>
              cn(
                "rounded-xl border border-black px-4 py-2 text-sm font-medium transition-transform duration-150 " +
                  "hover:translate-y-px hover:scale-[0.99] hover:bg-black hover:text-white focus-visible:outline-none " +
                  "focus-visible:ring-2 focus-visible:ring-[#4f39f6]/50",
                isActive && "bg-black text-white"
              )
            }
            onClick={closeAnd()}
          >
            Ver proyectos
          </NavLink>
        </div>

        {/* Botón mobile */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-neutral-300"
        >
          <div className="relative w-5 h-3.5">
            <span className={cn("absolute inset-x-0 top-0 h-0.5 bg-black transition-transform", open && "translate-y-1.5 rotate-45")} />
            <span className={cn("absolute inset-x-0 top-1.5 h-0.5 bg-black transition-opacity", open && "opacity-0")} />
            <span className={cn("absolute inset-x-0 bottom-0 h-0.5 bg-black transition-transform", open && "-translate-y-1.5 -rotate-45")} />
          </div>
        </button>
      </nav>

      {/* Overlay clickable (mobile) */}
      {open && (
        <button
          aria-label="Cerrar menú"
          onClick={() => setOpen(false)}
          className="md:hidden fixed inset-0 bg-black/10"
        />
      )}

      {/* Panel mobile */}
      <div
        ref={panelRef}
        className={cn(
          "md:hidden origin-top overflow-hidden transition-[max-height,opacity,transform] duration-250",
          open ? "max-h-96 opacity-100 scale-y-100" : "max-h-0 opacity-0 scale-y-95"
        )}
      >
        <div className="px-4 pb-6 pt-1 border-t border-neutral-200/70 bg-white">
          <div className="flex flex-col gap-4 font-alfa">
            <NavLink
              to="/"
              end
              className={({ isActive }) => cn(linkBase, "text-base", isActive && activeClass)}
              onClick={closeAnd()}
            >
              Inicio
            </NavLink>

            <NavLink
              to="/#servicios"
              className={cn(linkBase, "text-base", isHashActive("#servicios") && activeClass)}
              onClick={closeAnd(() => {
                if (location.pathname !== "/") navigate("/#servicios");
              })}
            >
              Servicios
            </NavLink>

            <NavLink
              to="/proyectos"
              className={({ isActive }) => cn(linkBase, "text-base", isActive && activeClass)}
              onClick={closeAnd()}
            >
              Proyectos
            </NavLink>

            <NavLink
              to="/#about"
              className={cn(linkBase, "text-base", isHashActive("#about") && activeClass)}
              onClick={closeAnd(() => {
                if (location.pathname !== "/") navigate("/#about");
              })}
            >
              Sobre mí
            </NavLink>

            {/* CTA mobile → también navega a /proyectos dentro de la app */}
            <NavLink
              to="/proyectos"
              className={cn(
                "mt-2 rounded-xl border border-black px-4 py-2 text-sm font-medium transition-transform duration-150 " +
                  "hover:translate-y-px hover:scale-[0.99] hover:bg-black hover:text-white focus-visible:outline-none " +
                  "focus-visible:ring-2 focus-visible:ring-[#4f39f6]/50"
              )}
              onClick={closeAnd()}
            >
              Ver proyectos
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}