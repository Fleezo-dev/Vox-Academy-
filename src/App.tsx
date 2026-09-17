import React, { useState, useEffect, useRef } from 'react';
import { AuthMode, ProgramData, TrainerData, ApplicantRecord } from './types';
import { AboutSection } from './components/AboutSection';
import { ApplicantDashboard } from './components/ApplicantDashboard';
import { ContactSection } from './components/ContactSection';
import { ConsultationModal } from './components/ConsultationModal';
import { PdfViewerModal } from './components/PdfViewerModal';
import { Footer } from './components/Footer';

export default function App() {
  // Navigation & Dropdowns State
  const [homeDropdownOpen, setHomeDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileHomeSubmenuOpen, setMobileHomeSubmenuOpen] = useState(false);

  // Modals State
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('signup');
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [videoMuted, setVideoMuted] = useState(false);
  const [videoProgress, setVideoProgress] = useState(38);

  const [selectedProgram, setSelectedProgram] = useState<ProgramData | null>(null);
  const [selectedTrainer, setSelectedTrainer] = useState<TrainerData | null>(null);
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [storyModalOpen, setStoryModalOpen] = useState(false);
  const [selectedCasApplicant, setSelectedCasApplicant] = useState<ApplicantRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auth Form states
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');

  // Stats Counter State
  const statsSectionRef = useRef<HTMLDivElement>(null);
  const [statsCounted, setStatsCounted] = useState(false);
  const [stat1, setStat1] = useState(0);
  const [stat2, setStat2] = useState(0);
  const [stat3, setStat3] = useState(0);
  const [stat4, setStat4] = useState(0);

  // Programs Carousel Ref
  const programsCarouselRef = useRef<HTMLDivElement>(null);

  // Canvas Ref
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Toast trigger
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Particle Canvas Simulation for Hero
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    const count = 46;
    const particleColors = [
      'rgba(192, 132, 252, ', // purple/violet
      'rgba(147, 197, 253, ', // soft sky blue
      'rgba(244, 114, 182, ', // soft pink
      'rgba(165, 180, 252, ', // periwinkle
    ];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        size: Math.random() * 2.2 + 0.8,
        opacity: Math.random() * 0.5 + 0.25,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connection mesh
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.14;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(165, 180, 252, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const colorBase = particleColors[idx % particleColors.length];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${colorBase}${p.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Animated Numbers Counter on Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !statsCounted) {
          setStatsCounted(true);

          const duration = 2000;
          const steps = 60;
          const intervalTime = duration / steps;
          let currentStep = 0;

          const target1 = 5000;
          const target2 = 50;
          const target3 = 25;
          const target4 = 98;

          const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            const easeOut = 1 - Math.pow(1 - progress, 3);

            setStat1(Math.floor(target1 * easeOut));
            setStat2(Math.floor(target2 * easeOut));
            setStat3(Math.floor(target3 * easeOut));
            setStat4(Math.floor(target4 * easeOut));

            if (currentStep >= steps) {
              setStat1(target1);
              setStat2(target2);
              setStat3(target3);
              setStat4(target4);
              clearInterval(timer);
            }
          }, intervalTime);
        }
      },
      { threshold: 0.3 }
    );

    if (statsSectionRef.current) {
      observer.observe(statsSectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [statsCounted]);

  // Carousel Scroll Function
  const scrollPrograms = (direction: 'left' | 'right') => {
    if (programsCarouselRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      programsCarouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Programs database
  const programsData: ProgramData[] = [
    {
      title: 'Executive Presence',
      badge: 'C-Suite & Founders',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop',
      description: 'Master commanding auditoriums, pitching to institutional investors, and inspiring multinational teams.',
      duration: '8 Weeks • Intensive Cohort',
      modules: [
        'Acoustic Range & Vocal Projection Engineering',
        'Commanding the Boardroom: Micro-Expressions & Body Posture',
        'Crisis Communication & Media De-escalation',
        'Narrative Framing for High-Stakes Investor Pitches',
        'Live Executive Simulations with Former Fortune 500 CEOs',
      ],
    },
    {
      title: 'Competitive Debate',
      badge: 'Championship Track',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop',
      description: 'Rigorous debate strategy, argumentation deconstruction, and refutation mechanics under WUDC rules.',
      duration: '12 Weeks • Tournament Preparation',
      modules: [
        'First Principles Philosophical & Policy Modeling',
        'British Parliamentary (BP) & Worlds Style Strategy',
        'Rapid 15-Minute Prep Room Argument Construction',
        'Adversarial Refutation & Rebuttal Precision',
        'Mastering Points of Information (POIs) Under Time Pressure',
      ],
    },
    {
      title: 'Mastering the Stage',
      badge: 'TEDx & Keynote Coaching',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop',
      description: 'Turn stage fright into magnetic stage presence. Learn the exact frameworks behind viral TEDx talks.',
      duration: '6 Weeks • Performance Focused',
      modules: [
        'Neuroscience of Glossophobia & Somatic Grounding',
        'The Hero-Aspiration Narrative Architecture',
        'Stage Choreography, Blocking & Spatial Command',
        'Dynamic Slide Orchestration (Beyond PowerPoint)',
        'Recorded Rehearsal Studio Sessions with Frame Analysis',
      ],
    },
    {
      title: 'Interview Mastery',
      badge: 'Fast Track',
      image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=1200&auto=format&fit=crop',
      description: 'Achieve peak performance in high-stakes university and corporate interviews.',
      duration: '4 Weeks • Accelerated Fast-Track',
      modules: [
        'Behavioral & Competency-Based Question Deconstruction',
        'The STAR-V Method: Anchoring Values in Answers',
        'Combating Unconscious Hesitations and Filler Words',
        'Executive Case Interview Presentation Skills',
        'Mock Panels with Ivy League & Top-Tier Hiring Evaluators',
      ],
    },
  ];

  // Faculty trainers database
  const trainersData: TrainerData[] = [
    {
      name: 'Elena Rostova',
      role: 'Head of Debate',
      badge: 'WUDC Best Speaker 2022',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
      bio: 'Oxford graduate, 3x European Champion, and consultant for Fortune 500 executives on persuasive communication.',
      experience: '12+ Years Coaching Experience',
      credentials: [
        'Chief Adjudicator, World Universities Debating Championship (2023)',
        'Master of Philosophy in Political Theory, University of Oxford',
        'Adviser to European Commission Parliamentary delegates',
        'Coach to 14 national debate champion teams',
      ],
    },
    {
      name: 'Marcus Sterling',
      role: 'Director of Public Speaking',
      badge: 'TEDx Keynote Coach',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop',
      bio: 'Has coached over 50 TEDx speakers. Specializes in storytelling, emotional connection, and stage presence.',
      experience: '50+ TEDx Talks Curated & Coached',
      credentials: [
        'Keynote speaker across 28 countries on vocal charisma',
        'Former Broadway voice & posture coach',
        'Author of "The Unshakable Voice: Science of Resonance"',
        'Personal coach to Silicon Valley unicorn founders',
      ],
    },
    {
      name: 'Dr. Amara Singh',
      role: 'Executive Coach',
      badge: 'Executive Communication',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop',
      bio: 'Ph.D. in Communications. Former political speechwriter turned corporate communication strategist.',
      experience: 'Advisor to Global CEOs & Cabinet Ministers',
      credentials: [
        'Doctor of Philosophy in Rhetoric and Cognitive Framing',
        'Former Chief Speechwriter for international diplomatic missions',
        'Harvard Business Review Contributor on Crisis Leadership',
        'Creator of the Vox Strategic Persuasion Framework',
      ],
    },
  ];

  return (
    <div dir="ltr" className="min-h-screen bg-[#0B0F19] text-[#F8FAFC] flex flex-col selection:bg-indigo-600 selection:text-white font-sans antialiased relative text-left">
      
      {/* ==================== 1. HEADER & NAVIGATION ==================== */}
      <header id="site-header" className="fixed top-0 left-0 right-0 z-50 bg-[#0B0F19]/40 backdrop-blur-md border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo: exact match from original VoxAcademy site */}
            <a href="#" className="flex items-center gap-3 group focus:outline-none">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#1E40AF] to-[#9333EA] flex items-center justify-center text-white font-bold text-2xl group-hover:scale-105 group-hover:rotate-2 transition-transform duration-300 shadow-lg shadow-blue-900/30 border border-white/20">
                <span>V</span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white flex items-center">
                Vox<span className="text-blue-400 font-bold ml-0.5">Academy</span>
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav id="desktop-nav" className="hidden md:flex items-center gap-7">
              {/* Home Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setHomeDropdownOpen(true)}
                onMouseLeave={() => setHomeDropdownOpen(false)}
              >
                <button 
                  onClick={() => setHomeDropdownOpen(!homeDropdownOpen)}
                  className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors py-2 focus:outline-none"
                >
                  <span>Home</span>
                  <i className={`fa-solid fa-chevron-down text-[11px] text-slate-400 transition-transform duration-200 ${homeDropdownOpen ? 'rotate-180 text-white' : ''}`}></i>
                </button>
                
                {homeDropdownOpen && (
                  <div className="absolute top-full -left-2 w-56 py-2 bg-[#0e131f] border border-white/10 rounded-xl shadow-2xl transition-all duration-200 text-left">
                    <a 
                      href="#" 
                      onClick={() => setHomeDropdownOpen(false)}
                      className="flex items-center px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <i className="fa-solid fa-landmark text-indigo-400 mr-3 text-xs"></i>
                      <span>Home 1 (Classic)</span>
                    </a>
                    <a 
                      href="#about" 
                      onClick={() => setHomeDropdownOpen(false)}
                      className="flex items-center px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <i className="fa-solid fa-graduation-cap text-amber-400 mr-3 text-xs"></i>
                      <span>About Global Path</span>
                    </a>
                    <a 
                      href="#applicant-dashboard" 
                      onClick={() => setHomeDropdownOpen(false)}
                      className="flex items-center px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <i className="fa-solid fa-file-pdf text-emerald-400 mr-3 text-xs"></i>
                      <span>CAS Offer Portal</span>
                    </a>
                  </div>
                )}
              </div>

              <a href="#about" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">About</a>
              <a href="#programs" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Programs</a>
              <a href="#trainers" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Trainers</a>
              <a href="#testimonials" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Success Stories</a>
              <a href="#applicant-dashboard" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1.5 font-semibold">
                <i className="fa-solid fa-file-shield text-xs"></i>
                <span>CAS Portal</span>
              </a>
              <a href="#contact" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Contact</a>
            </nav>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center gap-4">
              <button 
                id="btn-signin-desktop" 
                onClick={() => {
                  setAuthMode('signin');
                  setAuthModalOpen(true);
                }}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-3 py-2 cursor-pointer"
              >
                Sign In
              </button>
              <button 
                id="btn-getstarted-desktop" 
                onClick={() => setConsultationModalOpen(true)}
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all border border-indigo-400/30 cursor-pointer"
              >
                <span>Consultation</span>
                <i className="fa-solid fa-calendar-check ml-2 text-xs"></i>
              </button>
            </div>

            {/* Mobile Hamburger Button with crisp white icon */}
            <div className="flex items-center md:hidden">
              <button 
                id="mobile-menu-btn" 
                aria-label="Toggle menu" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-white hover:text-indigo-400 focus:outline-none rounded-lg cursor-pointer"
              >
                <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl text-white`}></i>
              </button>
            </div>

          </div>
        </div>

        {/* ==================== 1. MOBILE MENU DROPDOWN (100% OPAQUE DARK NAVY bg-[#0e131f]) ==================== */}
        {mobileMenuOpen && (
          <div 
            id="mobile-drawer" 
            className="md:hidden fixed inset-x-0 top-20 bottom-0 z-[9999] bg-[#0e131f] border-b border-white/10 px-6 py-6 shadow-2xl overflow-y-auto text-left transition-all duration-200"
            dir="ltr"
          >
            <div className="flex flex-col space-y-4 text-left">
              <div>
                <button 
                  onClick={() => setMobileHomeSubmenuOpen(!mobileHomeSubmenuOpen)}
                  className="flex items-center justify-between w-full py-2.5 text-left text-base font-semibold text-white border-b border-white/10"
                >
                  <span>Home</span>
                  <i className={`fa-solid fa-chevron-down text-xs text-slate-400 transition-transform ${mobileHomeSubmenuOpen ? 'rotate-180 text-indigo-400' : ''}`}></i>
                </button>
                {mobileHomeSubmenuOpen && (
                  <div className="pl-4 pt-2 space-y-2 border-l-2 border-indigo-500/40 ml-2 my-2">
                    <a 
                      href="#" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1.5 text-sm text-slate-300 hover:text-white"
                    >
                      Home 1 (Classic Overview)
                    </a>
                    <a 
                      href="#about" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1.5 text-sm text-slate-300 hover:text-white"
                    >
                      About Global Path Education
                    </a>
                    <a 
                      href="#applicant-dashboard" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1.5 text-sm text-slate-300 hover:text-white"
                    >
                      CAS Offer PDF Portal
                    </a>
                  </div>
                )}
              </div>

              <a 
                href="#about" 
                onClick={() => setMobileMenuOpen(false)} 
                className="py-2.5 text-base font-medium text-slate-200 hover:text-white border-b border-white/10"
              >
                About Global Path Education
              </a>

              <a 
                href="#programs" 
                onClick={() => setMobileMenuOpen(false)} 
                className="py-2.5 text-base font-medium text-slate-200 hover:text-white border-b border-white/10"
              >
                Programs & Curriculum
              </a>

              <a 
                href="#trainers" 
                onClick={() => setMobileMenuOpen(false)} 
                className="py-2.5 text-base font-medium text-slate-200 hover:text-white border-b border-white/10"
              >
                Faculty Trainers
              </a>

              <a 
                href="#testimonials" 
                onClick={() => setMobileMenuOpen(false)} 
                className="py-2.5 text-base font-medium text-slate-200 hover:text-white border-b border-white/10"
              >
                Success Stories
              </a>

              <a 
                href="#applicant-dashboard" 
                onClick={() => setMobileMenuOpen(false)} 
                className="py-2.5 text-base font-medium text-indigo-400 hover:underline border-b border-white/10 flex items-center gap-2"
              >
                <i className="fa-solid fa-file-pdf text-sm"></i>
                <span>Applicant Dashboard (CAS Offers)</span>
              </a>

              <a 
                href="#contact" 
                onClick={() => setMobileMenuOpen(false)} 
                className="py-2.5 text-base font-medium text-slate-200 hover:text-white border-b border-white/10"
              >
                Advisors & Contact
              </a>

              <div className="pt-4 flex flex-col gap-3">
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setConsultationModalOpen(true);
                  }}
                  className="w-full py-3 text-center text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/30"
                >
                  Book Free Consultation
                </button>
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthMode('signin');
                    setAuthModalOpen(true);
                  }}
                  className="w-full py-3 text-center text-sm font-semibold text-slate-200 border border-white/15 rounded-xl hover:bg-white/5"
                >
                  Sign In to Portal
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ==================== HERO SECTION (MATCHING ORIGINAL LIVE SITE & SCREENSHOT 2) ==================== */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden" dir="ltr">
        
        {/* Background Image: Original Workshop Photo with soft blur effect */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=3840&auto=format&fit=crop" 
            alt="Auditorium" 
            className="w-full h-full object-cover filter blur-[1.5px] scale-105" 
          />
          {/* Exact dual overlay layers from original site */}
          <div className="absolute inset-0 bg-slate-900/70 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900 dark:to-slate-950"></div>
        </div>

        {/* Canvas Particles */}
        <canvas ref={canvasRef} id="hero-canvas" className="absolute inset-0 z-10 pointer-events-none opacity-60 w-full h-full"></canvas>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-6">
          
          {/* Enrollment Status Pill Badge: exact glass-card from original site */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-on-scroll hover:scale-105 transition-transform duration-300">
            <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.8)]"></span>
            <span className="text-sm font-medium text-white">Enrollment Open for Fall 2026</span>
          </div>

          {/* Headline: Exact typography & gradient from original site */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-tight animate-on-scroll">
            Master the Art of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Persuasion
            </span>
          </h1>

          {/* Subheadline: Exact styling from original site */}
          <p className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto mb-10 animate-on-scroll font-sans">
            Elite training in public speaking, competitive debate, and executive communication for the leaders of tomorrow.
          </p>

          {/* Action Buttons: Solid white Explore Programs + glass Watch Showcase button with blur */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-on-scroll">
            <a 
              id="hero-cta-primary" 
              href="#programs" 
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-900 font-bold text-lg hover:bg-blue-50 hover:scale-105 hover:shadow-xl transition-all duration-300 text-center cursor-pointer"
            >
              Explore Programs
            </a>
            <button 
              id="hero-cta-secondary" 
              onClick={() => setVideoModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-full glass text-white font-bold text-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-3 group cursor-pointer focus:outline-none"
            >
              <span className="w-6 h-6 rounded-full bg-white text-slate-950 flex items-center justify-center text-[10px] pl-0.5 shadow-md group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-play"></i>
              </span>
              <span>Watch Showcase</span>
            </button>
          </div>

        </div>

        {/* Scroll indicator from original site */}
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <a href="#stats-section" aria-label="Scroll to stats" className="text-white/50 hover:text-white transition-colors hover:scale-110">
            <i className="fa-solid fa-arrow-down text-2xl sm:text-3xl"></i>
          </a>
        </div>
      </section>

      {/* ==================== 2. STATS & COUNTER CARDS (DARK ROUNDED CARDS) ==================== */}
      <section ref={statsSectionRef} id="stats-section" className="py-16 relative z-20 border-y border-white/10 bg-[#0B0F19]" dir="ltr">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            
            {/* Stat 1: Alumni Worldwide */}
            <div className="bg-[#121826] border border-white/10 p-6 sm:p-8 rounded-2xl text-center relative overflow-hidden group hover:border-indigo-500/40 shadow-xl transition-all">
              <div className="text-4xl sm:text-5xl font-extrabold text-white mb-2 tracking-tight flex items-center justify-center">
                <span>{stat1.toLocaleString()}</span><span>+</span>
              </div>
              <div className="text-sm font-medium text-slate-300">
                Alumni Worldwide
              </div>
            </div>

            {/* Stat 2: Championship Titles */}
            <div className="bg-[#121826] border border-white/10 p-6 sm:p-8 rounded-2xl text-center relative overflow-hidden group hover:border-indigo-500/40 shadow-xl transition-all">
              <div className="text-4xl sm:text-5xl font-extrabold text-white mb-2 tracking-tight flex items-center justify-center">
                <span>{stat2}</span><span>+</span>
              </div>
              <div className="text-sm font-medium text-slate-300">
                Championship Titles
              </div>
            </div>

            {/* Stat 3: Elite Coaches */}
            <div className="bg-[#121826] border border-white/10 p-6 sm:p-8 rounded-2xl text-center relative overflow-hidden group hover:border-indigo-500/40 shadow-xl transition-all">
              <div className="text-4xl sm:text-5xl font-extrabold text-white mb-2 tracking-tight flex items-center justify-center">
                <span>{stat3}</span><span>+</span>
              </div>
              <div className="text-sm font-medium text-slate-300">
                Elite Coaches
              </div>
            </div>

            {/* Stat 4: Satisfaction Rate */}
            <div className="bg-[#121826] border border-white/10 p-6 sm:p-8 rounded-2xl text-center relative overflow-hidden group hover:border-indigo-500/40 shadow-xl transition-all">
              <div className="text-4xl sm:text-5xl font-extrabold text-white mb-2 tracking-tight flex items-center justify-center">
                <span>{stat4}</span><span>%</span>
              </div>
              <div className="text-sm font-medium text-slate-300">
                Satisfaction Rate
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== ABOUT GLOBAL PATH EDUCATION SECTION ==================== */}
      <AboutSection 
        onOpenStory={() => setStoryModalOpen(true)}
        onOpenConsultation={() => setConsultationModalOpen(true)}
      />

      {/* ==================== 3. SIGNATURE PROGRAMS CARDS ==================== */}
      <section id="programs" className="py-24 relative z-20 border-t border-white/10 bg-[#0B0F19]" dir="ltr">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          
          {/* Section Header with Slider Navigation Arrows */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold tracking-wide uppercase mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                Curriculum
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                Our Signature Programs
              </h2>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center gap-3">
              <button 
                id="slider-prev-btn" 
                onClick={() => scrollPrograms('left')}
                aria-label="Previous Program" 
                className="w-11 h-11 rounded-full border border-white/15 hover:border-white/30 bg-[#121826] hover:bg-[#161f30] flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer shadow-md"
              >
                <i className="fa-solid fa-chevron-left text-sm"></i>
              </button>
              <button 
                id="slider-next-btn" 
                onClick={() => scrollPrograms('right')}
                aria-label="Next Program" 
                className="w-11 h-11 rounded-full border border-white/15 hover:border-white/30 bg-[#121826] hover:bg-[#161f30] flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer shadow-md"
              >
                <i className="fa-solid fa-chevron-right text-sm"></i>
              </button>
            </div>
          </div>

          {/* Carousel Track */}
          <div 
            ref={programsCarouselRef}
            className="flex gap-6 overflow-x-auto pb-6 pt-2 no-scrollbar snap-x snap-mandatory"
          >
            {programsData.map((prog, idx) => (
              <div 
                key={idx} 
                className="bg-[#121826] border border-white/10 min-w-[300px] sm:min-w-[360px] lg:min-w-[380px] rounded-2xl overflow-hidden flex flex-col snap-start group shadow-xl hover:border-indigo-500/40 transition-all"
              >
                <div className="relative h-56 overflow-hidden bg-slate-900">
                  <img 
                    src={prog.image} 
                    alt={prog.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-transparent to-transparent"></div>
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-indigo-300 text-xs font-semibold border border-white/10">
                    {prog.badge}
                  </span>
                </div>

                {/* Bottom content block: dark surface, pure white title, accent subtitle, light gray bio */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4 text-left bg-[#121826]">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{prog.title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4 font-normal">
                      {prog.description}
                    </p>
                    <span className="text-xs text-indigo-400 font-semibold uppercase tracking-wider block">
                      {prog.duration}
                    </span>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <button 
                      onClick={() => setSelectedProgram(prog)}
                      className="text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white cursor-pointer"
                    >
                      View Syllabus ({prog.modules.length} Modules)
                    </button>
                    <button 
                      onClick={() => setSelectedProgram(prog)}
                      className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer"
                    >
                      <i className="fa-solid fa-arrow-right text-xs"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================== VIDEO SHOWCASE SECTION ==================== */}
      <section id="video-showcase" className="py-24 relative z-20 overflow-hidden border-t border-white/10 bg-[#0B0F19]" dir="ltr">
        
        {/* Banner Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1561489413-985b06da5bee?q=80&w=2560&auto=format&fit=crop" 
            alt="Auditorium showcase" 
            className="w-full h-full object-cover object-center opacity-20" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19] via-[#0B0F19]/90 to-[#0B0F19]"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold tracking-wide uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
            Inside VoxAcademy
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-12">
            Experience the Vox Difference
          </h2>

          {/* Video Player Mockup Container */}
          <div 
            onClick={() => setVideoModalOpen(true)}
            className="relative mx-auto max-w-4xl rounded-2xl overflow-hidden border border-white/15 shadow-2xl group cursor-pointer"
          >
            {/* Thumbnail */}
            <img 
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&auto=format&fit=crop" 
              alt="Video showcase preview" 
              className="w-full aspect-video object-cover group-hover:scale-102 transition-transform duration-700 brightness-90 group-hover:brightness-100" 
            />

            {/* Centered Glowing Play Button */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/25 transition-colors">
              <div className="relative flex items-center justify-center">
                <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-indigo-500/30 animate-ping opacity-60"></div>
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-indigo-600 group-hover:bg-indigo-500 text-white flex items-center justify-center shadow-2xl shadow-indigo-500/50 border border-indigo-300/40 group-hover:scale-110 transition-transform duration-300">
                  <i className="fa-solid fa-play text-2xl sm:text-3xl ml-1 text-white"></i>
                </div>
              </div>
            </div>

            {/* Video Duration & Title Pill */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center gap-3">
              <span className="px-3 py-1 rounded-md bg-black/80 backdrop-blur-md text-white text-xs font-medium border border-white/10">
                <i className="fa-solid fa-circle text-[8px] text-red-500 mr-1.5 animate-pulse"></i> 2:45 Mini-Doc
              </span>
              <span className="text-xs sm:text-sm font-medium text-slate-200 drop-shadow hidden sm:inline-block">
                The Vox Method: From Panic to Persuasion
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* ==================== 3. WORLD-CLASS TRAINERS CARDS ==================== */}
      <section id="trainers" className="py-24 relative z-20 border-t border-white/10 bg-[#0B0F19]" dir="ltr">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold tracking-wide uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
              Faculty
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              World-Class Trainers
            </h2>
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Learn directly from individuals who have conquered the biggest stages globally.
            </p>
          </div>

          {/* Trainer Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trainersData.map((trainer, idx) => (
              <div 
                key={idx} 
                className="bg-[#121826] border border-white/10 rounded-2xl overflow-hidden flex flex-col group text-left shadow-xl hover:border-indigo-500/40 transition-all"
              >
                <div className="relative h-80 overflow-hidden bg-slate-900">
                  <img 
                    src={trainer.image} 
                    alt={trainer.name} 
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121826] via-transparent to-transparent"></div>
                  
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full backdrop-blur-md text-xs font-semibold border ${
                      idx === 0 ? 'bg-indigo-950/80 text-indigo-300 border-indigo-500/30' :
                      idx === 1 ? 'bg-amber-950/80 text-amber-300 border-amber-500/30' :
                      'bg-violet-950/80 text-violet-300 border-violet-500/30'
                    }`}>
                      {trainer.badge}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-0.5">{trainer.name}</h3>
                    <p className="text-indigo-400 font-semibold text-xs uppercase tracking-wider">{trainer.role}</p>
                  </div>
                </div>

                {/* Bottom Content Block: Dark surface, pure white name, accent subtitle, readable light gray bio, bright action link */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4 bg-[#121826]">
                  <p className="text-slate-300 text-sm leading-relaxed font-normal">
                    {trainer.bio}
                  </p>
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-slate-400">{trainer.experience}</span>
                    <button 
                      onClick={() => setSelectedTrainer(trainer)}
                      className="text-indigo-400 hover:text-indigo-300 font-semibold text-xs inline-flex items-center gap-1.5 focus:outline-none cursor-pointer"
                    >
                      <span>View Profile</span>
                      <i className="fa-solid fa-arrow-right text-xs"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Button */}
          <div className="mt-14 text-center">
            <button 
              onClick={() => showToast("VoxAcademy features 32 active world-champion faculty members worldwide.")}
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold text-white bg-[#121826] hover:bg-[#161f30] rounded-xl border border-white/15 hover:border-white/30 transition-all shadow-md cursor-pointer"
            >
              See All Trainers
              <i className="fa-solid fa-arrow-right ml-2.5 text-xs"></i>
            </button>
          </div>

        </div>
      </section>

      {/* ==================== 4. TESTIMONIALS / SUCCESS STORIES CARDS ==================== */}
      <section id="testimonials" className="py-24 relative z-20 border-t border-white/10 bg-[#0B0F19]" dir="ltr">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold tracking-wide uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
              Testimonials
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Success Stories
            </h2>
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Hear from graduates who went from stage hesitation to international acclaim.
            </p>
          </div>

          {/* Testimonials Grid: Deep navy bg-[#121826], vibrant gold stars, sharp off-white quote, pure white name, muted blue-gray title */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
            
            {/* Story 1 */}
            <div className="bg-[#121826] border border-white/10 p-8 rounded-2xl flex flex-col justify-between space-y-6 text-left shadow-xl hover:border-indigo-500/30 transition-all">
              <div>
                <div className="flex text-amber-400 gap-1 mb-4 text-sm">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
                <p className="text-slate-200 text-sm leading-relaxed italic">
                  "Before Vox, pitch meetings filled me with anxiety. Within 4 weeks of the Executive Presence track, our team closed a $14M Series A round. The vocal projection drills were transformative."
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop" 
                  alt="Sophia Liang" 
                  className="w-12 h-12 rounded-full object-cover border border-indigo-400/30" 
                />
                <div>
                  <h4 className="font-bold text-white text-sm">Sophia Liang</h4>
                  <p className="text-xs text-slate-400">Founder & CEO, Synapse Health</p>
                </div>
              </div>
            </div>

            {/* Story 2 (Primary Featured Card with subtle rich navy accent) */}
            <div className="bg-[#121826] border border-indigo-500/30 p-8 rounded-2xl flex flex-col justify-between space-y-6 text-left shadow-xl hover:border-indigo-400/50 transition-all">
              <div>
                <div className="flex text-amber-400 gap-1 mb-4 text-sm">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
                <p className="text-slate-200 text-sm leading-relaxed italic">
                  "The debate coaches at Vox didn't just teach us argumentation; they transformed how we perceive counter-arguments. Our university team reached the grand finals at WUDC."
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop" 
                  alt="Tariq Al-Mansoor" 
                  className="w-12 h-12 rounded-full object-cover border border-indigo-400/30" 
                />
                <div>
                  <h4 className="font-bold text-white text-sm">Tariq Al-Mansoor</h4>
                  <p className="text-xs text-slate-400">President, Cambridge Union Debating Society</p>
                </div>
              </div>
            </div>

            {/* Story 3 */}
            <div className="bg-[#121826] border border-white/10 p-8 rounded-2xl flex flex-col justify-between space-y-6 text-left shadow-xl hover:border-indigo-500/30 transition-all">
              <div>
                <div className="flex text-amber-400 gap-1 mb-4 text-sm">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
                <p className="text-slate-200 text-sm leading-relaxed italic">
                  "My TEDx talk reached 1.2M views on YouTube. Marcus broke down my pacing, breathing, and slide transitions with mathematical precision. Worth every second."
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop" 
                  alt="Claire Dumont" 
                  className="w-12 h-12 rounded-full object-cover border border-indigo-400/30" 
                />
                <div>
                  <h4 className="font-bold text-white text-sm">Claire Dumont</h4>
                  <p className="text-xs text-slate-400">Climate Economist & TEDx Speaker</p>
                </div>
              </div>
            </div>

          </div>

          <div className="text-center">
            <button 
              onClick={() => showToast("Over 150+ verified alumni video case studies are available in the student portal.")}
              className="inline-flex items-center justify-center text-sm font-semibold text-indigo-400 hover:text-indigo-300 group cursor-pointer"
            >
              <span>Read more success stories</span>
              <i className="fa-solid fa-arrow-right ml-2 text-xs group-hover:translate-x-1 transition-transform"></i>
            </button>
          </div>

        </div>
      </section>

      {/* ==================== APPLICANT DASHBOARD — CAS OFFER PDF ACTION ==================== */}
      <ApplicantDashboard onViewPdf={(app) => setSelectedCasApplicant(app)} />

      {/* ==================== GET IN TOUCH WITH OTHER ADVISORS & INQUIRY ==================== */}
      <ContactSection onSuccessToast={(msg) => showToast(msg)} />

      {/* ==================== CALL TO ACTION (CTA) SECTION ==================== */}
      <section className="py-24 relative z-20 overflow-hidden border-t border-white/10 bg-[#0B0F19]" dir="ltr">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-br from-indigo-950/60 via-[#121826] to-[#0e131f] p-8 sm:p-14 lg:p-16 text-center shadow-2xl">
            
            {/* Ambient glowing radial lights */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 right-10 w-72 h-72 bg-violet-500/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-5">
                Ready to find your voice?
              </h2>
              <p className="text-base sm:text-lg text-slate-200 mb-10 leading-relaxed font-normal">
                Join thousands of leaders who have transformed their communication skills with VoxAcademy and Global Path Education.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  onClick={() => setConsultationModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl shadow-xl transition-all cursor-pointer"
                >
                  Start Your Journey
                  <i className="fa-solid fa-arrow-right ml-2.5 text-sm text-slate-900"></i>
                </button>
                <button 
                  onClick={() => setConsultationModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 text-base font-semibold text-white bg-white/10 hover:bg-white/15 rounded-xl backdrop-blur-md border border-white/15 transition-all cursor-pointer shadow-lg"
                >
                  Book Free Consultation
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <Footer 
        onOpenConsultation={() => setConsultationModalOpen(true)}
        onShowToast={(msg) => showToast(msg)}
      />

      {/* ==================== MODALS & OVERLAYS ==================== */}

      {/* 1. Auth Modal (Sign In / Sign Up) */}
      {authModalOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in" dir="ltr">
          <div className="relative w-full max-w-md bg-[#121826] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl text-left">
            <button 
              onClick={() => setAuthModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white cursor-pointer"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>

            {/* Tabs */}
            <div className="flex border-b border-white/10 mb-6">
              <button 
                onClick={() => setAuthMode('signin')}
                className={`flex-1 pb-3 text-sm font-semibold transition-colors cursor-pointer ${
                  authMode === 'signin' ? 'text-indigo-400 border-b-2 border-indigo-500' : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button 
                onClick={() => setAuthMode('signup')}
                className={`flex-1 pb-3 text-sm font-semibold transition-colors cursor-pointer ${
                  authMode === 'signup' ? 'text-indigo-400 border-b-2 border-indigo-500' : 'text-slate-400 hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              {authMode === 'signin' ? 'Welcome Back to Vox' : 'Begin Your Transformation'}
            </h3>
            <p className="text-xs text-slate-300 mb-6 font-normal">
              {authMode === 'signin' 
                ? 'Access your course auditoriums, debate drills, and coach feedback.' 
                : 'Join our elite cohort of debate champions and executive speakers.'}
            </p>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                setAuthModalOpen(false);
                showToast(authMode === 'signin' ? `Welcome back, ${authEmail || 'Scholar'}!` : `Account created! Verification sent to ${authEmail}.`);
                setAuthEmail('');
                setAuthPassword('');
                setAuthName('');
              }}
              className="space-y-4"
            >
              {authMode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    placeholder="Marcus Vance"
                    className="w-full px-4 py-2.5 rounded-lg bg-[#0e131f] border border-white/15 focus:border-indigo-500 text-white text-sm outline-none transition-colors"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Email Address</label>
                <input 
                  type="email" 
                  required 
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="scholar@university.edu"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0e131f] border border-white/15 focus:border-indigo-500 text-white text-sm outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Password</label>
                <input 
                  type="password" 
                  required 
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0e131f] border border-white/15 focus:border-indigo-500 text-white text-sm outline-none transition-colors"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer mt-2 border border-indigo-400/30"
              >
                {authMode === 'signin' ? 'Sign In to Portal' : 'Register for Fall 2026'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 2. Video Player Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-fade-in" dir="ltr">
          <div className="relative w-full max-w-4xl bg-gray-950 border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
            <button 
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-slate-300 hover:text-white flex items-center justify-center border border-white/10 cursor-pointer"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>

            {/* Video Stage Simulation */}
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&auto=format&fit=crop" 
                alt="Showcase Stage"
                className={`w-full h-full object-cover transition-opacity duration-300 ${videoPlaying ? 'opacity-90' : 'opacity-60'}`}
              />

              {/* Play / Pause Overlay */}
              <button 
                onClick={() => setVideoPlaying(!videoPlaying)}
                className="absolute inset-0 flex items-center justify-center group cursor-pointer focus:outline-none"
              >
                <div className="w-20 h-20 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-2xl border border-white/20 group-hover:scale-110 transition-transform">
                  <i className={`fa-solid ${videoPlaying ? 'fa-pause' : 'fa-play'} text-2xl ${videoPlaying ? '' : 'ml-1'}`}></i>
                </div>
              </button>

              {/* Player Bar Controls */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 sm:p-6 flex flex-col gap-2">
                {/* Progress bar */}
                <div 
                  className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden cursor-pointer"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    setVideoProgress(Math.round((clickX / rect.width) * 100));
                  }}
                >
                  <div className="bg-indigo-500 h-full rounded-full transition-all" style={{ width: `${videoProgress}%` }}></div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-4">
                    <button onClick={() => setVideoPlaying(!videoPlaying)} className="hover:text-white cursor-pointer">
                      <i className={`fa-solid ${videoPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                    </button>
                    <button onClick={() => setVideoMuted(!videoMuted)} className="hover:text-white cursor-pointer">
                      <i className={`fa-solid ${videoMuted ? 'fa-volume-xmark text-red-400' : 'fa-volume-high'}`}></i>
                    </button>
                    <span>01:14 / 02:45</span>
                  </div>
                  <div className="font-medium text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                    <span>Vox Keynote Masterclass Series</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Program Detail Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in" dir="ltr">
          <div className="relative w-full max-w-2xl bg-[#121826] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl text-left max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setSelectedProgram(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white cursor-pointer"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>

            <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/20 mb-3">
              {selectedProgram.badge}
            </span>

            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{selectedProgram.title}</h3>
            <p className="text-xs text-indigo-400 font-medium mb-4">{selectedProgram.duration}</p>

            <p className="text-slate-300 text-sm leading-relaxed mb-6 font-normal">
              {selectedProgram.description}
            </p>

            <div className="mb-6">
              <h4 className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-3">Curriculum Syllabus</h4>
              <ul className="space-y-2.5 text-sm text-slate-300">
                {selectedProgram.modules.map((mod, i) => (
                  <li key={i} className="flex items-start gap-3 bg-[#0e131f] p-3 rounded-lg border border-white/5">
                    <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                      {i + 1}
                    </span>
                    <span>{mod}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
              <button 
                onClick={() => setSelectedProgram(null)}
                className="px-4 py-2 text-sm text-slate-400 hover:text-white cursor-pointer"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  setSelectedProgram(null);
                  setConsultationModalOpen(true);
                }}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer border border-indigo-400/30"
              >
                Book Consultation for Program
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Trainer Profile Modal */}
      {selectedTrainer && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in" dir="ltr">
          <div className="relative w-full max-w-2xl bg-[#121826] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl text-left max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setSelectedTrainer(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white cursor-pointer"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
              <img 
                src={selectedTrainer.image} 
                alt={selectedTrainer.name} 
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border border-white/20 shadow-xl"
              />
              <div className="text-center sm:text-left">
                <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/20 inline-block mb-2">
                  {selectedTrainer.badge}
                </span>
                <h3 className="text-2xl font-bold text-white mb-1">{selectedTrainer.name}</h3>
                <p className="text-indigo-400 text-sm font-medium">{selectedTrainer.role}</p>
                <p className="text-slate-400 text-xs mt-1">{selectedTrainer.experience}</p>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6 font-normal">
              {selectedTrainer.bio}
            </p>

            <div className="mb-6">
              <h4 className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-3">Distinctions & Academic Leadership</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                {selectedTrainer.credentials.map((cred, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <i className="fa-solid fa-circle-check text-indigo-400 text-sm mt-1"></i>
                    <span>{cred}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
              <button 
                onClick={() => setSelectedTrainer(null)}
                className="px-4 py-2 text-sm text-slate-400 hover:text-white cursor-pointer"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  setSelectedTrainer(null);
                  setConsultationModalOpen(true);
                }}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer border border-indigo-400/30"
              >
                Request 1-on-1 Coaching
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Read Our Story Modal */}
      {storyModalOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in" dir="ltr">
          <div className="relative w-full max-w-2xl bg-[#121826] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl text-left max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setStoryModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white cursor-pointer"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>

            <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/20 mb-3">
              The Genesis of Vox & Global Path Education
            </span>

            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">The VoxAcademy Heritage</h3>

            <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-normal">
              <p>
                VoxAcademy was founded by a coalition of Oxford and Cambridge Union champions alongside executive voice trainers from London and New York. Frustrated by superficial presentation courses that merely taught hand gestures without addressing the underlying cognitive mechanisms of argumentation, they engineered the <em>Vox Persuasion Framework</em> in partnership with Global Path Education.
              </p>
              <p>
                Over the past decade, the Academy has trained world champions at the World Universities Debating Championship (WUDC), guided TEDx speakers to tens of millions of views, and coached corporate executives through billion-dollar IPO roadshows and crisis press conferences.
              </p>
              <p>
                Our philosophy remains unchanged: eloquence is not an innate gift granted to a select few; it is a rigorous, trainable discipline combining cognitive clarity, emotional calibration, and acoustic command.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-end mt-6">
              <button 
                onClick={() => setStoryModalOpen(false)}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer border border-indigo-400/30"
              >
                Close Story
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Book Free Consultation Modal with Strict Phone Validation */}
      <ConsultationModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
        onSuccessToast={(msg) => showToast(msg)}
      />

      {/* 7. CAS Offer PDF Viewer Modal */}
      <PdfViewerModal
        applicant={selectedCasApplicant}
        onClose={() => setSelectedCasApplicant(null)}
      />

      {/* 8. Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[10001] flex items-center gap-3 px-5 py-3 rounded-xl bg-[#121826] text-white shadow-2xl border border-indigo-500/40 text-sm animate-bounce" dir="ltr">
          <i className="fa-solid fa-circle-check text-emerald-400"></i>
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
