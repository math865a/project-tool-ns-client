import {
    faChevronDown,
    faChevronRight
} from "@fortawesome/pro-solid-svg-icons";
import {
    Collapse,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Typography
} from "@mui/material";
import { useState } from "react";
import { Action } from "~/src/design-system";
import { IDeletionConsequence } from "../useResourceTypeDeletion";
import { AllocationItem } from "./AllocationItem";

export function WorkpackageItem(wp: IDeletionConsequence) {
    const [open, setOpen] = useState<boolean>(false);

    if (wp.allocations.length === 0)
        return null;

    return (
        <>
            <ListItem key={wp.id}>
                <ListItemIcon sx={{ minWidth: 50 }}>
                    <Action.Symbol
                        title={open ? "Luk" : "Se allokkeringer"}
                        icon={open ? faChevronDown : faChevronRight}
                        onClick={() => setOpen((prev) => !prev)} />
                </ListItemIcon>
                <ListItemText
                    primaryTypographyProps={{
                        fontSize: 12,
                        fontWeight: "bold",
                    }}
                    secondaryTypographyProps={{
                        fontSize: 12,
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        maxWidth: "80%",
                    }}
                    primary={wp.systematicName}
                    secondary={wp.name} />
                <ListItemSecondaryAction>
                    <Typography fontSize={12} fontWeight="bold">
                        {wp.totalWork}
                    </Typography>
                </ListItemSecondaryAction>
            </ListItem>
            <Collapse key={wp.id + "list"} in={open}>
                <List sx={{ pl: 6 }}>
                    {wp.allocations.map((a) => (
                        <AllocationItem key={a.taskName} {...a} />
                    ))}
                </List>
            </Collapse>
            <ListItem divider sx={{ mb: 2 }} />
        </>
    );
}
