import { Box } from "@mui/material";
import { useLoaderData } from "@remix-run/react";
import { Grid, Page } from "~/src/design-system";
import { gridStyles } from "./definitions/gridStyles";
import { useColumns } from "./hooks/useColumns";
import { useRowState } from "./hooks/useRowState";
import { AccessGroupsLoader } from "./route";

export default function GridSection(rowState: ReturnType<typeof useRowState>) {
    const data = useLoaderData<AccessGroupsLoader>();

    const {
        rows,
        rowModesModel,
        handleRowModesModelChange,
        handleRowEditStart,
        handleRowEditStop,
        processRowUpdate,
    } = rowState;
    const columns = useColumns(rowState);

    return (
        <Page.SubLayout>
            <Box
                flexGrow={1}
                height={"78vh"}
                maxHeight={"78vh"}
                sx={{
                    "& .column-group-header": {
                        borderColor: "transparent",
                    },
                }}
            >
                <Grid.View
                    columns={columns}
                    rows={rows}
                    getRowId={(d) => d.id}
                    getRowUrl={(id) => id as string}
                    rowHeight={55}
                    sx={gridStyles}
                    columnHeaderHeight={40}
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStart={handleRowEditStart}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    editMode="row"
                    initialState={{
                        sorting: {
                            sortModel: [
                                {
                                    field: "userCount",
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
