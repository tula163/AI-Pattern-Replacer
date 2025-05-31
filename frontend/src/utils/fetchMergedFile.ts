import axios from 'axios';
import * as XLSX from 'xlsx';

export async function fetchMergedFile(filePath: string): Promise<string[][]> {
  const res = await axios.get(filePath, { responseType: 'arraybuffer' });
  const data = new Uint8Array(res.data);
  const workbook = XLSX.read(data, { type: 'array' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const json = XLSX.utils.sheet_to_json<string[]>(sheet, { header: 1, defval: '' });
  return json;
}
