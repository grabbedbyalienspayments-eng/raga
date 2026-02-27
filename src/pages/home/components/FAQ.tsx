
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function FAQ() {
  const { t } = useTranslation();
  const items = t('faq.items', { returnObjects: true }) as Array<{ q: string; a: string }>;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    contentRefs.current = contentRefs.current.slice(0, items.length);
  }, [items.length]);

  return (
    <section id="faq" className="py-32 bg-zinc-900">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-light mb-16 text-center">
          {t('faq.title')}
        </h2>
        
        <div className="space-y-0">
          {items.map((item, index) => (
            <div 
              key={index}
              className="border-b border-white/10 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-0 py-6 flex items-center justify-between text-left hover:bg-white/3 transition-all duration-200 cursor-pointer"
              >
                <span className="text-lg font-light pr-4">{item.q}</span>
                <i 
                  className={`ri-arrow-down-s-line text-xl transition-transform duration-200 ease-out ${openIndex === index ? 'rotate-180' : ''}`}
                  style={{ minWidth: '24px' }}
                ></i>
              </button>
              
              <div
                ref={el => contentRefs.current[index] = el}
                style={{
                  maxHeight: openIndex === index ? `${contentRefs.current[index]?.scrollHeight}px` : '0px',
                  transition: 'max-height 300ms ease-out'
                }}
                className="overflow-hidden"
              >
                <div className="pb-6 text-gray-400 leading-relaxed">
                  {item.a}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="https://wa.me/40775134887" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 border border-rose-400/40 text-rose-300 rounded-lg hover:bg-rose-400/10 transition-colors whitespace-nowrap cursor-pointer"
          >
            {t('faq.cta')}
          </a>
        </div>
      </div>
    </section>
  );
}
