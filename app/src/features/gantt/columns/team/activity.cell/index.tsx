import {
    Button,
    ButtonBase
} from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid-pro";
import { Activity } from "gantt-models";
import { observer } from "mobx-react-lite";
import { useWorkpackage } from "useWorkpackage";
import { Action, Subject } from "~/src/_definitions";
import { Can } from "~/src/session-user";
import { ROW_HEIGHT } from "gantt/constants";
import { Content } from "./Content";
export const ActivityTeamCell = observer((props: GridRenderCellParams<Activity>) => {
    const { Gantt } = useWorkpackage();
    if (props.row.kind === "Delivery") return null;

    return (
        <Can I={Action.Write} a={Subject.Workpackages} passThrough>
            {(allowed) =>
                allowed ? (
                    <ButtonBase
                        fullWidth
                        component={Button}
                        sx={{
                            height: ROW_HEIGHT,
                        }}
                        onClick={(event) =>
                            Gantt.TeamMenu.handleOpen(event, props.row)
                        }
                    >
                        <Content Activity={props.row} allowed={allowed} />
                    </ButtonBase>
                ) : (
                    <Content Activity={props.row} allowed={allowed} />
                )
            }
        </Can>
    );
});



