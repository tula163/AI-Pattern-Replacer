import * as XLSX from 'xlsx'
import { useDataStore } from '../store/useDataStore'

export const uploadAndParseFile = async (file: File): Promise<void> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      try {
        const fileName = file.name.toLowerCase()
        const isCSV = fileName.endsWith('.csv')

        const data = new Uint8Array(event.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, {
          type: 'array',
          ...(isCSV ? { codepage: 65001 } : {})
        })

        const firstSheetName = workbook.SheetNames[0]
        const sheet = workbook.Sheets[firstSheetName]

        const parsedData = XLSX.utils.sheet_to_json<string[]>(sheet, {
          header: 1,
          defval: '' 
        })

        const { setOriginalData, setModifiedData } = useDataStore.getState()

        setModifiedData([])
        setOriginalData(parsedData)
        setModifiedData(parsedData)

        resolve()
      } catch (err) {
        reject('❌ Failed to parse the file: ' + err)
      }
    }

    reader.onerror = () => {
      reject('❌ Unable to read the file')
    }

    reader.readAsArrayBuffer(file)
  })
}
