import {
  Box, CssBaseline, Paper, Typography, BoxProps,
} from '@mui/material';
import * as React from 'react';
import { Child } from '../types';

function Root({
  children,
  ...props
}: { children?: Child | Child[] } & BoxProps) {
  return (
        <Box
            {...props}
            sx={[
              {
                backgroundColor: (theme) => '#ffffff', // theme.palette.background.paper,
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
              },
              ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
            ]}
        >
            <CssBaseline />
            {children}
        </Box>
  );
}

function Header(props: BoxProps) {
  return (
        <Box
            component="header"
            className="Header"
            {...props}
            sx={[
              {
                px: 2,
                backgroundColor: (theme) => '#ffffff',
                // theme.palette.background.default,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid',
                borderColor: 'divider',
                position: 'sticky',
                top: 0,
                zIndex: 1100,
              },
              ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
            ]}
        />
  );
}

function SideNav(props: BoxProps) {
  return (
        <Box
            component="nav"
            className="Navigation"
            {...props}
            sx={[
              {
                p: 2,
                backgroundColor: (theme) => theme.palette.background.default,
                borderRight: '1px solid',
                borderColor: (theme) => theme.palette.divider,
              },
              ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
            ]}
        />
  );
}

function SidePane(props: BoxProps) {
  return (
        <Box
            className="Inbox"
            {...props}
            sx={[
              {
                backgroundColor: (theme) => theme.palette.background.default,
                borderRight: '1px solid',
                borderColor: (theme) => theme.palette.divider,
              },
              ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
            ]}
        />
  );
}

function Main({
  children,
  ...props
}: { children: Child | Child[] } & BoxProps) {
  return (
        <Box
            component="main"
            className="Main"
            sx={{
              flexGrow: 1, px: 3, pb: 3, overflowX: 'hidden',
            }}
            {...props}
        >
            {children}
        </Box>
  );
}

function SideDrawer({
  onClose,
  ...props
}: BoxProps & { onClose: React.MouseEventHandler<HTMLDivElement> }) {
  return (
        <Box
            {...props}
            sx={[
              {
                position: 'fixed',
                zIndex: 1200,
                width: '100%',
                height: '100%',
              },
              ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
            ]}
        >
            <Box
                role="button"
                onClick={onClose}
                sx={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: (theme) => theme.palette.background.default,
                }}
            />
            <Paper
                sx={{
                  minWidth: 256,
                  width: 'max-content',
                  height: '100%',
                  p: 2,
                  backgroundColor: (theme) => theme.palette.background.default,
                }}
            >
                {props.children}
            </Paper>
        </Box>
  );
}

function Island(props: {
  children?: Child | Child[];
  title?: string;
  action?: Child | Child[];
}) {
  return (
        <Paper
            sx={{
              p: 2,
              borderRadius: '8px',
              boxShadow: 'sm',
            }}
            variant="outlined"
        >
            {(props.title || props.action) && (
                <Box
                    flexGrow={1}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography fontSize={15} fontWeight={800} mb={1} pl={1}>
                        {props.title}
                    </Typography>
                    <Box>{props.action}</Box>
                </Box>
            )}
            {props.children}
        </Paper>
  );
}

function GridContainer({
  children,
  vh = 82.5,
}: {
  children?: Child | Child[];
  maxWidth?: number;
  vh?: number | null | string;
}) {
  return (
        <div
            style={{
              height: vh === null ? typeof vh === 'string' ? vh : undefined : `${vh}vh`,
              width: '100%',
            }}
        >
            <div
                style={{
                  display: 'flex',
                  maxWidth: '100%',
                  height: '100%',
                }}
            >
                <div style={{ flexGrow: 1 }}>
                {children}
                </div>
            </div>
        </div>
  );
}

function Profile({ children }: { children: Child | Child[] }) {
  return (
        <Box
            display="flex"
            flexGrow={1}
            position="absolute"
            top={'64px'}
            left={0}
            right={0}
            bottom={0}
        ></Box>
  );
}

function Body({ children }: { children: Child | Child[] }) {
  return (
        <Box
            display="flex"
            flexGrow={1}
            position="absolute"
            left={0}
            right={0}
            bottom={0}
            top={0}
        >
            {children}
        </Box>
  );
}

function ProfileMain({
  children,
  offset = 0,
}: {
  offset?: number;
  children: Child | Child[];
}) {
  return (
        <Box
            px={3}
            py={1}
            flexGrow={1}
            sx={{ overflowY: 'scroll' }}
            position="absolute"
            left={offset}
            right={0}
            bottom={0}
        >
            {children}
        </Box>
  );
}

export const Layout = {
  Root,
  Header,
  SideNav,
  SidePane,
  SideDrawer,
  Main,
  Island,
  GridContainer,
  Profile,
  ProfileMain,
  Body,
};
