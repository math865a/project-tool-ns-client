import { Dialog } from "@mui/material";
import { Outlet, useNavigate } from "@remix-run/react";
import { observer } from "mobx-react-lite";
import { GanttContent } from "./Gantt.Content";
import { GanttFooter } from "./Gantt.Footer";
import { GanttDialogToolbar } from "./Gantt.Toolbar";

export const GanttDialog = observer(() => {
    const navigate = useNavigate();

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Escape") {
            event.stopPropagation();
            if (event.key === "Escape") {
                navigate("../");
            }
        }
    };

    return (
        <Dialog
            open={true}
            PaperProps={{
                sx: {
                    height: "95vh",
                    minWidth: "97vw",
                    borderRadius: 4,
                    p: 1,
                },
            }}
            onKeyDown={handleKeyDown}
        >
            <GanttDialogToolbar />
            <GanttContent />
            <GanttFooter />
            <Outlet />
        </Dialog>
    );
});
