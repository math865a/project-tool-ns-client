import { Paper, styled, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useMenuState } from "~/src/hooks/useMenu";
import { useBoard } from "../../../_provider";
import {
    IconCalendarEvent,
    IconCalendarMonth,
    IconCalendarWeek,
} from "@tabler/icons-react";
import { ViewMode } from "~/pages/capacity/_definitions";

const ViewModeControl = observer(() => {
    const View = useBoard().View;

    const { handleOpen, ...menuProps } = useMenuState();
    const handleClick = (viewMode: any) => {
        View.updateViewMode(viewMode);
        menuProps.onClose();
    };

    return (
        <div>
            <Paper
                elevation={0}
                sx={{
                    display: "flex",
                    //border: (theme) => `1px solid ${theme.palette.divider}`,
                    flexWrap: "wrap",
                    backgroundColor: "#fff",
                }}
            >
                <StyledToggleButtonGroup
                    size="small"
                    exclusive
                    value={View.viewMode}
                    onChange={(o, value: any) => handleClick(value)}
                >
                    <ToggleButton value={ViewMode.Month} key={ViewMode.Month}>
                        <IconCalendarMonth />
                    </ToggleButton>

                    <ToggleButton value={ViewMode.Week} key={ViewMode.Week}>
                        <IconCalendarWeek />
                    </ToggleButton>

                    <ToggleButton value={ViewMode.Day} key={ViewMode.Day}>
                        <IconCalendarEvent />
                    </ToggleButton>
                </StyledToggleButtonGroup>
            </Paper>
        </div>
    );
});

export default ViewModeControl;

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    "& .MuiToggleButtonGroup-grouped": {
        margin: theme.spacing(0.5),
        border: 0,
        "&.Mui-disabled": {
            border: 0,
        },
        "&:not(:first-of-type)": {
            borderRadius: theme.shape.borderRadius,
        },
        "&:first-of-type": {
            borderRadius: theme.shape.borderRadius,
        },
    },
}));

/*        <>
            <ViewModeAction handleOpen={handleOpen} />
            <ViewModeMenu {...menuProps} handleClick={handleClick} />
        </>*/
