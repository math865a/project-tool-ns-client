import { faCalendarWeek, faChartSimple, faCalendar, faListUl } from "@fortawesome/pro-light-svg-icons";

export const links = [
    {
        to: "/app/schedule",
        icon: faCalendarWeek,
        title: "Opsummering",
        subtitle: "Denne og næste uge",
        root: true
    },
    {
        to: "/app/schedule/dashboard",
        icon: faChartSimple,
        title: "Dashboard",
    },
    {
        to: "/app/schedule/calendar",
        icon: faCalendar,
        title: "Kalender",
    },
    {
        to: "/app/schedule/tasks",
        icon: faListUl,
        title: "Opgaver",
        
    },
];