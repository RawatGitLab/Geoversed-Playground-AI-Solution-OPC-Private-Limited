import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Send, Calculator } from 'lucide-react';
import { ServiceItem, QuoteFormData } from '../types';
import { CORE_SERVICES, COMPANY_INFO } from '../data/servicesData';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: ServiceItem | null;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
}) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    email: '',
    phone: '',
    serviceId: preselectedService?.id || '01',
    organization: '',
    projectScope: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, serviceId: preselectedService.id }));
    }
    if (!isOpen) {
      setSubmitted(false);
    }
  }, [preselectedService, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate instant secure processing
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const selectedServiceObj = CORE_SERVICES.find((s) => s.id === formData.serviceId);

  return (
    <div
      id="quote-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="quote-modal-container"
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0F2042] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-[#B3864B] text-xs font-semibold uppercase tracking-wider mb-1">
            <Calculator className="w-4 h-4" />
            Project Estimation & Proposal
          </div>
          <h3 className="text-xl font-bold font-['Poppins']">
            Request a Technical Quote
          </h3>
          <p className="text-slate-300 text-xs mt-1">
            Share your project parameters to receive a custom geoscience or GIS proposal.
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-[#0F2042] font-['Poppins']">
                Quote Request Received
              </h4>
              <p className="text-slate-600 text-sm max-w-sm mx-auto">
                Thank you, <strong>{formData.fullName}</strong>. Our geoscience technical committee will review your requirements for{' '}
                <span className="text-[#B3864B] font-medium">
                  {selectedServiceObj?.title || 'Selected Service'}
                </span>{' '}
                and reach back within 24 business hours at {formData.email}.
              </p>
              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="bg-[#0F2042] hover:bg-[#162c5c] text-white text-sm font-medium px-6 py-2.5 rounded-full transition-all cursor-pointer"
                >
                  Return to Website
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Selected Service
                </label>
                <select
                  value={formData.serviceId}
                  onChange={(e) =>
                    setFormData({ ...formData, serviceId: e.target.value })
                  }
                  className="w-full text-sm border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#B3864B] focus:ring-1 focus:ring-[#B3864B] text-[#0F2042] font-medium transition-colors"
                  required
                >
                  {CORE_SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.id} | {s.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    placeholder="Dr. / Er. / Mr. / Ms."
                    className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-[#B3864B] focus:ring-1 focus:ring-[#B3864B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Organization / Dept
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) =>
                      setFormData({ ...formData, organization: e.target.value })
                    }
                    placeholder="University, Gov or Firm"
                    className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-[#B3864B] focus:ring-1 focus:ring-[#B3864B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="name@organization.com"
                    className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-[#B3864B] focus:ring-1 focus:ring-[#B3864B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="e.g. +91 9876543210"
                    className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-[#B3864B] focus:ring-1 focus:ring-[#B3864B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Project Scope & Location Details
                </label>
                <textarea
                  rows={3}
                  value={formData.projectScope}
                  onChange={(e) =>
                    setFormData({ ...formData, projectScope: e.target.value })
                  }
                  placeholder="Outline your study area (e.g. Almora district, watershed boundary, town municipal limits, timeline, or specific deliverables)..."
                  className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-[#B3864B] focus:ring-1 focus:ring-[#B3864B]"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 bg-[#B3864B] hover:bg-[#9c733d] text-white text-sm font-medium px-6 py-2.5 rounded-full transition-all duration-300 shadow-sm cursor-pointer disabled:opacity-70"
                >
                  {loading ? (
                    <span>Processing...</span>
                  ) : (
                    <>
                      <span>Submit Request</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
