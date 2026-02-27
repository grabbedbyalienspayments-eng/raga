import { useTranslation } from 'react-i18next';

interface FooterProps {
  onOpenModal: (type: 'privacy' | 'cookies' | 'terms') => void;
}

export default function Footer({ onOpenModal }: FooterProps) {
  const { t } = useTranslation();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-zinc-900 border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <img 
              src="https://public.readdy.ai/ai/img_res/9ba587d1-4bc8-44da-a36b-c240332e29cd.png" 
              alt="Black Studio" 
              className="h-10 w-auto mb-4"
            />
            <p className="text-gray-400 text-sm">
              Training și management pentru modele care vor să înceapă în siguranță.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-light mb-4">Contact</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <a href="tel:0775134887" className="block hover:text-rose-300 transition-colors cursor-pointer">
                {t('footer.phone')}: 0775 134 887
              </a>
              <a href="mailto:andreibojici@gmail.com" className="block hover:text-rose-300 transition-colors cursor-pointer">
                {t('footer.email')}: andreibojici@gmail.com
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-light mb-4">Navigare</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <button onClick={() => scrollToSection('for-who')} className="block hover:text-rose-300 transition-colors cursor-pointer">
                {t('nav.forWho')}
              </button>
              <button onClick={() => scrollToSection('how-it-works')} className="block hover:text-rose-300 transition-colors cursor-pointer">
                {t('nav.howItWorks')}
              </button>
              <button onClick={() => scrollToSection('services')} className="block hover:text-rose-300 transition-colors cursor-pointer">
                {t('nav.services')}
              </button>
              <button onClick={() => scrollToSection('faq')} className="block hover:text-rose-300 transition-colors cursor-pointer">
                {t('nav.faq')}
              </button>
              <button onClick={() => scrollToSection('contact')} className="block hover:text-rose-300 transition-colors cursor-pointer">
                {t('nav.contact')}
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <button onClick={() => onOpenModal('privacy')} className="hover:text-rose-300 transition-colors cursor-pointer">
              {t('footer.legal.privacy')}
            </button>
            <button onClick={() => onOpenModal('cookies')} className="hover:text-rose-300 transition-colors cursor-pointer">
              {t('footer.legal.cookies')}
            </button>
            <button onClick={() => onOpenModal('terms')} className="hover:text-rose-300 transition-colors cursor-pointer">
              {t('footer.legal.terms')}
            </button>
          </div>
          
          <div className="text-sm text-gray-400 text-center md:text-right">
            <div>{t('footer.copyright')} {new Date().getFullYear()}</div>
            <div className="mt-1">
              {t('footer.createdBy')} <a href="https://websiteon.ro/" target="_blank" rel="noopener noreferrer" className="text-rose-300 hover:underline">WebsiteON</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}