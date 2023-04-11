import { DragOverlay } from "@dnd-kit/core";
import { observer } from "mobx-react-lite";
import { createPortal } from "react-dom";
import { Allocation } from "gantt-models";
import { overlayOffset } from "../../shared";
import  BarContent from "./BarContent";

export const Preview = observer(
    ({ Allocation }: { Allocation: Allocation }) => {
        return createPortal(
            <DragOverlay modifiers={[overlayOffset]} dropAnimation={null}>
                {Allocation.Bar.event === "move" ? (
                    <BarContent
                        Allocation={Allocation}
                        width={Allocation.Bar.w0}
                    />
                ) : null}
            </DragOverlay>,
            document.body
        );
    }
);
