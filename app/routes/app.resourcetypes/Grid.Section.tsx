import { Box } from "@mui/material";
import { Grid, Page } from "~/src/design-system";
import { columns } from "./grid";
import { useLoaderData } from "@remix-run/react";
import { ResourceTypesLoader } from "./route";

export default function GridSection() {
    const data = useLoaderData<ResourceTypesLoader>();

    return (
        <Page.SubLayout>
            <Box flexGrow={1} height={"78vh"} maxHeight={"78vh"}>
                <Grid.View
                    columns={columns}
                    rows={data}
                    getRowId={(d) => d.node.id}
                    getRowUrl={(id) => `${id}`}
                    initialState={{
                        sorting: {
                            sortModel: [
                                {
                                    field: "typeNo",
                                    sort: "asc",
                                },
                            ],
                        },
                    }}
                />
            </Box>
        </Page.SubLayout>
    );
}
