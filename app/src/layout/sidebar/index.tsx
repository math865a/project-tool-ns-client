import { Box, Drawer } from "@mui/material";
import Brand from "./Brand";
import PageLinks from "./PageLinks";
import SessionLinks from "./SessionLinks";

export default function Sidebar({ drawerWidth }: { drawerWidth: number }) {

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
                <PageLinks/>
            </Box>
            <SessionLinks/>

        </Drawer>
    );
}
