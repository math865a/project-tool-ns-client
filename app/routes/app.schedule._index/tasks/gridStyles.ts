import { DataGridProProps, gridClasses } from "@mui/x-data-grid-pro";

export const gridStyles: DataGridProProps["sx"] = {
    border: "none",
    "& .MuiDataGrid-cell": {
        outline: "none",
        fontSize: "12px",
        padding: "0px 0px",
        backgroundColor: (theme) => "#fff",
        "&:hover": {
            backgroundColor: (theme) => "#fff",
        },
        "& .Mui-selected": {
            backgroundColor: (theme) => "#fff",
        },
        "&:focus-within": {
            backgroundColor: (theme) => "#fff",
            outline: "none",
        },
        borderColor: "rgba(0,0,0,0.05)"
    },
    "& .MuiDataGrid-columnHeader": {
        padding: "0px 0px",
        fontSize: "12px",
        fontWeight: "bold",
        "&:hover": {
            backgroundColor: "transparent",
        },
        "& .Mui-selected": {
            backgroundColor: "transparent",
        },
        "&:focus-within": {
            backgroundColor: "transparent",
            outline: "none",
        },
    },
    [`${gridClasses["row--lastVisible"]}`]: {
        borderBottom: "none",
    },
    "& .MuiDataGrid-columnHeaders": {
        borderTop: "none",
    },
    "& .Mui-selected": {
        backgroundColor: (theme) => "#fff",
        border: "none",
    },
    "& .MuiDataGrid-row": {
        backgroundColor: (theme) => "#fff",
        outline: "none",
        borderTop: "none",
    },
    "& .MuiDataGrid-pinnedColumnHeaders": {
        boxShadow: "none",
        backgroundColor: (theme) => "#fff",
    },
    "& .MuiDataGrid-pinnedColumns": {
        backgroundColor: (theme) => "#fff",
    },
    "& .MuiDataGrid-detailPanel": {
        backgroundColor: (theme) => "#fff",
    },
};
