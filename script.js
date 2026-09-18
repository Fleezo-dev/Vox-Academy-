/**
 * VoxAcademy & Global Path Education
 * Standalone Vanilla JavaScript Implementation
 */

// ==========================================
// 1. DATA REPOSITORY
// ==========================================

const PROGRAMS_DATA = [
  {
    id: 'prog-1',
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
    id: 'prog-2',
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
    id: 'prog-3',
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
    id: 'prog-4',
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

const TRAINERS_DATA = [
  {
    id: 'trainer-1',
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
    id: 'trainer-2',
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
    id: 'trainer-3',
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

const APPLICANTS_DATA = [
  {
    id: '1',
    applicationId: 'GPA-2026-0814',
    applicantName: 'Marcus Vance',
    email: 'm.vance@oxfordalumni.org',
    course: 'Executive Presence & Leadership Rhetoric',
    institution: 'VoxAcademy Center Oxford',
    submissionDate: '12 Sep 2026',
    casNumber: 'CAS-GB-8849102-VX',
    casStatus: 'Issued',
  },
  {
    id: '2',
    applicationId: 'GPA-2026-1049',
    applicantName: 'Elena Rostova',
    email: 'elena.rostova@debate.eu',
    course: 'Competitive Debate & WUDC Championship Cohort',
    institution: 'Global Path Education London',
    submissionDate: '10 Sep 2026',
    casNumber: 'CAS-GB-7712490-GP',
    casStatus: 'Issued',
  },
  {
    id: '3',
    applicationId: 'GPA-2026-0922',
    applicantName: 'David Chen',
    email: 'd.chen@singaporetech.edu.sg',
    course: 'Stage Command & TEDx Keynote Intensive',
    institution: 'Vox International Institute',
    submissionDate: '08 Sep 2026',
    casNumber: 'CAS-GB-6623091-VX',
    casStatus: 'Issued',
  },
  {
    id: '4',
    applicationId: 'GPA-2026-1180',
    applicantName: 'Aisha Patel',
    email: 'aisha.patel@globalpath.org',
    course: 'Ivy League & Corporate Interview Mastery',
    institution: 'Global Path Education Cambridge',
    submissionDate: '04 Sep 2026',
    casNumber: 'CAS-GB-5510984-GP',
    casStatus: 'Issued',
  },
];

let selectedApplicantForCas = null;

// ==========================================
// 2. TOAST NOTIFICATION UTILITY
// ==========================================

function showToast(message) {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'fixed bottom-6 right-6 z-[10001] flex items-center gap-3 px-5 py-3 rounded-xl bg-[#121826] text-white shadow-2xl border border-indigo-500/40 text-sm animate-fade-in';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <i class="fa-solid fa-circle-check text-emerald-400"></i>
    <span>${message}</span>
  `;
  toast.style.display = 'flex';

  if (window.toastTimeout) clearTimeout(window.toastTimeout);
  window.toastTimeout = setTimeout(() => {
    toast.style.display = 'none';
  }, 4000);
}

// ==========================================
// 3. HERO CANVAS PARTICLE SIMULATION
// ==========================================

function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = canvas.parentElement ? canvas.parentElement.offsetWidth : window.innerWidth);
  let height = (canvas.height = canvas.parentElement ? canvas.parentElement.offsetHeight : window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = canvas.parentElement ? canvas.parentElement.offsetWidth : window.innerWidth;
    height = canvas.height = canvas.parentElement ? canvas.parentElement.offsetHeight : window.innerHeight;
  });

  const particles = [];
  const count = 46;
  const particleColors = [
    'rgba(192, 132, 252, ', // purple
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

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Connecting lines
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

    // Particles
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

    requestAnimationFrame(render);
  }

  render();
}

// ==========================================
// 4. ANIMATED STATS NUMBERS ON SCROLL
// ==========================================

function initStatsCounter() {
  const statsSection = document.getElementById('stats-section');
  if (!statsSection) return;

  let counted = false;

  const observer = new IntersectionObserver((entries) => {
    const [entry] = entries;
    if (entry.isIntersecting && !counted) {
      counted = true;

      const stat1El = document.getElementById('stat-1');
      const stat2El = document.getElementById('stat-2');
      const stat3El = document.getElementById('stat-3');
      const stat4El = document.getElementById('stat-4');

      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);

        if (stat1El) stat1El.textContent = Math.floor(5000 * easeOut).toLocaleString();
        if (stat2El) stat2El.textContent = Math.floor(50 * easeOut);
        if (stat3El) stat3El.textContent = Math.floor(25 * easeOut);
        if (stat4El) stat4El.textContent = Math.floor(98 * easeOut);

        if (step >= steps) {
          if (stat1El) stat1El.textContent = '5,000';
          if (stat2El) stat2El.textContent = '50';
          if (stat3El) stat3El.textContent = '25';
          if (stat4El) stat4El.textContent = '98';
          clearInterval(timer);
        }
      }, interval);
    }
  }, { threshold: 0.3 });

  observer.observe(statsSection);
}

// ==========================================
// 5. PROGRAMS CAROUSEL SCROLLER
// ==========================================

function scrollPrograms(direction) {
  const carousel = document.getElementById('programs-carousel');
  if (carousel) {
    const amount = direction === 'left' ? -380 : 380;
    carousel.scrollBy({ left: amount, behavior: 'smooth' });
  }
}

// ==========================================
// 6. MODAL UTILITIES
// ==========================================

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.classList.remove('active');
  });
  document.body.style.overflow = '';
}

// Close on Escape or click outside
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAllModals();
});

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    closeAllModals();
  }
});

// ==========================================
// 7. SPECIFIC MODAL HANDLERS
// ==========================================

// Program Detail Modal
function openProgramModal(programId) {
  const prog = PROGRAMS_DATA.find(p => p.id === programId);
  if (!prog) return;

  document.getElementById('modal-program-badge').textContent = prog.badge;
  document.getElementById('modal-program-title').textContent = prog.title;
  document.getElementById('modal-program-duration').textContent = prog.duration;
  document.getElementById('modal-program-desc').textContent = prog.description;

  const modulesList = document.getElementById('modal-program-modules');
  modulesList.innerHTML = prog.modules.map((mod, i) => `
    <li class="flex items-start gap-3 bg-[#0e131f] p-3 rounded-lg border border-white/5">
      <span class="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
        ${i + 1}
      </span>
      <span>${mod}</span>
    </li>
  `).join('');

  openModal('program-modal');
}

// Trainer Detail Modal
function openTrainerModal(trainerId) {
  const trainer = TRAINERS_DATA.find(t => t.id === trainerId);
  if (!trainer) return;

  document.getElementById('modal-trainer-img').src = trainer.image;
  document.getElementById('modal-trainer-badge').textContent = trainer.badge;
  document.getElementById('modal-trainer-name').textContent = trainer.name;
  document.getElementById('modal-trainer-role').textContent = trainer.role;
  document.getElementById('modal-trainer-exp').textContent = trainer.experience;
  document.getElementById('modal-trainer-bio').textContent = trainer.bio;

  const credsList = document.getElementById('modal-trainer-credentials');
  credsList.innerHTML = trainer.credentials.map(c => `
    <li class="flex items-start gap-2.5">
      <i class="fa-solid fa-circle-check text-indigo-400 text-sm mt-1"></i>
      <span>${c}</span>
    </li>
  `).join('');

  openModal('trainer-modal');
}

// Video Showcase Modal Interactive State
let isVideoPlaying = true;
let isVideoMuted = false;
let videoProgress = 38;

function toggleVideoPlay() {
  isVideoPlaying = !isVideoPlaying;
  const icon = document.getElementById('video-play-icon');
  const overlayIcon = document.getElementById('video-overlay-icon');
  if (icon) icon.className = `fa-solid ${isVideoPlaying ? 'fa-pause' : 'fa-play'}`;
  if (overlayIcon) overlayIcon.className = `fa-solid ${isVideoPlaying ? 'fa-pause' : 'fa-play'} text-2xl ${isVideoPlaying ? '' : 'ml-1'}`;
}

function toggleVideoMute() {
  isVideoMuted = !isVideoMuted;
  const icon = document.getElementById('video-mute-icon');
  if (icon) {
    icon.className = `fa-solid ${isVideoMuted ? 'fa-volume-xmark text-red-400' : 'fa-volume-high'}`;
  }
}

function handleVideoScrub(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  videoProgress = Math.round((clickX / rect.width) * 100);
  const bar = document.getElementById('video-progress-bar');
  if (bar) bar.style.width = `${videoProgress}%`;
}

// ==========================================
// 8. APPLICANT DASHBOARD (CAS OFFER PORTAL)
// ==========================================

function renderApplicantTable() {
  const searchTerm = (document.getElementById('applicant-search')?.value || '').toLowerCase();
  const filterStatus = document.getElementById('applicant-status-filter')?.value || 'All';

  const filtered = APPLICANTS_DATA.filter(app => {
    const matchesSearch = 
      app.applicantName.toLowerCase().includes(searchTerm) ||
      app.applicationId.toLowerCase().includes(searchTerm) ||
      app.course.toLowerCase().includes(searchTerm) ||
      app.casNumber.toLowerCase().includes(searchTerm);
    const matchesStatus = filterStatus === 'All' || app.casStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const tbody = document.getElementById('applicant-tbody');
  const mobileList = document.getElementById('applicant-mobile-list');

  if (tbody) {
    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colSpan="6" class="py-12 text-center text-slate-400 text-sm">
            No candidate records found matching "${searchTerm}".
          </td>
        </tr>
      `;
    } else {
      tbody.innerHTML = filtered.map(app => `
        <tr class="hover:bg-white/[0.03] transition-colors">
          <td class="py-4 px-6">
            <div class="font-bold text-white">${app.applicantName}</div>
            <div class="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
              <span class="font-mono text-indigo-400">${app.applicationId}</span>
              <span>•</span>
              <span>${app.email}</span>
            </div>
          </td>
          <td class="py-4 px-6">
            <div class="font-medium text-slate-200">${app.course}</div>
            <div class="text-xs text-slate-400 mt-0.5">${app.institution}</div>
          </td>
          <td class="py-4 px-6">
            <span class="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-[#0e131f] text-slate-200 border border-white/10">
              ${app.casNumber}
            </span>
          </td>
          <td class="py-4 px-6 text-xs text-slate-300">${app.submissionDate}</td>
          <td class="py-4 px-6">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>${app.casStatus}</span>
            </span>
          </td>
          <td class="py-4 px-6 text-right">
            <button
              onclick="openCasModal('${app.id}')"
              class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all cursor-pointer border border-indigo-400/30"
            >
              <i class="fa-solid fa-file-pdf"></i>
              <span>View CAS Offer PDF</span>
            </button>
          </td>
        </tr>
      `).join('');
    }
  }

  if (mobileList) {
    if (filtered.length === 0) {
      mobileList.innerHTML = `<div class="p-8 text-center text-slate-400 text-sm">No candidate records found.</div>`;
    } else {
      mobileList.innerHTML = filtered.map(app => `
        <div class="p-5 space-y-3 text-left">
          <div class="flex items-start justify-between gap-2">
            <div>
              <h3 class="font-bold text-white text-base">${app.applicantName}</h3>
              <p class="text-xs text-indigo-400 font-mono mt-0.5">${app.applicationId}</p>
            </div>
            <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>${app.casStatus}</span>
            </span>
          </div>
          <div class="text-xs text-slate-300 space-y-1">
            <p><span class="text-slate-400">Program:</span> ${app.course}</p>
            <p><span class="text-slate-400">Academy:</span> ${app.institution}</p>
            <p><span class="text-slate-400">CAS No:</span> <span class="font-mono text-slate-200">${app.casNumber}</span></p>
            <p><span class="text-slate-400">Submitted:</span> ${app.submissionDate}</p>
          </div>
          <div class="pt-2 flex items-center justify-end">
            <button
              onclick="openCasModal('${app.id}')"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all cursor-pointer border border-indigo-400/30"
            >
              <i class="fa-solid fa-file-pdf"></i>
              <span>View CAS Offer PDF</span>
            </button>
          </div>
        </div>
      `).join('');
    }
  }
}

// CAS PDF / Statement Modal
function openCasModal(appId) {
  const applicant = APPLICANTS_DATA.find(a => a.id === appId);
  if (!applicant) return;
  selectedApplicantForCas = applicant;

  document.getElementById('cas-candidate-name').textContent = applicant.applicantName;
  document.getElementById('cas-candidate-header-name').textContent = applicant.applicantName;
  document.getElementById('cas-candidate-email').textContent = applicant.email;
  document.getElementById('cas-number-val').textContent = applicant.casNumber;
  document.getElementById('cas-number-header-val').textContent = applicant.casNumber;
  document.getElementById('cas-app-id-val').textContent = applicant.applicationId;
  document.getElementById('cas-date-val').textContent = applicant.submissionDate;
  document.getElementById('cas-course-val').textContent = applicant.course;
  document.getElementById('cas-course-header-val').textContent = applicant.course;
  document.getElementById('cas-inst-val').textContent = applicant.institution;
  document.getElementById('cas-status-val').textContent = applicant.casStatus + ' (Ready for Visa Filing)';

  openModal('cas-pdf-modal');
}

function printCasDocument() {
  window.print();
}

function openCasInNewTab() {
  if (!selectedApplicantForCas) return;
  const applicant = selectedApplicantForCas;
  const printContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>CAS Statement - ${applicant.casNumber} - ${applicant.applicantName}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #0f172a; }
          .header { border-bottom: 2px solid #4f46e5; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; }
          .badge { background: #dcfce7; color: #166534; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: bold; border: 1px solid #86efac; }
          .section { margin-bottom: 24px; padding: 16px; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
          .label { font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 600; margin-bottom: 4px; }
          .val { font-size: 14px; font-weight: 600; color: #0f172a; }
          .cas-num { font-family: monospace; font-size: 16px; color: #4f46e5; }
          .stamp { border: 2px dashed #4f46e5; padding: 16px; text-align: center; border-radius: 12px; margin-top: 30px; color: #4338ca; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1 style="margin: 0; font-size: 20px;">GLOBAL PATH EDUCATION & VOXACADEMY</h1>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #64748b;">UK Visas & Immigration Compliance Registry • Higher Education Sponsor</p>
          </div>
          <span class="badge">OFFICIAL CAS ISSUED</span>
        </div>
        <div class="section">
          <h3 style="margin-top: 0; font-size: 14px; color: #4f46e5;">1. CAS Reference & Document Status</h3>
          <div class="grid">
            <div>
              <div class="label">CAS Reference Number</div>
              <div class="val cas-num">${applicant.casNumber}</div>
            </div>
            <div>
              <div class="label">Application Reference ID</div>
              <div class="val">${applicant.applicationId}</div>
            </div>
            <div>
              <div class="label">Issue Date</div>
              <div class="val">${applicant.submissionDate}</div>
            </div>
            <div>
              <div class="label">UKVI Sponsor License No</div>
              <div class="val font-mono">SLN-8849-VXGP (Tier 4 / Student Route)</div>
            </div>
          </div>
        </div>
        <div class="section">
          <h3 style="margin-top: 0; font-size: 14px; color: #4f46e5;">2. Applicant Personal Particulars</h3>
          <div class="grid">
            <div>
              <div class="label">Full Legal Name</div>
              <div class="val">${applicant.applicantName}</div>
            </div>
            <div>
              <div class="label">Official Contact Email</div>
              <div class="val">${applicant.email}</div>
            </div>
            <div>
              <div class="label">Applicant Status</div>
              <div class="val">Unconditional Offer Accepted</div>
            </div>
            <div>
              <div class="label">English Language Competence</div>
              <div class="val">CEFR C2 / Oxford Union Rhetoric Cleared</div>
            </div>
          </div>
        </div>
        <div class="section">
          <h3 style="margin-top: 0; font-size: 14px; color: #4f46e5;">3. Course of Study & Academy Campus</h3>
          <div class="grid">
            <div>
              <div class="label">Enrolled Program</div>
              <div class="val">${applicant.course}</div>
            </div>
            <div>
              <div class="label">Educational Institution</div>
              <div class="val">${applicant.institution}</div>
            </div>
            <div>
              <div class="label">Academic Qualification Level</div>
              <div class="val">RQF Level 7 / Executive Leadership Certificate</div>
            </div>
            <div>
              <div class="label">Tuition Fee Clearance</div>
              <div class="val">£8,500.00 Paid in Full (Confirmed)</div>
            </div>
          </div>
        </div>
        <div class="stamp">
          <strong>OFFICIAL ELECTRONIC SIGNATURE & SEAL</strong><br/>
          <span style="font-size: 12px;">Dr. Amara Singh, Registrar & Dean of Academic Admissions</span><br/>
          <span style="font-size: 10px; color: #64748b;">Global Path Education • Oxford Academic Registry</span>
        </div>
        <script>window.print();</script>
      </body>
    </html>
  `;
  const newWin = window.open('', '_blank');
  if (newWin) {
    newWin.document.write(printContent);
    newWin.document.close();
  }
}

// ==========================================
// 9. STRICT PHONE VALIDATION LOGIC
// ==========================================

function validatePhoneInput(inputElement, errorElement) {
  const val = inputElement.value;

  if (/[a-zA-Z]/.test(val)) {
    inputElement.classList.add('input-error');
    errorElement.textContent = 'Alphabets are not allowed. Please enter numbers only (7 to 15 digits).';
    errorElement.style.display = 'block';
    return false;
  }

  if (/[^0-9+() -]/.test(val)) {
    inputElement.classList.add('input-error');
    errorElement.textContent = 'Only numbers, spaces, +, (), and - are permitted in telephone numbers.';
    errorElement.style.display = 'block';
    return false;
  }

  const digitsOnly = val.replace(/[^0-9]/g, '');
  if (val.length > 0 && digitsOnly.length < 7) {
    inputElement.classList.add('input-error');
    errorElement.textContent = 'Telephone format must contain 7 to 15 digits (e.g. +44 20 7946 0991).';
    errorElement.style.display = 'block';
    return false;
  } else if (digitsOnly.length > 15) {
    inputElement.classList.add('input-error');
    errorElement.textContent = 'Telephone number exceeds maximum length of 15 digits.';
    errorElement.style.display = 'block';
    return false;
  } else {
    inputElement.classList.remove('input-error');
    errorElement.textContent = '';
    errorElement.style.display = 'none';
    return true;
  }
}

function initFormValidations() {
  // 1. Consultation Modal Phone Input
  const consultPhoneInput = document.getElementById('consult-phone');
  const consultPhoneError = document.getElementById('consult-phone-error');
  const consultForm = document.getElementById('consultation-form');

  if (consultPhoneInput && consultPhoneError) {
    consultPhoneInput.addEventListener('input', () => {
      validatePhoneInput(consultPhoneInput, consultPhoneError);
    });
  }

  if (consultForm && consultPhoneInput && consultPhoneError) {
    consultForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = consultPhoneInput.value;
      const digitsOnly = val.replace(/[^0-9]/g, '');

      if (/[a-zA-Z]/.test(val)) {
        consultPhoneInput.classList.add('input-error');
        consultPhoneError.textContent = 'Alphabets are not allowed. Please enter numbers only (7 to 15 digits).';
        consultPhoneError.style.display = 'block';
        return;
      }

      if (!val || digitsOnly.length < 7 || digitsOnly.length > 15) {
        consultPhoneInput.classList.add('input-error');
        consultPhoneError.textContent = 'Please enter a valid telephone number (7 to 15 digits).';
        consultPhoneError.style.display = 'block';
        return;
      }

      closeModal('consultation-modal');
      showToast('Consultation request confirmed! An academic advisor will reach out shortly.');
      consultForm.reset();
      consultPhoneInput.classList.remove('input-error');
      consultPhoneError.style.display = 'none';
    });
  }

  // 2. Contact Inquiry Form Phone Input
  const inquiryPhoneInput = document.getElementById('inquiry-phone');
  const inquiryPhoneError = document.getElementById('inquiry-phone-error');
  const inquiryForm = document.getElementById('inquiry-form');

  if (inquiryPhoneInput && inquiryPhoneError) {
    inquiryPhoneInput.addEventListener('input', () => {
      validatePhoneInput(inquiryPhoneInput, inquiryPhoneError);
    });
  }

  if (inquiryForm && inquiryPhoneInput && inquiryPhoneError) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = inquiryPhoneInput.value;
      const digitsOnly = val.replace(/[^0-9]/g, '');

      if (/[a-zA-Z]/.test(val)) {
        inquiryPhoneInput.classList.add('input-error');
        inquiryPhoneError.textContent = 'Alphabets are not allowed. Please enter numbers only (7 to 15 digits).';
        inquiryPhoneError.style.display = 'block';
        return;
      }

      if (!val || digitsOnly.length < 7 || digitsOnly.length > 15) {
        inquiryPhoneInput.classList.add('input-error');
        inquiryPhoneError.textContent = 'Valid telephone number is required without letters (7 to 15 digits).';
        inquiryPhoneError.style.display = 'block';
        return;
      }

      showToast('Inquiry sent successfully! A senior academic advisor will contact you within 24 hours.');
      inquiryForm.reset();
      inquiryPhoneInput.classList.remove('input-error');
      inquiryPhoneError.style.display = 'none';
    });
  }

  // 3. Auth Form
  const authForm = document.getElementById('auth-form');
  if (authForm) {
    authForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('auth-email')?.value || 'Scholar';
      const isSignIn = document.getElementById('auth-tab-signin')?.classList.contains('text-indigo-400');
      closeModal('auth-modal');
      showToast(isSignIn ? `Welcome back, ${email}!` : `Account created! Verification link sent to ${email}.`);
      authForm.reset();
    });
  }
}

// Switch auth tabs
function switchAuthTab(mode) {
  const tabSignIn = document.getElementById('auth-tab-signin');
  const tabSignUp = document.getElementById('auth-tab-signup');
  const nameField = document.getElementById('auth-name-field');
  const title = document.getElementById('auth-modal-title');
  const desc = document.getElementById('auth-modal-desc');
  const submitBtn = document.getElementById('auth-submit-btn');

  if (mode === 'signin') {
    tabSignIn.className = 'flex-1 pb-3 text-sm font-semibold transition-colors cursor-pointer text-indigo-400 border-b-2 border-indigo-500';
    tabSignUp.className = 'flex-1 pb-3 text-sm font-semibold transition-colors cursor-pointer text-slate-400 hover:text-white';
    if (nameField) nameField.style.display = 'none';
    if (title) title.textContent = 'Welcome Back to Vox';
    if (desc) desc.textContent = 'Access your course auditoriums, debate drills, and coach feedback.';
    if (submitBtn) submitBtn.textContent = 'Sign In to Portal';
  } else {
    tabSignUp.className = 'flex-1 pb-3 text-sm font-semibold transition-colors cursor-pointer text-indigo-400 border-b-2 border-indigo-500';
    tabSignIn.className = 'flex-1 pb-3 text-sm font-semibold transition-colors cursor-pointer text-slate-400 hover:text-white';
    if (nameField) nameField.style.display = 'block';
    if (title) title.textContent = 'Begin Your Transformation';
    if (desc) desc.textContent = 'Join our elite cohort of debate champions and executive speakers.';
    if (submitBtn) submitBtn.textContent = 'Register for Fall 2026';
  }
}

// ==========================================
// 10. NAVIGATION & DROPDOWNS
// ==========================================

function initNavigation() {
  // Mobile drawer
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileMenuIcon = document.getElementById('mobile-menu-icon');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.style.display === 'block';
      mobileDrawer.style.display = isOpen ? 'none' : 'block';
      if (mobileMenuIcon) {
        mobileMenuIcon.className = `fa-solid ${isOpen ? 'fa-bars' : 'fa-xmark'} text-xl text-white`;
      }
    });
  }

  // Mobile submenu
  const mobileSubmenuBtn = document.getElementById('mobile-submenu-btn');
  const mobileSubmenu = document.getElementById('mobile-submenu');
  const mobileSubmenuIcon = document.getElementById('mobile-submenu-icon');

  if (mobileSubmenuBtn && mobileSubmenu) {
    mobileSubmenuBtn.addEventListener('click', () => {
      const isSubOpen = mobileSubmenu.style.display === 'block';
      mobileSubmenu.style.display = isSubOpen ? 'none' : 'block';
      if (mobileSubmenuIcon) {
        mobileSubmenuIcon.style.transform = isSubOpen ? 'rotate(0deg)' : 'rotate(180deg)';
      }
    });
  }

  // Desktop dropdown
  const homeDropdownWrapper = document.getElementById('home-dropdown-wrapper');
  const homeDropdownMenu = document.getElementById('home-dropdown-menu');

  if (homeDropdownWrapper && homeDropdownMenu) {
    homeDropdownWrapper.addEventListener('mouseenter', () => {
      homeDropdownMenu.style.display = 'block';
    });
    homeDropdownWrapper.addEventListener('mouseleave', () => {
      homeDropdownMenu.style.display = 'none';
    });
  }
}

function closeMobileMenu() {
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileMenuIcon = document.getElementById('mobile-menu-icon');
  if (mobileDrawer) mobileDrawer.style.display = 'none';
  if (mobileMenuIcon) mobileMenuIcon.className = 'fa-solid fa-bars text-xl text-white';
}

// ==========================================
// 11. INITIALIZATION ON DOM READY
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  initHeroCanvas();
  initStatsCounter();
  initNavigation();
  renderApplicantTable();
  initFormValidations();

  // Search input and status filter listeners
  const searchInput = document.getElementById('applicant-search');
  const statusFilter = document.getElementById('applicant-status-filter');

  if (searchInput) {
    searchInput.addEventListener('input', renderApplicantTable);
  }
  if (statusFilter) {
    statusFilter.addEventListener('change', renderApplicantTable);
  }
});
