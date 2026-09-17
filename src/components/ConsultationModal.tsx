import React, { useState } from 'react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessToast: (message: string) => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  onSuccessToast,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [preferredDate, setPreferredDate] = useState('2026-10-15');
  const [targetFocus, setTargetFocus] = useState('Executive Presence & Keynotes');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  // Strict Phone Validation Handler
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    // Disallow and strip any alphabetical letters or invalid symbols immediately
    const filtered = rawVal.replace(/[^0-9+() -]/g, '');

    if (/[a-zA-Z]/.test(rawVal)) {
      setPhoneError('Letters are not permitted. Please enter valid phone numbers only.');
    } else {
      setPhoneError(null);
    }

    setPhone(filtered);

    if (filtered.length > 0) {
      const phonePattern = /^[+]?[0-9\s\-()]{7,15}$/;
      if (!phonePattern.test(filtered) && filtered.length > 3) {
        setPhoneError('Telephone format must contain 7 to 15 digits (e.g. +44 1865 270000).');
      } else {
        setPhoneError(null);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phonePattern = /^[+]?[0-9\s\-()]{7,15}$/;
    if (!phonePattern.test(phone)) {
      setPhoneError('Please enter a valid telephone number (7 to 15 digits).');
      return;
    }

    onSuccessToast(
      `Consultation booked! An admissions advisor has reserved your slot for ${preferredDate}. Confirmation dispatched to ${email} & SMS to ${phone}.`
    );
    setName('');
    setEmail('');
    setPhone('');
    setPhoneError(null);
    setNotes('');
    onClose();
  };

  return (
    <div
      id="consultation-modal"
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      dir="ltr"
    >
      <div className="relative w-full max-w-lg bg-[#121826] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl text-left max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white cursor-pointer w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
          aria-label="Close Modal"
        >
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-3">
          <i className="fa-solid fa-calendar-check"></i>
          <span>Admissions Office</span>
        </div>

        <h3 className="text-2xl font-bold text-white mb-2">
          Book Free Consultation
        </h3>
        <p className="text-xs text-slate-300 mb-6 leading-relaxed font-normal">
          Schedule a 1-on-1 private diagnostic session with our Senior Academic Dean. We review your speech recordings, debate records, or university interview timelines.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Full Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Marcus Vance"
              className="w-full px-4 py-2.5 rounded-xl bg-[#0e131f] border border-white/15 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Email Address <span className="text-rose-400">*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="marcus.vance@example.com"
              className="w-full px-4 py-2.5 rounded-xl bg-[#0e131f] border border-white/15 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* CRITICAL REQUIREMENT: Strict Phone Input Validation */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Telephone Number <span className="text-rose-400">*</span>
            </label>
            <input
              id="consultation-phone-input"
              type="tel"
              required
              value={phone}
              onChange={handlePhoneChange}
              pattern="^[+]?[0-9\s\-()]{7,15}$"
              title="Telephone number must be 7 to 15 digits (e.g. +44 1865 270000 or (212) 555-0198)"
              placeholder="+44 1865 270000 or (212) 555-0198"
              className={`w-full px-4 py-2.5 rounded-xl bg-[#0e131f] border text-white text-sm focus:outline-none transition-colors ${
                phoneError ? 'border-rose-500 focus:border-rose-500' : 'border-white/15 focus:border-indigo-500'
              }`}
            />
            {phoneError ? (
              <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-medium">
                <i className="fa-solid fa-triangle-exclamation text-[11px]"></i>
                <span>{phoneError}</span>
              </p>
            ) : (
              <p className="text-[11px] text-slate-400 mt-1">
                Strict international validation: 7-15 digits only (+, spaces, hyphens accepted).
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Preferred Date
              </label>
              <input
                type="date"
                required
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0e131f] border border-white/15 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Focus Area
              </label>
              <select
                value={targetFocus}
                onChange={(e) => setTargetFocus(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0e131f] border border-white/15 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="Executive Presence & Keynotes">Executive Presence & Keynotes</option>
                <option value="Competitive Debate Training">Competitive Debate Training</option>
                <option value="Collegiate & Ivy Interview Prep">Collegiate & Ivy Interview Prep</option>
                <option value="Stage Anxiety & Vocal Modulation">Stage Anxiety & Vocal Modulation</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Specific Objectives (Optional)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tell us about your background or upcoming speaking engagements..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#0e131f] border border-white/15 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            ></textarea>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm shadow-xl shadow-indigo-600/30 transition-all cursor-pointer border border-indigo-400/30"
            >
              Confirm 1-on-1 Consultation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
