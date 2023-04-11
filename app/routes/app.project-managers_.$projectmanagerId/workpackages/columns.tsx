import { GridColDef } from "@mui/x-data-grid-pro";
import { DateTime as dt, Interval as int } from "luxon";
import { Avatars, Grid } from "~/src/design-system";
import { getWorkDays } from "~/util/time";
import { StageCell } from "./Cell.Stage";
import { ViewRow } from "./types";
export const columns: GridColDef<ViewRow>[] = [
    {
        field: "linkCell",
        headerName: "",
        width: 50,
        align: "center",
        renderCell: (props) => (
            <Grid.LinkCell
                to={`/app/workpackages/${props.row.id}`}
                id={props.row.id}
            />
        ),
    },
    {
        field: "systematicName",
        headerName: "Systematisk Navn",
        headerAlign: "center",
        width: 150,
        valueGetter: (props) => props.row.systematicName,
        renderCell: Grid.renderCellExpand,
    },
    {
        field: "name",
        headerName: "Navn",
        headerAlign: "center",
        width: 250,
        flex: 1,
        valueGetter: (props) => props.row.name,
        renderCell: Grid.renderCellExpand,
    },
    {
        field: "stage",
        headerName: "Stadie",
        headerAlign: "center",
        align: "center",
        width: 125,
        valueGetter: (props) => props.row.stage.name,
        renderCell: (props) => (
            <StageCell
                label={props.row.stage.name}
                color={props.row.stage.color}
            />
        ),
    },
    {
        field: "bookingStage",
        headerName: "Bookingtype",
        headerAlign: "center",
        align: "center",
        width: 100,
        valueGetter: (props) => props.row.bookingStage.name,
        renderCell: (props) => (
            <StageCell
                label={props.row.bookingStage.name}
                color={props.row.bookingStage.color}
            />
        ),
    },
    {
        field: "team",
        headerName: "Team",
        headerAlign: "center",
        sortable: false,
        renderCell: (props) => (
            <Avatars.EllipsisGroup People={props.row.team} />
        ),
    },
    {
        field: "work",
        headerName: "Arbejde",
        align: "center",
        headerAlign: "center",
        valueGetter: (props) => props.row.work,
        valueFormatter: (props) => `${props.value} timer`,
    },
    {
        field: "startDate",
        headerName: "Startdato",
        align: "center",
        headerAlign: "center",
        valueGetter: (props) =>
            dt.fromISO(props.row.startDate).setZone("utc").toMillis(),
        valueFormatter: (props) =>
            dt.fromMillis(props.value).setLocale("da").toFormat("d/M/yy"),
        renderCell: Grid.renderCellExpand,
    },
    {
        field: "endDate",
        headerName: "Slutdato",
        align: "center",
        headerAlign: "center",
        valueGetter: (props) =>
            dt.fromISO(props.row.endDate).setZone("utc").toMillis(),
        valueFormatter: (props) =>
            dt.fromMillis(props.value).setLocale("da").toFormat("d/M/yy"),
        renderCell: Grid.renderCellExpand,
    },
    {
        field: "workdays",
        headerName: "Arb. dage",
        align: "center",
        headerAlign: "center",
        valueGetter: (props) =>
            getWorkDays(
                int.fromDateTimes(
                    dt.fromISO(props.row.startDate),
                    dt.fromISO(props.row.endDate)
                )
            ),
        valueFormatter: (props) => `${props.value} dage`,
        renderCell: Grid.renderCellExpand,
    },

    /*{
        field: "profit",
        headerName: "Dækning",
        align: "center",
        headerAlign: "center",
        valueGetter: (props) => props.row.profit,
    },
    {
        field: "coverage",
        headerName: "Dækninggrad",
        align: "center",
        headerAlign: "center",
        valueGetter: (props) => props.row.coverage,
    },
    {
        field: "tblCount",
        headerName: "Antal TBL",
        align: "center",
        headerAlign: "center",
        valueGetter: (props) => props.row.tblCount,
    },*/
];
