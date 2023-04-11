import { BookingStageNode } from "@math865a/project-tool.types";
import { Chip } from "@mui/material";
import { computed } from "mobx";
import { observer } from "mobx-react-lite";
import { useBoard } from "../../../_provider";

export const BookingStageChip = observer(
    ({ node }: { node: BookingStageNode }) => {
        const BookingStageFilter = useBoard().Filter.BookingStageFilter;

        const isSelected = computed(() => {
            return BookingStageFilter.filterState.includes(node.name);
        });

        const hoverProps = computed(() => {
            return isSelected.get()
                ? {
                      backgroundColor: node.color + "21",
                      cursor: "pointer",
                  }
                : {
                      borderColor: node.color + "90",
                      backgroundColor: "transparent",
                      cursor: "pointer",
                  };
        });

        return (
            <Chip
                label={node.name}
                sx={{
                    transition: "all 200ms ease",
                    borderRadius: 2,
                    fontSize: 13,
                    backgroundColor: isSelected.get()
                        ? node.color + "40"
                        : "transparent",
                    color: "text.secondary",
                    borderColor: "transparent",
                    "&:hover": hoverProps.get(),
                }}
                clickable={false}
                variant="outlined"
                onClick={() => BookingStageFilter.toggleStage(node.name)}
            />
        );
    }
);
