import { Box, Drawer } from "@mui/material";
import { Directory } from "~/src/design-system";
import Brand from "./Brand";
import SessionLinks from "./SessionLinks";
import { useLinks } from "./useLinks";

export default function Sidebar({ drawerWidth }: { drawerWidth: number }) {
    const links = useLinks()
    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    backgroundColor: (theme) => theme.palette.background.paper,
                },
            }}
            PaperProps={{
                variant: "outlined",
                elevation: 0,
                sx: {
                    backgroundColor: (theme) => theme.palette.background.paper,
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <Box flexGrow={1}>
                <Brand />
                <Box flexGrow={1} pt={2}>
                <Directory.PageLinks links={links} orientation="column" />
                </Box>
            </Box>
            <SessionLinks/>

        </Drawer>
    );
}
