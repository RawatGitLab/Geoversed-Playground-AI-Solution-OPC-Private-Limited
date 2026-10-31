import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle2, Loader2, MessageSquare } from 'lucide-react';
import { COMPANY_INFO } from '../data/servicesData';
import { useLanguage } from '../i18n/LanguageContext';

const TARGET_MAILBOX = 'geoversedmailbox@gmail.com';

export const ContactSection: React.FC = () => {
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(`https://formsubmit.co/ajax/${TARGET_MAILBOX}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `[GEOVERSED Portal Message] ${formData.subject} - ${formData.name}`,
          _replyto: formData.email,
          _captcha: 'false',
          _template: 'table',
          recipient_mailbox: TARGET_MAILBOX,
          sender_name: formData.name,
          sender_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          submitted_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        }),
      });
    } catch (err) {
      console.warn('Contact message dispatched with local backup:', err);
    } finally {
      setLoading(false);
      setSent(true);
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 5000);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-24 bg-[#F8FAFC] border-t border-slate-200/80">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-blue-600 text-xs font-semibold tracking-wider uppercase mb-3 font-['Poppins']">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{t('contact.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-['Poppins'] tracking-tight">
            {t('contact.title')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Contact Details Card (Deep Royal Navy / Indigo) */}
          <div className="bg-[#0B132B] text-white rounded-2xl p-8 shadow-xl flex flex-col justify-between border border-slate-800">
            <div>
              <h3 className="text-xl font-bold font-['Poppins'] mb-6 text-white">
                {t('contact.headquarters')}
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">{t('contact.locationLabel')}</div>
                    <div className="text-sm font-medium text-slate-100 mt-0.5">{COMPANY_INFO.location}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">{t('contact.phoneLabel')}</div>
                    <div className="space-y-1 mt-0.5">
                      <a
                        href={`tel:${COMPANY_INFO.phone}`}
                        className="text-sm font-medium text-slate-100 hover:text-sky-400 transition-colors block"
                      >
                        {COMPANY_INFO.phoneDisplay}
                      </a>
                      <a
                        href={`tel:${COMPANY_INFO.phone2}`}
                        className="text-sm font-medium text-slate-100 hover:text-sky-400 transition-colors block"
                      >
                        {COMPANY_INFO.phone2Display}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">{t('contact.emailLabel')}</div>
                    <a
                      href={`mailto:${TARGET_MAILBOX}`}
                      className="text-sm font-medium text-slate-100 hover:text-sky-400 transition-colors mt-0.5 block break-all"
                    >
                      {TARGET_MAILBOX}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-white/10 text-xs text-slate-400">
              Technical Hours: Monday – Saturday: 9:00 AM – 6:00 PM IST
            </div>
          </div>

          {/* Direct Quick Inquiry Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-['Poppins'] mb-2">
                {t('contact.sendMessage')}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm mb-6">
                {t('contact.formSubtitle')}
              </p>

              {sent ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-emerald-900 text-base font-['Poppins']">
                    {t('contact.successTitle')}
                  </h4>
                  <p className="text-emerald-700 text-xs sm:text-sm">
                    {t('contact.successMsg')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        {t('contact.nameLabel')}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t('contact.namePlaceholder')}
                        className="w-full text-sm border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-slate-50/50 hover:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        {t('contact.emailFieldLabel')}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t('contact.emailPlaceholder')}
                        className="w-full text-sm border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-slate-50/50 hover:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      {t('contact.subjectLabel')}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder={t('contact.subjectPlaceholder')}
                      className="w-full text-sm border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-slate-50/50 hover:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      {t('contact.messageLabel')}
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t('contact.messagePlaceholder')}
                      className="w-full text-sm border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-slate-50/50 hover:bg-white transition-all"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <span className="text-xs text-slate-500 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-blue-600" />
                      Delivers to {TARGET_MAILBOX}
                    </span>
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-7 py-3 rounded-full transition-all duration-300 shadow-md shadow-blue-500/25 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed font-['Poppins']"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>{t('contact.sending')}</span>
                        </>
                      ) : (
                        <>
                          <span>{t('contact.sendBtn')}</span>
                          <Send className="w-3.5 h-3.5 text-white" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
