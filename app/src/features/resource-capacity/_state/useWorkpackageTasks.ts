import { ProjectManager } from "@math865a/project-tool.types";
import { useParams } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import invariant from "tiny-invariant";
import { useSocketContext } from "~/src/socket";
import { IDateRange } from "./useDateRange";
import { IWorkpackageTotalsData } from "./useWorkpackageChartsData";
import { IResourceCapacityParams } from "./_useResourceCapacity";

export interface IWorkpackageTask {
    deliveryName: string;
    taskName: string;
    color: string;
    interval: {
        start: string;
        end: string;
    };
    displayInterval: {
        start: string;
        end: string;
    };
    work: {
        default: number;
        overtime: number;
    };
    workDisplay: string;
}

export interface IWorkpackageTasksResponse {
    tasks: IWorkpackageTask[];
    projectManager: ProjectManager;
}

export const useWorkpackageTasks = (
    activeWorkpackage: IWorkpackageTotalsData,
    capacityParams: IResourceCapacityParams
) => {


    const socket = useSocketContext();

    const [data, setData] = useState<IWorkpackageTask[]>([]);
    const [projectManager, setProjectManager] = useState<ProjectManager | null>(
        null
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const params = useMemo(() => {
        return {
            instruction: capacityParams,
            workpackageId: activeWorkpackage?.id,
  
        };
    }, [
        capacityParams.resourceId,
        capacityParams.endDate,
        capacityParams.startDate,
        activeWorkpackage?.id,
    ]);

    const updateData = (data: IWorkpackageTasksResponse) => {
        setData(data.tasks);
        setProjectManager(data.projectManager);
        setIsLoading(false);
    };

    const getData = () => {
        setIsLoading(true);
        socket?.emit("get:workpackage-tasks", params, updateData);
    };

    useEffect(() => {
        if (!socket ||!params.workpackageId) return;
        getData();
    }, [params.workpackageId, params.instruction.endDate, params.instruction.startDate, params.instruction.resourceId, socket]);

    return {
        data,
        projectManager,
        isLoading,
    };
};
