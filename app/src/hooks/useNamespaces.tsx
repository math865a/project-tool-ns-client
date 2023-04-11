import { useRouteLoaderData } from "@remix-run/react";
import { IServiceMap } from "~/server";

export const useNamespaces = () => {
    const namespaces = useRouteLoaderData(
        "root"
    ) as IServiceMap["gateways"];
    return namespaces;
};
