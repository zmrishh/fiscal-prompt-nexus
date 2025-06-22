
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
  "Generate an invoice for ₹50,000 to Flipkart for June",
  "Show my burn vs runway graph",
  "Summarize this bank statement PDF",
  "File GSTR-3B for May",
  "Create P&L statement for Q1",
  "Calculate TDS for this month's payroll"
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
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Prompt Console</h1>
        <p className="text-gray-600">Ask your AI CFO assistant to generate documents, analyze data, or automate financial tasks using natural language.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Conversation</span>
                <Badge variant="secondary">Live</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-4 rounded-lg ${
                        message.type === 'user' 
                          ? 'bg-green-600 text-white' 
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        {message.result && (
                          <div className="mt-3 p-3 bg-white rounded border">
                            <div className="flex items-center space-x-2">
                              {message.result.type === 'document' && <FileText className="h-4 w-4 text-green-600" />}
                              {message.result.type === 'chart' && <BarChart3 className="h-4 w-4 text-green-600" />}
                              <span className="text-sm font-medium text-gray-900">{message.result.title}</span>
                            </div>
                            <Button size="sm" variant="outline" className="mt-2">
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
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-green-600 border-t-transparent"></div>
                          <span className="text-sm text-gray-600">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <Separator className="my-4" />
              
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <Textarea
                    placeholder="Ask your AI CFO: Generate invoice, analyze expenses, create reports..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="flex-1"
                    rows={2}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit();
                      }
                    }}
                  />
                  <div className="flex flex-col space-y-2">
                    <Button size="sm" variant="outline">
                      <Upload className="h-4 w-4" />
                    </Button>
                    <Button onClick={handleSubmit} disabled={!prompt.trim() || isLoading}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Example Prompts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {examplePrompts.map((example, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full text-left justify-start h-auto p-3 text-sm"
                    onClick={() => setPrompt(example)}
                  >
                    {example}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
