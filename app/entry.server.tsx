import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { RemixServer } from "@remix-run/react";
import { EntryContext } from "@remix-run/react/dist/entry";
import { createEmotionCache, theme } from "mui-config";
import { renderToString } from "react-dom/server";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterLuxon } from "@mui/x-date-pickers-pro/AdapterLuxon";
export default function handleRequest(
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    remixContext: EntryContext
) {
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    function MuiRemixServer() {
        return (
            <CacheProvider value={cache}>
                <ThemeProvider theme={theme}>
                    <LocalizationProvider
                        dateAdapter={AdapterLuxon}
                        adapterLocale="da"
                    >
                        <CssBaseline />
                        <RemixServer context={remixContext} url={request.url} />
                    </LocalizationProvider>
                </ThemeProvider>
            </CacheProvider>
        );
    }

    // Render the component to a string.
    const html = renderToString(<MuiRemixServer />);

    // Grab the CSS from emotion
    const { styles } = extractCriticalToChunks(html);

    let stylesHTML = "";

    styles.forEach(({ key, ids, css }) => {
        const emotionKey = `${key} ${ids.join(" ")}`;
        const newStyleTag = `<style data-emotion="${emotionKey}">${css}</style>`;
        stylesHTML = `${stylesHTML}${newStyleTag}`;
    });

    // Add the Emotion style tags after the insertion point meta tag
    const markup = html.replace(
        /<meta(\s)*name="emotion-insertion-point"(\s)*content="emotion-insertion-point"(\s)*\/>/,
        `<meta name="emotion-insertion-point" content="emotion-insertion-point"/>${stylesHTML}`
    );

    responseHeaders.set("Content-Type", "text/html");

    return new Response(`<!DOCTYPE html>${markup}`, {
        status: responseStatusCode,
        headers: responseHeaders,
    });
}

/*
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionServer, { EmotionCriticalToChunks } from '@emotion/server/create-instance';
import { Child } from 'design';
import { createEmotionCache, StylesContext, theme } from 'mui-config';
import {
    ThemeProvider
} from '@mui/material/styles';
import type { EntryContext } from '@remix-run/node';
import { Response } from '@remix-run/node';
import { RemixServer } from '@remix-run/react';
import isbot from "isbot";
import { renderToPipeableStream, renderToString } from 'react-dom/server';
import { PassThrough } from 'stream';
const ABORT_DELAY = 5000;

export default function handleRequest(
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    remixContext: EntryContext
) {
    return isbot(request.headers.get("user-agent"))
        ? handleBotRequest(
              request,
              responseStatusCode,
              responseHeaders,
              remixContext
          )
        : handleBrowserRequest(
              request,
              responseStatusCode,
              responseHeaders,
              remixContext
          );
}

function handleBotRequest(
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    remixContext: EntryContext
) {
    return new Promise((resolve, reject) => {
        let didError = false;

        const { pipe, abort } = renderToPipeableStream(
            <MuiWrapper>
                <RemixServer context={remixContext} url={request.url} />
            </MuiWrapper>,
            {
                onAllReady() {
                    const body = new PassThrough();

                    responseHeaders.set("Content-Type", "text/html");

                    resolve(
                        new Response(body, {
                            headers: responseHeaders,
                            status: didError ? 500 : responseStatusCode,
                        })
                    );

                    pipe(body);
                },
                onShellError(error: unknown) {
                    reject(error);
                },
                onError(error: unknown) {
                    didError = true;

                    console.error(error);
                },
            }
        );

        setTimeout(abort, ABORT_DELAY);
    });
}

function handleBrowserRequest(
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    remixContext: EntryContext
) {
    return new Promise((resolve, reject) => {
        let didError = false;

        const { pipe, abort } = renderToPipeableStream(
            <MuiWrapper>
                <RemixServer context={remixContext} url={request.url} />
            </MuiWrapper>,
            {
                onShellReady() {
                    const body = new PassThrough();

                    responseHeaders.set("Content-Type", "text/html");

                    resolve(
                        new Response(body, {
                            headers: responseHeaders,
                            status: didError ? 500 : responseStatusCode,
                        })
                    );

                    pipe(body);
                },
                onShellError(err: unknown) {
                    reject(err);
                },
                onError(error: unknown) {
                    didError = true;

                    console.error(error);
                },
            }
        );

        setTimeout(abort, ABORT_DELAY);
    });
}

const MuiWrapper = (props: { children: Child | Child[] }) => {
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    const html = renderToString(
        <StylesContext.Provider value={null}>
            <MuiRemixServer cache={cache}>{props.children}</MuiRemixServer>
        </StylesContext.Provider>
    );

    // Grab the CSS from emotion
    const emotionChunks = extractCriticalToChunks(html);

    return (
        <MarkUp cache={cache} chunks={emotionChunks}>
            {props.children}
        </MarkUp>
    );
};

const MuiRemixServer = ({
    children,
    cache,
}: {
    children?: Child | Child[];
    cache: EmotionCache;
}) => {
    return (
        <CacheProvider value={cache}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </CacheProvider>
    );
};

const MarkUp = ({
    children,
    cache,
    chunks,
}: {
    children?: Child | Child[];
    cache: EmotionCache;
    chunks: EmotionCriticalToChunks;
}) => {
    return (
        <StylesContext.Provider value={chunks.styles}>
            <MuiRemixServer cache={cache}>{children}</MuiRemixServer>
        </StylesContext.Provider>
    );
};*/
