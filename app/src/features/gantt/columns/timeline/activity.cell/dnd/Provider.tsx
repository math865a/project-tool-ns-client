import {
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import { observer } from "mobx-react-lite";
import { ReactNode } from "react";
import { useWorkpackage } from "useWorkpackage";
import { barSync, boundarySensor, restrictToRow } from "./modifiers";

export const ActivityDndProvider = observer((props: { children: ReactNode }) => {
    const { Gantt } = useWorkpackage();

    const sensors = useSensors(useSensor(PointerSensor));

    return (
        <DndContext
            onDragStart={Gantt.Timeline.TimelineEvent.onDragStart}
            onDragMove={Gantt.Timeline.TimelineEvent.onDragMove}
            onDragEnd={Gantt.Timeline.TimelineEvent.onDragEnd}
            sensors={sensors}
            modifiers={[
                restrictToHorizontalAxis,
                restrictToRow,
                barSync,
                boundarySensor,
            ]}
            autoScroll={false}
        >
            {props.children}
        </DndContext>
    );
});


