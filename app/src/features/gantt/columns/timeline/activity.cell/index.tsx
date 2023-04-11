import { Box } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid-pro";
import { observer } from "mobx-react-lite";
import { Activity } from "gantt-models";
import Closures from "../shared/Closures";
import { Bar } from "./Bar";
import Preview from "./Preview";
import { ROW_HEIGHT } from "gantt/constants";

export const ActivityTimelineCell = observer(
    (props: GridRenderCellParams<Activity>) => {
        return (
            <Box
                width="100%"
                minWidth="100%"
                maxWidth="100%"
                height={ROW_HEIGHT}
                position="relative"
                sx={{overflowX: "hidden"}}
                id={`activity-${props.row.id}`}
            >
                <Closures/>
                <Bar Activity={props.row} />
                <Preview Activity={props.row} />
            </Box>
        );
    }
);
