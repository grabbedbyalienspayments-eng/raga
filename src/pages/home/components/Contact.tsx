
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
    email: '',
    message: '',
    privacy: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.privacy) {
      alert('Te rugăm să accepți politica de confidențialitate.');
      return;
    }

    if (!formData.age || parseInt(formData.age) < 18) {
      alert('Trebuie să ai minimum 18 ani.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formBody = new URLSearchParams();
      formBody.append('name', formData.name);
      formBody.append('age', formData.age);
      formBody.append('phone', formData.phone);
      formBody.append('email', formData.email);
      formBody.append('message', formData.message);
      formBody.append('privacy', formData.privacy ? 'Acceptat' : 'Neacceptat');

      const response = await fetch('https://readdy.ai/api/form/d6h1i3ji06gv2c9ufng0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString()
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          age: '',
          phone: '',
          email: '',
          message: '',
          privacy: false
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              {t('contact.title')}
            </h2>
            
            <p className="text-xl text-rose-200 mb-6">
              {t('contact.subtitle')}
            </p>
            
            <p className="text-gray-300 mb-12">
              {t('contact.text')}
            </p>
            
            <div className="space-y-6">
              <a 
                href="tel:0775134887"
                className="flex items-center gap-4 text-lg hover:text-rose-300 transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-rose-400/10 flex items-center justify-center">
                  <i className="ri-phone-line text-rose-300"></i>
                </div>
                <div>
                  <div className="text-sm text-gray-400">{t('contact.phone')}</div>
                  <div>0775 134 887</div>
                </div>
              </a>
              
              <a 
                href="mailto:andreibojici@gmail.com"
                className="flex items-center gap-4 text-lg hover:text-rose-300 transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-rose-400/10 flex items-center justify-center">
                  <i className="ri-mail-line text-rose-300"></i>
                </div>
                <div>
                  <div className="text-sm text-gray-400">{t('contact.email')}</div>
                  <div>andreibojici@gmail.com</div>
                </div>
              </a>
            </div>
          </div>
          
          <div>
            <form id="contact_form" data-readdy-form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t('contact.form.name')}
                  className="input-minimal w-full"
                />
              </div>
              
              <div>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder={t('contact.form.age')}
                  required
                  min="18"
                  className="input-minimal w-full"
                />
              </div>
              
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder={t('contact.form.phone')}
                  required
                  className="input-minimal w-full"
                />
              </div>
              
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t('contact.form.email')}
                  required
                  className="input-minimal w-full"
                />
              </div>
              
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={(e) => {
                    if (e.target.value.length <= 500) {
                      setFormData({ ...formData, message: e.target.value });
                    }
                  }}
                  placeholder={t('contact.form.message')}
                  rows={4}
                  maxLength={500}
                  className="input-minimal w-full resize-none"
                ></textarea>
                <div className="text-xs text-gray-500 mt-1 text-right">
                  {formData.message.length}/500
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="privacy"
                  id="privacy"
                  checked={formData.privacy}
                  onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
                  required
                  className="mt-1 cursor-pointer"
                />
                <label htmlFor="privacy" className="text-sm text-gray-400 cursor-pointer">
                  {t('contact.form.privacy')}
                </label>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 border border-rose-400/50 text-rose-300 rounded-lg hover:bg-rose-400/5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
              >
                {isSubmitting ? 'Se trimite...' : t('contact.form.submit')}
              </button>
              
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm">
                  Mesajul a fost trimis cu succes! Îți vom răspunde în curând.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                  A apărut o eroare. Te rugăm să încerci din nou.
                </div>
              )}
              
              <p className="text-xs text-gray-500 text-center">
                {t('contact.form.note')}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
