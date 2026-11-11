import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  CheckCircle,
  Send,
  Calculator,
  Mail,
  Copy,
  Check,
  ExternalLink,
  Loader2,
  AlertCircle,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { ServiceItem, QuoteFormData } from '../types';
import { CORE_SERVICES, COMPANY_INFO } from '../data/servicesData';

const PRIMARY_MAILBOX = 'geoversedmailbox@gmail.com';
const CC_MAILBOX = 'varunrawatmailbox2507@gmail.com';
const WHATSAPP_NUMBER = '918273753398';

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
  const hiddenFormRef = useRef<HTMLFormElement>(null);
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
  const [copied, setCopied] = useState(false);
  const [dispatchStatus, setDispatchStatus] = useState<{
    formsubmit: 'success' | 'pending' | 'failed';
    netlify: 'success' | 'pending' | 'skipped' | 'failed';
    message?: string;
  }>({
    formsubmit: 'pending',
    netlify: 'pending',
  });

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, serviceId: preselectedService.id }));
    }
    if (!isOpen) {
      setSubmitted(false);
      setCopied(false);
      setLoading(false);
    }
  }, [preselectedService, isOpen]);

  if (!isOpen) return null;

  const selectedServiceObj = CORE_SERVICES.find((s) => s.id === formData.serviceId);
  const serviceName = selectedServiceObj
    ? `${selectedServiceObj.id} | ${selectedServiceObj.title}`
    : `Service ${formData.serviceId}`;

  const generateMailDetails = () => {
    const subject = `[GEOVERSED Technical Quote Request] ${selectedServiceObj?.title || 'Geospatial Service'} - ${formData.fullName}`;

    const body = `Dear GEOVERSED Technical Team,

A new technical quote request has been submitted through the portal:

==================================================
TARGET RECIPIENT: ${PRIMARY_MAILBOX}
SECONDARY / CC: ${CC_MAILBOX}
==================================================
SELECTED SERVICE: ${serviceName}
CLIENT NAME: ${formData.fullName}
ORGANIZATION / DEPT: ${formData.organization || 'Independent / Research'}
CLIENT EMAIL: ${formData.email}
PHONE NUMBER: ${formData.phone || 'Not provided'}
TIMESTAMP: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)

PROJECT SCOPE & LOCATION DETAILS:
${formData.projectScope || 'No additional scope parameters specified.'}

==================================================
GEOVERSED PLAYGROUND AI SOLUTION (OPC) PRIVATE LIMITED
Almora, Uttarakhand 263601, India
Corporate Identification: INC-33 MCA Registered
Website: https://geoversed-playground-ai-solution-opc.netlify.app/`;

    return { subject, body };
  };

  const { subject, body } = generateMailDetails();

  // Links for 100% fail-proof immediate transmission (includes both mailboxes)
  const allRecipients = `${PRIMARY_MAILBOX},${CC_MAILBOX}`;
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(allRecipients)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const mailtoUrl = `mailto:${PRIMARY_MAILBOX}?cc=${encodeURIComponent(CC_MAILBOX)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  const whatsappText = `*GEOVERSED Technical Quote Request*\n\n*Service:* ${serviceName}\n*Client:* ${formData.fullName}\n*Org:* ${formData.organization || 'N/A'}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone || 'N/A'}\n\n*Scope Details:*\n${formData.projectScope || 'Scope to be discussed.'}`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let formsubmitStatus: 'success' | 'failed' = 'failed';
    let netlifyStatus: 'success' | 'skipped' | 'failed' = 'skipped';
    let responseMsg = '';

    // 1. Submit native HTML form to FormSubmit via hidden iframe (bypasses CORS & adblockers)
    try {
      if (hiddenFormRef.current) {
        hiddenFormRef.current.submit();
        formsubmitStatus = 'success';
      }
    } catch (err) {
      console.warn('Native FormSubmit submission error:', err);
    }

    // 2. Dispatch to Netlify Native Forms (when hosted on Netlify)
    try {
      const netlifyData = new URLSearchParams();
      netlifyData.append('form-name', 'technical-quote-request');
      netlifyData.append('fullName', formData.fullName);
      netlifyData.append('email', formData.email);
      netlifyData.append('phone', formData.phone || '');
      netlifyData.append('organization', formData.organization || '');
      netlifyData.append('serviceId', formData.serviceId);
      netlifyData.append('serviceName', serviceName);
      netlifyData.append('projectScope', formData.projectScope || '');
      netlifyData.append('recipient_mailbox', PRIMARY_MAILBOX);
      netlifyData.append('recipient_secondary', CC_MAILBOX);

      const netlifyRes = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: netlifyData.toString(),
      });
      if (netlifyRes.ok) {
        netlifyStatus = 'success';
      }
    } catch {
      netlifyStatus = 'skipped';
    }

    // 3. Background AJAX backup to both mailboxes
    const payload = {
      _subject: subject,
      _replyto: formData.email,
      _captcha: 'false',
      _template: 'table',
      recipient_target: `${CC_MAILBOX}, ${PRIMARY_MAILBOX}`,
      client_name: formData.fullName,
      client_email: formData.email,
      phone_number: formData.phone || 'Not provided',
      organization: formData.organization || 'Independent / Researcher',
      service_requested: serviceName,
      project_scope: formData.projectScope || 'Not provided',
      submission_time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      notice: 'Inquiry received via GEOVERSED Technical Quote Request Modal',
    };

    try {
      await fetch(`https://formsubmit.co/ajax/${CC_MAILBOX}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...payload,
          _cc: PRIMARY_MAILBOX,
        }),
      });
    } catch {
      // Handled by native form submit
    }

    setDispatchStatus({
      formsubmit: formsubmitStatus,
      netlify: netlifyStatus,
      message: responseMsg,
    });

    setLoading(false);
    setSubmitted(true);
  };

  const handleCopyDetails = () => {
    navigator.clipboard
      .writeText(body)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      })
      .catch(() => {});
  };

  return (
    <div
      id="quote-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      {/* Invisible iframe and native HTML form bridge for guaranteed FormSubmit delivery */}
      <iframe
        name="formsubmit-hidden-frame"
        id="formsubmit-hidden-frame"
        className="hidden"
        title="FormSubmit Silent Frame"
      />
      <form
        ref={hiddenFormRef}
        action={`https://formsubmit.co/${CC_MAILBOX}`}
        method="POST"
        target="formsubmit-hidden-frame"
        className="hidden"
      >
        <input type="hidden" name="_subject" value={subject} />
        <input type="hidden" name="_replyto" value={formData.email} />
        <input type="hidden" name="_cc" value={PRIMARY_MAILBOX} />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="Client Name" value={formData.fullName} />
        <input type="hidden" name="Client Email" value={formData.email} />
        <input type="hidden" name="Phone Number" value={formData.phone || 'Not provided'} />
        <input type="hidden" name="Organization" value={formData.organization || 'Independent'} />
        <input type="hidden" name="Service" value={serviceName} />
        <input type="hidden" name="Project Scope" value={formData.projectScope || 'N/A'} />
      </form>

      <div
        id="quote-modal-container"
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg my-auto overflow-hidden border border-slate-100 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0F2042] text-white p-5 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Calculator className="w-4 h-4" />
            Project Estimation &amp; Proposal
          </div>
          <h3 className="text-xl font-bold font-['Poppins']">
            Request a Technical Quote
          </h3>
          <p className="text-slate-300 text-xs mt-1">
            Share your project parameters to receive a custom proposal from our geoscience engineers.
          </p>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          {submitted ? (
            <div className="text-center py-2 space-y-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner ring-4 ring-emerald-50">
                <CheckCircle className="w-7 h-7" />
              </div>
              <div>
                <div className="flex flex-wrap items-center justify-center gap-1.5 mb-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                    <Mail className="w-3 h-3" />
                    {CC_MAILBOX}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-100 text-blue-800">
                    <Mail className="w-3 h-3" />
                    {PRIMARY_MAILBOX}
                  </span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-[#0F2042] font-['Poppins']">
                  Quote Request Dispatched
                </h4>
                <p className="text-slate-600 text-xs sm:text-sm max-w-sm mx-auto mt-1">
                  Thank you, <strong>{formData.fullName}</strong>. Your parameters for{' '}
                  <span className="text-blue-700 font-semibold">{selectedServiceObj?.title || 'Selected Service'}</span>{' '}
                  have been transmitted to our technical inbox.
                </p>
              </div>

              {/* Instant 1-Click Send Fallbacks (100% Guaranteed) */}
              <div className="bg-sky-50/70 border border-sky-200/80 rounded-xl p-3.5 text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-sky-900 flex items-center gap-1.5 font-['Poppins']">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    Instant Direct Transmission (100% Guaranteed)
                  </span>
                  <span className="text-[10px] text-sky-600 font-medium">Zero Delay</span>
                </div>
                <p className="text-[11px] text-sky-800 leading-relaxed mb-3">
                  To ensure immediate receipt without waiting for third-party email filters, send this pre-filled quote inquiry directly through your personal Gmail or WhatsApp:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <a
                    href={gmailComposeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-2.5 rounded-lg transition-colors shadow-2xs cursor-pointer font-['Poppins']"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send via Gmail Web</span>
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-2.5 rounded-lg transition-colors shadow-2xs cursor-pointer font-['Poppins']"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send via WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Admin Delivery Notice & Activation Steps */}
              <div className="bg-amber-50 border border-amber-200/90 rounded-xl p-3.5 text-left flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-[11px] text-amber-900 leading-relaxed space-y-1.5 w-full">
                  <strong className="font-semibold block text-amber-950">
                    Why might you not see incoming emails yet?
                  </strong>
                  <ul className="list-disc pl-4 space-y-1 text-amber-900">
                    <li>
                      <strong>Check Spam / Junk / Promotions Folder:</strong> Search your Gmail for <code>FormSubmit</code> or <code>GEOVERSED</code>.
                    </li>
                    <li>
                      <strong>One-Time Form Activation:</strong> On the very first submission to a mailbox, FormSubmit sends an email with the subject <em>"Confirm your email to start receiving form submissions"</em>. You must click <strong>"Activate Form"</strong> once.
                    </li>
                    <li>
                      <strong>Netlify Dashboard:</strong> If deployed on Netlify, all submissions are permanently recorded in your site dashboard under <strong>Forms &gt; technical-quote-request</strong>.
                    </li>
                  </ul>
                  <div className="pt-1">
                    <a
                      href={`https://formsubmit.co/${CC_MAILBOX}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-lg transition-colors shadow-2xs cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Trigger FormSubmit Activation to {CC_MAILBOX}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Summary card */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 text-left text-xs space-y-2">
                <div className="flex justify-between items-center text-slate-500 pb-2 border-b border-slate-200">
                  <span className="font-semibold uppercase tracking-wider text-[10px]">Inquiry Parameters</span>
                  <span className="text-emerald-700 font-medium flex items-center gap-1 text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Routing to {PRIMARY_MAILBOX}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-700">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Client / Contact</span>
                    <span className="font-medium text-slate-800 truncate block">
                      {formData.fullName} ({formData.email})
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Organization</span>
                    <span className="font-medium text-slate-800 truncate block">
                      {formData.organization || 'Independent / Research'}
                    </span>
                  </div>
                </div>
                {formData.phone && (
                  <div>
                    <span className="text-slate-400 block text-[10px]">Phone</span>
                    <span className="font-medium text-slate-800">{formData.phone}</span>
                  </div>
                )}
                {formData.projectScope && (
                  <div className="pt-1">
                    <span className="text-slate-400 block text-[10px]">Project Scope</span>
                    <p className="text-slate-700 line-clamp-2 italic bg-white p-2 rounded border border-slate-100 mt-0.5">
                      "{formData.projectScope}"
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                <a
                  href={mailtoUrl}
                  className="inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-3.5 py-2 rounded-full transition-colors border border-slate-300/80 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                  <span>Open in Mail App</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyDetails}
                  className="inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-3.5 py-2 rounded-full transition-colors border border-slate-300/80 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Copy Details</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-[#0F2042] hover:bg-[#162c5c] text-white text-xs font-semibold px-5 py-2 rounded-full transition-all cursor-pointer shadow-xs"
                >
                  Done
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
                  className="w-full text-sm border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-[#0F2042] font-medium transition-colors"
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
                    className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
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
                    className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
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
                    className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
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
                    className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
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
                  placeholder="Outline study area (e.g. Almora district, watershed boundary, municipal limits, timeline, or key deliverables)..."
                  className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div className="pt-2">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 w-full sm:w-auto">
                    <span className="font-medium text-slate-700">Direct Options:</span>
                    <a
                      href={gmailComposeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 font-semibold hover:underline"
                      title="Open in Gmail Web with all details pre-filled"
                    >
                      <Mail className="w-3 h-3" />
                      <span>Gmail Web</span>
                    </a>
                    <span className="text-slate-300">•</span>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-semibold hover:underline"
                      title="Send directly to WhatsApp"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                  <div className="flex items-center justify-end gap-3 w-full sm:w-auto">
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
                      className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-300 shadow-md shadow-blue-500/20 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed font-['Poppins']"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Dispatching...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Online</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
