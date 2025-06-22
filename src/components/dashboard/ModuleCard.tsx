
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ModuleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  stats?: string;
  color?: string;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  description,
  icon: Icon,
  href,
  stats,
  color = 'bg-green-50',
}) => {
  const navigate = useNavigate();

  return (
    <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group" onClick={() => navigate(href)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
            <Icon className="h-6 w-6 text-green-600" />
          </div>
          {stats && (
            <span className="text-sm text-gray-500">{stats}</span>
          )}
        </div>
        <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
        <CardDescription className="text-gray-600">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="ghost" className="w-full justify-start p-0 h-auto font-medium text-green-600 hover:text-green-700">
          Open Module →
        </Button>
      </CardContent>
    </Card>
  );
};
