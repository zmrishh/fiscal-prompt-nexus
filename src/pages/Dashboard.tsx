
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { ModuleCard } from '@/components/dashboard/ModuleCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FileText, 
  Inbox, 
  Book, 
  Plus, 
  Users, 
  Settings,
  Calendar,
  TrendingUp,
  DollarSign,
  AlertTriangle
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const modules = [
    {
      title: 'Prompt Console',
      description: 'Ask AI to generate documents, analyze data, or automate tasks',
      icon: Inbox,
      href: '/prompt',
      stats: '24 requests today',
      color: 'bg-blue-50',
    },
    {
      title: 'Documents',
      description: 'Invoices, statements, reports, and compliance documents',
      icon: FileText,
      href: '/documents',
      stats: '12 pending',
      color: 'bg-green-50',
    },
    {
      title: 'Bank Sync',
      description: 'Connect banks, reconcile transactions, and track cash flow',
      icon: Book,
      href: '/bank',
      stats: '3 accounts linked',
      color: 'bg-purple-50',
    },
    {
      title: 'Expenses',
      description: 'Upload receipts, categorize expenses, and track spending',
      icon: Plus,
      href: '/expenses',
      stats: '₹45K this month',
      color: 'bg-orange-50',
    },
    {
      title: 'GST & Compliance',
      description: 'File returns, track deadlines, and manage tax compliance',
      icon: Calendar,
      href: '/gst',
      stats: 'GSTR-3B due in 5 days',
      color: 'bg-red-50',
    },
    {
      title: 'Payroll',
      description: 'Manage salaries, generate slips, and handle deductions',
      icon: Users,
      href: '/payroll',
      stats: '8 employees',
      color: 'bg-cyan-50',
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Financial Dashboard</h1>
          <p className="text-gray-600">Your AI-powered CFO assistant for automated financial management</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Monthly Revenue"
            value="₹12.5L"
            change="+12% from last month"
            changeType="positive"
            icon={TrendingUp}
          />
          <StatsCard
            title="Cash Balance"
            value="₹8.2L"
            change="-₹50K from last week"
            changeType="negative"
            icon={DollarSign}
          />
          <StatsCard
            title="Pending Invoices"
            value="₹3.4L"
            change="12 invoices overdue"
            changeType="neutral"
            icon={FileText}
          />
          <StatsCard
            title="Burn Rate"
            value="₹2.1L/mo"
            change="18 months runway"
            changeType="positive"
            icon={AlertTriangle}
          />
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Generate Invoice
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Upload Expenses
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Sync Bank Data
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Ask AI Assistant
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Modules Grid */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Finance Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <ModuleCard
                key={module.title}
                title={module.title}
                description={module.description}
                icon={module.icon}
                href={module.href}
                stats={module.stats}
                color={module.color}
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
