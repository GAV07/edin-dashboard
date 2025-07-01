// Base record structure (now from Notion instead of Airtable)
export interface NotionRecord {
  id: string;
  fields: Record<string, any>;
}

// For backward compatibility, we keep the AirtableRecord interface
// but it now actually represents Notion data with the same structure
export interface AirtableRecord {
  id: string;
  fields: Record<string, any>;
}

// Portfolio company data structure based on your Notion database fields
export interface PortfolioCompany {
  id: string;
  companyName?: string;
  description?: string;
  sector?: string;
  website?: string;
  deck?: string;
  founders?: string;
  founderLinkedIn?: string;
  memosOverviews?: string;
  dataRoom?: string;
  location?: string;
  highlights?: string;
  nextSteps?: string;
  investorPortalDisplay?: boolean;
}

// API response structure (unchanged format)
export interface PortfolioApiResponse {
  companies: AirtableRecord[]; // Actually Notion records but same structure
  total: number;
}

// UI-specific interface for transformed portfolio company data
export interface PortfolioCompanyUI {
  id: string;
  companyName?: string;
  description?: string;
  sector?: string;
  website?: string;
  deck?: string;
  founders?: string;
  founderLinkedIn?: string;
  memosOverviews?: string;
  dataRoom?: string;
  location?: string;
  highlights?: string;
  nextSteps?: string;
  investorPortalDisplay?: boolean;
} 