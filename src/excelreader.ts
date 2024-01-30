// src/excelReader.ts
import * as XLSX from 'xlsx';

export interface EmailRecord {
    DELIVERY_UNIT: string;
    EMAIL: string;
    EIN: string;
    NAME: string;
  }

export function readExcelData(filePath: string): EmailRecord[] {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data: EmailRecord[] = XLSX.utils.sheet_to_json(worksheet);
  return data;
}
