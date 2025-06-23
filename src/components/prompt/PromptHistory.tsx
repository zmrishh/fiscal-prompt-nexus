
import React from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { History, Clock } from 'lucide-react';

interface PromptHistoryProps {
  history: string[];
  onSelectPrompt: (prompt: string) => void;
}

export const PromptHistory: React.FC<PromptHistoryProps> = ({ history, onSelectPrompt }) => {
  if (history.length === 0) return null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
          <History className="h-4 w-4 mr-2" />
          History
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <div className="p-4 border-b">
          <h4 className="font-medium text-gray-900 flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            Recent Prompts
          </h4>
        </div>
        <div className="max-h-64 overflow-y-auto">
          {history.slice(0, 10).map((prompt, index) => (
            <button
              key={index}
              onClick={() => onSelectPrompt(prompt)}
              className="w-full text-left p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
            >
              <p className="text-sm text-gray-800 truncate">{prompt}</p>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
