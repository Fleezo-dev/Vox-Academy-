import React from 'react';

interface AboutSectionProps {
  onOpenStory: () => void;
  onOpenConsultation: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenStory, onOpenConsultation }) => {
  return (
    <section id="about" className="py-24 relative z-20 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white" dir="ltr">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        
        {/* Section Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <i className="fa-solid fa-landmark"></i>
          <span>Academic Heritage & Global Recognition</span>
        </div>

        {/* Main Headings with crisp high contrast in both brighter and dark modes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              About Global Path Education
            </h2>
            <h3 className="text-xl sm:text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
              Architecting World-Class Public Speaking, Debate Excellence, and Academic Leadership
            </h3>
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              Global Path Education, in strategic synergy with VoxAcademy, pioneers the gold standard in speech rhetoric, international parliamentary debate, and collegiate admissions communication. We equip promising students, corporate visionaries, and competitive debaters with the poise, argument taxonomy, and acoustic resonance demanded at the highest global stages.
            </p>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              From the ancient halls of Oxford and Cambridge Union debating societies to the premier debate podiums in Geneva and Singapore, our alumni represent an unshakeable standard of clarity, cognitive agility, and ethical persuasion.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenStory}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer border border-indigo-400/30"
              >
                <span>Read Full Academy Heritage</span>
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </button>
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-900 dark:text-slate-200 bg-slate-100 dark:bg-[#121826] hover:bg-slate-200 dark:hover:bg-[#161f30] border border-slate-300 dark:border-white/15 transition-all cursor-pointer shadow-md"
              >
                <span>Book Free Consultation</span>
                <i className="fa-solid fa-calendar-check text-xs text-indigo-600 dark:text-indigo-400"></i>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#121826] p-2 sm:p-3">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop"
                alt="Global Path Education Seminar Auditorium"
                className="w-full h-80 sm:h-96 object-cover rounded-2xl"
              />
              <div className="absolute inset-x-5 bottom-5 bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-md p-4 rounded-xl border border-slate-200 dark:border-white/15 shadow-xl text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-md">
                    <i className="fa-solid fa-award"></i>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Global Accreditation & Standards</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300">Certified by the International Speech & Debate Federation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Academic Pillars with adaptive contrast cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-slate-50 dark:bg-[#121826] border border-slate-200 dark:border-white/10 shadow-lg hover:border-indigo-500/40 transition-all text-left">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xl mb-5 border border-indigo-500/30">
              <i className="fa-solid fa-brain"></i>
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Cognitive Argument Architecture</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              We teach speakers to break down multi-layered geopolitical, philosophical, and market issues with structured deductive clarity that holds under adversarial interrogation.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-50 dark:bg-[#121826] border border-slate-200 dark:border-white/10 shadow-lg hover:border-violet-500/40 transition-all text-left">
            <div className="w-12 h-12 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center text-xl mb-5 border border-violet-500/30">
              <i className="fa-solid fa-microphone-lines"></i>
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Acoustic Command & Cadence</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Master diaphragmatic pacing, pitch modulation, and strategic pauses to captivate auditoriums without vocal fatigue, commanding immediate respect and audience attention.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-50 dark:bg-[#121826] border border-slate-200 dark:border-white/10 shadow-lg hover:border-blue-500/40 transition-all text-left">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl mb-5 border border-blue-500/30">
              <i className="fa-solid fa-compass"></i>
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Ivy League & Career Gateways</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Our scholars consistently secure admissions into top universities across the UK, US, and Europe, armed with official CAS clearance and elite interview prowess.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
