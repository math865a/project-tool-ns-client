import { useGridApiRef } from "@mui/x-data-grid-pro";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { WorkpackageLoader } from "~/routes/app.workpackages_.$workpackageId._index/route";
import { Gantt } from "~/src/features";
import { useSocketContext } from "~/src/socket";

const useDependencies = () => {
    const {
        node: { id: workpackageId },
        planning: { activities, team, assignments, start, end },
        foreignKeys: { planId },
    } = useLoaderData<WorkpackageLoader>();
    const gridApi = useGridApiRef();
    const socket = useSocketContext();
    return {
        workpackageId,
        planId,
        gridApi,
        activities,
        team,
        assignments,
        start,
        end,
        socket,
    };
};

export const useGanttModel = () => {
    const {
        workpackageId,
        planId,
        gridApi,
        activities,
        socket,
        team,
        assignments,
        start,
        end,
    } = useDependencies();

    const initializeModel = () => {
        return new Gantt({
            workpackageId,
            start,
            end,
            activities,
            team,
            assignments,
            api: gridApi,
        });
    };

    const [Root] = useState<Gantt>(() => initializeModel());

    useEffect(() => {
        if (socket && !Root.Store.Transport.socket) {
            Root.Store.Transport.initializeSocket(socket);
        }
    }, [socket]);

    return Root;
};
