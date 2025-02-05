import { useParams } from "@remix-run/react";
import { useMemo } from "react";
import invariant from "tiny-invariant";
import { IconChartArea, IconList } from "@tabler/icons-react";

export const useLinks = () => {
    const { resourceId } = useParams();
    invariant(resourceId);

    const links = useMemo(() => {
        return [
            {
                to: `/app/resources/${resourceId}`,
                //icon: faChartSimple,
                Icon: IconChartArea,
                title: "Overblik",
                root: true,
            },
            {
                to: `/app/resources/${resourceId}/tasks`,
                //icon: faListUl,
                Icon: IconList,
                title: "Opgaver",
            },
        ];
    }, [resourceId]);

    return links;
};
