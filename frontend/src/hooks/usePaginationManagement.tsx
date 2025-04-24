import { useState } from 'react';

export const usePaginationManagement = () => {
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page

  // Handle page change
  const handleChangePage = (_event: unknown, newPage: number) => {
    //prefix underscore means ""Yes, this parameter is required syntactically, but I intentionally don't use it.""
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  return {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  };
};
