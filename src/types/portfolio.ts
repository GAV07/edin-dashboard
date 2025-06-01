// Base Airtable record structure
export interface AirtableRecord {
  id: string;
  fields: Record<string, any>;
}

// Portfolio company data structure based on your Airtable fields
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
  investorPortalDisplay?: boolean;
}

// API response structure
export interface PortfolioApiResponse {
  companies: AirtableRecord[];
  total: number;
}

// Transformed company data for UI
export interface PortfolioCompanyUI extends PortfolioCompany {
  slug?: string;
} 