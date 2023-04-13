import { faUpRightFromSquare } from "@fortawesome/pro-light-svg-icons";
import { faCheck, faTimes } from "@fortawesome/pro-solid-svg-icons";
import { GridProps, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";
import {
    DataGridPro,
    DataGridProProps,
    GridColDef,
    GridRowId,
    GridRowIdGetter,
    GridToolbarExport,
    GridToolbarFilterButton,
    GridToolbarQuickFilter,
    GridValidRowModel,
    daDK,
} from "@mui/x-data-grid-pro";
import React, {
    createContext,
    useContext,
    useLayoutEffect,
    useState,
} from "react";
import { Action } from "../action";
import { renderCellExpand } from "./ExpandCellRenderer";
import { multilineColumn } from "./MultilineEdit";

const StyledGridOverlay = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    "& .ant-empty-img-1": {
        fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
    },
    "& .ant-empty-img-2": {
        fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
    },
    "& .ant-empty-img-3": {
        fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
    },
    "& .ant-empty-img-4": {
        fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
    },
    "& .ant-empty-img-5": {
        fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
        fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
    },
}));

function NoRowsOverlay({
    text = "Der er ingen rækker at vise",
}: {
    text?: string;
}) {
    return (
        <StyledGridOverlay>
            <svg
                transform="scale(1.5)"
                width="120"
                height="100"
                viewBox="0 0 184 152"
                aria-hidden
                focusable="false"
            >
                <g fill="none" fillRule="evenodd">
                    <g transform="translate(24 31.67)">
                        <ellipse
                            className="ant-empty-img-5"
                            cx="67.797"
                            cy="106.89"
                            rx="67.797"
                            ry="12.668"
                        />
                        <path
                            className="ant-empty-img-1"
                            d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                        />
                        <path
                            className="ant-empty-img-2"
                            d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
                        />
                        <path
                            className="ant-empty-img-3"
                            d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
                        />
                    </g>
                    <path
                        className="ant-empty-img-3"
                        d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
                    />
                    <g
                        className="ant-empty-img-4"
                        transform="translate(149.65 15.383)"
                    >
                        <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
                        <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
                    </g>
                </g>
            </svg>
            <Box sx={{ mt: 4 }}>
                <Typography
                    fontSize={16}
                    fontWeight="bold"
                    color="text.secondary"
                >
                    {text}
                </Typography>
            </Box>
        </StyledGridOverlay>
    );
}

const sxView: GridProps["sx"] = {
    border: "none",
    "& .MuiDataGrid-cell": {
        padding: "0px 8px",
        outline: "none",
        fontSize: "12px",
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
    "& .Mui-selected": {
        backgroundColor: "transparent",
        border: "none",
    },
    "& .MuiDataGrid-row": {
        backgroundColor: "transparent",
        outline: "none",
        "&:hover": {
            cursor: "pointer",
        },
    },
};

function DefaultToolbar() {
    return (
        <Box
            mt={1}
            flexGrow={1}
            height={50}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
        >
          
            <GridToolbarQuickFilter />
            <Stack direction="row" spacing={1} alignItems="center">
                <GridToolbarFilterButton />
                <GridToolbarExport />
            </Stack>
        </Box>
    );
}

type ViewGridProps<T extends GridValidRowModel = GridValidRowModel> = {
    getRowUrl?: (id: GridRowId) => string;
    rows: T[];
    columns: GridColDef<T>[];
    getRowId: GridRowIdGetter<T>;
    Toolbar?: React.JSXElementConstructor<any> | null | undefined;
    rowHeight?: number;
    onContextMenu?: (row: T, coords: { top: number; left: number }) => void;
    hideToolbar?: boolean;
} & Omit<
    DataGridProProps<T>,
    "rows | columns | getRowId | components | componentsProps | rowHeight"
>;

const ViewContext = createContext<{ hoverRow: string | null }>({
    hoverRow: null,
});

function View<T extends GridValidRowModel = GridValidRowModel>({
    rows,
    columns,
    getRowId,
    Toolbar,
    rowHeight = 45,
    onContextMenu,
    sx = sxView,
    hideToolbar,
    ...rest
}: ViewGridProps<T>) {
    const [hoverRow, setHoverRow] = useState<string | null>(null);
    const handleMouseEnter = (event: React.MouseEvent) => {
        const selectedRow = event.currentTarget.getAttribute("data-id");
        setHoverRow(selectedRow);
    };

    const handleMouseLeave = () => {
        setHoverRow(null);
    };

    const handleContextMenu = (event: React.MouseEvent) => {
        if (onContextMenu) {
            event.preventDefault();
            const rowId = event.currentTarget.getAttribute("data-id");
            const row = rows.find((r) => getRowId(r) === rowId);
            if (row) {
                onContextMenu(row, {
                    top: event.clientY - 6,
                    left: event.clientX + 2,
                });
            }
        }
    };

    return (
        <ViewContext.Provider value={{ hoverRow }}>
            <DataGridPro
                columns={columns}
                rows={rows}
                getRowId={getRowId}
                throttleRowsMs={20000}
                rowBuffer={15}
                components={{
                    NoRowsOverlay: NoRowsOverlay,
                    Toolbar: Toolbar
                        ? Toolbar
                        : hideToolbar
                        ? undefined
                        : DefaultToolbar,
                }}
                componentsProps={{
                    row: {
                        onMouseEnter: handleMouseEnter,
                        onMouseLeave: handleMouseLeave,
                        onContextMenu: handleContextMenu,
                    },
                    toolbar: {
                        showQuickFilter: true,
                    },
                }}
                localeText={daDK.components.MuiDataGrid.defaultProps.localeText}
                rowHeight={rows?.length === 0 ? 300 : rowHeight}
                sx={sx}
                hideFooter
                {...rest}
                //onRowDoubleClick={(props) => navigate(props.row)}
            />
        </ViewContext.Provider>
    );
}

function BooleanCell({ value, title }: { value: boolean; title?: string }) {
    const theme = useTheme();

    return (
        <Action.Symbol
            icon={value ? faCheck : faTimes}
            title={title}
            iconSize={1.1}
            disableFocusRipple
            disableRipple
            disableTouchRipple
            symbolProps={{
                color: value
                    ? theme.palette.success.main
                    : theme.palette.error.main,
            }}
        />
    );
}

interface ILinkCellProps {
    to: string;
    id: string;
}

function LinkCell({ to, id }: ILinkCellProps) {
    const hoverRow = useContext(ViewContext)?.hoverRow;

    const [isVisible, setIsVisible] = useState<boolean>(false);

    useLayoutEffect(() => {
        setIsVisible(id === hoverRow);
    }, [id, hoverRow]);
    if (!isVisible) return null;
    return <Action.Symbol to={to} icon={faUpRightFromSquare} title="Gå til" />;
}

const useViewContext = () => {
    return useContext(ViewContext);
};

export const Grid = {
    NoRowsOverlay,
    sxView,
    View,
    renderCellExpand: renderCellExpand,
    LinkCell,
    multilineColumn: multilineColumn,
    useViewContext: useViewContext,
    BooleanCell,
};
