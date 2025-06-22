
export interface ExtractedData {
  amount?: number;
  vendor?: string;
  gstin?: string;
  date?: string;
  invoiceNumber?: string;
  category?: string;
  lineItems?: Array<{
    description: string;
    quantity: number;
    rate: number;
    amount: number;
  }>;
  confidence: number;
}

export interface OCRResult {
  success: boolean;
  data?: ExtractedData;
  error?: string;
  rawText?: string;
}

class OCRService {
  private async extractTextFromImage(file: File): Promise<string> {
    // Simulate OCR processing - in production, this would call Tesseract.js or cloud OCR
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock extracted text based on file name for demo
        if (file.name.includes('invoice')) {
          resolve(`
            INVOICE
            Invoice No: INV-2024-001
            Date: 2024-01-15
            Bill To: Flipkart India Pvt Ltd
            GSTIN: 29AABCI9603R1ZM
            
            Item Description    Qty   Rate    Amount
            Software License    1     50000   50000
            
            Total Amount: ₹50,000
            Tax: ₹9,000
            Grand Total: ₹59,000
          `);
        } else if (file.name.includes('bill') || file.name.includes('expense')) {
          resolve(`
            BILL
            Bill No: BILL-AWS-001
            Date: 2024-01-05
            From: Amazon Web Services
            GSTIN: 12AABCA1234L1Z5
            
            AWS Infrastructure Services
            Amount: ₹25,000
            Tax: ₹4,500
            Total: ₹29,500
          `);
        } else {
          resolve(`
            RECEIPT
            Date: 2024-01-10
            Amount: ₹1,200
            Merchant: Local Vendor
          `);
        }
      }, 2000);
    });
  }

  private parseExtractedText(text: string): ExtractedData {
    const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
    
    let amount = 0;
    let vendor = '';
    let gstin = '';
    let date = '';
    let invoiceNumber = '';
    let category = 'General';

    for (const line of lines) {
      // Extract amount
      const amountMatch = line.match(/(?:total|amount|grand total).*?₹?\s*([0-9,]+)/i);
      if (amountMatch) {
        amount = parseInt(amountMatch[1].replace(/,/g, ''));
      }

      // Extract vendor/company name
      if (line.includes('Bill To:') || line.includes('From:')) {
        vendor = line.split(':')[1]?.trim() || '';
      } else if (line.includes('Flipkart')) {
        vendor = 'Flipkart India Pvt Ltd';
      } else if (line.includes('Amazon Web Services') || line.includes('AWS')) {
        vendor = 'Amazon Web Services';
        category = 'Infrastructure';
      }

      // Extract GSTIN
      const gstinMatch = line.match(/GSTIN[:\s]*([A-Z0-9]{15})/i);
      if (gstinMatch) {
        gstin = gstinMatch[1];
      }

      // Extract date
      const dateMatch = line.match(/date[:\s]*(\d{4}-\d{2}-\d{2})/i);
      if (dateMatch) {
        date = dateMatch[1];
      }

      // Extract invoice number
      const invoiceMatch = line.match/(?:invoice no|bill no)[:\s]*([A-Z0-9-]+)/i);
      if (invoiceMatch) {
        invoiceNumber = invoiceMatch[1];
      }
    }

    // Auto-categorize based on vendor
    if (vendor.toLowerCase().includes('aws') || vendor.toLowerCase().includes('amazon')) {
      category = 'Infrastructure';
    } else if (vendor.toLowerCase().includes('flipkart') || vendor.toLowerCase().includes('customer')) {
      category = 'Revenue';
    } else if (amount < 5000) {
      category = 'Office Expenses';
    }

    return {
      amount,
      vendor,
      gstin,
      date,
      invoiceNumber,
      category,
      confidence: 0.85 // Mock confidence score
    };
  }

  async processDocument(file: File): Promise<OCRResult> {
    try {
      console.log('Starting OCR processing for:', file.name);
      
      const rawText = await this.extractTextFromImage(file);
      const extractedData = this.parseExtractedText(rawText);

      return {
        success: true,
        data: extractedData,
        rawText
      };
    } catch (error) {
      console.error('OCR processing failed:', error);
      return {
        success: false,
        error: 'Failed to process document'
      };
    }
  }
}

export const ocrService = new OCRService();
