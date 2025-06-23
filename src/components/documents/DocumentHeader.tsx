
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  Upload, 
  Grid3X3, 
  List,
  Plus,
  SortAsc,
  Calendar,
  X
} from 'lucide-react';
import { DocumentFilters } from '@/types/documents';

interface DocumentHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: DocumentFilters;
  onFiltersChange: (filters: DocumentFilters) => void;
  onClearFilters: () => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onUpload: () => void;
  totalDocuments: number;
}

const DocumentHeader: React.FC<DocumentHeaderProps> = ({
  searchQuery,
  onSearchChange,
  filters,
  onFiltersChange,
  onClearFilters,
  viewMode,
  onViewModeChange,
  onUpload,
  totalDocuments
}) => {
  const hasActiveFilters = Object.values(filters).some(value => 
    value !== undefined && value !== null && value !== ''
  );

  return (
    <div className="bg-white border-b px-6 py-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-600">
            Manage all your business documents in one place • {totalDocuments} files
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={onUpload}>
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            New Document
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search documents..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <Select
            value={filters.type || ''}
            onValueChange={(value) => onFiltersChange({ ...filters, type: value as any })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Document Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Invoice">Invoice</SelectItem>
              <SelectItem value="Vendor Bill">Vendor Bill</SelectItem>
              <SelectItem value="Financial Report">Financial Report</SelectItem>
              <SelectItem value="Tax Filing">Tax Filing</SelectItem>
              <SelectItem value="Legal Document">Legal Document</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.status || ''}
            onValueChange={(value) => onFiltersChange({ ...filters, status: value as any })}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="filed">Filed</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={onClearFilters}>
              <X className="h-4 w-4 mr-2" />
              Clear
            </Button>
          )}
        </div>

        <div className="flex items-center space-x-2 border rounded-lg p-1">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('grid')}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.type && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Type: {filters.type}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1"
                onClick={() => onFiltersChange({ ...filters, type: undefined })}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {filters.status && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Status: {filters.status}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1"
                onClick={() => onFiltersChange({ ...filters, status: undefined })}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {filters.entity && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Entity: {filters.entity}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1"
                onClick={() => onFiltersChange({ ...filters, entity: undefined })}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default DocumentHeader;
