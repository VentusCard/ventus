import Papa from "papaparse";
import * as XLSX from "xlsx";
import { Transaction } from "@/types/transaction";
import { detectColumns, applyColumnMapping } from "./columnDetection";

// Column mapping result type
export interface MappingResult {
  needsMapping: boolean;
  headers?: string[];
  rows?: any[];
  suggestedMapping?: Record<string, string | null>;
  transactions?: Transaction[];
}

// Column mapping result type
export interface MappingResult {
  needsMapping: boolean;
  headers?: string[];
  rows?: any[];
  suggestedMapping?: Record<string, string | null>;
  transactions?: Transaction[];
}

// Main parser dispatcher
export async function parseFile(file: File): Promise<MappingResult> {
  const extension = file.name.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "csv":
      return parseCSV(file);
    case "json":
      return parseJSON(file);
    case "xlsx":
    case "xls":
      return parseXLSX(file);
    default:
      throw new Error(`Unsupported file format: ${extension}`);
  }
}

// CSV Parser using Papa Parse
export async function parseCSV(file: File): Promise<MappingResult> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const result = mapColumns(results.meta.fields || [], results.data);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => {
        reject(new Error(`CSV parsing failed: ${error.message}`));
      },
    });
  });
}

// JSON Parser
export async function parseJSON(file: File): Promise<MappingResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);
        
        if (!Array.isArray(data)) {
          reject(new Error("JSON must be an array of transactions"));
          return;
        }

        const headers = Object.keys(data[0] || {});
        const result = mapColumns(headers, data);
        resolve(result);
      } catch (error) {
        reject(new Error(`JSON parsing failed: ${error.message}`));
      }
    };

    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });
}

// XLSX Parser using SheetJS
export async function parseXLSX(file: File): Promise<MappingResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        if (jsonData.length < 2) {
          reject(new Error("XLSX file must have headers and at least one row"));
          return;
        }

        const headers = jsonData[0] as string[];
        const rows = jsonData.slice(1).map((row: any) => {
          const obj: any = {};
          headers.forEach((header, index) => {
            obj[header] = row[index];
          });
          return obj;
        });

        const result = mapColumns(headers, rows);
        resolve(result);
      } catch (error) {
        reject(new Error(`XLSX parsing failed: ${error.message}`));
      }
    };

    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsArrayBuffer(file);
  });
}

// Paste Text Parser
export function parsePastedText(text: string): MappingResult {
  const lines = text.trim().split("\n").filter(line => line.trim());
  
  if (lines.length < 2) {
    throw new Error("Pasted text must have headers and at least one row");
  }

  // Try CSV format first
  const firstLine = lines[0];
  const delimiter = firstLine.includes("\t") ? "\t" : ",";
  const headers = firstLine.split(delimiter).map(h => h.trim());
  
  const rows = lines.slice(1).map(line => {
    const values = line.split(delimiter).map(v => v.trim());
    const obj: any = {};
    headers.forEach((header, index) => {
      obj[header] = values[index] || "";
    });
    return obj;
  });

  return mapColumns(headers, rows);
}

// Column mapping (handles flexible headers with smart detection)
export function mapColumns(headers: string[], rows: any[]): MappingResult {
  const { mapping, confidence } = detectColumns(headers);
  
  // Check if we need user intervention
  const requiredFields = ["merchant_name", "date", "amount"];
  const missingRequired = requiredFields.filter(field => !mapping[field]);
  
  if (missingRequired.length > 0) {
    // Need user to map columns
    return {
      needsMapping: true,
      headers,
      rows,
      suggestedMapping: mapping
    };
  }
  
  // Auto-mapping succeeded - create reverse map (standardField -> originalColumn)
  const headerMap: Record<string, string> = {};
  Object.entries(mapping).forEach(([standardField, columnName]) => {
    if (columnName) {
      headerMap[columnName] = standardField;
    }
  });

  const transactions: Transaction[] = [];

  rows.forEach((row, index) => {
    const transaction = validateTransaction(row, headerMap, index);
    if (transaction) {
      transactions.push(transaction);
    }
  });

  if (transactions.length === 0) {
    throw new Error("No valid transactions found in the data.");
  }

  return { needsMapping: false, transactions };
}

// Process with user-confirmed mapping
export function mapColumnsWithMapping(
  headers: string[], 
  rows: any[], 
  userMapping: Record<string, string>
): Transaction[] {
  // Create reverse map (originalColumn -> standardField)
  const headerMap: Record<string, string> = {};
  Object.entries(userMapping).forEach(([standardField, columnName]) => {
    headerMap[columnName] = standardField;
  });

  const transactions: Transaction[] = [];

  rows.forEach((row, index) => {
    const transaction = validateTransaction(row, headerMap, index);
    if (transaction) {
      transactions.push(transaction);
    }
  });

  if (transactions.length === 0) {
    throw new Error("No valid transactions found in the data.");
  }

  return transactions;
}

// Validation
function validateTransaction(row: any, headerMap: Record<string, string>, index: number): Transaction | null {
  try {
    // Extract fields using header map
    let merchant_name = "";
    let description = "";
    let mcc = "";
    let amount = 0;
    let date = "";
    let transaction_id = "";

    Object.entries(headerMap).forEach(([originalHeader, standardField]) => {
      const value = row[originalHeader];
      
      switch (standardField) {
        case "merchant_name":
          merchant_name = String(value || "").trim();
          break;
        case "description":
          description = String(value || "").trim();
          break;
        case "mcc":
          mcc = String(value || "").trim();
          break;
        case "amount":
          amount = parseFloat(String(value || "0").replace(/[$,]/g, ""));
          break;
        case "date":
          date = String(value || "").trim();
          break;
        case "transaction_id":
          transaction_id = String(value || "").trim();
          break;
      }
    });

    // Required fields validation
    if (!merchant_name || !date) {
      console.warn(`Row ${index + 1}: Missing required fields (merchant_name or date)`);
      return null;
    }

    if (isNaN(amount)) {
      console.warn(`Row ${index + 1}: Invalid amount`);
      return null;
    }

    // Auto-generate transaction_id if missing
    if (!transaction_id) {
      transaction_id = `txn_${Date.now()}_${index}`;
    }

    // Parse and validate date
    const parsedDate = parseDate(date);
    if (!parsedDate) {
      console.warn(`Row ${index + 1}: Invalid date format`);
      return null;
    }

    return {
      transaction_id,
      merchant_name,
      description: description || undefined,
      mcc: mcc || undefined,
      amount,
      date: parsedDate,
    };
  } catch (error) {
    console.warn(`Row ${index + 1}: Validation failed - ${error.message}`);
    return null;
  }
}

// Flexible date parser
function parseDate(dateStr: string): string | null {
  try {
    // Try various date formats
    const formats = [
      // ISO format
      /^\d{4}-\d{2}-\d{2}$/,
      // US format
      /^\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}$/,
      // European format
      /^\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}$/,
    ];

    if (formats[0].test(dateStr)) {
      // Already ISO format
      return dateStr;
    }

    // Try to parse and convert to ISO
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return date.toISOString().split("T")[0];
    }

    return null;
  } catch {
    return null;
  }
}
