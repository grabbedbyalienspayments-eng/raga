import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';

export default function HowItWorks() {
  const { t } = useTranslation();
  const steps = t('howItWorks.steps', { returnObjects: true }) as Array<{ title: string; desc: string }>;
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
      id="how-it-works" 
      className="relative py-32 bg-black"
    >
      {/* Gradient transition overlay */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-zinc-900/0 via-zinc-900/30 to-transparent pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6">
        <h2 
          className="text-4xl md:text-5xl font-light mb-6 text-center transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
          }}
        >
          {t('howItWorks.title')}
        </h2>
        
        <p 
          className="text-xl text-gray-300 mb-16 text-center transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '100ms'
          }}
        >
          {t('howItWorks.intro')}
        </p>
        
        <div className="space-y-12">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="flex gap-8 items-start relative transition-all duration-700 ease-out"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${200 + index * 120}ms`
              }}
            >
              {/* Large faded background numeral for editorial depth */}
              <div className="absolute -left-4 -top-2 text-8xl font-light text-white/5 select-none pointer-events-none">
                {index + 1}
              </div>
              
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-rose-400/20 flex items-center justify-center text-rose-300 text-xl font-light relative z-10">
                {index + 1}
              </div>
              <div className="flex-1 pt-2 relative z-10">
                <h3 className="text-2xl font-light mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        
        <p 
          className="text-lg text-gray-300 mt-16 text-center transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: `${200 + steps.length * 120 + 100}ms`
          }}
        >
          {t('howItWorks.outro')}
        </p>
        
        <div 
          className="text-center mt-12 transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: `${200 + steps.length * 120 + 200}ms`
          }}
        >
          <a 
            href="https://wa.me/40775134887" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 border border-rose-400/40 text-rose-300 rounded-lg hover:bg-rose-400/10 transition-all duration-300 ease-out whitespace-nowrap cursor-pointer"
          >
            {t('howItWorks.cta')}
          </a>
        </div>
      </div>
    </section>
  );
}