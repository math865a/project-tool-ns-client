import { faMaximize } from "@fortawesome/pro-light-svg-icons";
import { Box } from "@mui/material";
import { useLocation, useParams } from "@remix-run/react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Action } from "~/src/design-system";
import { useWorkpackage } from "~/src/state";

const GanttAction = observer(() => {
    const { Gantt } = useWorkpackage();

    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes("gantt")) {
            Gantt.Table.setIsMounted(true);
        } else {
            Gantt.Table.setIsMounted(false);
        }
    }, [location.pathname]);

    return (
        <Box>
            <Action.Symbol icon={faMaximize} title="Rediger" to={`gantt`} />
        </Box>
    );
});

export default GanttAction;
