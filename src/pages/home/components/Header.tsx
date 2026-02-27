import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ro' ? 'en' : 'ro');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img 
            src="https://public.readdy.ai/ai/img_res/9ba587d1-4bc8-44da-a36b-c240332e29cd.png" 
            alt="Black Studio Logo" 
            className="h-10 w-auto"
          />
        </button>

        <nav className="hidden lg:flex items-center gap-8">
          <button onClick={() => scrollToSection('for-who')} className="text-sm hover:text-rose-300 transition-colors whitespace-nowrap cursor-pointer">
            {t('nav.forWho')}
          </button>
          <button onClick={() => scrollToSection('how-it-works')} className="text-sm hover:text-rose-300 transition-colors whitespace-nowrap cursor-pointer">
            {t('nav.howItWorks')}
          </button>
          <button onClick={() => scrollToSection('services')} className="text-sm hover:text-rose-300 transition-colors whitespace-nowrap cursor-pointer">
            {t('nav.services')}
          </button>
          <button onClick={() => scrollToSection('faq')} className="text-sm hover:text-rose-300 transition-colors whitespace-nowrap cursor-pointer">
            {t('nav.faq')}
          </button>
          <button onClick={() => scrollToSection('contact')} className="text-sm hover:text-rose-300 transition-colors whitespace-nowrap cursor-pointer">
            {t('nav.contact')}
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <a 
            href="tel:0775134887" 
            className="hidden md:flex items-center gap-2 text-sm hover:text-rose-300 transition-colors whitespace-nowrap"
          >
            <i className="ri-phone-line"></i>
            <span>0775 134 887</span>
          </a>
          
          <button 
            onClick={toggleLanguage}
            className="px-3 py-1.5 text-sm border border-white/20 rounded-md hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer"
          >
            {i18n.language === 'ro' ? 'EN' : 'RO'}
          </button>

          <a 
            href="https://wa.me/40775134887" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 bg-rose-400/20 text-rose-300 rounded-md hover:bg-rose-400/30 transition-colors text-sm whitespace-nowrap"
          >
            {t('whatsapp')}
          </a>
        </div>
      </div>
    </header>
  );
}