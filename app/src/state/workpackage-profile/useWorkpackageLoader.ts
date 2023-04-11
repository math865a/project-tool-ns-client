import { useRouteLoaderData } from "@remix-run/react";
import { WorkpackageLoader } from "~/routes/app.workpackages_.$workpackageId/route";

export const useWorkpackageLoader = () => {
    const data = useRouteLoaderData(
        "routes/app.workpackages_.$workpackageId"
    ) as WorkpackageLoader;
    return data;
};
