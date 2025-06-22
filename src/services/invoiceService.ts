
export interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
  tax_rate: number;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  client_name: string;
  client_email: string;
  client_address: string;
  client_gstin?: string;
  issue_date: string;
  due_date: string;
  items: InvoiceItem[];
  subtotal: number;
  tax_amount: number;
  total_amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  company_id: string;
  created_at: string;
}

export const invoiceService = {
  async generateInvoice(invoiceData: Omit<Invoice, 'id' | 'created_at' | 'invoice_number'>) {
    const invoiceNumber = `INV-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`;
    
    const invoice: Invoice = {
      ...invoiceData,
      id: Date.now().toString(),
      invoice_number: invoiceNumber,
      created_at: new Date().toISOString()
    };

    console.log('Generated invoice:', invoice);
    
    // In production, save to database
    return { success: true, invoice };
  },

  async sendInvoice(invoiceId: string, clientEmail: string) {
    // In production, integrate with email service
    console.log(`Sending invoice ${invoiceId} to ${clientEmail}`);
    
    // Mock email sending
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { success: true, message: 'Invoice sent successfully' };
  },

  async generatePDF(invoice: Invoice) {
    // In production, use PDF generation library
    console.log('Generating PDF for invoice:', invoice.invoice_number);
    
    const pdfBlob = new Blob(['Mock PDF content'], { type: 'application/pdf' });
    const downloadUrl = URL.createObjectURL(pdfBlob);
    
    return { success: true, downloadUrl };
  },

  async getInvoices(companyId: string) {
    // Mock data - in production fetch from database
    const mockInvoices: Invoice[] = [
      {
        id: '1',
        invoice_number: 'INV-2024-001',
        client_name: 'Flipkart India',
        client_email: 'billing@flipkart.com',
        client_address: 'Bangalore, India',
        client_gstin: '29AABCI9603R1ZM',
        issue_date: '2024-01-15',
        due_date: '2024-02-15',
        items: [
          {
            description: 'Software License',
            quantity: 1,
            rate: 50000,
            amount: 50000,
            tax_rate: 18
          }
        ],
        subtotal: 50000,
        tax_amount: 9000,
        total_amount: 59000,
        status: 'sent',
        company_id: companyId,
        created_at: '2024-01-15T00:00:00Z'
      }
    ];
    
    return { success: true, invoices: mockInvoices };
  }
};
