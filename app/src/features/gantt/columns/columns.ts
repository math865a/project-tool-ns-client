import { GridColDef } from "@mui/x-data-grid-pro";
import { durationColumn } from "./duration";
import { identityColumn } from "./identity";
import { periodColumn } from "./period";
import { sequenceColumn } from "./sequence";
import { teamColumn } from "./team";
import { timelineColumn } from "./timeline";
import { wbsColumn } from "./wbs";
import { workColumn } from "./work/definition";
import { Activity, Assignment } from "gantt-models";
export const ganttColumns: GridColDef<Activity | Assignment>[] = [
    sequenceColumn,
    wbsColumn,
    identityColumn,
    periodColumn,
    durationColumn,
    workColumn,
    teamColumn,
    timelineColumn,
];
