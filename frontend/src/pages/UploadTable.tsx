import React, { useState } from 'react';
import axios from 'axios';

const UploadTable = () => {
  const [tableData, setTableData] = useState<{ columns: string[], rows: any[] } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/upload-file', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setTableData(response.data);
    } catch (err) {
      console.error('Upload error', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <input type="file" accept=".csv,.xlsx" onChange={handleUpload} className="mb-4" />

      {loading && <div className="text-blue-500">Uploading...</div>}

      {tableData && (
        <div className="overflow-auto border rounded mt-4">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                {tableData.columns.map((col) => (
                  <th key={col} className="px-3 py-2 font-medium text-gray-700">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.rows.map((row, idx) => (
                <tr key={idx} className="border-t">
                  {tableData.columns.map((col) => (
                    <td key={col} className="px-3 py-1 text-gray-800">{row[col]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UploadTable;
