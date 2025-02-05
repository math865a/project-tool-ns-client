//import { InitialCapacityBoardLoad }
import { useRouteLoaderData } from "@remix-run/react";

export const useData = () => {
    const data = useRouteLoaderData("routes/app.capacity") as any;
    return data;
};
