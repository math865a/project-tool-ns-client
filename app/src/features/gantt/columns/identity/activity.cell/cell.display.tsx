import { Typography } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid-pro";
import { observer } from "mobx-react-lite";
import { Can } from "~/src/session-user";
import { Action, Subject } from "~/src/_definitions";
import { Activity } from "gantt-models";

export const ActivityIdentityCellDisplay = observer(
    ({
        row: Activity,
        startEditing,
    }: GridRenderCellParams<Activity> & {
        startEditing: () => void;
    }) => {
        return (
            <Can I={Action.Write} a={Subject.Workpackages} passThrough>
                {(allowed) => (
                    <Typography
                        fontSize={12}
                        pl={1}
                        onDoubleClick={allowed ? startEditing : undefined}
                        sx={{
                            color: Activity.textColor
                        }}
                    >
                        {Activity.name}
                    </Typography>
                )}
            </Can>
        );
    }
);
