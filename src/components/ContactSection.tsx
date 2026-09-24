import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/servicesData';

export const ContactSection: React.FC = () => {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 bg-[#F8F9FA] border-t border-slate-200/60">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#B3864B] tracking-wider uppercase mb-2 font-['Poppins']">
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F2042] font-['Poppins'] tracking-tight">
            Connect With Our Geoscience Team
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            Located in Almora, Uttarakhand. Reach out for research collaborations, GIS consultancy, or government technical partnerships.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Details Card */}
          <div className="bg-[#0F2042] text-white rounded-2xl p-8 shadow-md flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold font-['Poppins'] mb-6 text-white">
                Headquarters
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-[#B3864B] shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Office Location</div>
                    <div className="text-sm font-medium text-slate-100 mt-0.5">{COMPANY_INFO.location}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-[#B3864B] shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Telephone</div>
                    <a
                      href={`tel:${COMPANY_INFO.phone}`}
                      className="text-sm font-medium text-slate-100 hover:text-[#B3864B] transition-colors mt-0.5 block"
                    >
                      {COMPANY_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-[#B3864B] shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Official Email</div>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="text-sm font-medium text-slate-100 hover:text-[#B3864B] transition-colors mt-0.5 block"
                    >
                      {COMPANY_INFO.email}
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
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm">
            <h3 className="text-xl font-bold text-[#0F2042] font-['Poppins'] mb-2">
              Send a Direct Message
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm mb-6">
              Inquire about technical studies, GIS data licensing, or collaborative research.
            </p>

            {sent ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-900 text-base font-['Poppins']">
                  Message Sent Successfully
                </h4>
                <p className="text-emerald-700 text-xs sm:text-sm">
                  Thank you for reaching out to GEOVERSED. Our team in Almora will respond promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Name or Designation"
                      className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-[#B3864B] focus:ring-1 focus:ring-[#B3864B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@organization.in"
                      className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-[#B3864B] focus:ring-1 focus:ring-[#B3864B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g., Watershed Survey in Almora / GIS Training Workshop"
                    className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-[#B3864B] focus:ring-1 focus:ring-[#B3864B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe your requirements, area of interest, or timeline..."
                    className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-[#B3864B] focus:ring-1 focus:ring-[#B3864B]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-[#0F2042] hover:bg-[#162c5c] text-white text-sm font-medium px-6 py-2.5 rounded-full transition-all duration-300 shadow-sm cursor-pointer"
                  >
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5 text-[#B3864B]" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
