import { Box } from "@mui/material";
import { useLoaderData } from "@remix-run/react";
import { Grid, Page } from "~/src/design-system";
import { columns } from "./grid"
import { ProjectManagersLoader, loader } from "./route";

export default function GridSection() {
    const data = useLoaderData<ProjectManagersLoader>();

    return (
        <Page.SubLayout>
            <Box flexGrow={1} height={"78vh"} maxHeight={"78vh"}>
                <Grid.View
                    columns={columns}
                    rows={data}
                    getRowId={(d) => d.id}
                    getRowUrl={(id) => `${id}`}
                />
            </Box>
        </Page.SubLayout>
    );
}
