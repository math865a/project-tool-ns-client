import { useParams } from "@remix-run/react";
import _ from "lodash";
import { useEffect, useMemo, useState } from "react";
import invariant from "tiny-invariant";
import { useSocketContext } from "~/src/socket";
import { IDateRange } from "./useDateRange";
import { IResourceCapacityParams } from "./_useResourceCapacity";

export interface IWorkpackageChartsResponse {
    timeseries: IWorkpackageTimeseriesData[];
    totals: IWorkpackageTotalsData[];
}

export type IWorkpackageTimeseriesData = { [index: string]: number } & {
    id: string;
    label: string;
    week: number;
    year: number;
    capacity: number;
};

export interface IWorkpackageTotalsData {
    id: string;
    systematicName: string;
    name: string;
    booked: number;
    bookingStage: string;
    color: string;
}

export const useWorkpackageChartsData = (params: IResourceCapacityParams) => {
    const socket = useSocketContext();
    const [totals, setTotals] = useState<IWorkpackageTotalsData[]>([]);
    const [timeseries, setTimeseries] = useState<IWorkpackageTimeseriesData[]>(
        []
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const updateData = (data: IWorkpackageChartsResponse) => {
        console.log(data);
        setTotals(data.totals.map((d, i) => ({ ...d, color: colors[i] })));
        setTimeseries(data.timeseries);
        setIsLoading(false);
    };

    const getData = () => {
        setIsLoading(true);
        socket?.emit("get:workpackage-data", params, updateData);
    };

    useEffect(() => {
        if (!socket) return;
        getData();
    }, [params, socket]);

    return {
        timeseries,
        totals,
        isLoading,
    };
};

const colors = [
    "#A8C5DA",
    "#BAEDBD",
    "#C6C7F8",
    "#B1E3FF",
    "#95A4FC",
    "#A1E3CB",
    "#A8C5DA",
    "#BAEDBD",
    "#C6C7F8",
    "#B1E3FF",
    "#95A4FC",
    "#A1E3CB",
    "#A8C5DA",
    "#BAEDBD",
    "#C6C7F8",
    "#B1E3FF",
    "#95A4FC",
    "#A1E3CB",
    "#A8C5DA",
    "#BAEDBD",
    "#C6C7F8",
    "#B1E3FF",
    "#95A4FC",
    "#A1E3CB",
    "#A8C5DA",
    "#BAEDBD",
    "#C6C7F8",
    "#B1E3FF",
    "#95A4FC",
    "#A1E3CB",
    "#A8C5DA",
    "#BAEDBD",
    "#C6C7F8",
    "#B1E3FF",
    "#95A4FC",
    "#A1E3CB",
];
