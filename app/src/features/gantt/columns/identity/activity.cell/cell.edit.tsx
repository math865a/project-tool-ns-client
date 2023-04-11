import { Box, ClickAwayListener, TextField } from "@mui/material";
import { observer } from "mobx-react-lite";

export const ActivityIdentityCellEdit = observer(
    ({
        state,
        finishEditing,
        handleChange,
        cancelEdit,
    }: {
        state: string;
        finishEditing: () => void;
        handleChange: (
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => void;
        cancelEdit: () => void;
    }) => {
        return (
            <Box flexGrow={1} sx={{ overflow: "hidden" }} pl={1}>
                <ClickAwayListener onClickAway={finishEditing}>
                    <TextField
                        variant="outlined"
                        className="display-text"
                        autoFocus={true}
                        fullWidth
                        inputProps={{ fontSize: 12 }}
                        size="small"
                        onChange={handleChange}
                        onKeyDown={(event) => {
                            event.stopPropagation();
                            if (event.key === "Escape") {
                                cancelEdit();
                            } else if (event.key === "Enter") {
                                finishEditing();
                            } else if (event.key === "Tab") {
                                finishEditing();
                            }
                        }}
                        value={state}
                    />
                </ClickAwayListener>
            </Box>
        );
    }
);
