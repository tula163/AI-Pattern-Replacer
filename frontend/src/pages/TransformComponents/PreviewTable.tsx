import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TablePagination
} from '@mui/material';

interface ModifiedTableProps {
  modifiedData: string[][];
  originalData?: string[][];
  highlightChanges?: boolean;
}

const ModifiedTable: React.FC<ModifiedTableProps> = ({
  modifiedData,
  originalData = [],
  highlightChanges = false
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  if (!modifiedData || modifiedData.length === 0) return null;

  const headers = modifiedData[0];
  const rows = modifiedData.slice(1);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="mt-10">

      {/* main */}
      <div className="w-full overflow-auto">
        <TableContainer component={Paper} className="overflow-x-auto min-w-fit">
          <Table className="min-w-[1200px]">
            <TableHead>
              <TableRow>
                {headers.map((header, idx) => (
                  <TableCell
                    key={idx}
                    sx={{ fontWeight: 'bold', backgroundColor: '#f3f4f6', whiteSpace: 'nowrap' }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, rowIdx) => {
                  const actualRowIdx = rowIdx + 1 + page * rowsPerPage;
                  return (
                    <TableRow key={rowIdx}>
                      {row.map((cell, colIdx) => {
                        const original = originalData?.[actualRowIdx]?.[colIdx];
                        const changed = highlightChanges && original !== undefined && original !== cell;
                        return (
                          <TableCell
                            key={colIdx}
                            sx={{
                              backgroundColor: changed ? 'rgba(255, 249, 196, 0.9)' : 'inherit',
                              fontWeight: changed ? 'bold' : 'normal',
                              fontStyle: changed ? 'italic' : 'normal',
                              borderLeft: changed ? '4px solid #facc15' : undefined,
                              transition: 'background-color 0.3s ease',
                              whiteSpace: 'nowrap',
                              '&:hover': {
                                backgroundColor: changed ? 'rgba(255, 245, 160, 1)' : 'inherit'
                              }
                            }}
                          >
                            {cell !== undefined && cell !== null ? cell : ''}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <TablePagination
        component="div"
        count={rows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );


};

export default ModifiedTable;
