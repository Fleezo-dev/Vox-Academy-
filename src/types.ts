export type AuthMode = 'signin' | 'signup';

export interface ProgramData {
  title: string;
  badge: string;
  image: string;
  description: string;
  duration: string;
  modules: string[];
}

export interface TrainerData {
  name: string;
  role: string;
  badge: string;
  image: string;
  bio: string;
  experience: string;
  credentials: string[];
}

export interface AdvisorData {
  id: string;
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  specialty: string;
  avatar: string;
  availability: string;
}

export interface ApplicantRecord {
  id: string;
  applicationId: string;
  applicantName: string;
  email: string;
  course: string;
  institution: string;
  submissionDate: string;
  casNumber: string;
  casStatus: 'Issued' | 'Pending Verification' | 'Draft Ready';
  pdfUrl: string;
}
