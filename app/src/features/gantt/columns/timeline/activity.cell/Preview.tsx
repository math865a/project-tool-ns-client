import { DragOverlay } from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import { Activity } from "gantt-models";
import { observer } from "mobx-react-lite";
import { createPortal } from "react-dom";
import { previewModifier, restrictToRow } from "./dnd";
import { BarVariant } from "./variants";
import { overlayOffset } from "../shared";
const Preview = observer(({ Activity }: { Activity: Activity }) => {
    return createPortal(
        <Content Activity={Activity} />,
        document.getElementById("timeline-body") ?? document.body
    );
});
export default Preview;
const Content = observer(({ Activity }: { Activity: Activity }) => {
    const row = document.getElementById(`activity-${Activity.id}`);

    if (!Activity.Bar.event || !row) return null;
    return (
        <DragOverlay
            dropAnimation={null}
            modifiers={[
                restrictToRow,
                restrictToHorizontalAxis,
                previewModifier,
                overlayOffset,
            ]}
            zIndex={5000}
        >
            <div
                style={{
                    opacity: Activity.Bar.event === "move" ? 1 : 0,
                    cursor: Activity.Bar.ActivatorStyle.dragActivatorCursor,
                }}
            >
                <BarVariant Activity={Activity} />
            </div>
        </DragOverlay>
    );
});
