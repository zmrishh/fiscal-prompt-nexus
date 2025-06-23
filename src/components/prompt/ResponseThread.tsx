
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, BarChart3, Download, User, Bot } from 'lucide-react';

interface PromptMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  result?: {
    type: 'document' | 'chart' | 'data' | 'table';
    title: string;
    downloadUrl?: string;
    data?: any;
  };
}

interface ResponseThreadProps {
  messages: PromptMessage[];
  isLoading: boolean;
}

export const ResponseThread: React.FC<ResponseThreadProps> = ({ messages, isLoading }) => {
  const renderResult = (result: PromptMessage['result']) => {
    if (!result) return null;

    return (
      <Card className="mt-3 border border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              {result.type === 'document' && <FileText className="h-4 w-4 text-green-600" />}
              {result.type === 'chart' && <BarChart3 className="h-4 w-4 text-green-600" />}
              {result.type === 'data' && <FileText className="h-4 w-4 text-green-600" />}
              {result.type === 'table' && <FileText className="h-4 w-4 text-green-600" />}
              <span className="font-medium text-gray-900">{result.title}</span>
              <Badge variant="secondary" className="text-xs">
                {result.type}
              </Badge>
            </div>
            <Button size="sm" variant="outline" className="text-xs">
              <Download className="h-3 w-3 mr-1" />
              Download
            </Button>
          </div>
          
          {result.type === 'table' && result.data && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Table preview with {result.data.rows || 'N/A'} rows</div>
            </div>
          )}
          
          {result.type === 'chart' && (
            <div className="bg-gray-50 rounded-lg p-4 h-32 flex items-center justify-center">
              <BarChart3 className="h-8 w-8 text-gray-400" />
              <span className="ml-2 text-gray-500">Chart visualization</span>
            </div>
          )}
          
          {result.type === 'document' && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Document ready for download</div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="text-center py-12">
        <Bot className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to help with your finance tasks</h3>
        <p className="text-gray-500">Ask me to create documents, analyze data, or automate your financial workflows.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {messages.map((message) => (
        <div key={message.id} className="flex gap-4">
          <div className="flex-shrink-0">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              message.type === 'user' 
                ? 'bg-gray-100 text-gray-600' 
                : 'bg-green-100 text-green-600'
            }`}>
              {message.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="mb-1">
              <span className="text-sm font-medium text-gray-900">
                {message.type === 'user' ? 'You' : 'AI CFO'}
              </span>
              <span className="text-xs text-gray-500 ml-2">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
            
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-800 whitespace-pre-wrap">{message.content}</p>
            </div>
            
            {renderResult(message.result)}
          </div>
        </div>
      ))}
      
      {isLoading && (
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
              <Bot className="h-4 w-4" />
            </div>
          </div>
          <div className="flex-1">
            <div className="mb-1">
              <span className="text-sm font-medium text-gray-900">AI CFO</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-500">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-green-600 border-t-transparent"></div>
              <span className="text-sm">Analyzing your request...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
