
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  FileText, 
  Plus, 
  Search, 
  Upload, 
  FolderPlus,
  BarChart3,
  Users,
  Building,
  FileSpreadsheet,
  Shield,
  TrendingUp,
  Banknote
} from 'lucide-react';
import { Document, DocumentFilters, Collection } from '@/types/documents';
import DocumentCard from '@/components/documents/DocumentCard';
import DocumentFiltersComponent from '@/components/documents/DocumentFilters';
import DocumentUpload from '@/components/documents/DocumentUpload';

const Documents: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<DocumentFilters>({});
  const [showUpload, setShowUpload] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [collections, setCollections] = useState<Collection[]>([
    {
      id: '1',
      name: 'Q1 2024 Pack',
      description: 'Documents for Q1 2024',
      documentIds: ['1', '2'],
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      name: 'VC Due Diligence',
      description: 'Documents for investor review',
      documentIds: ['3', '4'],
      createdAt: '2024-01-10'
    }
  ]);

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
      title: 'Salary Slip - December 2023',
      type: 'Payroll Document',
      category: 'payroll-docs',
      issueDate: '2024-01-05',
      status: 'completed',
      tags: ['Payroll', 'Monthly'],
      lastModified: '2024-01-05',
      createdBy: 'HR Team'
    },
    {
      id: '6',
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
      id: '7',
      title: 'Cap Table Export',
      type: 'Investor Report',
      category: 'investor-reports',
      issueDate: '2024-01-12',
      status: 'sent',
      tags: ['Investor', 'Equity', 'Quarterly'],
      lastModified: '2024-01-12',
      createdBy: 'Finance Team'
    },
    {
      id: '8',
      title: 'HDFC Bank Statement',
      type: 'Banking Document',
      category: 'banking-documents',
      entity: 'HDFC Bank',
      issueDate: '2024-01-01',
      status: 'completed',
      tags: ['Banking', 'Statement', 'Monthly'],
      lastModified: '2024-01-01',
      createdBy: 'Finance Team'
    }
  ]);

  const categoryIcons = {
    'invoices': FileText,
    'vendor-bills': FileSpreadsheet,
    'financial-reports': BarChart3,
    'payroll-docs': Users,
    'tax-filings': Shield,
    'legal-compliance': Building,
    'investor-reports': TrendingUp,
    'banking-documents': Banknote
  };

  const categoryLabels = {
    'invoices': 'Invoices',
    'vendor-bills': 'Vendor Bills',
    'financial-reports': 'Financial Reports',
    'payroll-docs': 'Payroll Documents',
    'tax-filings': 'Tax Filings',
    'legal-compliance': 'Legal & Compliance',
    'investor-reports': 'Investor Reports',
    'banking-documents': 'Banking Documents'
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.entity?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = !filters.type || doc.type === filters.type;
    const matchesStatus = !filters.status || doc.status === filters.status;
    const matchesEntity = !filters.entity || doc.entity?.toLowerCase().includes(filters.entity.toLowerCase());
    
    return matchesSearch && matchesType && matchesStatus && matchesEntity;
  });

  const getDocumentsByCategory = (category: string) => {
    return filteredDocuments.filter(doc => doc.category === category);
  };

  const handleDocumentAction = (action: string, document: Document) => {
    console.log(`${action} action for document:`, document);
  };

  const handleUpload = (file: File, metadata: any) => {
    console.log('Uploading file:', file, 'with metadata:', metadata);
    setShowUpload(false);
  };

  const upcomingFeatures = [
    'GST auto-filing integration',
    'One-click Form 16 generation',
    'Cap Table PDF export',
    'Automated vendor reconciliation',
    'AI-powered document insights'
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Center</h1>
            <p className="text-gray-600">Manage all your financial documents in one place</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => setShowUpload(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Document
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search documents..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <FolderPlus className="h-4 w-4 mr-2" />
            New Collection
          </Button>
        </div>

        <DocumentFiltersComponent
          filters={filters}
          onFiltersChange={setFilters}
          onClearFilters={() => setFilters({})}
        />

        {collections.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Collections</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {collections.map((collection) => (
                <Card key={collection.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{collection.name}</h4>
                        <p className="text-sm text-gray-500">{collection.description}</p>
                        <Badge variant="outline" className="mt-2">
                          {collection.documentIds.length} documents
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid grid-cols-5 lg:grid-cols-9 w-full">
            <TabsTrigger value="all">All Documents</TabsTrigger>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <TabsTrigger key={key} value={key} className="hidden sm:flex">
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredDocuments.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
                  <Button onClick={() => setShowUpload(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Upload your first document
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredDocuments.map((doc) => (
                  <DocumentCard
                    key={doc.id}
                    document={doc}
                    onView={(doc) => setSelectedDocument(doc)}
                    onEdit={(doc) => handleDocumentAction('edit', doc)}
                    onDownload={(doc) => handleDocumentAction('download', doc)}
                    onShare={(doc) => handleDocumentAction('share', doc)}
                    onAddToCollection={(doc) => handleDocumentAction('addToCollection', doc)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          {Object.entries(categoryLabels).map(([categoryKey, categoryLabel]) => {
            const categoryDocs = getDocumentsByCategory(categoryKey);
            const IconComponent = categoryIcons[categoryKey as keyof typeof categoryIcons];
            
            return (
              <TabsContent key={categoryKey} value={categoryKey} className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <IconComponent className="h-5 w-5 text-gray-600" />
                  <h2 className="text-xl font-semibold text-gray-900">{categoryLabel}</h2>
                  <Badge variant="outline">{categoryDocs.length}</Badge>
                </div>
                
                {categoryDocs.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <IconComponent className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No {categoryLabel.toLowerCase()} yet
                      </h3>
                      <p className="text-gray-500 mb-4">
                        Start by uploading or creating your first document
                      </p>
                      <Button onClick={() => setShowUpload(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add {categoryLabel.slice(0, -1)}
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4">
                    {categoryDocs.map((doc) => (
                      <DocumentCard
                        key={doc.id}
                        document={doc}
                        onView={(doc) => setSelectedDocument(doc)}
                        onEdit={(doc) => handleDocumentAction('edit', doc)}
                        onDownload={(doc) => handleDocumentAction('download', doc)}
                        onShare={(doc) => handleDocumentAction('share', doc)}
                        onAddToCollection={(doc) => handleDocumentAction('addToCollection', doc)}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {upcomingFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Dialog open={showUpload} onOpenChange={setShowUpload}>
          <DialogContent className="max-w-4xl">
            <DocumentUpload
              onUpload={handleUpload}
              onClose={() => setShowUpload(false)}
            />
          </DialogContent>
        </Dialog>

        <Dialog open={!!selectedDocument} onOpenChange={() => setSelectedDocument(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedDocument?.title}</DialogTitle>
            </DialogHeader>
            <div className="p-6">
              <p className="text-gray-600">Document preview and details would go here.</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Documents;
