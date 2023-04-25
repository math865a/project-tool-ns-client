import { useMemo } from "react";
import { useSession } from "~/src";
import { pages, schedulePage } from "./_page-map";

export const useLinks = () => {
    const { user } = useSession();

    const links = useMemo(() => {
        if (user.isResource) {
            return [schedulePage, ...pages];
        }
        return pages;
    }, [user.isResource]);

    return links;
};
