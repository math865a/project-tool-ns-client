import { AppBar, Toolbar, Box, Stack, Divider } from "@mui/material";
import { useMemo } from "react";

import { Can, Favorites, Feedback, usePermissions } from "~/src/session-user";
import { Action as A, Subject } from "~/src/_definitions";
import BackAction from "./BackAction";
import QuickCreate from "./QuickCreate";
import SessionUserMenu from "./SessionUserMenu";
import { useBackAction } from "./useBackAction";

export default function Topbar({ drawerWidth }: { drawerWidth: number }) {
    const CustomBackAction = useBackAction();
    const Permissions = usePermissions();

    const showQuickCreate = useMemo(() => {
        return (
            Permissions.can(A.Write, Subject.Resources) ||
            Permissions.can(A.Write, Subject.Workpackages)
        );
    }, [Permissions]);

    const showFavorites = useMemo(() => {
        return (
            Permissions.can(A.Read, Subject.Resources) ||
            Permissions.can(A.Read, Subject.ResourceTypes) ||
            Permissions.can(A.Read, Subject.Workpackages)
        );
    }, [Permissions]);

    return (
        <AppBar
            sx={{
                width: `calc(100% - ${drawerWidth}px)`,
                ml: `${drawerWidth}px`,
                backgroundColor: (theme) => "#ffffff", //theme.palette.background.paper,
                borderLeft: "none",
                color: (theme) => theme.palette.text.primary,
                borderRight: "none",
                borderTop: "none",
            }}
            variant="outlined"
            elevation={0}
        >
            <Toolbar>
                <Box width="33%">{CustomBackAction || <BackAction />}</Box>
                <Box width="33%">{/*<Search />*/}</Box>
                <Box
                    width="33%"
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-end"
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={3}
                        sx={{ mr: 2 }}
                    >
                        <Feedback />
                        <Box height={25}>
                            <Divider orientation="vertical" />
                        </Box>
                        {(showFavorites || showQuickCreate) && (
                            <>
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={1}
                                >
                                    {showFavorites && <Favorites />}
                                    {showQuickCreate && <QuickCreate />}
                                </Stack>

                                <Box height={25}>
                                    <Divider orientation="vertical" />
                                </Box>
                            </>
                        )}

                        <SessionUserMenu />
                    </Stack>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
