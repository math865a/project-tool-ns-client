import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Box } from "@mui/material";
import { useNavigate } from "@remix-run/react";
import { Allocation } from "gantt-models";
import { observer } from "mobx-react-lite";
import { Action, Subject } from "~/src/_definitions";
import { Can } from "~/src/session-user";
import BarContent from "./BarContent";
import { DailyWorkWarning } from "./DailyWorkWarning";

const Bar = observer(({ Allocation }: { Allocation: Allocation }) => {
    const {
        setNodeRef: dragRef,
        attributes,
        listeners,
        isDragging,
        setActivatorNodeRef,
    } = useDraggable({
        id: `draggable-${Allocation.id}`,
        data: {
            Allocation: Allocation,
        },
    });

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`${Allocation.id}`);
    };

    return (
        <Can I={Action.Write} a={Subject.Workpackages} passThrough>
            {(allowed) => (
                <Box
                    ref={dragRef}
                    style={{
                        transform: CSS.Translate.toString(
                            Allocation.Bar.transform
                        ),
                    }}
                    onDoubleClick={handleClick}
                    sx={{
                        position: "absolute",
                        left: Allocation.Bar.iRect.x1,
                        top: Allocation.Bar.iRect.y,
                        opacity: isDragging ? 0.5 : 1,
                        height: Allocation.Bar.iRect.h,
                        width: Allocation.Bar.rect.w,
                        textDecoration: "none",
                        cursor: !allowed ? "pointer" : undefined,
                    }}
                    onMouseEnter={() =>
                        Allocation.Interaction.updateBarHovering(true)
                    }
                    onMouseLeave={() =>
                        Allocation.Interaction.updateBarHovering(false)
                    }
                >
                    <DailyWorkWarning
                        Allocation={Allocation}
                        isDragging={isDragging}
                    />

                    {allowed && (
                        <>
                            <div
                                {...attributes}
                                {...listeners}
                                ref={setActivatorNodeRef}
                                className="resize-start"
                                style={{
                                    cursor: "w-resize",
                                    position: "absolute",
                                    height: Allocation.Bar.iRect.h,
                                    width: Math.min(
                                        25,
                                        Allocation.Bar.rect.w / 3
                                    ),
                                    left: 0,
                                    zIndex: 401,
                                }}
                            />
                            <div
                                {...attributes}
                                {...listeners}
                                ref={setActivatorNodeRef}
                                className="move"
                                style={{
                                    backgroundColor: "transparent",
                                    position: "absolute",
                                    cursor:
                                        Allocation.Bar.Delta.event === "move"
                                            ? "grabbing"
                                            : Allocation.Bar.Delta.event
                                            ? "w-resize"
                                            : "pointer",
                                    left: 25,
                                    right: 25,
                                    height: Allocation.Bar.iRect.h,
                                    zIndex: 400,
                                }}
                            />

                            <div
                                {...attributes}
                                {...listeners}
                                ref={setActivatorNodeRef}
                                className="resize-end"
                                style={{
                                    cursor: "w-resize",
                                    position: "absolute",
                                    right: 0,
                                    height: Allocation.Bar.iRect.h,
                                    width: Math.min(
                                        25,
                                        Allocation.Bar.rect.w / 3
                                    ),
                                    zIndex: 401,
                                }}
                            />
                        </>
                    )}

                    <BarContent
                        Allocation={Allocation}
                        width={Allocation.Bar.rect.w}
                    />
                </Box>
            )}
        </Can>
    );
});

export default Bar;
