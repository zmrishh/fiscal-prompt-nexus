
export interface Document {
  id: string;
  title: string;
  type: DocumentType;
  category: DocumentCategory;
  entity?: string;
  issueDate: string;
  amount?: number;
  status: DocumentStatus;
  tags: string[];
  filePath?: string;
  size?: string;
  lastModified: string;
  createdBy: string;
}

export type DocumentType = 
  | 'Invoice'
  | 'Vendor Bill'
  | 'Financial Report'
  | 'Payroll Document'
  | 'Tax Filing'
  | 'Legal Document'
  | 'Compliance Document'
  | 'Investor Report'
  | 'Banking Document';

export type DocumentCategory = 
  | 'invoices'
  | 'vendor-bills'
  | 'financial-reports'
  | 'payroll-docs'
  | 'tax-filings'
  | 'legal-compliance'
  | 'investor-reports'
  | 'banking-documents';

export type DocumentStatus = 
  | 'draft'
  | 'sent'
  | 'filed'
  | 'paid'
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'overdue'
  | 'completed';

export interface DocumentFilters {
  type?: DocumentType;
  status?: DocumentStatus;
  dateRange?: {
    from?: Date;
    to?: Date;
  };
  amountRange?: {
    min: number;
    max: number;
  };
  entity?: string;
  category?: DocumentCategory;
}

export interface Collection {
  id: string;
  name: string;
  description?: string;
  documentIds: string[];
  createdAt: string;
}
