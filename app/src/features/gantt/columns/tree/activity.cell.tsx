import {
    faChevronDown as lightDown,
    faChevronRight as lightUp,
} from "@fortawesome/pro-light-svg-icons";
import {
    faChevronRight as solidDown,
    faChevronDown as solidUp,
} from "@fortawesome/pro-solid-svg-icons";
import { ButtonProps } from "@mui/material";
import { GridRenderCellParams, useGridApiContext } from "@mui/x-data-grid-pro";
import { Action } from "design";
import { Activity, Assignment } from "gantt-models";
import { computed } from "mobx";
import { observer } from "mobx-react-lite";
import { useWorkpackage } from "useWorkpackage";

export const ActivityTreeCell = observer(
    (props: GridRenderCellParams<Activity | Assignment>) => {
        const { id, field, rowNode } = props;
        const apiRef = useGridApiContext();

        const { Gantt } = useWorkpackage();

        const handleClick: ButtonProps["onClick"] = (event) => {
            event.stopPropagation();
            handleTreeToggle();
        };

        const handleTreeToggle = () => {
            if (rowNode.type !== "group" || props.row.kind === "Assignment")
                return;
            apiRef.current.setRowChildrenExpansion(
                id,
                !rowNode.childrenExpanded
            );
            apiRef.current.setCellFocus(id, field);
            props.row.Row.updateExpanded = !props.row.Row.isExpanded;
        };

        const isActionVisible = computed(() => {
            return props.row.kind === "Assignment"
                ? false
                : props.row.children.length > 0;
        });

        /*
    useLayoutEffect(() => {
        if (Gantt.ActivityStore.Deliveries.length < 5 && props.row.kind === "Delivery"){
            apiRef.current.setRowChildrenExpansion(id, true);
        }
    },[])*/

        const icon = computed(() => {
            if (rowNode.type !== "group") return undefined;
            if (props.row.kind === "Task") {
                return rowNode.childrenExpanded ? lightDown : lightUp;
            } else {
                return rowNode.childrenExpanded ? solidUp : solidDown;
            }
        });

        return (
            <>
                {isActionVisible.get() && (
                    <Action.Symbol
                        sx={{ ml: rowNode.depth * 1.5 + 1 }}
                        size="small"
                        icon={icon.get()}
                        onClick={handleClick}
                    />
                )}
            </>
        );
    }
);
