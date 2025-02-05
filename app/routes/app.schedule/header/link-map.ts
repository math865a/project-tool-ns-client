import { IconCalendarWeek, IconChartArea, IconList } from "@tabler/icons-react";

export const links = [
    {
        to: "/app/schedule",
        icon: IconCalendarWeek,
        title: "Opsummering",
        subtitle: "Denne og næste uge",
        root: true,
    },
    {
        to: "/app/schedule/dashboard",
        icon: IconChartArea,
        title: "Dashboard",
    },
    {
        to: "/app/schedule/tasks",
        icon: IconList,
        title: "Opgaver",
    },
];
