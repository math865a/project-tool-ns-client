import {
    Tab as MuiTab,
    Tabs as MuiTabs
} from "@mui/material";
import { styled } from "@mui/material";

export const Tabs = styled(MuiTabs)(({ theme }) =>({
    minHeight: 35,
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        bottom: 5
      },
    '& .MuiTabs-indicatorSpan': {
        width: '70%',
        backgroundColor: theme.palette.primary.main,
        height: 1
      },
}));

export const Tab = styled(MuiTab)(({ theme }) => ({
    textTransform: "none",
    minWidth: 0,
    [theme.breakpoints.up("sm")]: {
        minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: "rgba(0, 0, 0, 0.85)",
   
    "&:hover": {
        color: theme.palette.primary.main,
        opacity: 1,
    },
    "&.Mui-selected": {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightMedium,
    },
    "&.Mui-focusVisible": {
        backgroundColor: theme.palette.primary.main,
    },
}));
