
export interface GSTReturn {
  id: string;
  return_type: 'GSTR1' | 'GSTR3B' | 'GSTR9';
  period: string; // YYYY-MM format
  filing_date?: string;
  status: 'draft' | 'filed' | 'processed';
  total_taxable_value: number;
  total_tax_amount: number;
  company_id: string;
}

export const gstService = {
  async generateGSTR3B(period: string, companyId: string) {
    // Mock GSTR-3B generation
    const gstrData: GSTReturn = {
      id: Date.now().toString(),
      return_type: 'GSTR3B',
      period,
      status: 'draft',
      total_taxable_value: 500000,
      total_tax_amount: 90000,
      company_id: companyId
    };

    console.log('Generated GSTR-3B:', gstrData);
    return { success: true, return: gstrData };
  },

  async fileReturn(returnId: string) {
    // In production, integrate with GST portal APIs
    console.log('Filing GST return:', returnId);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return { 
      success: true, 
      acknowledgment_number: `ACK${Date.now()}`,
      filed_date: new Date().toISOString()
    };
  },

  async getGSTReturns(companyId: string) {
    // Mock data
    const returns: GSTReturn[] = [
      {
        id: '1',
        return_type: 'GSTR3B',
        period: '2024-01',
        filing_date: '2024-02-20',
        status: 'filed',
        total_taxable_value: 500000,
        total_tax_amount: 90000,
        company_id: companyId
      }
    ];
    
    return { success: true, returns };
  },

  async validateGSTIN(gstin: string) {
    // Basic GSTIN validation
    const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    const isValid = gstinRegex.test(gstin);
    
    return { 
      success: true, 
      valid: isValid,
      details: isValid ? {
        state_code: gstin.substring(0, 2),
        legal_name: 'Mock Company Name',
        trade_name: 'Mock Trade Name'
      } : null
    };
  }
};
