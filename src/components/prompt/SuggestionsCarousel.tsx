
import React from 'react';
import { Button } from '@/components/ui/button';

interface SuggestionsCarouselProps {
  onSuggestionClick: (suggestion: string) => void;
}

const suggestions = [
  'Create an invoice',
  'Analyze expenses',
  'Summarize bank statement',
  'Generate P&L statement',
  'File GST return',
  'Calculate TDS',
  'Check burn rate',
  'Forecast runway',
  'Download tax summary',
  'Track salary payout',
  'Review cash flow',
  'Generate budget report'
];

export const SuggestionsCarousel: React.FC<SuggestionsCarouselProps> = ({
  onSuggestionClick
}) => {
  return (
    <div className="w-full mb-8 overflow-hidden">
      <div className="animate-marquee flex space-x-4 whitespace-nowrap">
        {[...suggestions, ...suggestions].map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onSuggestionClick(suggestion)}
            className="flex-shrink-0 rounded-full border-gray-200 hover:border-green-500 hover:bg-green-50 transition-colors"
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  );
};
