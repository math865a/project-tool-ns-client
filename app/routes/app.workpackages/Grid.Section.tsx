import { Box } from "@mui/material";
import { useLoaderData } from "@remix-run/react";
import { Grid, Page } from "~/src/design-system";
import { columns } from "./grid-section/columns";
import { loader } from "./route";

export default function GridSection() {
    const data = useLoaderData<typeof loader>();

    return (
        <Page.SubLayout>
            <Box flexGrow={1} height={"82.5vh"} maxHeight={"82.5vh"}>
                <Grid.View
                    columns={columns}
                    rows={data}
                    getRowId={(row) => row.id}
                    getRowUrl={(id) => `${id}`}
                />
            </Box>
        </Page.SubLayout>
    );
}
