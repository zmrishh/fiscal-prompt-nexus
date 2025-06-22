
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Upload, FileText, X, Sparkles } from 'lucide-react';
import { DocumentType, DocumentCategory } from '@/types/documents';

interface ParsedDocument {
  title: string;
  vendor?: string;
  date?: string;
  amount?: number;
  suggestedType: DocumentType;
  suggestedTags: string[];
}

interface DocumentUploadProps {
  onUpload: (file: File, metadata: ParsedDocument) => void;
  onClose: () => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ onUpload, onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<ParsedDocument | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

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

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (selectedFile: File) => {
    setFile(selectedFile);
    setIsProcessing(true);

    // Simulate OCR parsing
    setTimeout(() => {
      const mockParsedData: ParsedDocument = {
        title: selectedFile.name.replace(/\.[^/.]+$/, ''),
        vendor: 'Flipkart India',
        date: '2024-01-15',
        amount: 50000,
        suggestedType: 'Invoice',
        suggestedTags: ['GST', 'E-commerce', 'Q1-2024']
      };
      setParsedData(mockParsedData);
      setIsProcessing(false);
    }, 2000);
  };

  const handleSubmit = () => {
    if (file && parsedData) {
      onUpload(file, parsedData);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Upload className="h-5 w-5 mr-2" />
            Upload Document
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {!file ? (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              Drop your document here
            </p>
            <p className="text-gray-500 mb-4">
              Support for PDF, images, CSV files
            </p>
            <label className="cursor-pointer">
              <input
                type="file"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png,.csv"
                onChange={handleFileInput}
              />
              <Button variant="outline">Choose File</Button>
            </label>
          </div>
        ) : isProcessing ? (
          <div className="text-center py-8">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-green-600 animate-pulse" />
            </div>
            <p className="text-lg font-medium text-gray-900 mb-2">
              Processing Document...
            </p>
            <p className="text-gray-500">
              AI is extracting data from your document
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Sparkles className="h-5 w-5 text-green-600 mr-2" />
                <span className="font-medium text-green-900">AI Extracted Data</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Document Title
                  </label>
                  <Input
                    value={parsedData?.title || ''}
                    onChange={(e) => setParsedData(prev => prev ? {...prev, title: e.target.value} : null)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Document Type
                  </label>
                  <Select
                    value={parsedData?.suggestedType || ''}
                    onValueChange={(value) => setParsedData(prev => prev ? {...prev, suggestedType: value as DocumentType} : null)}
                  >
                    <SelectTrigger>
                      <SelectValue />
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Entity/Vendor
                  </label>
                  <Input
                    value={parsedData?.vendor || ''}
                    onChange={(e) => setParsedData(prev => prev ? {...prev, vendor: e.target.value} : null)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount (₹)
                  </label>
                  <Input
                    type="number"
                    value={parsedData?.amount || ''}
                    onChange={(e) => setParsedData(prev => prev ? {...prev, amount: Number(e.target.value)} : null)}
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Suggested Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {parsedData?.suggestedTags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                Upload Document
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentUpload;
