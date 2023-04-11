import { useGridApiRef } from "@mui/x-data-grid-pro";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { WorkpackageLoader } from "~/routes/app.workpackages_.$workpackageId/route";
import { Gantt } from "~/src/features";
import { useSocketContext } from "~/src/socket";


const useDependencies = () => {
    const {
        node: { id: workpackageId },
        planning,
        foreignKeys: {planId},
    } = useLoaderData<WorkpackageLoader>();
    const gridApi = useGridApiRef();
    const socket = useSocketContext()
    return {
        workpackageId,
        planId,
        gridApi,
        data: planning,
        socket,
    };
};

export const useGanttModel = () => {
    const { workpackageId, planId, gridApi, data, socket } = useDependencies();



    const initializeModel = () => {
        return new Gantt({ workpackageId, planId })
            .registerGridApi(gridApi)
            .initializeData(data);
    };



    const [Root] = useState<Gantt>(() => initializeModel());

    useEffect(() => {
        if (socket && !Root.Transport.socket) {
            Root.initializeSocket(socket);
        }
    },[socket])


    return Root;
};
