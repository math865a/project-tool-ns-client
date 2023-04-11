import { disableInteraction } from  "~/styles";
import {
    Chip
} from "@mui/material";
import { useMemo } from "react";
import { IRenderStageChipsProps } from "./StageChips";
import { Stage } from "~/src/_definitions";

export function StageChip({
    stage,
    update,
    state,
    disabled
}: Omit<IRenderStageChipsProps, "options"> & {
    stage: Stage;
    disabled?: boolean
}) {
    const isActive = useMemo(
        () => state?.id === stage.id,
        [state?.id, stage.id]
    );

    const hoverProps = useMemo(() => {
        if (disabled) return {}
        return isActive
            ? {
                  backgroundColor: stage.color + "21",

                  //borderColor: stage.color + "90",
              }
            : {
                  borderColor: stage.color + "90",
                  backgroundColor: "transparent",
                  cursor: "pointer",
              };
    }, [isActive, stage.color]);

    return (
        <Chip
            label={stage.name}
            style={disabled ? disableInteraction as React.CSSProperties : {}}
            sx={{
                transition: "all 200ms ease",
                borderRadius: 2,
                fontSize: 13,
                backgroundColor: isActive ? stage.color + "60" : "transparent",
                color: "text.secondary",
                borderColor: "transparent",
                "&:hover": hoverProps,
            }}
            clickable={false}
            variant="outlined"
            onClick={() => !disabled && update(stage)}
        />
    );
}
