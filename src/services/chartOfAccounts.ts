
export interface AccountCategory {
  id: string;
  name: string;
  type: 'Asset' | 'Liability' | 'Equity' | 'Revenue' | 'Expense';
  keywords: string[];
  defaultTaxRate?: number;
}

export const chartOfAccounts: AccountCategory[] = [
  // Revenue Accounts
  {
    id: 'revenue-software',
    name: 'Software Revenue',
    type: 'Revenue',
    keywords: ['software', 'license', 'subscription', 'saas', 'platform'],
    defaultTaxRate: 18
  },
  {
    id: 'revenue-consulting',
    name: 'Consulting Revenue', 
    type: 'Revenue',
    keywords: ['consulting', 'service', 'professional', 'advisory'],
    defaultTaxRate: 18
  },
  
  // Expense Accounts
  {
    id: 'expense-infrastructure',
    name: 'Infrastructure & Cloud',
    type: 'Expense',
    keywords: ['aws', 'amazon', 'google cloud', 'azure', 'server', 'hosting', 'cloud'],
    defaultTaxRate: 18
  },
  {
    id: 'expense-office',
    name: 'Office Expenses',
    type: 'Expense',
    keywords: ['office', 'supplies', 'furniture', 'utilities', 'rent'],
    defaultTaxRate: 18
  },
  {
    id: 'expense-marketing',
    name: 'Marketing & Advertising',
    type: 'Expense',
    keywords: ['marketing', 'advertising', 'promotion', 'google ads', 'facebook'],
    defaultTaxRate: 18
  },
  {
    id: 'expense-professional',
    name: 'Professional Services',
    type: 'Expense',
    keywords: ['legal', 'accounting', 'audit', 'consultant', 'lawyer'],
    defaultTaxRate: 18
  },
  {
    id: 'expense-travel',
    name: 'Travel & Entertainment',
    type: 'Expense',
    keywords: ['travel', 'hotel', 'flight', 'uber', 'taxi', 'meal', 'entertainment'],
    defaultTaxRate: 5
  },
  {
    id: 'expense-software',
    name: 'Software & Tools',
    type: 'Expense',
    keywords: ['software', 'tool', 'license', 'subscription', 'github', 'slack'],
    defaultTaxRate: 18
  }
];

class ChartOfAccountsService {
  categorizeTransaction(description: string, vendor?: string): AccountCategory | null {
    const searchText = `${description} ${vendor || ''}`.toLowerCase();
    
    // Find the best matching category based on keywords
    let bestMatch: AccountCategory | null = null;
    let maxMatches = 0;

    for (const category of chartOfAccounts) {
      const matches = category.keywords.filter(keyword => 
        searchText.includes(keyword.toLowerCase())
      ).length;

      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = category;
      }
    }

    return bestMatch;
  }

  getCategories(type?: 'Revenue' | 'Expense'): AccountCategory[] {
    if (type) {
      return chartOfAccounts.filter(account => account.type === type);
    }
    return chartOfAccounts;
  }

  getTaxRate(categoryId: string): number {
    const category = chartOfAccounts.find(acc => acc.id === categoryId);
    return category?.defaultTaxRate || 18;
  }
}

export const chartOfAccountsService = new ChartOfAccountsService();
