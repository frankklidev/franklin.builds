import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 1 },
      });

      // Animación inicial: título -> subtítulo -> botón
      tl.fromTo(
        titleRef.current,
        { y: 60, opacity: 0, filter: 'blur(6px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)' }
      )
        .fromTo(
          subtitleRef.current,
          { y: 40, opacity: 0, filter: 'blur(4px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)' },
          '-=0.5'
        )
        .fromTo(
          buttonRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1 },
          '-=0.4'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id='hero'
      className='relative flex flex-col justify-center items-center text-center min-h-[92vh] px-6 overflow-hidden text-white'
    >
      {/* Imagen de fondo completa */}
      <img
        src='/src/assets/images/fondo_hero.jpg'
        alt='Fondo hero section'
        className='absolute inset-0 w-full h-full object-cover'
      />

      {/* Capa opcional de degradado para legibilidad */}
      <div className='absolute inset-0 bg-black/20' />

      {/* Contenido principal */}
      <div className='relative z-10 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]'>
        <div className='text-xs md:text-sm uppercase tracking-[0.25em] mb-5 font-rammetto text-white'>
          Diseño & Estrategia Digital
        </div>

        <h1
          ref={titleRef}
          className='font-righteous text-[2.6rem] md:text-[4.5rem] leading-[1.1] font-normal tracking-tight mb-4 text-white'
        >
          franklin.builds
        </h1>

        <p
          ref={subtitleRef}
          className='font-rammetto max-w-2xl text-white text-base md:text-lg leading-relaxed mb-10'
        >
          Diseño minimalista, desarrollo web moderno y estrategia visual para
          negocios que quieren crecer.
        </p>

        <a
          ref={buttonRef}
          href='https://wa.me/5355555555'
          target='_blank'
          rel='noreferrer'
          className='inline-block border border-white px-6 py-3 rounded-xl text-sm font-medium font-rammetto text-white hover:bg-white hover:text-black transition-colors'
        >
          💬 Hablemos por WhatsApp
        </a>
      </div>
    </section>
  );
};

export default Hero;