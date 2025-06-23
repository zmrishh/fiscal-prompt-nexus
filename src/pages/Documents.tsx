import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Document, DocumentFilters } from '@/types/documents';
import DocumentSidebar from '@/components/documents/DocumentSidebar';
import DocumentHeader from '@/components/documents/DocumentHeader';
import DocumentGrid from '@/components/documents/DocumentGrid';
import DocumentTable from '@/components/documents/DocumentTable';
import DocumentViewer from '@/components/documents/DocumentViewer';
import SmartDocumentUpload from '@/components/documents/SmartDocumentUpload';

const Documents: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<DocumentFilters>({});
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showUpload, setShowUpload] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  // Mock documents data
  const [documents] = useState<Document[]>([
    {
      id: '1',
      title: 'Invoice #INV-2024-001',
      type: 'Invoice',
      category: 'invoices',
      entity: 'Flipkart India',
      issueDate: '2024-01-15',
      amount: 50000,
      status: 'sent',
      tags: ['GST', 'E-commerce', 'Q1-2024'],
      lastModified: '2024-01-15',
      createdBy: 'Admin'
    },
    {
      id: '2',
      title: 'P&L Statement Q1 2024',
      type: 'Financial Report',
      category: 'financial-reports',
      issueDate: '2024-01-10',
      status: 'draft',
      tags: ['Financial', 'Quarterly'],
      lastModified: '2024-01-10',
      createdBy: 'Finance Team'
    },
    {
      id: '3',
      title: 'GSTR-3B January 2024',
      type: 'Tax Filing',
      category: 'tax-filings',
      issueDate: '2024-01-08',
      status: 'filed',
      tags: ['GST', 'Monthly', 'Compliance'],
      lastModified: '2024-01-08',
      createdBy: 'Tax Team'
    },
    {
      id: '4',
      title: 'AWS Infrastructure Bill',
      type: 'Vendor Bill',
      category: 'vendor-bills',
      entity: 'Amazon Web Services',
      issueDate: '2024-01-05',
      amount: 25000,
      status: 'paid',
      tags: ['Infrastructure', 'Cloud', 'Monthly'],
      lastModified: '2024-01-05',
      createdBy: 'Tech Team'
    },
    {
      id: '5',
      title: 'Board Resolution - Q4 2023',
      type: 'Legal Document',
      category: 'legal-compliance',
      issueDate: '2023-12-30',
      status: 'approved',
      tags: ['Legal', 'Board', 'Quarterly'],
      lastModified: '2023-12-30',
      createdBy: 'Legal Team'
    },
    {
      id: '6',
      title: 'Employee Salary Report',
      type: 'Payroll Document',
      category: 'payroll-docs',
      issueDate: '2024-01-01',
      status: 'completed',
      tags: ['Payroll', 'Monthly', 'HR'],
      lastModified: '2024-01-01',
      createdBy: 'HR Team'
    }
  ]);

  // Filter documents based on search, filters, and category
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.entity?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = !filters.type || doc.type === filters.type;
    const matchesStatus = !filters.status || doc.status === filters.status;
    const matchesEntity = !filters.entity || doc.entity?.toLowerCase().includes(filters.entity.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || (() => {
      switch (selectedCategory) {
        case 'incorporation-legal':
          return doc.category === 'legal-compliance';
        case 'invoices-bills':
          return doc.category === 'invoices' || doc.category === 'vendor-bills';
        case 'payroll-hr':
          return doc.category === 'payroll-docs';
        case 'tax-compliance':
          return doc.category === 'tax-filings';
        case 'fundraising-investor':
          return doc.category === 'investor-reports';
        case 'bank-finance':
          return doc.category === 'banking-documents' || doc.category === 'financial-reports';
        default:
          return true;
      }
    })();
    
    return matchesSearch && matchesType && matchesStatus && matchesEntity && matchesCategory;
  });

  // Calculate document counts by category
  const documentCounts = {
    'all': documents.length,
    'incorporation-legal': documents.filter(d => d.category === 'legal-compliance').length,
    'invoices-bills': documents.filter(d => d.category === 'invoices' || d.category === 'vendor-bills').length,
    'payroll-hr': documents.filter(d => d.category === 'payroll-docs').length,
    'tax-compliance': documents.filter(d => d.category === 'tax-filings').length,
    'fundraising-investor': documents.filter(d => d.category === 'investor-reports').length,
    'bank-finance': documents.filter(d => d.category === 'banking-documents' || d.category === 'financial-reports').length
  };

  const handleDocumentAction = (action: string, document: Document) => {
    console.log(`${action} action for document:`, document);
    if (action === 'view') {
      setSelectedDocument(document);
    }
  };

  const handleUpload = (file: File, metadata: any) => {
    console.log('Uploading file:', file, 'with metadata:', metadata);
    setShowUpload(false);
  };

  return (
    <DashboardLayout>
      <div className="flex h-full">
        <DocumentSidebar
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          documentCounts={documentCounts}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <DocumentHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filters={filters}
            onFiltersChange={setFilters}
            onClearFilters={() => setFilters({})}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onUpload={() => setShowUpload(true)}
            totalDocuments={filteredDocuments.length}
          />
          
          <div className="flex-1 overflow-auto p-6">
            {viewMode === 'grid' ? (
              <DocumentGrid
                documents={filteredDocuments}
                onDocumentClick={setSelectedDocument}
                onDocumentAction={handleDocumentAction}
              />
            ) : (
              <DocumentTable
                documents={filteredDocuments}
                onDocumentClick={setSelectedDocument}
                onDocumentAction={handleDocumentAction}
              />
            )}
          </div>
        </div>

        <Dialog open={showUpload} onOpenChange={setShowUpload}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <SmartDocumentUpload
              onUpload={handleUpload}
              onClose={() => setShowUpload(false)}
            />
          </DialogContent>
        </Dialog>

        <DocumentViewer
          document={selectedDocument}
          isOpen={!!selectedDocument}
          onClose={() => setSelectedDocument(null)}
          onAction={handleDocumentAction}
        />
      </div>
    </DashboardLayout>
  );
};

export default Documents;
