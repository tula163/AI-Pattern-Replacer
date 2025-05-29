import * as XLSX from 'xlsx';
import { useDataStore } from '../store/useDataStore'; // 请根据实际路径调整

export const uploadAndParseFile = async (file: File) => {
  return new Promise<void>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        const firstSheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[firstSheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as string[][];

        // ✅ 存入 store（注意顺序）
        const { setOriginalData, setModifiedData } = useDataStore.getState();
        setModifiedData([]);               // 清空旧的修改结果
        setOriginalData(parsedData);      // 设置原始数据
        setModifiedData(parsedData);      // 设置初始修改数据

        resolve();
      } catch (err) {
        reject('❌ 解析文件失败: ' + err);
      }
    };

    reader.onerror = () => {
      reject('❌ 无法读取文件');
    };

    reader.readAsArrayBuffer(file);
  });
};
