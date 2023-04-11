import { Box } from "@mui/material";
import {
    useGridApiContext
} from "@mui/x-data-grid-pro";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { HEADER_HEIGHT } from "~/pages/capacity/_config/contants";
import { useBoard } from "~/pages/capacity/_provider";
import RenderHeaderCells from "./RenderHeaderCells";

const CapacityHeaderRow = observer(() => {
    const Board = useBoard();
    const api = useGridApiContext();
    useEffect(() => {
        Board.Dimensions.setChartWidth(
            api.current.getColumn("capacity").computedWidth
        );
    }, []);

    return (
        <Box
            width={Board.Dimensions.chartWidth}
            minWidth={Board.Dimensions.chartWidth}
            height={HEADER_HEIGHT}
            style={{ position: "absolute", left: 0, top: 0 }}
        >
            <svg height={HEADER_HEIGHT} width={Board.Dimensions.chartWidth}>
                <RenderHeaderCells />
            </svg>
        </Box>
    );
});

export default CapacityHeaderRow;
