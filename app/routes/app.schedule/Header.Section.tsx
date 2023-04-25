import { Stack, Typography } from "@mui/material";
import { Directory, Page } from "~/src/design-system";
import { useLocation } from "@remix-run/react";
import _ from "lodash";
import { useMemo } from "react";
import { links } from "./link-map";

export default function HeaderSection() {
    const location = useLocation();

    const activeLink = useMemo(() => {
        return _.find(links, (d) => d.to === location.pathname);
    }, [location.pathname]);

    return (
        <Page.Header actions={<Directory.PageLinks links={links} />}>
            <Stack>
                <Typography fontSize={14} fontWeight="bold">
                    {activeLink?.title ?? links[0].title}
                </Typography>
                {activeLink && activeLink.subtitle && (
                    <Typography fontSize={14} color="text.secondary">
                        {activeLink.subtitle}
                    </Typography>
                )}
            </Stack>
        </Page.Header>
    );
}
