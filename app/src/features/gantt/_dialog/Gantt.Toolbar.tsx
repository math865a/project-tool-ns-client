import { DialogTitle } from "@mui/material";
import { GanttToolbar } from "../toolbar";

export function GanttDialogToolbar() {
    return (
        <DialogTitle
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <GanttToolbar/>
        </DialogTitle>
    );
}
