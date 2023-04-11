import { Box, Chip, Stack, useTheme } from "@mui/material";
import { useLoaderData, useRouteLoaderData } from "@remix-run/react";
import { Details, Symbol } from "~/src/design-system";
import { faCheck, faTimes } from "@fortawesome/pro-solid-svg-icons";
import { ResourceProfile } from "~/src";

export function Tags() {
    const {
        node: { isProjectManager, isUser },
    } = useRouteLoaderData(
        "routes/app.resources_.$resourceId"
    ) as ResourceProfile;

    const theme = useTheme();

    return (
        <Details.Item
            title="Tags"
            value={
                <Stack direction="row" alignItems="center" spacing={2} pt={1} pl={1.25}>
                    <Chip
                        label="Ressource"
                        icon={
                            <Box pl={1} pt={0.25}>
                                <Symbol
                                    size={0.9}
                                    icon={faCheck}
                                    color={theme.palette.success.main}
                                />
                            </Box>
                        }
                        sx={{
                            borderRadius: 2,
                            fontSize: 12,
                      
                        }}
                        variant="outlined"
                    />
                    <Chip
                        label="Projektleder"
                        icon={
                            <Box pl={1} pt={0.25}>
                                <Symbol
                                    size={0.9}
                                    icon={isProjectManager ? faCheck : faTimes}
                                    color={
                                        isProjectManager
                                            ? theme.palette.success.main
                                            : theme.palette.error.main
                                    }
                                />
                            </Box>
                        }
                        sx={{
                            borderRadius: 2,
                            fontSize: 12,
                        }}
                        variant="outlined"
                    />
                    <Chip
                        label="Bruger"
                        icon={
                            <Box pl={1} pt={0.25}>
                                <Symbol
                                    size={0.9}
                                    icon={isUser ? faCheck : faTimes}
                                    color={
                                        isUser
                                            ? theme.palette.success.main
                                            : theme.palette.error.main
                                    }
                                />
                            </Box>
                        }
                        sx={{
                            borderRadius: 2,
                            fontSize: 12,
                        }}
                        variant="outlined"
                    />
                </Stack>
            }
        />
    );
}
