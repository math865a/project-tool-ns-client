import {
    faCalendarDay,
    faCalendarRange,
    faCalendarWeek
} from "@fortawesome/pro-light-svg-icons";
import { ViewMode } from "@math865a/project-tool.types";
import {
    Paper, styled,
    ToggleButton,
    ToggleButtonGroup
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { Symbol } from "~/src/design-system";
import { useMenuState } from "~/src/hooks/useMenu";
import { useBoard } from "../../../_provider";

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
                        <Symbol icon={faCalendarRange} size={1.1} />
                    </ToggleButton>

                    <ToggleButton value={ViewMode.Week} key={ViewMode.Week}>
                        <Symbol icon={faCalendarWeek} size={1.1} />
                    </ToggleButton>

                    <ToggleButton value={ViewMode.Day} key={ViewMode.Day}>
                        <Symbol icon={faCalendarDay} size={1.1} />
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
