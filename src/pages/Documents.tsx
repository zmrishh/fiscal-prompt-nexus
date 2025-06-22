
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Plus, Search, Filter, Download } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  amount?: string;
  date: string;
  client?: string;
}

const Documents: React.FC = () => {
  const [documents] = useState<Document[]>([
    {
      id: '1',
      name: 'Invoice #INV-2024-001',
      type: 'Invoice',
      status: 'sent',
      amount: '₹50,000',
      date: '2024-01-15',
      client: 'Flipkart'
    },
    {
      id: '2',
      name: 'P&L Statement Q1 2024',
      type: 'Financial Report',
      status: 'draft',
      date: '2024-01-10',
    },
    {
      id: '3',
      name: 'GSTR-3B January 2024',
      type: 'Tax Return',
      status: 'sent',
      date: '2024-01-08',
    },
    {
      id: '4',
      name: 'Salary Slip - December 2023',
      type: 'Payroll',
      status: 'paid',
      date: '2024-01-05',
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-700';
      case 'sent': return 'bg-blue-100 text-blue-700';
      case 'paid': return 'bg-green-100 text-green-700';
      case 'overdue': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Documents</h1>
            <p className="text-gray-600">Manage invoices, reports, and compliance documents</p>
          </div>
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            New Document
          </Button>
        </div>

        <div className="flex space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Search documents..." className="pl-10" />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Documents</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4">
              {documents.map((doc) => (
                <Card key={doc.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{doc.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-sm text-gray-500">{doc.type}</span>
                            {doc.client && (
                              <>
                                <span className="text-gray-300">•</span>
                                <span className="text-sm text-gray-500">{doc.client}</span>
                              </>
                            )}
                            <span className="text-gray-300">•</span>
                            <span className="text-sm text-gray-500">{doc.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        {doc.amount && (
                          <span className="font-medium text-gray-900">{doc.amount}</span>
                        )}
                        <Badge className={getStatusColor(doc.status)}>
                          {doc.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="invoices">
            <Card>
              <CardHeader>
                <CardTitle>Invoice Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Invoice-specific view and controls would go here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Financial Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Financial reports view would go here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Tax and compliance documents would go here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Documents;
