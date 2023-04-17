import { useSearchParams } from "@remix-run/react";
import { useMemo } from "react";

export const useCapacityBoardState = () => {
    const [params, setParams] = useSearchParams();

    const state = useMemo(() => {
        return {
            page: parseInt(params.get("page") || "0", 10),
            rowsPerPage: parseInt(params.get("rowsPerPage") || "5", 10),
            viewMode: params.get("viewMode") || "Måned",
            startDate: params.get("startDate") || "2021-01-01",
            dataWidth: parseInt(params.get("dataWidth") || "0", 1000),
        };
    }, [params]);

    const setState = (newState: Partial<typeof state>) => {
        setParams(
            Object.entries(newState).reduce((acc, [key, value]) => {
                if (value === undefined) return acc;
                acc.set(key, value.toString());
                return acc;
            }, new URLSearchParams(params))
        );
    };

    return [state, setState] as const;
};

export type CapacityBoardState = ReturnType<typeof useCapacityBoardState>[0];
export type SetCapacityBoardState = ReturnType<typeof useCapacityBoardState>[1];
