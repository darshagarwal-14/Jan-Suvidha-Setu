export type Language = 'en' | 'hi';

// Enums for deterministic logic
export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export enum Residence {
  Rural = 'rural',
  Urban = 'urban'
}

export enum Caste {
  SC = 'sc',
  ST = 'st',
  OBC = 'obc',
  General = 'general'
}

export enum RationCard {
  BPL = 'bpl', // Below Poverty Line
  AAY = 'aay', // Antyodaya Anna Yojana (Poorest of poor)
  APL = 'apl', // Above Poverty Line
  None = 'none'
}

export enum Occupation {
  Farmer = 'farmer',
  Laborer = 'laborer',
  Student = 'student',
  Unemployed = 'unemployed',
  Salaried = 'salaried'
}

export enum HouseType {
  Kutcha = 'kutcha', // Mud/Thatch
  Pucca = 'pucca', // Concrete/Brick
  Homeless = 'homeless'
}

// User Profile Data Structure
export interface UserProfile {
  age: number;
  gender: Gender | null;
  residence: Residence | null;
  caste: Caste | null;
  occupation: Occupation | null;
  landOwner: boolean | null; // For farmers
  landArea?: number; // In Hectares, simplified for logic
  houseType: HouseType | null;
  rationCard: RationCard | null;
  annualIncome: number; // In INR
  disability: boolean | null;
}

// Question Configuration
export interface QuestionOption {
  value: string | number | boolean;
  label: { en: string; hi: string };
  icon?: string; // Icon name
}

export interface Question {
  id: keyof UserProfile;
  text: { en: string; hi: string };
  subText?: { en: string; hi: string }; // Explainer
  type: 'select' | 'number' | 'boolean';
  options?: QuestionOption[];
  min?: number;
  max?: number;
}

// Scheme Configuration
export interface SchemeRequirement {
  field: keyof UserProfile;
  operator: 'eq' | 'neq' | 'gt' | 'lt' | 'gte' | 'lte' | 'includes';
  value: any;
  description: { en: string; hi: string }; // Explainable rule
}

export interface Document {
  name: { en: string; hi: string };
  description: { en: string; hi: string };
}

export interface Scheme {
  id: string;
  name: { en: string; hi: string };
  benefitShort: { en: string; hi: string }; // "Free House" vs "PMAY-G"
  description: { en: string; hi: string };
  requirements: SchemeRequirement[];
  documents: Document[];
  // Application Info
  applicationMode: 'online' | 'offline' | 'both';
  applicationUrl?: string;
  applicationInstructions: { en: string; hi: string };
  // Live Data Fields
  lastUpdated?: number; // Timestamp
  sourceUrls?: string[]; // URLs from grounding
}

export interface EligibilityResult {
  schemeId: string;
  isEligible: boolean;
  reasons: { en: string; hi: string }[]; // Why eligible or why not
  missingDocs: Document[];
}
