import { faUserCog, faDoorOpen } from "@fortawesome/pro-light-svg-icons";
import { ListItem } from "@mui/material";
import { useSubmit } from "@remix-run/react";
import { Directory } from "~/src/design-system";
import SidebarButtonItem from "./SidebarButtonItem";
import SidebarItem from "./SidebarItem";

export default function SessionLinks() {
    const submit = useSubmit();

    const handleSignOut = () => {
        submit({}, { method: "post", action: "/app/session" });
    };

    return (
        <Directory.Wrapper sx={{ px: 2, mb: 2 }}>
            <ListItem divider sx={{ mb: 2 }} />
            <SidebarItem
                to="/app/session"
                subject="Min konto"
                icon={faUserCog}
            />
            <SidebarButtonItem
                onClick={handleSignOut}
                subject="Log ud"
                icon={faDoorOpen}
            />
        </Directory.Wrapper>
    );
}
