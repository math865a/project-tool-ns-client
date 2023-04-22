import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Activity } from "gantt-models";
import { observer } from "mobx-react-lite";
import { Action, Subject } from "~/src/_definitions";
import { Can } from "~/src/session-user";
import { BarVariant } from "./variants";

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

    return (
        <div
            ref={setNodeRef}
            style={{
                position: "absolute",
                height: B.iRect.h,
                top: B.iRect.y,
                left: B.iRect.x1,
                width: B.rect.w,
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
                    style={Activity.Style.moveActivatorStyles}
                />

                <div
                    {...attributes}
                    {...listeners}
                    className="resize-start"
                    ref={setActivatorNodeRef}
                    style={Activity.Style.resizeStartActivatorStyles}
                />
                <div
                    {...attributes}
                    {...listeners}
                    className="resize-end"
                    ref={setActivatorNodeRef}
                    style={Activity.Style.resizeEndActivatorStyles}
                />
            </Can>
            <BarVariant Activity={Activity} />
        </div>
    );
});
