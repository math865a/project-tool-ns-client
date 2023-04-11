import { Divider, Stack, Typography } from "@mui/material";
import { Page } from "~/src/design-system";
import { PageLink, links } from "./header";
import { useMemo } from "react";
import { useLocation } from "@remix-run/react";
import _ from "lodash";

export default function HeaderSection() {
    const location = useLocation();

    const activeLink = useMemo(() => {
        return _.find(links, (d) => d.to === location.pathname);
    }, [location.pathname]);

    return (
        <Page.Header
            actions={
                <Stack display="flex" direction="row" spacing={1}>
                    {links.map((d) => (
                        <PageLink {...d} key={d.to} />
                    ))}
                </Stack>
            }
        >
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
