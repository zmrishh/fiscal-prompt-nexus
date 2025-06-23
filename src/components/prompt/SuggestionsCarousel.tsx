
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface SuggestionsCarouselProps {
  onSuggestionClick: (suggestion: string) => void;
  onSuggestionHover: (suggestion: string) => void;
  onSuggestionLeave: () => void;
}

const suggestions = [
  "Create an invoice",
  "Analyze expenses",
  "Generate P&L statement",
  "Summarize bank statement",
  "File GST return",
  "Calculate TDS",
  "Track salary payout",
  "Check burn rate",
  "Forecast runway",
  "Download tax summary",
  "Review monthly spend",
  "Compare quarterly revenue",
  "Export expense report",
  "Validate compliance"
];

export const SuggestionsCarousel: React.FC<SuggestionsCarouselProps> = ({
  onSuggestionClick,
  onSuggestionHover,
  onSuggestionLeave
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto mt-8 overflow-hidden">
      <div className="relative">
        <div className="flex animate-marquee space-x-4 whitespace-nowrap">
          {[...suggestions, ...suggestions].map((suggestion, index) => (
            <Badge
              key={`${suggestion}-${index}`}
              variant="outline"
              className="cursor-pointer hover:bg-green-50 hover:border-green-300 transition-colors px-4 py-2 text-sm whitespace-nowrap bg-white border-gray-200"
              onClick={() => onSuggestionClick(suggestion)}
              onMouseEnter={() => onSuggestionHover(suggestion)}
              onMouseLeave={onSuggestionLeave}
            >
              {suggestion}
            </Badge>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%) }
          100% { transform: translateX(-50%) }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};
