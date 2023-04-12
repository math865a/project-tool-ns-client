import { withEmotionCache } from "@emotion/react";
import { config } from "@fortawesome/fontawesome-svg-core";
import iconStyles from "@fortawesome/fontawesome-svg-core/styles.css";
import {
    Box,
    Typography,
    unstable_useEnhancedEffect as useEnhancedEffect,
} from "@mui/material";
import { LicenseInfo } from "@mui/x-data-grid-pro";
import { MetaFunction, json } from "@remix-run/node";
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useCatch
} from "@remix-run/react";
import { ClientStylesContext, theme } from "mui-config";
import * as React from "react";
import calendarStyles from "react-big-calendar/lib/css/react-big-calendar.css";
import { namespaces } from "./server";
import styles from "./styles/scrollbar.css";

export function links() {
    return [
        {
            rel: "icon",
            href: "/favicon.png",
            type: "image/x-icon",
        },
        {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Poppins",
        },
        {
            rel: "stylesheet",
            href: styles,
        },
        {
            rel: "stylesheet",
            href: iconStyles,
        },
        {
            rel: "stylesheet",
            href: calendarStyles
        }
    ];
}

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "Project Tool",
    viewport: "width=device-width,initial-scale=1",
});
config.autoAddCss = false;
LicenseInfo.setLicenseKey(
    "d4f90511f17268f99082e440321d4f14Tz01MzgxMSxFPTE2OTkzMTI0ODk1NDMsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);


interface DocumentProps {
    children: React.ReactNode;
    title?: string;
}

export async function loader(){
    return json(namespaces)
}

const Document = withEmotionCache(
    ({ children, title }: DocumentProps, emotionCache) => {
        const clientStyleData = React.useContext(ClientStylesContext);
        // Only executed on client
        useEnhancedEffect(() => {
            // re-link sheet container
            emotionCache.sheet.container = document.head;
            // re-inject tags
            const tags = emotionCache.sheet.tags;
            emotionCache.sheet.flush();
            tags.forEach((tag) => {
                // eslint-disable-next-line no-underscore-dangle
                (emotionCache.sheet as any)._insertTag(tag);
            });
            // reset cache to reapply global styles
            clientStyleData.reset();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        return (
            <html lang="en">
                <head>
                    <meta charSet="utf-8" />
                    <meta
                        name="viewport"
                        content="width=device-width,initial-scale=1"
                    />
                    <meta
                        name="theme-color"
                        content={theme.palette.primary.main}
                    />
                    {title ? <title>{title}</title> : null}
                    <Meta />
                    <Links />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                    <meta
                        name="emotion-insertion-point"
                        content="emotion-insertion-point"
                    />
                </head>
                <body>
                    {process.env.NODE_ENV === "development" && <LiveReload />}
                    {children}
                    <ScrollRestoration />
                    <Scripts />
                </body>
            </html>
        );
    }
);

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
    return (
        <Document>
            <Outlet />
        </Document>
    );
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }: { error: Error }) {
    console.error(error);

    return (
        <Document title="Error!">
            <Box
                position="absolute"
                left={0}
                top={0}
                right={0}
                bottom={0}
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
            >
                <Typography
                    fontWeight="bold"
                    color="text.secondary"
                    fontSize={16}
                >
                    Der skete en fejl.
                </Typography>
            </Box>
        </Document>
    );
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
    const caught = useCatch();

    let message;
    switch (caught.status) {
        case 401:
            message = (
                <p>
                    Oops! Looks like you tried to visit a page that you do not
                    have access to.
                </p>
            );
            break;
        case 404:
            message = (
                <p>
                    Oops! Looks like you tried to visit a page that does not
                    exist.
                </p>
            );
            break;

        default:
            throw new Error(caught.data || caught.statusText);
    }

    return (
        <Document title={`${caught.status} ${caught.statusText}`}>
            <Box
                position="absolute"
                left={0}
                top={0}
                right={0}
                bottom={0}
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
            >
                <Typography
                    fontWeight="bold"
                    color="text.secondary"
                    fontSize={16}
                >
                    Denne side eksisterer ikke.
                </Typography>
            </Box>
        </Document>
    );
}

/*
import { StylesContext } from 'mui-config';
import { LicenseInfo } from '@mui/x-data-grid-pro';
import { MetaFunction } from '@remix-run/node';
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from '@remix-run/react';
import { useContext } from 'react';

function Document({
    children,
    title,
}: {
    children: React.ReactNode;
    title?: string;
}) {
    const styleData = useContext(StylesContext);
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1"
                />
                <Meta />
                {styleData?.map(({ key, ids, css }) => (
                    <style
                        key={key}
                        data-emotion={`${key} ${ids.join(' ')}`}
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{ __html: css }}
                    />
                ))}
                <Links />
            </head>

            <body style={{ margin: 0, padding: 0 }}>
                {children}
                <ScrollRestoration />
                <Scripts />
                {process.env.NODE_ENV === 'development' && <LiveReload />}
            </body>
        </html>
    );
}

LicenseInfo.setLicenseKey(
    'd4f90511f17268f99082e440321d4f14Tz01MzgxMSxFPTE2OTkzMTI0ODk1NDMsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI='
);

export default function App() {
    return (
        <Document>
            <Outlet />
        </Document>
    );
}
*/
