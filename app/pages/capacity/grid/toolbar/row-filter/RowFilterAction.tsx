import { Action } from "design";
import { Badge, BadgeProps, Box, styled, useTheme } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useBoard } from "../../../_provider";
import { useMenuState } from "~/src/hooks/useMenu";
import { IconFilter } from "@tabler/icons-react";

const RowFilterAction = observer(
    ({
        handleOpen,
    }: {
        handleOpen: ReturnType<typeof useMenuState>["handleOpen"];
    }) => {
        const RowFilter = useBoard().Filter.RowFilter;

        const theme = useTheme();

        return (
            <Box
                minWidth={50}
                display="flex"
                justifyContent="flex-start"
                ml={1}
            >
                <CountBadge
                    badgeContent={RowFilter.filterCount}
                    color="primary"
                >
                    <Action.Symbol
                        icon={IconFilter}
                        title="Filter"
                        onClick={handleOpen}
                        iconSize={1}
                    />
                </CountBadge>{" "}
            </Box>
        );
    }
);

export default RowFilterAction;

const CountBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
        right: 3,
        top: 5,
        padding: "0 4px",
        border: `2px solid ${theme.palette.background.paper}`,
        fontSize: 10,
    },
}));

/*
                {RowFilter.filterCount > 0 && (
                    <Box
                        position="absolute"
                        top={8}
                        right={0}
                        width={14.5}
                        height={14.5}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        borderRadius="50%"
                        sx={{ backgroundColor: theme.palette.primary.main }}
                    >
                        <Typography fontSize={10} color="white">
                            {RowFilter.filterCount}
                        </Typography>
                    </Box>
                )}*/
