import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';

export default function Services() {
  const { t } = useTranslation();
  const items = t('services.items', { returnObjects: true }) as Array<{ title: string; desc: string }>;
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Icon mapping pentru fiecare serviciu
  const icons = [
    'ri-graduation-cap-line',
    'ri-chat-smile-3-line', 
    'ri-lightbulb-line',
    'ri-settings-3-line',
    'ri-user-heart-line'
  ];

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => [...new Set([...prev, index])]);
            }
          });
        },
        { threshold: 0.2 }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <section id="services" className="py-32 bg-zinc-900 gradient-separator-top relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-rose-400/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-light mb-24">
          {t('services.title')}
        </h2>
        
        <div className="space-y-12">
          {items.map((item, index) => (
            <div 
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              className={`group transition-all duration-700 ${
                visibleItems.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12 items-start relative`}>
                {/* Number background - mai vizibil */}
                <div className="absolute top-0 left-0 md:left-auto md:right-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-[180px] md:text-[220px] font-light text-rose-400/5 leading-none">
                    0{index + 1}
                  </span>
                </div>

                {/* Icon cu glow effect */}
                <div className="flex-shrink-0 relative group/icon">
                  <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-2xl border border-rose-400/20 bg-zinc-800/50 backdrop-blur-sm transition-all duration-300 group-hover:border-rose-400/40 group-hover:bg-rose-400/5 group-hover:shadow-[0_0_30px_rgba(251,113,133,0.15)]">
                    <i className={`${icons[index]} text-4xl md:text-5xl text-rose-300 transition-transform duration-300 group-hover/icon:scale-110`}></i>
                  </div>
                  {/* Subtle pulse glow on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-rose-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                </div>
                
                <div className="flex-1 space-y-4">
                  {/* Number indicator - mai subtil */}
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-sm font-light text-rose-300/60 tracking-wider">
                      0{index + 1}
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-rose-400/20 to-transparent"></div>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-light text-white group-hover:text-rose-50 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl group-hover:text-gray-300 transition-colors duration-300">
                    {item.desc}
                  </p>
                </div>
              </div>
              
              {index < items.length - 1 && (
                <div className="mt-12 relative">
                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-24 text-center">
          <a 
            href="https://wa.me/40775134887" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group/cta inline-block relative px-10 py-5 border border-rose-400/40 text-rose-300 rounded-lg overflow-hidden transition-all duration-300 hover:border-rose-400/60 hover:shadow-[0_0_30px_rgba(251,113,133,0.2)] whitespace-nowrap cursor-pointer"
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-rose-400/0 group-hover/cta:bg-rose-400/10 transition-all duration-300"></div>
            <span className="relative z-10 font-light tracking-wide">{t('services.cta')}</span>
          </a>
        </div>
      </div>
    </section>
  );
}