import { useParams } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import invariant from "tiny-invariant";
import { useSocketContext } from "~/src/socket";
import { IResourceCapacityParams } from "./_useResourceCapacity";

export interface ICapacityDifferenceData {
    week: number;
    year: number;
    booked: number;
    capacity: number;
    diff: number;
}

export const useCapacityDifferenceData = (params: IResourceCapacityParams) => {
    const socket = useSocketContext();
    const [data, setData] = useState<ICapacityDifferenceData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const updateData = (data: ICapacityDifferenceData[]) => {
        setData(data);
        setIsLoading(false);
    };

    const getData = () => {
        setIsLoading(true);
        socket?.emit("get:capacity-difference-timeseries", params, updateData);
    };

    useEffect(() => {
        if (!socket) return;
        getData();
    },[params, socket]);

    return {
        data,
        isLoading,
    };
};
