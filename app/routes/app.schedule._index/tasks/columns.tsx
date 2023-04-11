import { Box, Paper, Stack, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid-pro";
import { ITask } from "~/src";
import { Avatars } from "~/src/design-system";
import { formatDecimal } from "~/util/format";
import { useSummary } from "../_state";
import { useMemo } from "react";
import _ from "lodash";

export const useColumns = () => {
    const {workpackages} = useSummary()

    const columns = useMemo(() => {
        const cols: GridColDef<ITask>[] = [
         
            {
                field: "color",
                headerName: "",
                width: 25,
                align: "center",
                renderCell: (props) => (
                    <Box
                        component={Paper}
                        width={15}
                        height={15}
                        borderRadius={1}
                        sx={{
                            backgroundColor: _.find(workpackages, d => d.id === props.row.workpackage.id)?.color ?? "grey.500"
                        }}
                    />
                )
            },
            ...staticColumns
           
        ]

        return cols;
    }, [workpackages])
    return columns;

}


const staticColumns: GridColDef<ITask>[] = [
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
        valueGetter: (props) => props.row.display.period.end,
        headerAlign: "center",
        align: "center"
    },
    {
        field: "display.period.end",
        headerName: "Slutdato",
        valueGetter: (props) => props.row.display.period.start,
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
];
