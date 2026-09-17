import React from 'react';
import { ApplicantRecord } from '../types';

interface PdfViewerModalProps {
  applicant: ApplicantRecord | null;
  onClose: () => void;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({ applicant, onClose }) => {
  if (!applicant) return null;

  return (
    <div 
      id="pdf-preview-modal" 
      className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
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
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Confirmation of Acceptance for Studies (CAS) Statement</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 font-semibold">
                  Official CAS
                </span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Applicant: <strong className="text-slate-800 dark:text-slate-200">{applicant.applicantName}</strong> • CAS ID: <span className="font-mono text-indigo-600 dark:text-indigo-400">{applicant.casNumber}</span> • {applicant.institution}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={applicant.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800 transition-colors"
              title="Open in new window"
            >
              <i className="fa-solid fa-arrow-up-right-from-square"></i>
              <span className="hidden sm:inline">Open in New Tab</span>
            </a>
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
        <div className="px-6 py-2 bg-indigo-50/70 dark:bg-indigo-950/30 border-b border-indigo-100 dark:border-indigo-900/40 text-xs text-slate-700 dark:text-indigo-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-shield-halved text-indigo-500"></i>
            <span>Verified Document: Registered under UK Home Office & Global Path Education Academic Compliance Registry.</span>
          </div>
          <span className="hidden md:inline text-slate-500 dark:text-slate-400">Course: {applicant.course}</span>
        </div>

        {/* Embedded PDF iframe */}
        <div className="flex-1 w-full bg-slate-100 dark:bg-slate-950 relative">
          <iframe
            src={applicant.pdfUrl}
            title={`CAS Statement for ${applicant.applicantName}`}
            className="w-full h-full border-0"
          />
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
