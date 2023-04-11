import { InitialCapacityBoardLoad } from "@math865a/project-tool.types";
import { useRouteLoaderData } from "@remix-run/react";

export const useData = () => {
    const data = useRouteLoaderData(
        "routes/app.capacity"
    ) as InitialCapacityBoardLoad;
    return data;
};
