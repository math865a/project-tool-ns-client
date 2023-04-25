import { useRouteLoaderData } from "@remix-run/react";
import { WorkpackageProfile } from "~/src/_definitions";

export const useWorkpackageLoader = () => {
    const data = useRouteLoaderData(
        "routes/app.workpackages_.$workpackageId"
    ) as WorkpackageProfile;
    return data;
};
