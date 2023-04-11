import { useGridApiContext } from "@mui/x-data-grid-pro";
import { useEffect } from "react";
import { useScale } from "../provider/TimelineProvider";


export const useInitialTimelineWidth = () => {

    const {updateTimelineWidth} = useScale()

    const api = useGridApiContext();

    useEffect(() => {
        updateTimelineWidth(api.current.getColumn("timeline").computedWidth);
    }, []);
}