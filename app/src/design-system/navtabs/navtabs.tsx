import {
  Box, styled, Tab, TabProps, Tabs,
} from '@mui/material';
import { Link as RemixLink } from '@remix-run/react';
import { useState } from 'react';
import { Child } from '../types';

export interface INavTabsMain {
  initialValue?: number;
  children: Child | Child[];
}

function Main({ initialValue = 0, children }: INavTabsMain) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
        <Box flexGrow={1} pb={1}>
            <AntTabs value={value} onChange={handleChange}>
                {children}
            </AntTabs>
        </Box>
  );
}

export interface ILinkTabProps extends Omit<TabProps, 'component'> {
  to: string;
}

function Link({ to, ...props }: ILinkTabProps) {
  return (
        <AntTab
            {...{ component: RemixLink, to }}

            sx={{ textDecoration: 'none', minHeight: 25, padding: { top: 0, bottom: 0 } }}
            {...props}
        />
  );
}

const AntTabs = styled(Tabs)({
  minHeight: 30,
  '& .MuiTabs-indicator': {
    bottom: 4,
    height: '1px',
  },
  // borderBottom: "1px solid " + theme.palette.divider
});

interface StyledTabProps {
  label: string;
}
const AntTab = styled((props: TabProps) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    minWidth: 0,
    [theme.breakpoints.up('sm')]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: 'rgba(0, 0, 0, 0.85)',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: theme.palette.primary.main,
      opacity: 1,
    },
    '&.Mui-selected': {
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightMedium,
    },
  }),
);

export const NavTabs = {
  Main,
  Link,
};
