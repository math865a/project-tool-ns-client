import {
    faUserCog as userCogLight,
    faDoorOpen,
} from "@fortawesome/pro-light-svg-icons";
import { faUserCog as userCogSolid } from "@fortawesome/pro-solid-svg-icons";
import { Box, ListItem } from "@mui/material";
import { useSubmit } from "@remix-run/react";
import { useMemo } from "react";
import { Directory } from "~/src/design-system";

export default function SessionLinks() {
    const submit = useSubmit();

    const handleSignOut = () => {
        submit({}, { method: "post", action: "/app/session" });
    };

    const links = useMemo(() => {
        return [
            {
                title: "Min konto",
                icon: userCogLight,
                activeIcon: userCogSolid,
                to: "/app/session",
            },
            {
                title: "Log ud",
                onClick: handleSignOut,
                icon: faDoorOpen,
            },
        ];
    }, [handleSignOut]);

    return (
        <Box py={2} >
            <Box flexGrow={1} mx={2} mb={2} borderBottom={ theme => `1px solid ${theme.palette.divider}`}/>
            
            <Directory.PageLinks orientation="column" links={links} />
        </Box>
    );
}
