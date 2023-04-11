import { Box } from "@mui/material";
import { Grid, Page, View } from "~/src/design-system";
import { useSummary } from "./_state";
import { useColumns } from "./tasks/columns";


export default function TasksSection(){

    const {tasks} = useSummary()

    const columns = useColumns()

    return(
        <Page.Section title="Tasks" xs={8}>
            <Box flexGrow={1} >
                <Grid.View 
                    rows={tasks}
                    columns={columns}
                    getRowId={d => d.id}
                    autoHeight
                    hideToolbar
                />
            </Box>
        </Page.Section>
    )

}