
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export default function Hero() {
  const { t } = useTranslation();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: 'url(/images/hero-bg-001.webp)',
          transform: `scale(1.05) translateY(${scrollY * 0.3}px)`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>
        
        {/* Cinematic vignette overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_70%,rgba(0,0,0,0.8)_100%)]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight reveal reveal-delay-1">
          {t('hero.headline')}
        </h1>
        
        <p className="text-xl md:text-2xl text-rose-200 mb-8 font-light reveal reveal-delay-2">
          {t('hero.subheadline')}
        </p>
        
        <p className="text-base md:text-lg text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed reveal reveal-delay-3">
          {t('hero.text')}
        </p>
        
        <div className="relative inline-block reveal reveal-delay-4">
          {/* Warm rose glow behind CTA */}
          <div className="absolute inset-0 bg-rose-400/20 blur-3xl scale-150 opacity-60"></div>
          
          <a 
            href="https://wa.me/40775134887" 
            target="_blank" 
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-3 px-8 py-4 bg-transparent text-rose-300 border border-rose-400/40 hover:border-rose-400/60 hover:bg-rose-400/5 transition-all duration-300 whitespace-nowrap cursor-pointer"
          >
            <i className="ri-whatsapp-line text-2xl"></i>
            <span>{t('hero.cta')}</span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-gentle-pulse">
        <i className="ri-arrow-down-line text-3xl text-white/50"></i>
      </div>
    </section>
  );
}