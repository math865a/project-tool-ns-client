import { GridColDef } from "@mui/x-data-grid-pro";
import { ITask } from "~/src";
import { Avatars } from "~/src/design-system";
import { formatDecimal } from "~/util/format";
import { StageCell } from "./Cell.Stage";
import {DateTime as dt} from "luxon"

export const columns: GridColDef<ITask>[] = [
    {
        field: "workpackage.systematicName",
        headerName: "Arbejdspakke",
        valueGetter: (props) => props.row.workpackage.systematicName,
        headerAlign: "center",
        width: 125
    },
    {
        field: "title",
        headerName: "Opgave",
        headerAlign: "center",
        flex: 1
    },
    {
        field: "display.period.start",
        headerName: "Startdato",
        valueGetter: (props) => dt.fromISO(props.row.start),
        valueFormatter: (props) => props.value.toFormat("dd-MM-yyyy"),
        headerAlign: "center",
        align: "center"
    },
    {
        field: "display.period.end",
        headerName: "Slutdato",
        valueGetter: (props) => dt.fromISO(props.row.end),
        valueFormatter: (props) => props.value.toFormat("dd-MM-yyyy"),
        headerAlign: "center",
        align: "center"
    },
    {
        field: "work",
        headerName: "Timer",
        valueGetter: (props) => props.row.work,
        valueFormatter: (props) => formatDecimal(props.value),
        headerAlign: "center",
        maxWidth: 65,
        align: "center"
    },
    {
        field: "display.workDays",
        headerName: "Dage",
        valueGetter: (props) => props.row.workDays,
        headerAlign: "center",
        align: "center",
        maxWidth: 65
    },
    {
        field: "dailyWork",
        headerName: "Timer/dag",
        valueGetter: (props) => props.row.dailyWork,
        valueFormatter: (props) => formatDecimal(props.value),
        headerAlign: "center",
        maxWidth: 75,
        align: "center"
    },
    {
        field: "projectManager",
        headerName: "PL",
        renderCell: (props) => (
            <Avatars.Individual subject={props.row.projectManager} size={25} />
        ),
        headerAlign: "center",
        align: "center",
        maxWidth: 65
    },
    {
        field: "team",
        headerName: "Team",
        renderCell: (props) => (
            <Avatars.EllipsisGroup People={props.row.team} size={25} />
        ),
        headerAlign: "center",
        align: "center",
        minWidth: 125
    },
    {
        field: "stage",
        headerName: "Status",
        maxWidth: 75,
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
        headerName: "Booking",
        maxWidth: 75,
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
