
export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  vendor: string;
  date: string;
  receipt_url?: string;
  tax_amount?: number;
  status: 'pending' | 'approved' | 'paid';
  created_by: string;
  company_id: string;
  recurring?: {
    frequency: 'monthly' | 'quarterly' | 'yearly';
    next_due_date: string;
  };
}

export const expenseService = {
  async createExpense(expenseData: Omit<Expense, 'id' | 'status'>) {
    const expense: Expense = {
      ...expenseData,
      id: Date.now().toString(),
      status: 'pending'
    };

    console.log('Created expense:', expense);
    return { success: true, expense };
  },

  async getExpenses(companyId: string, filters?: {
    category?: string;
    date_from?: string;
    date_to?: string;
    status?: string;
  }) {
    // Mock expense data
    const mockExpenses: Expense[] = [
      {
        id: '1',
        amount: 25000,
        description: 'AWS Infrastructure',
        category: 'Infrastructure',
        vendor: 'Amazon Web Services',
        date: '2024-01-05',
        tax_amount: 4500,
        status: 'paid',
        created_by: 'admin',
        company_id: companyId,
        recurring: {
          frequency: 'monthly',
          next_due_date: '2024-02-05'
        }
      },
      {
        id: '2',
        amount: 5000,
        description: 'Office Supplies',
        category: 'Office',
        vendor: 'Local Vendor',
        date: '2024-01-10',
        status: 'approved',
        created_by: 'admin',
        company_id: companyId
      }
    ];

    return { success: true, expenses: mockExpenses };
  },

  async approveExpense(expenseId: string) {
    console.log('Approving expense:', expenseId);
    return { success: true, message: 'Expense approved' };
  },

  async generateExpenseReport(companyId: string, period: string) {
    // Generate expense analytics
    const report = {
      period,
      total_expenses: 150000,
      by_category: {
        'Infrastructure': 75000,
        'Office': 25000,
        'Marketing': 30000,
        'Travel': 20000
      },
      recurring_expenses: 45000,
      pending_approvals: 12
    };

    return { success: true, report };
  }
};
