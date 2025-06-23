
import React, { useState } from 'react';
import { PromptInput } from './PromptInput';
import { SuggestionsCarousel } from './SuggestionsCarousel';
import { ResponseThread } from './ResponseThread';

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

export const PromptConsole: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<PromptMessage[]>([]);
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
        content: `I understand you want to "${userMessage.content}". I'm processing this request and will generate the appropriate financial document or analysis for you.`,
        timestamp: new Date(),
        result: {
          type: 'document',
          title: 'Generated Financial Document',
          downloadUrl: '#'
        }
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI CFO Assistant</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate financial documents, analyze data, and automate tasks using natural language
          </p>
        </div>

        {/* Prompt Input */}
        <PromptInput
          value={prompt}
          onChange={setPrompt}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />

        {/* Suggestions Carousel */}
        <SuggestionsCarousel onSuggestionClick={handleSuggestionClick} />

        {/* Response Thread */}
        <ResponseThread messages={messages} isLoading={isLoading} />
      </div>
    </div>
  );
};
