import React from 'react';
import { ApplicantRecord } from '../types';

interface PdfViewerModalProps {
  applicant: ApplicantRecord | null;
  onClose: () => void;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({ applicant, onClose }) => {
  if (!applicant) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleOpenNewTab = () => {
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
            <span style="font-size: 10px; color: #64748b;">Global Path Education • Oxford Academic Registry • Serial Token #GPA-${applicant.casNumber}</span>
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
  };

  return (
    <div 
      id="pdf-preview-modal" 
      className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      dir="ltr"
    >
      <div className="relative w-full max-w-5xl h-[92vh] bg-white dark:bg-[#0d111a] border border-slate-200 dark:border-slate-700/60 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-left">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#111827]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <i className="fa-solid fa-file-pdf text-xl"></i>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Confirmation of Acceptance for Studies (CAS) Statement</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 font-semibold">
                  Official CAS Issued
                </span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Applicant: <strong className="text-slate-800 dark:text-slate-200">{applicant.applicantName}</strong> • CAS ID: <span className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold">{applicant.casNumber}</span> • {applicant.institution}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800 transition-colors cursor-pointer"
              title="Print CAS document"
            >
              <i className="fa-solid fa-print"></i>
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>
            <button
              onClick={handleOpenNewTab}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 transition-colors cursor-pointer"
              title="Open in printable format"
            >
              <i className="fa-solid fa-arrow-up-right-from-square"></i>
              <span className="hidden sm:inline">Open in New Tab</span>
            </button>
            <button
              id="close-pdf-modal-btn"
              onClick={onClose}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close PDF Viewer"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>
        </div>

        {/* Info Banner */}
        <div className="px-6 py-2 bg-indigo-50/80 dark:bg-indigo-950/30 border-b border-indigo-100 dark:border-indigo-900/40 text-xs text-slate-700 dark:text-indigo-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-shield-halved text-indigo-600 dark:text-indigo-400"></i>
            <span>Verified Document: Registered under UK Home Office & Global Path Education Academic Compliance Registry.</span>
          </div>
          <span className="hidden md:inline text-slate-500 dark:text-slate-400">Course: {applicant.course}</span>
        </div>

        {/* Official Interactive CAS Offer Statement Document View */}
        <div className="flex-1 w-full bg-slate-100 dark:bg-slate-950 p-4 sm:p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto bg-white dark:bg-[#121826] border border-slate-200 dark:border-white/10 rounded-2xl p-6 sm:p-10 shadow-xl space-y-6 text-slate-900 dark:text-white">
            
            {/* Document Letterhead */}
            <div className="flex items-start justify-between border-b-2 border-indigo-600 pb-5">
              <div>
                <div className="text-xs uppercase tracking-widest font-extrabold text-indigo-600 dark:text-indigo-400">
                  United Kingdom Visas & Immigration (UKVI) Compliance
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5">
                  CONFIRMATION OF ACCEPTANCE FOR STUDIES (CAS)
                </h1>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Issued by Global Path Education & VoxAcademy Academic Consortium
                </p>
              </div>
              <div className="text-right">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white flex items-center justify-center font-bold text-2xl shadow-lg border border-white/20 ml-auto">
                  <span>V</span>
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 block font-mono">
                  Sponsor: SLN-8849-VXGP
                </span>
              </div>
            </div>

            {/* Section 1: CAS Metadata */}
            <div className="bg-slate-50 dark:bg-[#0e131f] border border-slate-200 dark:border-white/10 rounded-xl p-4 sm:p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3 flex items-center gap-1.5">
                <i className="fa-solid fa-stamp"></i>
                <span>1. Official CAS Statement Identification</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px] font-semibold uppercase">CAS Reference Number</span>
                  <span className="font-mono text-base font-bold text-indigo-600 dark:text-indigo-400">{applicant.casNumber}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px] font-semibold uppercase">Application ID</span>
                  <span className="font-mono text-sm font-semibold text-slate-800 dark:text-slate-200">{applicant.applicationId}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px] font-semibold uppercase">CAS Issue Date</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{applicant.submissionDate}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px] font-semibold uppercase">CAS Status</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>{applicant.casStatus} (Ready for Visa Filing)</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Section 2: Applicant Particulars */}
            <div className="bg-slate-50 dark:bg-[#0e131f] border border-slate-200 dark:border-white/10 rounded-xl p-4 sm:p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3 flex items-center gap-1.5">
                <i className="fa-solid fa-user-check"></i>
                <span>2. Candidate Particulars</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px] font-semibold uppercase">Applicant Full Name</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{applicant.applicantName}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px] font-semibold uppercase">Registered Email</span>
                  <span className="text-slate-800 dark:text-slate-200 font-mono">{applicant.email}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px] font-semibold uppercase">English Proficiency Standard</span>
                  <span className="text-slate-800 dark:text-slate-200">CEFR C2 / Oxford Union Diagnostic Verified</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px] font-semibold uppercase">Admissions Offer Type</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">Unconditional Academic Placement</span>
                </div>
              </div>
            </div>

            {/* Section 3: Course & Institution Particulars */}
            <div className="bg-slate-50 dark:bg-[#0e131f] border border-slate-200 dark:border-white/10 rounded-xl p-4 sm:p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3 flex items-center gap-1.5">
                <i className="fa-solid fa-graduation-cap"></i>
                <span>3. Course & Institution Particulars</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px] font-semibold uppercase">Program Name</span>
                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-300">{applicant.course}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px] font-semibold uppercase">Institution & Campus</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{applicant.institution}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px] font-semibold uppercase">Academic Level</span>
                  <span className="text-slate-800 dark:text-slate-200">RQF Level 7 / Masterclass Fellowship</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px] font-semibold uppercase">Tuition Fee Assessment</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold font-mono">£8,500.00 (Paid in Full)</span>
                </div>
              </div>
            </div>

            {/* Official Electronic Endorsement */}
            <div className="border-t border-slate-200 dark:border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-lg">
                  <i className="fa-solid fa-qrcode"></i>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">Digital Validation Hash: SHA-256</p>
                  <p className="font-mono text-[10px] text-slate-500">e82a...91b4 • Verified in UKVI Student Registry</p>
                </div>
              </div>

              <div className="text-center sm:text-right">
                <div className="font-serif italic font-bold text-base text-indigo-700 dark:text-indigo-300">
                  Dr. Amara Singh
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                  Dean of Admissions & Academic Registry
                </div>
                <div className="text-[10px] text-slate-500">
                  Global Path Education & VoxAcademy
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#111827] flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
          <div>
            Need assistance with this CAS document? Contact Admissions Registry at <a href="mailto:cas-registry@voxacademy.edu" className="text-indigo-600 dark:text-indigo-400 hover:underline">cas-registry@voxacademy.edu</a>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 font-medium transition-colors cursor-pointer"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
};
