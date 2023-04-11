import { DataGridProProps } from "@mui/x-data-grid-pro";

export const sxGrid: DataGridProProps["sx"] = {
    border: "none",
    fontSize: 12,
    "& .MuiDataGrid-cell": {
        padding: "0px 0px",
        outline: "none",
        fontSize: 12,
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
        fontSize: 12,
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
        borderBottom: (theme) =>
            "1px solid " + theme.palette.divider,
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