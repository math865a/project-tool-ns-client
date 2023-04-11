import { faCircle } from "@fortawesome/pro-solid-svg-icons";
import {
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Typography
} from "@mui/material";
import { Symbol } from "~/src/design-system";
import { IDeletionAllocation } from "../useResourceTypeDeletion";


export function AllocationItem(a: IDeletionAllocation) {
    return (
        <ListItem key={a.taskName}>
            <ListItemIcon>
                <Symbol icon={faCircle} size={0.3} />
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
                primary={a.taskName}
                secondary={a.startDate + " til " + a.endDate} />
            <ListItemSecondaryAction>
                <Typography fontSize={12}>{a.hours}</Typography>
            </ListItemSecondaryAction>
        </ListItem>
    );
}
