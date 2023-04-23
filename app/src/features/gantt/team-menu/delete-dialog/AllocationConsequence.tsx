import {
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { Allocation } from "gantt-models";

const AllocationConsequence = observer(
    ({ Allocation }: { Allocation: Allocation }) => {
        return (
            <ListItem key={Allocation.id} disablePadding>
                <ListItemIcon>
                    <Typography fontSize={12} fontWeight="bold">
                        {Allocation.Assignment?.Task?.Row.wbs}
                    </Typography>
                </ListItemIcon>
                <ListItemText
                    sx={{ maxWidth: "80%" }}
                    primaryTypographyProps={{
                        fontSize: 12,
                        textOverflow: "ellipsis",
                    }}
                    secondaryTypographyProps={{
                        fontSize: 12,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "70%",
                    }}
                    primary={Allocation.Assignment?.Task?.name}
                    secondary={Allocation.Interval.display.intervals.long}
                />
                <ListItemSecondaryAction>
                    <Typography fontSize={12}>
                        {Allocation.Timesheet.stats.timesheet.total + " timer"}
                    </Typography>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
);

export default AllocationConsequence;
