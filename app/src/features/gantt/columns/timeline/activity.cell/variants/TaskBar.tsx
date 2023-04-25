import { Box, Paper } from "@mui/material";
import { Activity } from "gantt-models";
import { observer } from "mobx-react-lite";

export const TaskBar = observer(({ Activity }: { Activity: Activity }) => {
    const Bar = Activity.Bar;

    return (
        <Box
            width={Bar.rect.w}
            height={Bar.rect.h}
            sx={{ backgroundColor: Activity.Style.fill, borderRadius: 0.5 }}
            component={Paper}
            variant="outlined"
        />
    );
});
