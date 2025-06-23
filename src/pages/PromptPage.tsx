
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PromptConsole } from '@/components/prompt/PromptConsole';

const PromptPage: React.FC = () => {
  return (
    <DashboardLayout>
      <PromptConsole />
    </DashboardLayout>
  );
};

export default PromptPage;
