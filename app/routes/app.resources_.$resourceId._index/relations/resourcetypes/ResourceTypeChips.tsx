import { Box, Stack, Typography } from "@mui/material";
import { useRouteLoaderData } from "@remix-run/react";
import { ResourceProfile } from "~/src";
import { ResourceTypeChip } from "./ResourceTypeChip";

export function ResourceTypeChips({disabled}: {disabled?: boolean}) {

    const {resourcetypes} = useRouteLoaderData(
        "routes/app.resources_.$resourceId"
    ) as ResourceProfile;

    return (
        <Box width="100%" maxWidth="100%" overflow="hidden" pt={0.5} pl={0.5}>
            {resourcetypes.length === 0 ? (
                <Typography color="text.secondary" fontSize={12}>
                    Der er ingen ressourcetyper tilknyttet
                </Typography>
            ) : (
                <Stack
                    direction="row"
                    maxWidth="100%"
                    flexWrap="wrap"
                    justifyContent="flex-start"
                >
                    {resourcetypes.map((s) => (
                        <Box width="min-width" m={0.75} key={s.id}>
                            <ResourceTypeChip resourceType={s} disabled={disabled} />
                        </Box>
                    ))}
                </Stack>
            )}
        </Box>
    );
}
