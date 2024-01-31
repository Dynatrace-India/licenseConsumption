// src/excelReader.ts
import * as XLSX from 'xlsx';

export interface EmailRecord {
    EMAIL: string;
    EIN: string;
    DELIVERY_UNIT: string;
    DELIVERY_UNIT_2: string;
    DELIVERY_UNIT_3: string;
    DELIVERY_UNIT_4: string;
  }

export function readExcelData(filePath: string): EmailRecord[] {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data: EmailRecord[] = XLSX.utils.sheet_to_json(worksheet);
  return data;
}
