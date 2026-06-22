export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: 'Male' | 'Female' | 'Transgender' | 'Other';
  state: string;
  district: string;
  annualIncome: number;
  category: 'General' | 'OBC' | 'SC' | 'ST';
  education: 'Illiterate' | 'Primary' | 'High School' | 'Graduate' | 'Post Graduate';
  occupation: 'Student' | 'Farmer' | 'Unemployed' | 'Salaried' | 'Self-employed' | 'Artisan' | 'None';
  isPhysicallyChallenged: boolean;
  isMinority: boolean;
  isWidowOrSingleMother: boolean;
}

export type SchemeCategory = 
  | 'Education'
  | 'Agriculture'
  | 'Employment'
  | 'Women Welfare'
  | 'Health'
  | 'Housing'
  | 'Social Welfare';

export interface SchemeFAQ {
  question: string;
  answer: string;
}

export interface Scheme {
  id: string;
  name: string;
  category: SchemeCategory;
  description: string;
  benefits: string[];
  eligibilityDescription: string;
  minAge?: number;
  maxAge?: number;
  maxIncome?: number;
  allowedGenders?: ('Male' | 'Female' | 'Transgender' | 'Other')[];
  allowedCategories?: ('General' | 'OBC' | 'SC' | 'ST')[];
  allowedOccupations?: string[];
  applicationProcess: string[];
  requiredDocuments: string[];
  faqs: SchemeFAQ[];
  matchScore?: number; // Match score percentage generated using rules or LLM
  matchReasons?: string[]; // Highlight why they match
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  language: 'English' | 'Hindi' | 'Telugu';
  voice?: boolean; // if audio was generated
  audioData?: string; // base64 voice feedback or data
}

export interface SchemeFeedback {
  id: string;
  schemeId?: string;
  schemeName?: string;
  userName: string;
  rating: number; // 1 to 5
  issueType: 'Technical Issue' | 'Information Mismatch' | 'Application Help Needed' | 'General Feedback';
  comment: string;
  status: 'Open' | 'Resolved';
  createdAt: string;
}

export interface SchemeNotification {
  id: string;
  title: string;
  message: string;
  deadline?: string;
  type: 'SMS' | 'WhatsApp' | 'New Scheme' | 'Deadline';
  sentTo: string; // phone number/contact info
  sentAt: string;
}

export interface EnrollmentTask {
  id: string;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
}

export interface EnrollmentRoadmap {
  id: string;
  schemeId: string;
  schemeName: string;
  userId: string;
  tasks: EnrollmentTask[];
  uploadedDocuments: {
    docName: string;
    verified: boolean;
    verificationNotes?: string;
    readinessScore?: number;
  }[];
  progress: number; // 0 to 100
}

export interface VerificationResult {
  docName: string;
  success: boolean;
  notes: string;
  readinessScore: number;
  missingDocuments: string[];
}
