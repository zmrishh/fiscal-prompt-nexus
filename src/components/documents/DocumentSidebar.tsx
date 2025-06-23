
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Building2, 
  FileText, 
  Users, 
  Shield, 
  TrendingUp, 
  Banknote,
  FileSpreadsheet,
  Plus,
  Settings
} from 'lucide-react';

interface DocumentSidebarProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  documentCounts: Record<string, number>;
}

const DocumentSidebar: React.FC<DocumentSidebarProps> = ({
  selectedCategory,
  onCategorySelect,
  documentCounts
}) => {
  const categories = [
    {
      id: 'all',
      name: 'All Documents',
      icon: FileText,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50'
    },
    {
      id: 'incorporation-legal',
      name: 'Incorporation & Legal',
      icon: Building2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'invoices-bills',
      name: 'Invoices & Bills',
      icon: FileSpreadsheet,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'payroll-hr',
      name: 'Payroll & HR',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'tax-compliance',
      name: 'Tax & Compliance',
      icon: Shield,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      id: 'fundraising-investor',
      name: 'Fundraising & Investor',
      icon: TrendingUp,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      id: 'bank-finance',
      name: 'Bank & Finance',
      icon: Banknote,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    }
  ];

  return (
    <div className="w-64 bg-gray-50 border-r h-full p-4 space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-gray-900">Categories</h2>
        <Button variant="ghost" size="sm">
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2">
        {categories.map((category) => {
          const IconComponent = category.icon;
          const isSelected = selectedCategory === category.id;
          const count = documentCounts[category.id] || 0;

          return (
            <Button
              key={category.id}
              variant={isSelected ? "default" : "ghost"}
              className={`w-full justify-start h-auto p-3 ${
                isSelected ? 'bg-white shadow-sm' : 'hover:bg-white/50'
              }`}
              onClick={() => onCategorySelect(category.id)}
            >
              <div className={`w-8 h-8 rounded-lg ${category.bgColor} flex items-center justify-center mr-3`}>
                <IconComponent className={`h-4 w-4 ${category.color}`} />
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium text-sm">{category.name}</div>
                <div className="text-xs text-gray-500">{count} documents</div>
              </div>
            </Button>
          );
        })}
      </div>

      <Card className="mt-6">
        <CardContent className="p-4">
          <div className="text-center">
            <Plus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1">Quick Upload</h3>
            <p className="text-xs text-gray-500 mb-3">Drag & drop files here</p>
            <Button size="sm" className="w-full">
              Browse Files
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentSidebar;
