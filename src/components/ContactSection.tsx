import React, { useState } from 'react';
import { AdvisorData } from '../types';

interface ContactSectionProps {
  onSuccessToast: (message: string) => void;
}

const ADVISORS: AdvisorData[] = [
  {
    id: 'adv-1',
    name: 'Dr. Julian Montgomery',
    role: 'Senior Academic Admissions Director',
    location: 'Oxford & London Campus',
    email: 'j.montgomery@voxacademy.edu',
    phone: '+44 (0) 1865 270142',
    specialty: 'Oxbridge & Russell Group Admissions Rhetoric',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    availability: 'Available for Fall 2026 Cohort',
  },
  {
    id: 'adv-2',
    name: 'Eleanor Vance, M.A.',
    role: 'Chief Forensic Debate Strategist',
    location: 'Geneva & London Bureau',
    email: 'e.vance@voxacademy.edu',
    phone: '+41 22 791 2111',
    specialty: 'WUDC & British Parliamentary Circuit Training',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
    availability: 'Accepting 1-on-1 Mentees',
  },
  {
    id: 'adv-3',
    name: 'David K. O’Connor',
    role: 'Executive Speechwriter & C-Suite Counsel',
    location: 'New York & Boston',
    email: 'd.oconnor@voxacademy.edu',
    phone: '+1 (212) 555-0198',
    specialty: 'Investor Roadshows, Keynotes & Boardroom Persuasion',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    availability: 'Consulting Slots Open',
  },
];

