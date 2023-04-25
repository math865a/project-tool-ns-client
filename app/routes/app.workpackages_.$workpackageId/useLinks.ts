import {
    faChartSimple as lightMain,
    faListTimeline as lightTasks,
    faRectangleHistory as lightHistory,
    faTimeline as lightPlan,
    faUsers as lightTeam,
} from "@fortawesome/pro-light-svg-icons";
import {
    faChartSimple as solidMain,
    faListTimeline as solidTasks,
    faRectangleHistory as solidHistory,
    faTimeline as solidPlan,
    faUsers as solidTeam,
} from "@fortawesome/pro-solid-svg-icons";
import { useParams } from "@remix-run/react";
import { useMemo } from "react";
import invariant from "tiny-invariant";
import { IPageLink } from "~/src/design-system";

export const useLinks = () => {
    const { workpackageId } = useParams();
    invariant(workpackageId);

    const links: IPageLink[] = useMemo(() => {
        return [
            {
                to: `/app/workpackages/${workpackageId}`,
                icon: lightMain,
                activeIcon: solidMain,
                title: "Overblik",
                root: true,
            },
            {
                to: `/app/workpackages/${workpackageId}/planning`,
                icon: lightPlan,
                activeIcon: solidPlan,
                title: "Projektplan",
            },
            {
                to: `/app/workpacakges/${workpackageId}/team`,
                icon: lightTeam,
                activeIcon: solidTeam,
                title: "Team",
            },
            {
                to: `/app/workpackages/${workpackageId}/tasks`,
                icon: lightTasks,
                activeIcon: solidTasks,
                title: "Opgaver",
            },
            {
                to: `/app/workpackages/${workpackageId}/history`,
                icon: lightHistory,
                activeIcon: solidHistory,
                title: "Historik",
            },
        ];
    }, [workpackageId]);

    return links;
};
