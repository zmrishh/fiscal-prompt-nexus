
import React, { useState, useEffect } from 'react';
import { PromptInput } from './PromptInput';
import { SuggestionsCarousel } from './SuggestionsCarousel';
import { ResponseThread } from './ResponseThread';
import { PromptHistory } from './PromptHistory';

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

export const PromptConsole: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [originalPrompt, setOriginalPrompt] = useState('');
  const [messages, setMessages] = useState<PromptMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [promptHistory, setPromptHistory] = useState<string[]>([]);

  const generateMockResult = (userPrompt: string) => {
    const lowerPrompt = userPrompt.toLowerCase();
    
    if (lowerPrompt.includes('invoice')) {
      return {
        type: 'document' as const,
        title: 'Invoice #INV-2024-001',
        downloadUrl: '#'
      };
    } else if (lowerPrompt.includes('expense') || lowerPrompt.includes('spend')) {
      return {
        type: 'table' as const,
        title: 'Expense Analysis Report',
        data: { rows: 42 }
      };
    } else if (lowerPrompt.includes('p&l') || lowerPrompt.includes('profit')) {
      return {
        type: 'document' as const,
        title: 'P&L Statement Q1 2024',
        downloadUrl: '#'
      };
    } else if (lowerPrompt.includes('burn') || lowerPrompt.includes('runway')) {
      return {
        type: 'chart' as const,
        title: 'Burn Rate & Runway Analysis'
      };
    } else if (lowerPrompt.includes('bank') || lowerPrompt.includes('statement')) {
      return {
        type: 'data' as const,
        title: 'Bank Statement Summary'
      };
    }
    return undefined;
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    const userMessage: PromptMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: prompt,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setPromptHistory(prev => [prompt, ...prev.filter(p => p !== prompt)]);
    setPrompt('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const result = generateMockResult(userMessage.content);
      const aiResponse: PromptMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `I've processed your request for "${userMessage.content}". ${
          result ? 'Here\'s what I generated for you:' : 'I\'ve completed the analysis.'
        }`,
        timestamp: new Date(),
        result
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
  };

  const handleSuggestionHover = (suggestion: string) => {
    if (!prompt) {
      setOriginalPrompt(prompt);
      setPrompt(suggestion);
    }
  };

  const handleSuggestionLeave = () => {
    if (originalPrompt !== undefined) {
      setPrompt(originalPrompt);
      setOriginalPrompt('');
    }
  };

  const handleHistorySelect = (historicalPrompt: string) => {
    setPrompt(historicalPrompt);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI CFO Assistant</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your intelligent finance command center. Ask questions, generate documents, and automate workflows with natural language.
          </p>
        </div>

        {/* Main Input Section */}
        <div className="mb-8">
          <PromptInput
            value={prompt}
            onChange={setPrompt}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>

        {/* Suggestions Carousel */}
        <SuggestionsCarousel
          onSuggestionClick={handleSuggestionClick}
          onSuggestionHover={handleSuggestionHover}
          onSuggestionLeave={handleSuggestionLeave}
        />

        {/* History */}
        <div className="flex justify-center mt-8 mb-12">
          <PromptHistory
            history={promptHistory}
            onSelectPrompt={handleHistorySelect}
          />
        </div>

        {/* Response Thread */}
        <div className="mt-16">
          <ResponseThread messages={messages} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};
