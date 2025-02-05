import { Box, Chip, Stack, useTheme } from "@mui/material";
import { useRouteLoaderData } from "@remix-run/react";
import { Details } from "~/src/design-system";
import { ResourceProfile } from "~/src";
import { IconCheck, IconX } from "@tabler/icons-react";
import { Symbol } from "@/src/design-system";

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
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    pt={1}
                    pl={1.25}
                >
                    <Chip
                        label="Ressource"
                        icon={
                            <Box pl={1} pt={0.25}>
                                <IconCheck color={theme.palette.success.main} />
                                <Symbol
                                    size={0.9}
                                    icon={IconCheck}
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
                                {isProjectManager ? (
                                    <IconCheck
                                        color={theme.palette.success.main}
                                    />
                                ) : (
                                    <IconX color={theme.palette.error.main} />
                                )}
                                {/*<Symbol
                                    size={0.9}
                                    icon={isProjectManager ? faCheck : faTimes}
                                    color={
                                        isProjectManager
                                            ? theme.palette.success.main
                                            : theme.palette.error.main
                                    }
                                />*/}
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
                                {isUser ? (
                                    <IconCheck
                                        color={theme.palette.success.main}
                                    />
                                ) : (
                                    <IconX color={theme.palette.error.main} />
                                )}
                                {/*   <Symbol
                                    size={0.9}
                                    icon={isUser ? faCheck : faTimes}
                                    color={
                                        isUser
                                            ? theme.palette.success.main
                                            : theme.palette.error.main
                                    }
                                />*/}
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
