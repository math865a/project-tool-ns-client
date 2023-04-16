import { Box } from "@mui/material";
import { Grid, Page } from "~/src/design-system";
import { gridStyles } from "./definitions";
import { useColumns } from "./hooks/useColumns";
import { useRowState } from "./hooks/useRowState";
import { useTransport } from "./hooks/useTransport";

export default function GridSection() {
    const transport = useTransport();
    const rowState = useRowState(transport);
    const columns = useColumns(rowState);

    return (
        <Page.SubLayout>
            <Box flexGrow={1} height={"78vh"} maxHeight={"78vh"}>
                <Grid.View
                    columns={columns}
                    rows={rowState.rows}
                    getRowId={(d) => d.uid}
                    getRowUrl={(id) => `/app/administration/users/${id}`}
                    rowHeight={55}
                    sx={gridStyles}
                    columnHeaderHeight={40}
                    rowModesModel={rowState.rowModesModel}
                    onRowModesModelChange={rowState.handleRowModesModelChange}
                    onRowEditStart={rowState.handleRowEditStart}
                    onRowEditStop={rowState.handleRowEditStop}
                    processRowUpdate={rowState.processRowUpdate}
                    editMode="row"
                    hideFooter={false}
                    pagination
                    autoPageSize
                    initialState={{
                        sorting: {
                            sortModel: [
                                {
                                    field: "name",
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
