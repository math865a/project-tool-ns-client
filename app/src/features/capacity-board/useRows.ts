import { useMemo, useState } from "react";
import { IResourceRow } from "./types";

export const usePagination = (rows: IResourceRow[]) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const visibleRows = useMemo(() => {
        return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [page, rowsPerPage, rows]);

    return {
        page,
        rowsPerPage,
        visibleRows,
        handleChangePage,
        handleChangeRowsPerPage,
    };
};
