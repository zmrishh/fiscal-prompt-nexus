
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Calendar, 
  FileText, 
  Settings, 
  Users, 
  Book,
  Inbox,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Calendar },
  { name: 'Prompt Console', href: '/prompt', icon: Inbox },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Bank Sync', href: '/bank', icon: Book },
  { name: 'Expenses', href: '/expenses', icon: Plus },
  { name: 'GST & Compliance', href: '/gst', icon: FileText },
  { name: 'Payroll', href: '/payroll', icon: Users },
  { name: 'Investor Reports', href: '/reports', icon: FileText },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">F</span>
          </div>
          <span className="text-xl font-semibold text-gray-900">FinanceAI</span>
        </div>
      </div>
      
      <nav className="px-3 pb-6">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    'group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                    isActive
                      ? 'bg-green-50 text-green-700 border-r-2 border-green-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <item.icon
                    className={cn(
                      'mr-3 h-5 w-5 transition-colors duration-200',
                      isActive ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-500'
                    )}
                  />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
