import { faChevronLeft } from "@fortawesome/pro-light-svg-icons";
import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "@remix-run/react";
import _ from "lodash";
import { useMemo } from "react";
import { Action, Symbol } from "~/src/design-system";
import { allPages } from "../sidebar/_page-map";

export interface IBackActionProps {
    title?: string;
    backTo?: string;
    noBack?: boolean;
    hide?: boolean;
    hideTitle?: boolean;
}

export default function BackAction(props: IBackActionProps) {
    const { pathname } = useLocation();

    const navigate = useNavigate();

    const page = useMemo(() => {
        return allPages.find((page) =>
            pathname.startsWith(page.to as string)
        );
    }, [pathname]);

    const title = useMemo(() => {
        if (props?.title) {
            return props.title;
        } else if (page) {
            return page.title;
        } else {
            return "";
        }
    }, [props?.title, page]);

    const backTo = useMemo(() => {
        if (props?.backTo) {
            return props.backTo;
        } else if (props.title) {
            return -1;
        } else if (pathname) {
            if (pathname.includes("view")) {
                return "../..";
            } else if (pathname.includes("main")) {
                return "../../view";
            }
        }
        return -1;
    }, [props?.backTo, page, pathname]);

    const handleClick = () => {
        navigate(backTo as unknown as string);
    };

    if (props?.hide) {
        return null;
    } else if (title && backTo && !props?.noBack && !props?.hideTitle) {
        return (
            <Box maxWidth="max-content">
                <ButtonBase onClick={handleClick}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Symbol icon={faChevronLeft} size={0.9} />
                        <PageTitle title={title} />
                    </Stack>
                </ButtonBase>
            </Box>
        );
    } else if (title && !props?.hideTitle) {
        return <PageTitle title={title} />;
    } else if (props?.hideTitle && backTo) {
        return (
            <Action.Symbol
                icon={faChevronLeft}
                iconSize={0.9}
                onClick={handleClick}
                title="Gå tilbage"
            />
        );
    }
    return null;
}

function PageTitle({
    title,
    underline,
}: {
    title: string;
    underline?: boolean;
}) {
    return (
        <Typography
            fontSize={14}
            fontWeight="bold"
            color="text.secondary"
            sx={{
                "&:hover": { textDecoration: underline ? "underline" : "none" },
            }}
        >
            {title}
        </Typography>
    );
}
