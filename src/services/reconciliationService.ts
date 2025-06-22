
export interface ReconciliationMatch {
  id: string;
  type: 'invoice-payment' | 'bill-payment' | 'duplicate' | 'mismatch';
  confidence: number;
  source: any;
  target: any;
  suggestion: string;
  autoApply?: boolean;
}

export interface ReconciliationResult {
  matches: ReconciliationMatch[];
  anomalies: {
    id: string;
    type: 'double_entry' | 'unmatched_inflow' | 'amount_mismatch';
    description: string;
    severity: 'low' | 'medium' | 'high';
  }[];
}

class ReconciliationService {
  async findMatches(documents: any[], bankTransactions: any[]): Promise<ReconciliationResult> {
    const matches: ReconciliationMatch[] = [];
    const anomalies: any[] = [];

    // Mock reconciliation logic
    documents.forEach(doc => {
      if (doc.type === 'Invoice' && doc.status === 'sent') {
        // Look for matching payment in bank transactions
        const matchingPayment = bankTransactions.find(txn => 
          Math.abs(txn.amount - doc.amount) < 100 && // Allow small variance
          txn.type === 'credit' &&
          txn.date >= doc.issueDate
        );

        if (matchingPayment) {
          matches.push({
            id: `${doc.id}-${matchingPayment.id}`,
            type: 'invoice-payment',
            confidence: 0.92,
            source: doc,
            target: matchingPayment,
            suggestion: `Match invoice ${doc.title} with payment of ₹${matchingPayment.amount}`,
            autoApply: true
          });
        }
      }
    });

    // Detect anomalies
    const duplicateAmounts = this.findDuplicateAmounts(bankTransactions);
    duplicateAmounts.forEach(dup => {
      anomalies.push({
        id: `duplicate-${dup.amount}`,
        type: 'double_entry',
        description: `Potential duplicate entries of ₹${dup.amount} on ${dup.date}`,
        severity: 'medium'
      });
    });

    return { matches, anomalies };
  }

  private findDuplicateAmounts(transactions: any[]) {
    const amountGroups = transactions.reduce((acc, txn) => {
      const key = `${txn.amount}-${txn.date}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(txn);
      return acc;
    }, {});

    return Object.values(amountGroups)
      .filter((group: any) => group.length > 1)
      .map((group: any) => group[0]);
  }

  generateJournalEntry(match: ReconciliationMatch) {
    // Generate accounting entries based on the match type
    if (match.type === 'invoice-payment') {
      return {
        debit: [{ account: 'Bank', amount: match.target.amount }],
        credit: [{ account: 'Accounts Receivable', amount: match.target.amount }],
        description: `Payment received for ${match.source.title}`
      };
    }
    
    return null;
  }
}

export const reconciliationService = new ReconciliationService();
