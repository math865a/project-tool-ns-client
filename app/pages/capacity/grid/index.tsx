import { Box } from "@mui/material";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { GridApiPro } from "@mui/x-data-grid-pro/models/gridApiPro";
import { Grid } from "design";
import { observer } from "mobx-react-lite";
import React from "react";
import { columnDefinitions } from "../_config/columns";
import {
    FOOTER_HEIGHT, HEADER_HEIGHT, ROW_HEIGHT, TOOLBAR_HEIGHT
} from "../_config/contants";
import { gridStyle } from "../_config/grid-style";
import { useBoard } from "../_provider";
import Footer from "./Footer";
import CapacityBoardToolbar from "./toolbar";

const CapacityBoardGrid = observer(
    ({ api }: { api: React.MutableRefObject<GridApiPro> }) => {
        const Board = useBoard();

        return (
            <Box
                width="100%"
                height={
                    Board.Pagination.pageSize * ROW_HEIGHT +
                    HEADER_HEIGHT +
                    FOOTER_HEIGHT + TOOLBAR_HEIGHT
                }
            >
                <DataGridPro
                    apiRef={api}
                    rows={Board.Pagination.Rows}
                    columns={columnDefinitions}
                    rowHeight={
                        Board.Pagination.Rows.length > 0 ? ROW_HEIGHT : 300
                    }
                    columnHeaderHeight={HEADER_HEIGHT}
                    pagination
                    autoHeight
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: Board.Pagination.pageSize,
                                page: Board.Pagination.page,
                            }
                        },
                    }}
                    components={{
                        NoRowsOverlay: Grid.NoRowsOverlay,
                        Footer: Footer,
                        Toolbar: CapacityBoardToolbar
                    }}
                    // components={{Toolbar: CapacityBoardToolbar}}
                    onColumnWidthChange={(params) => {
                        if (params.colDef.field === "capacity") {
                            Board.Dimensions.setChartWidth(
                                params.colDef.computedWidth
                            );
                        }
                    }}
                    sx={gridStyle}
                />
            </Box>
        );
    }
);

export default CapacityBoardGrid;
