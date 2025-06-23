
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, BarChart3, Download } from 'lucide-react';

interface PromptMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  result?: {
    type: 'document' | 'chart' | 'data';
    title: string;
    downloadUrl?: string;
  };
}

interface ResponseThreadProps {
  messages: PromptMessage[];
  isLoading: boolean;
}

export const ResponseThread: React.FC<ResponseThreadProps> = ({
  messages,
  isLoading
}) => {
  if (messages.length === 0 && !isLoading) return null;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {messages.map((message) => (
        <div key={message.id} className="flex flex-col space-y-3">
          {message.type === 'user' && (
            <div className="flex justify-end">
              <div className="bg-green-600 text-white p-4 rounded-2xl max-w-[80%] break-words">
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          )}
          
          {message.type === 'ai' && (
            <div className="flex justify-start">
              <Card className="max-w-[85%] shadow-sm border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-semibold text-sm">AI</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 whitespace-pre-wrap leading-relaxed">
                        {message.content}
                      </p>
                    </div>
                  </div>
                  
                  {message.result && (
                    <Card className="mt-4 border border-gray-100 bg-gray-50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            {message.result.type === 'document' && (
                              <FileText className="h-4 w-4 text-green-600" />
                            )}
                            {message.result.type === 'chart' && (
                              <BarChart3 className="h-4 w-4 text-green-600" />
                            )}
                            <span className="text-sm font-medium text-gray-900">
                              {message.result.title}
                            </span>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {message.result.type}
                          </Badge>
                        </div>
                        <Button size="sm" variant="outline" className="w-full">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                  
                  <p className="text-xs text-gray-500 mt-3">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      ))}
      
      {isLoading && (
        <div className="flex justify-start">
          <Card className="shadow-sm border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <span className="text-sm text-gray-600">AI is thinking...</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
