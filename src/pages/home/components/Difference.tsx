import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';

export default function Difference() {
  const { t } = useTranslation();
  const values = t('difference.values', { returnObjects: true }) as string[];
  const [visibleValues, setVisibleValues] = useState<number[]>([]);
  const valueRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = valueRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleValues((prev) => [...new Set([...prev, index])]);
            }
          });
        },
        { threshold: 0.3 }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <section className="py-32 bg-black gradient-separator-top">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-light mb-12">
          {t('difference.title')}
        </h2>
        
        <p className="text-2xl text-rose-200 mb-20">
          {t('difference.subtitle')}
        </p>
        
        <div className="space-y-12 mb-20">
          {values.map((value, index) => (
            <div 
              key={index}
              ref={(el) => (valueRefs.current[index] = el)}
              className="relative inline-block"
            >
              <h3 className={`text-5xl md:text-6xl lg:text-7xl font-light text-white transition-all duration-700 ${
                visibleValues.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              >
                {value}
              </h3>
              <div 
                className={`h-px bg-gradient-to-r from-transparent via-rose-400/50 to-transparent mt-4 transition-all duration-1000 ${
                  visibleValues.includes(index) ? 'w-full opacity-100' : 'w-0 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150 + 300}ms` }}
              ></div>
            </div>
          ))}
        </div>
        
        <p className="text-xl text-gray-300 mb-12 leading-relaxed">
          {t('difference.text')}
        </p>
        
        <a 
          href="https://wa.me/40775134887" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 border border-rose-400/40 text-rose-300 rounded-lg hover:bg-rose-400/10 transition-smooth whitespace-nowrap cursor-pointer"
        >
          {t('difference.cta')}
        </a>
      </div>
    </section>
  );
}