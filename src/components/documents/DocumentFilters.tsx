
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, X, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { DocumentFilters, DocumentType, DocumentStatus } from '@/types/documents';

interface DocumentFiltersProps {
  filters: DocumentFilters;
  onFiltersChange: (filters: DocumentFilters) => void;
  onClearFilters: () => void;
}

const DocumentFiltersComponent: React.FC<DocumentFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
}) => {
  const documentTypes: DocumentType[] = [
    'Invoice',
    'Vendor Bill',
    'Financial Report',
    'Payroll Document',
    'Tax Filing',
    'Legal Document',
    'Compliance Document',
    'Investor Report',
    'Banking Document'
  ];

  const documentStatuses: DocumentStatus[] = [
    'draft',
    'sent',
    'filed',
    'paid',
    'pending',
    'approved',
    'rejected',
    'overdue',
    'completed'
  ];

  const hasActiveFilters = Object.keys(filters).some(key => {
    const value = filters[key as keyof DocumentFilters];
    return value !== undefined && value !== null && value !== '';
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {/* Entity Search */}
        <div className="min-w-[200px]">
          <Input
            placeholder="Search entity..."
            value={filters.entity || ''}
            onChange={(e) => onFiltersChange({ ...filters, entity: e.target.value })}
          />
        </div>

        {/* Document Type */}
        <Select
          value={filters.type || ''}
          onValueChange={(value) => onFiltersChange({ ...filters, type: value as DocumentType })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Document Type" />
          </SelectTrigger>
          <SelectContent>
            {documentTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status */}
        <Select
          value={filters.status || ''}
          onValueChange={(value) => onFiltersChange({ ...filters, status: value as DocumentStatus })}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {documentStatuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Date Range */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="min-w-[200px] justify-start">
              <CalendarIcon className="h-4 w-4 mr-2" />
              {filters.dateRange?.from ? (
                filters.dateRange.to ? (
                  <>
                    {format(filters.dateRange.from, 'LLL dd, y')} -{' '}
                    {format(filters.dateRange.to, 'LLL dd, y')}
                  </>
                ) : (
                  format(filters.dateRange.from, 'LLL dd, y')
                )
              ) : (
                'Date Range'
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={filters.dateRange?.from}
              selected={filters.dateRange}
              onSelect={(range) => onFiltersChange({ ...filters, dateRange: range })}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        {/* Amount Range */}
        <div className="flex space-x-2">
          <Input
            type="number"
            placeholder="Min Amount"
            className="w-[120px]"
            value={filters.amountRange?.min || ''}
            onChange={(e) => onFiltersChange({
              ...filters,
              amountRange: {
                ...filters.amountRange,
                min: Number(e.target.value)
              }
            })}
          />
          <Input
            type="number"
            placeholder="Max Amount"
            className="w-[120px]"
            value={filters.amountRange?.max || ''}
            onChange={(e) => onFiltersChange({
              ...filters,
              amountRange: {
                ...filters.amountRange,
                max: Number(e.target.value)
              }
            })}
          />
        </div>

        {hasActiveFilters && (
          <Button variant="outline" onClick={onClearFilters}>
            <X className="h-4 w-4 mr-2" />
            Clear Filters
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.type && (
            <Badge variant="secondary">
              Type: {filters.type}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-2"
                onClick={() => onFiltersChange({ ...filters, type: undefined })}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {filters.status && (
            <Badge variant="secondary">
              Status: {filters.status}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-2"
                onClick={() => onFiltersChange({ ...filters, status: undefined })}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {filters.entity && (
            <Badge variant="secondary">
              Entity: {filters.entity}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-2"
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

export default DocumentFiltersComponent;
