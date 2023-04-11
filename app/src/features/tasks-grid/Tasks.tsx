import { Box, Divider } from "@mui/material";
import { Fallback, Grid, Page } from "~/src/design-system";
import PeriodAction from "./PeriodAction";
import { columns } from "./columns";
import { useTasks } from "./useTasks";

export function Tasks({ resourceId }: { resourceId: string }) {
    const { tasks, updatePeriod, loadingState, period } = useTasks(resourceId);

    return (
        <Page.SubLayout>
            <Divider />
            <Box flexGrow={1} pt={4} height={"80vh"}>
                <Grid.View
                    rows={tasks}
                    columns={columns}
                    getRowId={(row) => row.id}
                    loading={loadingState === "loading"}
                    slots={{
                        toolbar: PeriodAction,
                        noRowsOverlay: Grid.NoRowsOverlay,
                        loadingOverlay: Fallback.SectionLoading
                    }}
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
            </Box>
        </Page.SubLayout>
    );
}
