import { DataGridProProps } from "@mui/x-data-grid-pro";

export const gridStyle: DataGridProProps["sx"] = {
    border: "none",
    "& .MuiDataGrid-cell": {
        padding: "0px 0px",
        outline: "none",
        backgroundColor: "transparent",
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
    "& .MuiDataGrid-columnHeader": {
        padding: "0px 0px",
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
    "& .Mui-selected": {
        backgroundColor: "transparent",
        border: "none",
    },
    "& .MuiDataGrid-row": {
        backgroundColor: "transparent",
        outline: "none",
        "&:hover": {
            backgroundColor: "transparent",
        },
        "&.Mui-selected": {
            backgroundColor: "transparent",
            "&:hover": {
                backgroundColor: "transparent",
            },
        },
    },
}