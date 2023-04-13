import { Box, Paper, Stack, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid-pro";
import { ITask } from "~/src";
import { Avatars } from "~/src/design-system";
import { formatDecimal } from "~/util/format";
import { useSummary } from "../_state";
import { useMemo } from "react";
import _ from "lodash";
import { DateTime as dt, Duration as dur } from "luxon";
import { getDateTime } from "~/util";

export const useColumns = () => {
    const { workpackages } = useSummary();

    const columns = useMemo(() => {
        const cols: GridColDef<ITask>[] = [
            {
                field: "color",
                headerName: "",
                width: 25,
                align: "center",
                hideable: false,
                sortable: false,
                filterable: false,
                disableColumnMenu: true,
                disableReorder: true,
                renderCell: (props) => (
                    <Box
                        component={Paper}
                        width={15}
                        height={15}
                        borderRadius={1}
                        sx={{
                            backgroundColor:
                                _.find(
                                    workpackages,
                                    (d) => d.id === props.row.workpackage.id
                                )?.color ?? "grey.500",
                        }}
                    />
                ),
            },
            ...staticColumns,
        ];

        return cols;
    }, [workpackages]);
    return columns;
};

const staticColumns: GridColDef<ITask>[] = [
    {
        field: "workpackage.systematicName",
        headerName: "Arbejdspakke",
        valueGetter: (props) => props.row.workpackage.systematicName,
        headerAlign: "center",
        align: "center",
        minWidth: 125
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
        valueGetter: (props) => getDateTime(props.row.start).toMillis(),
        valueFormatter: (props) =>
        _.capitalize(dt.fromMillis(props.value).setLocale("da").toFormat("ccc dd-MM-yy")),
        headerAlign: "center",

    },
    {
        field: "display.period.end",
        headerName: "Slutdato",
        valueGetter: (props) => getDateTime(props.row.end).toMillis(),
        valueFormatter: (props) =>
            _.capitalize(dt.fromMillis(props.value).setLocale("da").toFormat("ccc dd-MM-yy")),
        headerAlign: "center",

    },
    {
        field: "display.workDays",
        headerName: "Dage",
        valueGetter: (props) => props.row.workDays,
        headerAlign: "center",
        align: "center",
        minWidth: 75,
    },

    {
        field: "dailyWork",
        headerName: "Timer/dag",
        valueGetter: (props) => props.row.dailyWork,
        valueFormatter: (props) => formatDecimal(props.value),
        headerAlign: "center",
        minWidth: 75,
        align: "center",
    },
    {
        field: "projectManager",
        headerName: "PL",
        valueGetter: props => props.row.projectManager.name,
        renderCell: (props) => (
            <Avatars.Individual subject={props.row.projectManager} size={25} />
        ),
        headerAlign: "center",
        align: "center",
        minWidth: 75,
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
        minWidth: 150,
    },
];
