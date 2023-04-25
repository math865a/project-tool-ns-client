import { Box, Stack } from "@mui/material";
import { Page } from "design";
import { DeleteAction, FavoriteAction, Tags } from "./header";
import { useLinks } from "./useLinks";
import { useActions } from "./useActions";
import { useMemo } from "react";

export default function HeaderSection() {
    const links = useLinks();

    const actions = useActions();

    const Actions = useMemo(() => {
        if (actions) return actions
        return [<FavoriteAction />, <DeleteAction />]
    },[actions])

    return (
        <Page.ActionBar
            maxWidth="xxl"
            links={links}
            actions={Actions}
        />
    );
}
