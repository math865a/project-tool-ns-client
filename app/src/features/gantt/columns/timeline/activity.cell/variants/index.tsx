import { Box } from "@mui/material";
import { computed } from "mobx";
import { observer } from "mobx-react-lite";
import { Activity } from "gantt-models";
import { DeliveryBar } from "./DeliveryBar";
import { TaskBar } from "./TaskBar";

export const BarVariant = observer(({ Activity }: { Activity: Activity }) => {
    const Variant = computed(() => {
        if (Activity.kind === "Task") return <TaskBar Activity={Activity} />;
        if (Activity.kind === "Delivery")
            return <DeliveryBar Activity={Activity} />;
        return null;
    });

    return (
        <Box
            width={Activity.Bar.coord.w}
            height={Activity.Bar.h}
            position="relative"
        >
            {Variant.get()}
        </Box>
    );
});
