import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import Navbar from '../components/Navbar';
import {
  Button,
  Typography,
  Input,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination
} from '@mui/material';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const FileUploadAndRender = () => {
  const [data, setData] = useState<string[][]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }

    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target?.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const jsonData: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });
      setData(jsonData);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="bg-gradient-to-b from-purple-100 via-white to-pink-100 flex-1 flex flex-col h-full">
        <div className='flex-1 max-w-screen-xl mx-auto px-6 py-6 w-full'>
          <Typography className="mb-6 font-medium">Upload File</Typography>
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-400"
          >
            <CloudUploadIcon fontSize="large" color="disabled" />
            <Typography className="font-medium text-gray-600">Browse  CSV / Excel  Files</Typography>
            <Typography variant="body2" className="text-gray-400">
              Drag and drop files here
            </Typography>
            <Input
              type="file"
              inputProps={{ accept: '.csv, .xlsx' }}
              id="file-upload"
              sx={{ display: "none" }}
              onChange={handleFileChange}
            />
          </label>

          {/* table */}
          <section>
            {data.length > 0 && (
              <div className="mt-6 overflow-auto">
                {selectedFile && (
                  <Typography variant="body2" className="mt-2 text-gray-600">
                    Selected: {selectedFile.name}
                  </Typography>
                )}
                <TableContainer component={Paper} sx={{ mt: 2 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {data[0].map((header, idx) => (
                          <TableCell key={idx} sx={{ fontWeight: 'bold', backgroundColor: '#f3f4f6' }}>
                            {header}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.slice(1)
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, rowIdx) => (
                          <TableRow key={rowIdx}>
                            {row.map((cell, colIdx) => (
                              <TableCell key={colIdx}>{cell}</TableCell>
                            ))}
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            )}

            {data.length > 1 && (
              <TablePagination
                component="div"
                count={data.length - 1}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default FileUploadAndRender;
