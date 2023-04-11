import { useEffect, useMemo, useState } from "react";
import { useSocketContext } from "~/src/socket";
import { IResourceCapacityParams } from "./_useResourceCapacity";

export interface IBookingTypeData {
    week: number;
    year: number;
    id: string;
    capacity: number;
    Soft: number;
    Hard: number;
}

export interface IBookingTypeTotals {
    soft: number;
    hard: number;
    capacity: number;
}

export interface IBookingTypeResponse {
    totals: IBookingTypeTotals;
    bookings: IBookingTypeData[];
}

export const useBookingTypeData = (params: IResourceCapacityParams) => {
    const socket = useSocketContext();
    const [data, setData] = useState<IBookingTypeData[]>([]);
    const [totals, setTotals] = useState<IBookingTypeTotals | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const updateData = (data: IBookingTypeResponse) => {
        console.log(data)
        setData(data.bookings);
        setTotals(data.totals);
        setIsLoading(false);
    };

    const getData = () => {
        setIsLoading(true);
        socket?.emit("get:booking-stage-timeseries", params, updateData);
    };
    
    const isEmpty = useMemo(() => {
        return totals?.hard === 0 && totals?.soft === 0
    },[data])

    useEffect(() => {
        if (!socket) return;
        getData();
    }, [params, socket]);

    return {
        data,
        totals,
        isLoading,
        isEmpty
    };
};
