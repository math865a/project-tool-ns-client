import { ClickAwayListener, Box, OutlinedInput } from "@mui/material";
import { observer } from "mobx-react-lite";

const ViewItemEdit = observer(
    ({
        saveName,
        handleChange,
        name,
        cancelEdit
    }: {
        saveName: () => void;
        handleChange: (
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        ) => void;
        name: string,
        cancelEdit: () => void
    }) => {
        return (
            <ClickAwayListener
                onClickAway={saveName}
                mouseEvent="onMouseDown"
                touchEvent="onTouchStart"
            >
                <Box>
                    <OutlinedInput
                        onKeyDown={(event) => {
                            event.stopPropagation();
                            if (event.key === "Enter" || event.key === "Tab") {
                                saveName();
                            } else if (event.key === "Escape"){
                                cancelEdit();
                            }
                        }}
                        size="small"
                        value={name}
                        autoFocus={true}
                        className="tiny"
                        onChange={(event) => handleChange(event)}
                    />
                </Box>
            </ClickAwayListener>
        );
    }
);

export default ViewItemEdit;
