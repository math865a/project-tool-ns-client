import { faCalendarWeek, faChartSimple, faCalendar, faListUl } from "@fortawesome/pro-light-svg-icons";
import { useParams } from "@remix-run/react";
import { useMemo } from "react";
import invariant from "tiny-invariant";

export const useLinks = () => {

    const {resourceId} = useParams();
    invariant(resourceId);

    const links = useMemo(() => {
        return [
            {
                to: `/app/resources/${resourceId}`,
                icon: faChartSimple,
                title: "Overblik",
                root: true
            },
            {
                to: `/app/resources/${resourceId}/calendar`,
                icon: faCalendar,
                title: "Kalender",
            },
            {
                to: `/app/resources/${resourceId}/tasks`,
                icon: faListUl,
                title: "Opgaver",
            }
        ]
    },[resourceId])

    return links;

}
