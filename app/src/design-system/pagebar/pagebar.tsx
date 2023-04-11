import {
  AppBar,
  Box,
  Divider,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { Logo } from '../logo/logo';
import { IconDef, Symbol } from '../symbol';
import { Child } from '../types';

function Root({
  CurrentPage,
  Nav,
  UserMenu,
}: {
  CurrentPage?: JSX.Element;
  Nav?: JSX.Element;
  UserMenu?: Child | Child[];
}) {
  return (
        <AppBar
            position="fixed"
            sx={{
              zIndex: (theme) => theme.zIndex.tooltip - 1,
              backgroundColor: (theme) => theme.palette.primary.light,
            }}
            elevation={1}
        >
            <Toolbar
                sx={{ justifyContent: 'space-between', alignItems: 'center' }}
            >
                <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                        height="min-content"
                        display="flex"
                        alignItems="center"
                        sx={{ cursor: 'pointer' }}
                    >
                        <Logo />
                    </Box>
                    <Box height={30}>
                        <Divider
                            orientation="vertical"
                            variant="middle"
                            sx={{
                              borderColor: (theme) => theme.palette.grey[300],
                              opacity: 0.5,
                            }}
                        />
                    </Box>
                    {CurrentPage}
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                    {Nav}
                    {(Nav || UserMenu) && (
                        <Box height={30}>
                            <Divider
                                orientation="vertical"
                                variant="middle"
                                sx={{
                                  borderColor: (theme) => theme.palette.grey[300],
                                  opacity: 0.5,
                                }}
                            />
                        </Box>
                    )}
                    {UserMenu}
                </Stack>
            </Toolbar>
        </AppBar>
  );
}

function CurrentPage({ icon, title }: { icon?: IconDef; title?: string }) {
  return (
        <Stack direction="row" alignItems="center" spacing={1}>
            {icon && <Symbol icon={icon} size={1.5} />}
            <Typography fontSize={16} fontWeight={600} color="#fff">
                {title}
            </Typography>
        </Stack>
  );
}

export const Pagebar = {
  Root,
  CurrentPage,
};
