
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, Mic } from 'lucide-react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({
  value,
  onChange,
  onSubmit,
  isLoading
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask your AI CFO..."
          className="min-h-[80px] text-lg resize-none border-2 border-gray-200 focus:border-green-500 rounded-xl px-6 py-4 pr-24 shadow-sm"
          rows={3}
          autoFocus
        />
        <div className="absolute right-3 bottom-3 flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
          >
            <Mic className="h-4 w-4" />
          </Button>
          <Button
            onClick={onSubmit}
            disabled={!value.trim() || isLoading}
            size="sm"
            className="h-8 w-8 p-0 bg-green-600 hover:bg-green-700"
          >
            <Send className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};
