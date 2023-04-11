import { Box } from "@mui/material";
import { useLoaderData } from "@remix-run/react";
import { Grid, Page } from "~/src/design-system";
import { ProjectManagerLoader } from "./route";
import { columns } from "./workpackages/columns";

export default function WorkpackagesSection() {
    const {workpackages} = useLoaderData<ProjectManagerLoader>()

    return (
        <Page.Section xs={12} title="Arbejdspakker">
            <Box flexGrow={1} >
                <Grid.View
                    columns={columns}
                    rows={workpackages}
                    getRowId={(row) => row.id}
                    getRowUrl={(id) => `${id}`}
                    autoHeight
                />
            </Box>
        </Page.Section>
    );
}
