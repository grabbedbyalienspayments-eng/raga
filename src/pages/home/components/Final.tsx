import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';

export default function Final() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-40 overflow-hidden"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/final-bg-002.webp)'
        }}
      >
        {/* Cinematic vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80"></div>
        <div className="absolute inset-0 bg-radial-gradient" style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 70%)'
        }}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h2 
          className="text-4xl md:text-5xl font-light mb-6 transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
          }}
        >
          {t('final.title')}
        </h2>
        
        <p 
          className="text-xl text-gray-300 mb-12 transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '100ms'
          }}
        >
          {t('final.subtitle')}
        </p>
        
        <div 
          className="relative inline-block transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '200ms'
          }}
        >
          {/* Warm glow behind CTA */}
          <div className="absolute inset-0 bg-rose-400/20 blur-3xl scale-150 rounded-full"></div>
          
          <a 
            href="https://wa.me/40775134887" 
            target="_blank" 
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-3 px-8 py-4 bg-rose-400/20 text-rose-300 rounded-lg hover:bg-rose-400/30 transition-all duration-300 ease-out text-lg border border-rose-400/30 whitespace-nowrap cursor-pointer"
          >
            <i className="ri-whatsapp-line text-2xl"></i>
            <span>{t('final.cta')}</span>
          </a>
        </div>
      </div>
    </section>
  );
}