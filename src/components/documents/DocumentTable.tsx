
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  FileText, 
  Download, 
  Share, 
  MoreHorizontal,
  Eye,
  Calendar,
  Building
} from 'lucide-react';
import { Document } from '@/types/documents';

interface DocumentTableProps {
  documents: Document[];
  onDocumentClick: (document: Document) => void;
  onDocumentAction: (action: string, document: Document) => void;
}

const DocumentTable: React.FC<DocumentTableProps> = ({
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
    if (!amount) return '-';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]"></TableHead>
            <TableHead>Document</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Entity</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead className="w-[60px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc) => (
            <TableRow 
              key={doc.id} 
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => onDocumentClick(doc)}
            >
              <TableCell>
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <FileText className="h-4 w-4 text-blue-600" />
                </div>
              </TableCell>
              <TableCell className="font-medium">
                <div>
                  <div className="font-medium text-gray-900">{doc.title}</div>
                  <div className="text-sm text-gray-500">
                    Created by {doc.createdBy}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm text-gray-600">{doc.type}</span>
              </TableCell>
              <TableCell>
                {doc.entity ? (
                  <div className="flex items-center text-sm">
                    <Building className="h-3 w-3 mr-1 text-gray-400" />
                    {doc.entity}
                  </div>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center text-sm">
                  <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                  {doc.issueDate}
                </div>
              </TableCell>
              <TableCell className="font-medium">
                {formatAmount(doc.amount)}
              </TableCell>
              <TableCell>
                <Badge className={`${getStatusColor(doc.status)} text-xs`}>
                  {doc.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
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
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DocumentTable;
