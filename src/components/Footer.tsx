import React from 'react';

interface FooterProps {
  onOpenConsultation: () => void;
  onShowToast: (msg: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConsultation, onShowToast }) => {
  return (
    <footer className="border-t border-white/10 bg-[#070b12] relative z-20 py-16" dir="ltr">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 mb-12">
          
          {/* Brand & Mission */}
          <div className="md:col-span-4 space-y-5">
            <a href="#" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-700 flex items-center justify-center font-bold text-white shadow-md border border-white/20">
                <span className="text-xl">V</span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Vox<span className="text-indigo-400 font-medium ml-0.5">Academy</span>
              </span>
            </a>
            
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm font-normal">
              Global Path Education & VoxAcademy: Transforming articulate minds into world debate champions, TEDx keynoters, and high-impact boardroom leaders.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-indigo-400 transition-colors shadow-sm"
                aria-label="Twitter"
              >
                <i className="fa-brands fa-x-twitter text-sm"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-indigo-400 transition-colors shadow-sm"
                aria-label="LinkedIn"
              >
                <i className="fa-brands fa-linkedin-in text-sm"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-indigo-400 transition-colors shadow-sm"
                aria-label="Instagram"
              >
                <i className="fa-brands fa-instagram text-sm"></i>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-indigo-400 transition-colors shadow-sm"
                aria-label="YouTube"
              >
                <i className="fa-brands fa-youtube text-sm"></i>
              </a>
            </div>
          </div>

          {/* Quick Academic Links */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-wider text-white font-bold">Curriculum</h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li><a href="#programs" className="hover:text-white transition-colors">Executive Presence</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors">Competitive Debate</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors">TEDx Keynote Track</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors">Interview Mastery</a></li>
              <li><a href="#trainers" className="hover:text-white transition-colors">Faculty Directory</a></li>
            </ul>
          </div>

          {/* CAS & Admissions */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-wider text-white font-bold">Admissions & CAS</h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li><a href="#applicant-dashboard" className="hover:text-white transition-colors flex items-center gap-1.5"><i className="fa-solid fa-file-shield text-indigo-400 text-xs"></i> <span>CAS Offer Portal</span></a></li>
              <li><button onClick={onOpenConsultation} className="hover:text-white transition-colors text-left cursor-pointer">Book Free Diagnostic</button></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Global Path</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Advisory Council</a></li>
              <li><button onClick={() => onShowToast("Admissions for Fall 2026 Cohort close on October 31, 2026.")} className="hover:text-white transition-colors text-left cursor-pointer">Enrollment Timelines</button></li>
            </ul>
          </div>

          {/* Campuses & Contact Details */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-wider text-white font-bold">Campuses</h4>
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <div>
                <p className="font-semibold text-white">Oxford Academic Bureau:</p>
                <p>14 St. Giles, Oxford OX1 3JS, United Kingdom</p>
                <p className="text-indigo-400 font-mono">+44 (0) 1865 270000</p>
              </div>
              <div>
                <p className="font-semibold text-white">London Auditorium:</p>
                <p>Russell Square, Bloomsbury, London WC1B 5DN</p>
                <p className="text-indigo-400 font-mono">+44 (0) 20 7862 8000</p>
              </div>
              <div className="pt-1">
                <a href="mailto:admissions@voxacademy.edu" className="text-indigo-400 hover:underline font-mono">
                  admissions@voxacademy.edu
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 VoxAcademy & Global Path Education. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <button onClick={() => onShowToast("VoxAcademy maintains strict student confidentiality and ISO/IEC 27001 compliance.")} className="hover:text-white cursor-pointer">
              Privacy Notice
            </button>
            <button onClick={() => onShowToast("All academic terms comply with UK Higher Education and UKVI Tier 4 CAS mandates.")} className="hover:text-white cursor-pointer">
              Terms & Conditions
            </button>
            <button onClick={() => onShowToast("Accredited by the International Federation of Speech, Rhetoric and Debate.")} className="hover:text-white cursor-pointer">
              Accreditation
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
