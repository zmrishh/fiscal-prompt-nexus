
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Send, FileText, BarChart3, Upload } from 'lucide-react';

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

const examplePrompts = [
  "Generate invoice for ₹50K to Flipkart",
  "Show burn vs runway graph",
  "Summarize bank statement PDF",
  "File GSTR-3B for May",
  "Create Q1 P&L statement",
  "Calculate monthly TDS"
];

export const PromptConsole: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<PromptMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hi! I\'m your AI CFO assistant. You can ask me to generate documents, analyze data, or help with financial tasks. What would you like me to help you with today?',
      timestamp: new Date(),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    const userMessage: PromptMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: prompt,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setPrompt('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: PromptMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `I understand you want to "${prompt}". I'm processing this request and will generate the appropriate financial document or analysis.`,
        timestamp: new Date(),
        result: {
          type: 'document',
          title: 'Generated Invoice #INV-2024-001',
          downloadUrl: '#'
        }
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="h-full p-4 lg:p-6 space-y-4 lg:space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">AI Prompt Console</h1>
        <p className="text-sm lg:text-base text-gray-600">Ask your AI CFO assistant to generate documents, analyze data, or automate financial tasks using natural language.</p>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 lg:gap-6 h-[calc(100vh-12rem)]">
        <div className="lg:col-span-2 flex flex-col min-h-0">
          <Card className="flex-1 flex flex-col min-h-0">
            <CardHeader className="flex-shrink-0 pb-3">
              <CardTitle className="flex items-center justify-between text-lg">
                <span>Conversation</span>
                <Badge variant="secondary" className="text-xs">Live</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col min-h-0 p-4 pt-0">
              <ScrollArea className="flex-1 pr-2 mb-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] lg:max-w-[80%] p-3 lg:p-4 rounded-lg break-words ${
                        message.type === 'user' 
                          ? 'bg-green-600 text-white' 
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        {message.result && (
                          <div className="mt-3 p-3 bg-white rounded border">
                            <div className="flex items-center space-x-2 mb-2">
                              {message.result.type === 'document' && <FileText className="h-4 w-4 text-green-600 flex-shrink-0" />}
                              {message.result.type === 'chart' && <BarChart3 className="h-4 w-4 text-green-600 flex-shrink-0" />}
                              <span className="text-sm font-medium text-gray-900 break-words">{message.result.title}</span>
                            </div>
                            <Button size="sm" variant="outline">
                              Download
                            </Button>
                          </div>
                        )}
                        <p className="text-xs opacity-70 mt-2">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 p-3 lg:p-4 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-green-600 border-t-transparent"></div>
                          <span className="text-sm text-gray-600">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <Separator className="mb-3" />
              
              <div className="flex-shrink-0 space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Textarea
                    placeholder="Ask your AI CFO: Generate invoice, analyze expenses, create reports..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="flex-1 min-h-[80px] resize-none"
                    rows={3}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit();
                      }
                    }}
                  />
                  <div className="flex sm:flex-col gap-2">
                    <Button size="sm" variant="outline" className="flex-1 sm:flex-none">
                      <Upload className="h-4 w-4" />
                      <span className="sm:hidden ml-2">Upload</span>
                    </Button>
                    <Button 
                      onClick={handleSubmit} 
                      disabled={!prompt.trim() || isLoading}
                      className="flex-1 sm:flex-none"
                    >
                      <Send className="h-4 w-4" />
                      <span className="sm:hidden ml-2">Send</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex-shrink-0 lg:flex-shrink lg:min-h-0">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Example Prompts</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <ScrollArea className="h-full">
                <div className="space-y-2">
                  {examplePrompts.map((example, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full text-left justify-start h-auto p-3 text-sm whitespace-normal break-words"
                      onClick={() => setPrompt(example)}
                    >
                      {example}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
