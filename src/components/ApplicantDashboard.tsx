import React, { useState } from 'react';
import { ApplicantRecord } from '../types';

interface ApplicantDashboardProps {
  onViewPdf: (applicant: ApplicantRecord) => void;
}

const SAMPLE_APPLICANTS: ApplicantRecord[] = [
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
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
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
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
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
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
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
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
];

export const ApplicantDashboard: React.FC<ApplicantDashboardProps> = ({ onViewPdf }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Issued' | 'Pending Verification'>('All');

  const filteredApplicants = SAMPLE_APPLICANTS.filter((app) => {
    const matchesSearch = 
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.casNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || app.casStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <section id="applicant-dashboard" className="py-20 relative z-20 border-t border-white/10 bg-[#0B0F19]" dir="ltr">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <i className="fa-solid fa-graduation-cap"></i>
              <span>Admissions & Immigration Compliance</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Applicant Dashboard & CAS Portal
            </h2>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl font-normal">
              Access and manage applicant admission offers, university matriculation records, and authorized Confirmation of Acceptance for Studies (CAS) documentation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search candidate, ID, CAS..."
                className="pl-9 pr-4 py-2 text-xs rounded-xl bg-[#121826] border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 w-56 sm:w-64"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="py-2 px-3 text-xs rounded-xl bg-[#121826] border border-white/15 text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Statuses</option>
              <option value="Issued">CAS Issued</option>
              <option value="Pending Verification">Pending Verification</option>
            </select>
          </div>
        </div>

        {/* Dashboard Table / Responsive Cards */}
        <div className="bg-[#121826] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
          
          {/* Table for md+ screens */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-[#0e131f] text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                  <th className="py-3.5 px-6">Applicant Details</th>
                  <th className="py-3.5 px-6">Program & Academy</th>
                  <th className="py-3.5 px-6">CAS Reference Number</th>
                  <th className="py-3.5 px-6">Submission Date</th>
                  <th className="py-3.5 px-6">CAS Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {filteredApplicants.map((app) => (
                  <tr key={app.id} className="hover:bg-white/[0.03] transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-white">
                        {app.applicantName}
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <span className="font-mono text-indigo-400">{app.applicationId}</span>
                        <span>•</span>
                        <span>{app.email}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-slate-200">
                        {app.course}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {app.institution}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-[#0e131f] text-slate-200 border border-white/10">
                        {app.casNumber}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-300">
                      {app.submissionDate}
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span>{app.casStatus}</span>
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => onViewPdf(app)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all cursor-pointer border border-indigo-400/30"
                      >
                        <i className="fa-solid fa-file-pdf"></i>
                        <span>View CAS Offer PDF</span>
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredApplicants.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400 text-sm">
                      No candidate records found matching "{searchTerm}".
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Cards for Mobile & Tablet screens */}
          <div className="block lg:hidden divide-y divide-white/5">
            {filteredApplicants.map((app) => (
              <div key={app.id} className="p-5 space-y-3 text-left">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-white text-base">{app.applicantName}</h3>
                    <p className="text-xs text-indigo-400 font-mono mt-0.5">{app.applicationId}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>{app.casStatus}</span>
                  </span>
                </div>

                <div className="text-xs text-slate-300 space-y-1">
                  <p><span className="text-slate-400">Program:</span> {app.course}</p>
                  <p><span className="text-slate-400">Academy:</span> {app.institution}</p>
                  <p><span className="text-slate-400">CAS No:</span> <span className="font-mono text-slate-200">{app.casNumber}</span></p>
                  <p><span className="text-slate-400">Submitted:</span> {app.submissionDate}</p>
                </div>

                <div className="pt-2 flex items-center justify-end">
                  <button
                    onClick={() => onViewPdf(app)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all cursor-pointer border border-indigo-400/30"
                  >
                    <i className="fa-solid fa-file-pdf"></i>
                    <span>View CAS Offer PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
