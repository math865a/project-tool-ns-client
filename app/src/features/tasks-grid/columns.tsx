import { GridColDef } from "@mui/x-data-grid-pro";
import { ITask } from "~/src";
import { Avatars } from "~/src/design-system";
import { formatDecimal } from "~/util/format";
import { StageCell } from "./Cell.Stage";
import { DateTime as dt, Duration as dur } from "luxon";
import { DeadlineChip } from "./Deadline.Chip";

export const columns: GridColDef<ITask>[] = [
    {
        field: "workpackage.systematicName",
        headerName: "Arbejdspakke",
        valueGetter: (props) => props.row.workpackage.systematicName,
        headerAlign: "center",
        width: 125,
    },
    {
        field: "title",
        headerName: "Opgave",
        headerAlign: "center",
        flex: 1,
    },
    {
        field: "work",
        headerName: "Arbejde",
        valueGetter: (props) => props.row.work,
        valueFormatter: (props) => {
            const d = dur.fromObject({ hours: props.value });

            return d.shiftTo("hours", "minutes").toFormat("hh:mm");
        },
        maxWidth: 65,
        align: "center",
        headerAlign: "center",
    },
    {
        field: "display.period.start",
        headerName: "Startdato",
        valueGetter: (props) => dt.fromISO(props.row.start),
        valueFormatter: (props) =>
            (props.value as dt).setLocale("da").toFormat("dd/MM/yy"),
        headerAlign: "center",
        align: "center",
    },
    {
        field: "display.period.end",
        headerName: "Slutdato",
        valueGetter: (props) => dt.fromISO(props.row.end),
        valueFormatter: (props) =>
            (props.value as dt).setLocale("da").toFormat("dd/MM/yy"),
        headerAlign: "center",
        align: "center",
    },
    {
        field: "deadline",
        headerName: "Deadline",
        valueGetter: (props) =>
            dt.fromISO(props.row.end).diff(dt.now()).toMillis(),
        renderCell: (props) => <DeadlineChip task={props.row} />,
        width: 150,
        align: "center",
        headerAlign: "center",
    },
    {
        field: "display.workDays",
        headerName: "Arb. dage",
        valueGetter: (props) => props.row.workDays,
        headerAlign: "center",
        align: "center",
        maxWidth: 65,
    },

    {
        field: "dailyWork",
        headerName: "Daglig arb.",
        valueGetter: (props) => props.row.dailyWork,
        valueFormatter: (props) => {
            const d = dur.fromObject({ hours: props.value });

            return d.shiftTo("hours", "minutes").toFormat("hh:mm");
        },
        headerAlign: "center",
        maxWidth: 75,
        align: "center",
    },

    {
        field: "projectManager",
        headerName: "PL",
        valueGetter: (props) => props.row.projectManager.name,
        renderCell: (props) => (
            <Avatars.Individual subject={props.row.projectManager} size={25} />
        ),
        headerAlign: "center",
        align: "center",
        width: 75,
    },
    {
        field: "team",
        headerName: "Team",
        valueGetter: (props) => props.row.team.length,
        renderCell: (props) => (
            <Avatars.EllipsisGroup People={props.row.team} size={25} />
        ),
        headerAlign: "center",
        align: "center",
        width: 125,
    },
    {
        field: "stage",
        headerName: "Status",
        valueGetter: (props) => props.row.stage.name,
        renderCell: (props) => (
            <StageCell
                label={props.row.stage.name}
                color={props.row.stage.color}
            />
        ),
        headerAlign: "center",
        align: "center",
    },
    {
        field: "bookingStage",
        headerName: "Bookingstatus",
        valueGetter: (props) => props.row.bookingStage.name,
        renderCell: (props) => (
            <StageCell
                label={props.row.bookingStage.name}
                color={props.row.bookingStage.color}
            />
        ),
        headerAlign: "center",
        align: "center",
    },
];
