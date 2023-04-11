import {
    Box, Stack,
    Tooltip,
    Typography
} from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid-pro";
import { Link } from "@remix-run/react";
import { observer } from "mobx-react-lite";

import { Avatars } from "~/src/design-system";
import { ROW_HEIGHT } from "../../_config/contants";
import { ResourceRow } from "../../_models";

const ResourceCell = observer(
    ({ row: Resource }: GridRenderCellParams<ResourceRow>) => {
        return (
            <Box
                display="flex"
                flexGrow={1}
                justifyContent="space-between"
                alignItems="center"
                height={ROW_HEIGHT}
                px={2}
                borderRight={(theme) => "1px solid " + theme.palette.divider}
            >
                <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Avatars.Individual subject={Resource} size={27.5} />

                    <Tooltip title="Gå til" placement="top-start">
                        <Typography
                            component={Link}
                            to={`/app/resources/${Resource.id}`}
                            color="text.primary"
                            prefetch="intent"
                            sx={{
                                textDecoration: "none",
                                "&:hover": {
                                    textDecoration: "underline",
                                },
                            }}
                            fontSize={13}
                            fontWeight={500}
                            lineHeight={1}
                        >
                            {Resource.name}
                        </Typography>
                    </Tooltip>
                </Stack>
            </Box>
        );
    }
);

export default ResourceCell;

/*<Typography
                            fontSize={13}
                            fontWeight={13}
                            style={disableInteraction as React.CSSProperties}
                            sx={{
                                color: (theme) => theme.palette.text.secondary,
                            }}
                        >
                            {Resource.ResourceTypes[0]?.name}
                        </Typography>*/
