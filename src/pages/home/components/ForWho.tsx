import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';

export default function ForWho() {
  const { t } = useTranslation();
  const items = t('forWho.items', { returnObjects: true }) as string[];
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
      id="for-who" 
      className="relative py-32 bg-zinc-900"
    >
      {/* Gradient transition overlay */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/0 via-black/30 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content - Left on Desktop */}
          <div 
            className="transition-all duration-700 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
            }}
          >
            <h2 
              className="text-4xl md:text-5xl font-light mb-8 transition-all duration-700 ease-out"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: '100ms'
              }}
            >
              {t('forWho.title')}
            </h2>
            
            <p 
              className="text-xl text-gray-300 mb-12 transition-all duration-700 ease-out"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: '200ms'
              }}
            >
              {t('forWho.intro')}
            </p>
            
            <ul className="space-y-4 mb-12">
              {items.map((item, index) => (
                <li 
                  key={index} 
                  className="flex items-start gap-4 pl-4 border-l-2 border-rose-400/40 py-2 transition-all duration-700 ease-out"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: `${300 + index * 80}ms`
                  }}
                >
                  <span className="text-lg text-gray-200">{item}</span>
                </li>
              ))}
            </ul>

            {/* Images on Mobile - After text, before CTA */}
            <div className="lg:hidden mb-12">
              <div className="grid grid-cols-2 gap-4">
                <div 
                  className="relative overflow-hidden rounded-lg aspect-[3/4] transition-all duration-700 ease-out"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: `${300 + items.length * 80}ms`
                  }}
                >
                  <img 
                    src="/images/forwho1.webp"
                    alt="Confident woman working"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div 
                  className="relative overflow-hidden rounded-lg aspect-[3/4] transition-all duration-700 ease-out"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: `${300 + items.length * 80 + 100}ms`
                  }}
                >
                  <img 
                    src="/images/forwho2.webp"
                    alt="Elegant woman smiling"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
            </div>
            
            <a 
              href="https://wa.me/40775134887" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 border border-rose-400/40 text-rose-300 rounded-lg hover:bg-rose-400/10 transition-all duration-300 ease-out whitespace-nowrap cursor-pointer"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${300 + items.length * 80 + 200}ms`
              }}
            >
              {t('forWho.cta')}
            </a>
          </div>

          {/* Images on Desktop - Right side */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-2 gap-6">
              <div 
                className="relative overflow-hidden rounded-lg aspect-[3/4] transition-all duration-700 ease-out"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: '400ms'
                }}
              >
                <img 
                  src="/images/forwho1.webp"
                  alt="Confident woman working"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div 
                className="relative overflow-hidden rounded-lg aspect-[3/4] mt-12 transition-all duration-700 ease-out"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: '500ms'
                }}
              >
                <img 
                  src="/images/forwho2.webp"
                  alt="Elegant woman smiling"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}