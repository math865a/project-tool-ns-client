import { useDraggable } from "@dnd-kit/core";
import { computed } from "mobx";
import { observer } from "mobx-react-lite";
import { Activity } from "gantt-models";
import { CSS } from "@dnd-kit/utilities";
import { CSSProperties } from "react";
import { BarVariant } from "./variants";
import { Can } from "~/src/session-user";
import { Action, Subject } from "~/src/_definitions";

export const Bar = observer(({ Activity }: { Activity: Activity }) => {
    const B = Activity.Bar;
    const { setNodeRef, listeners, attributes, setActivatorNodeRef } =
        useDraggable({
            id: `draggable-${Activity.id}`,
            data: {
                Bar: Activity.Bar,
                type: "move",
            },
        });

    const barStyles = computed(() => {
        return {
            position: "absolute",
            height: B.h,
            top: B.y,
            left: B.p0.x1,
            width: B.coord.w,
            transform: CSS.Transform.toString(B.transform),
            opacity: B.opacity,
        } as CSSProperties;
    });

    return (
        <div
            ref={setNodeRef}
            style={{
                position: "absolute",
                height: B.h,
                top: B.y,
                left: B.p0.x1,
                width: B.coord.w,
                transform: CSS.Transform.toString(B.transform),
                opacity: B.opacity,
            }}
        >
            <Can I={Action.Write} a={Subject.Workpackages}>
                <div
                    {...attributes}
                    {...listeners}
                    className="move"
                    ref={setActivatorNodeRef}
                    style={B.ActivatorStyle.moveActivatorStyles}
                />

                <div
                    {...attributes}
                    {...listeners}
                    className="resize-start"
                    ref={setActivatorNodeRef}
                    style={B.ActivatorStyle.resizeStartActivatorStyles}
                />
                <div
                    {...attributes}
                    {...listeners}
                    className="resize-end"
                    ref={setActivatorNodeRef}
                    style={B.ActivatorStyle.resizeEndActivatorStyles}
                />
            </Can>
            <BarVariant Activity={Activity} />
        </div>
    );
});
