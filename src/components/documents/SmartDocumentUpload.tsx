
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Upload, FileText, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { ocrService, ExtractedData } from '@/services/ocrService';
import { DocumentType } from '@/types/documents';

interface SmartDocumentUploadProps {
  onUpload: (file: File, metadata: any) => void;
  onClose: () => void;
}

const SmartDocumentUpload: React.FC<SmartDocumentUploadProps> = ({ onUpload, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    type: '' as DocumentType | '',
    entity: '',
    amount: '',
    category: '',
    notes: ''
  });

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

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setIsProcessing(true);

    try {
      const result = await ocrService.processDocument(file);
      
      if (result.success && result.data) {
        setExtractedData(result.data);
        
        // Auto-fill form with extracted data
        setFormData({
          title: result.data.invoiceNumber ? 
            `${file.name} - ${result.data.invoiceNumber}` : 
            file.name.replace(/\.[^/.]+$/, ""),
          type: result.data.category === 'Revenue' ? 'Invoice' : 'Vendor Bill',
          entity: result.data.vendor || '',
          amount: result.data.amount?.toString() || '',
          category: result.data.category || '',
          notes: `Auto-extracted from ${file.name}`
        });
      }
    } catch (error) {
      console.error('OCR processing failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    
    const metadata = {
      ...formData,
      extractedData,
      ocrProcessed: true
    };
    
    onUpload(selectedFile, metadata);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Smart Document Upload</h2>
        <Button variant="ghost" onClick={onClose}>×</Button>
      </div>

      {/* File Upload Area */}
      <Card>
        <CardContent className="p-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Upload Document</h3>
            <p className="text-gray-500 mb-4">
              Upload invoices, bills, or receipts for automatic data extraction
            </p>
            <Input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileSelect}
              className="max-w-xs mx-auto"
            />
          </div>

          {selectedFile && (
            <div className="mt-4 flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">{selectedFile.name}</span>
              {isProcessing && <Loader className="h-4 w-4 animate-spin" />}
            </div>
          )}
        </CardContent>
      </Card>

      {/* OCR Results */}
      {extractedData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Extracted Data</span>
              <Badge variant="secondary">
                {Math.round(extractedData.confidence * 100)}% confident
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {extractedData.vendor && (
                <div>
                  <Label className="font-medium">Vendor</Label>
                  <p>{extractedData.vendor}</p>
                </div>
              )}
              {extractedData.amount && (
                <div>
                  <Label className="font-medium">Amount</Label>
                  <p>₹{extractedData.amount.toLocaleString()}</p>
                </div>
              )}
              {extractedData.date && (
                <div>
                  <Label className="font-medium">Date</Label>
                  <p>{extractedData.date}</p>
                </div>
              )}
              {extractedData.gstin && (
                <div>
                  <Label className="font-medium">GSTIN</Label>
                  <p>{extractedData.gstin}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Document Form */}
      {selectedFile && (
        <Card>
          <CardHeader>
            <CardTitle>Document Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Document Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter document title"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Document Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value as DocumentType })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="entity">Entity/Vendor</Label>
                <Input
                  id="entity"
                  value={formData.entity}
                  onChange={(e) => setFormData({ ...formData, entity: e.target.value })}
                  placeholder="Company or vendor name"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="0.00"
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g. Infrastructure, Office"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Additional notes or comments"
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleUpload}
                disabled={!selectedFile || !formData.title || !formData.type}
                className="bg-green-600 hover:bg-green-700"
              >
                Upload & Process
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SmartDocumentUpload;
