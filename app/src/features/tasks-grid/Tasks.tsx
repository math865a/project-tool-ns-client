import { Box, Divider } from "@mui/material";
import { Fallback, Grid, Page } from "~/src/design-system";
import PeriodAction from "./PeriodAction";
import { columns } from "./columns";
import { useTasks } from "./useTasks";
import { gridStyles } from "./gridStyles";
import { DateTime as dt } from "luxon";
export function Tasks({
    resourceId,
    initialPeriod,
    hideDatePicker,
}: {
    resourceId: string;
    initialPeriod?: { start: dt; end: dt };
    hideDatePicker?: boolean;
}) {
    const { tasks, updatePeriod, loadingState, period } = useTasks(
        resourceId,
        initialPeriod
    );

    return (
        <Grid.View
            rows={tasks}
            columns={columns}
            getRowId={(row) => row.id}
            loading={loadingState === "loading"}
            rowHeight={50}
            slots={{
                toolbar: hideDatePicker ? undefined : PeriodAction,
                noRowsOverlay: Grid.NoRowsOverlay,
                loadingOverlay: Fallback.SectionLoading,
            }}
            sx={gridStyles}
            slotProps={{
                toolbar: {
                    updatePeriod,
                    period,
                },
                noRowsOverlay: {
                    text: "Du har ingen opgaver i den valgte periode",
                } as any,
            }}
        />
    );
}
