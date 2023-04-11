import {
    DndContext,
    MouseSensor,
    MouseSensorOptions,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { Assignment } from "gantt-models";
import { observer } from "mobx-react-lite";
import { ReactNode } from "react";
import { restrictToTask, syncDrag } from "./modifiers";

export const AllocationDndProvider = observer(
    ({
        children,
        Assignment,
    }: {
        children: ReactNode;
        Assignment: Assignment;
    }) => {
        const sensor = useSensor<MouseSensorOptions>(MouseSensor, {
            activationConstraint: {
                distance: 15,
            },
        });

        const sensors = useSensors(sensor);
        return (
            <DndContext
                onDragEnd={Assignment.onDragEnd}
                autoScroll={false}
                sensors={sensors}
                modifiers={[restrictToTask, syncDrag]}
            >
                {children}
            </DndContext>
        );
    }
);