export const ContactSection: React.FC<ContactSectionProps> = ({ onSuccessToast }) => {
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [program, setProgram] = useState('Executive Presence');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Strict phone validation handler
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPhone(val);

    if (/[a-zA-Z]/.test(val)) {
      setPhoneError('Alphabets are not allowed. Please enter numbers only (7 to 15 digits).');
      return;
    }

    if (/[^0-9+() -]/.test(val)) {
      setPhoneError('Only numbers, spaces, +, (), and - are permitted in telephone numbers.');
      return;
    }

    const digitsOnly = val.replace(/[^0-9]/g, '');
    if (val.length > 0 && digitsOnly.length < 7) {
      setPhoneError('Telephone format must contain 7 to 15 digits (e.g. +44 20 7946 0991).');
    } else if (digitsOnly.length > 15) {
      setPhoneError('Telephone number exceeds maximum length of 15 digits.');
    } else {
      setPhoneError(null);
    }
  };

  const handlePhoneBlur = () => {
    if (!phone) {
      setPhoneError('Telephone number is required.');
      return;
    }
    if (/[a-zA-Z]/.test(phone)) {
      setPhoneError('Alphabets are not allowed. Please enter numbers only (7 to 15 digits).');
      return;
    }
    const phoneRegex = /^[+]?[0-9\s\-()]{7,15}$/;
    if (!phoneRegex.test(phone)) {
      setPhoneError('Please enter a valid telephone number (7 to 15 digits, e.g. +44 20 7946 0991).');
    } else {
      setPhoneError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (/[a-zA-Z]/.test(phone)) {
      setPhoneError('Alphabets are not permitted in telephone numbers. Please enter digits only.');
      return;
    }

    // Re-verify strict phone format
    const phoneRegex = /^[+]?[0-9\s\-()]{7,15}$/;
    const digitsOnly = phone.replace(/[^0-9]/g, '');
    if (!phone || digitsOnly.length < 7 || digitsOnly.length > 15 || !phoneRegex.test(phone)) {
      setPhoneError('Valid telephone number is required without letters (7 to 15 digits).');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccessToast(`Thank you, ${name}. Your inquiry for ${program} has been submitted to our senior advisors.`);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setPhoneError(null);
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 relative z-20 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-white" dir="ltr">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <i className="fa-solid fa-users"></i>
            <span>Global Path Academic Advisory</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            GET IN TOUCH WITH OTHER ADVISORS
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 max-w-2xl font-normal">
            Connect directly with department chairs, collegiate admissions counselors, and debate coaches across our UK and North American campuses.
          </p>
        </div>

        {/* Advisor Cards Directory */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {ADVISORS.map((adv) => (
            <div
              key={adv.id}
              className="p-6 rounded-2xl bg-white dark:bg-[#121826] border border-slate-200 dark:border-white/10 shadow-lg hover:border-indigo-500/40 transition-all text-left space-y-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={adv.avatar}
                  alt={adv.name}
                  className="w-14 h-14 rounded-xl object-cover border border-slate-200 dark:border-white/15"
                />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">{adv.name}</h4>
                  <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">{adv.role}</p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                    <i className="fa-solid fa-location-dot text-[10px] text-indigo-600 dark:text-indigo-400"></i>
                    <span>{adv.location}</span>
                  </p>
                </div>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-200 dark:border-white/5 space-y-2">
                <div className="flex items-start gap-2">
                  <i className="fa-solid fa-graduation-cap text-indigo-600 dark:text-indigo-400 mt-0.5"></i>
                  <span><strong className="text-slate-900 dark:text-white">Specialty:</strong> {adv.specialty}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-envelope text-indigo-600 dark:text-indigo-400"></i>
                  <a href={`mailto:${adv.email}`} className="hover:underline text-indigo-600 dark:text-indigo-400 font-mono text-[11px]">
                    {adv.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-phone text-indigo-600 dark:text-indigo-400"></i>
                  <span className="font-mono text-[11px] text-slate-800 dark:text-slate-300 font-semibold">{adv.phone}</span>
                </div>
              </div>

              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
                  {adv.availability}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Form Container: Send us an Inquiry with Strict Phone Validation */}
        <div className="bg-white dark:bg-[#121826] rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl p-8 sm:p-12 text-left">
          <div className="max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
              Send us an Inquiry
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-8 font-normal">
              Submit your curriculum inquiry, group debate booking, or diagnostic assessment request below. All fields are reviewed by senior academic advisors.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Full Name <span className="text-rose-500 dark:text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Marcus Vance"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0e131f] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Email Address <span className="text-rose-500 dark:text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="marcus@alumni.ox.ac.uk"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0e131f] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Strict Telephone Input */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Telephone Number <span className="text-rose-500 dark:text-rose-400">*</span>
                    </label>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Numbers only (no letters)</span>
                  </div>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={handlePhoneChange}
                      onBlur={handlePhoneBlur}
                      placeholder="+44 20 7946 0991"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0e131f] border text-slate-900 dark:text-white text-sm focus:outline-none transition-colors ${
                        phoneError 
                          ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 focus:border-rose-500' 
                          : 'border-slate-300 dark:border-white/15 focus:border-indigo-600 dark:focus:border-indigo-500'
                      }`}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                      <i className="fa-solid fa-phone"></i>
                    </div>
                  </div>
                  {phoneError && (
                    <p className="text-xs text-rose-600 dark:text-rose-400 mt-1.5 flex items-center gap-1 font-medium">
                      <i className="fa-solid fa-triangle-exclamation text-[11px]"></i>
                      <span>{phoneError}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Program of Interest
                  </label>
                  <select
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0e131f] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-500 transition-colors"
                  >
                    <option value="Executive Presence">Executive Presence (8-Week Intensive)</option>
                    <option value="Competitive Debate">Competitive Debate (WUDC Track)</option>
                    <option value="Mastering the Stage">Mastering the Stage (TEDx Coaching)</option>
                    <option value="Interview Mastery">Interview Mastery (Fast Track)</option>
                    <option value="Custom Advisory">Institutional / Corporate Consultation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Academic / Professional Objectives <span className="text-rose-500 dark:text-rose-400">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Outline your public speaking objectives, upcoming debates, or admissions target dates..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0e131f] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-500 transition-colors"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-xl shadow-indigo-600/30 transition-all border border-indigo-400/30 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                      <span>Transmitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Official Inquiry</span>
                      <i className="fa-solid fa-arrow-right ml-2 text-xs"></i>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};
