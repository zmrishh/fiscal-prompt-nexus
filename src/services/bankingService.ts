
export interface BankAccount {
  id: string;
  account_number: string;
  bank_name: string;
  account_type: 'current' | 'savings';
  balance: number;
  company_id: string;
  is_active: boolean;
}

export interface Transaction {
  id: string;
  account_id: string;
  amount: number;
  transaction_type: 'credit' | 'debit';
  description: string;
  date: string;
  category: string;
  reference_number: string;
  balance_after: number;
}

export const bankingService = {
  async connectAccount(accountDetails: {
    account_number: string;
    ifsc_code: string;
    bank_name: string;
    account_type: 'current' | 'savings';
  }) {
    // In production, this would integrate with RazorpayX or similar
    const mockAccount: BankAccount = {
      id: Date.now().toString(),
      account_number: accountDetails.account_number,
      bank_name: accountDetails.bank_name,
      account_type: accountDetails.account_type,
      balance: Math.floor(Math.random() * 1000000),
      company_id: 'current_company',
      is_active: true
    };
    
    console.log('Bank account connected:', mockAccount);
    return { success: true, account: mockAccount };
  },

  async getTransactions(accountId: string, fromDate?: string, toDate?: string) {
    // Mock transaction data - in production would fetch from banking API
    const mockTransactions: Transaction[] = [
      {
        id: '1',
        account_id: accountId,
        amount: 50000,
        transaction_type: 'credit',
        description: 'Flipkart Invoice Payment',
        date: '2024-01-15',
        category: 'Revenue',
        reference_number: 'TXN001',
        balance_after: 150000
      },
      {
        id: '2',
        account_id: accountId,
        amount: 25000,
        transaction_type: 'debit',
        description: 'AWS Infrastructure Bill',
        date: '2024-01-10',
        category: 'Infrastructure',
        reference_number: 'TXN002',
        balance_after: 100000
      }
    ];
    
    return { success: true, transactions: mockTransactions };
  },

  async syncTransactions(accountId: string) {
    console.log('Syncing transactions for account:', accountId);
    // In production, this would trigger real-time sync with bank
    return { success: true, synced_count: 15 };
  }
};
