
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Download, 
  Share, 
  MoreHorizontal,
  Eye,
  Calendar,
  DollarSign,
  Building
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Document } from '@/types/documents';

interface DocumentGridProps {
  documents: Document[];
  onDocumentClick: (document: Document) => void;
  onDocumentAction: (action: string, document: Document) => void;
}

const DocumentGrid: React.FC<DocumentGridProps> = ({
  documents,
  onDocumentClick,
  onDocumentAction
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-700';
      case 'sent': return 'bg-blue-100 text-blue-700';
      case 'filed': return 'bg-green-100 text-green-700';
      case 'paid': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'approved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      case 'overdue': return 'bg-red-100 text-red-700';
      case 'completed': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatAmount = (amount?: number) => {
    if (!amount) return null;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {documents.map((doc) => (
        <Card 
          key={doc.id} 
          className="hover:shadow-md transition-all cursor-pointer group border-l-4 border-l-blue-500"
          onClick={() => onDocumentClick(doc)}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-white">
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation();
                      onDocumentAction('view', doc);
                    }}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation();
                      onDocumentAction('share', doc);
                    }}>
                      <Share className="h-4 w-4 mr-2" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation();
                      onDocumentAction('download', doc);
                    }}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 text-sm">
              {doc.title}
            </h3>
            
            <div className="space-y-2 mb-3">
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="h-3 w-3 mr-1" />
                {doc.issueDate}
              </div>
              
              {doc.entity && (
                <div className="flex items-center text-xs text-gray-500">
                  <Building className="h-3 w-3 mr-1" />
                  <span className="truncate">{doc.entity}</span>
                </div>
              )}
              
              {doc.amount && (
                <div className="flex items-center text-xs text-gray-500">
                  <DollarSign className="h-3 w-3 mr-1" />
                  {formatAmount(doc.amount)}
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <Badge className={`text-xs ${getStatusColor(doc.status)}`}>
                {doc.status}
              </Badge>
              <span className="text-xs text-gray-400">{doc.type}</span>
            </div>
            
            {doc.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {doc.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {doc.tags.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{doc.tags.length - 2}
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DocumentGrid;
