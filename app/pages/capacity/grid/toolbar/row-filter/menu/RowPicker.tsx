import {
    Autocomplete,
    AutocompleteCloseReason, ListItemAvatar,
    ListItemText
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useBoard } from "~/pages/capacity/_provider";
import { AutoControl, Avatars } from "~/src/design-system";

export const RowPicker = observer(
    ({ handleClose }: { handleClose: () => void }) => {
        const {
            Filter: { RowFilter },
        } = useBoard();

        return (
            <div>
                <Autocomplete
                    open
                    multiple
                    onClose={(
                        event: React.ChangeEvent<{}>,
                        reason: AutocompleteCloseReason
                    ) => {
                        if (reason === "escape") {
                            handleClose();
                        }
                    }}
                    value={RowFilter.filterState}
                    onChange={(event, newValue, reason, details) => {
                        if (
                            event.type === "keydown" &&
                            (event as React.KeyboardEvent).key ===
                                "Backspace" &&
                            reason === "removeOption"
                        ) {
                            return;
                        }
                        if (details?.option) {
                            RowFilter.updateRowFilter(details.option);
                        }
                    }}
                    renderOption={(props, option, state) => (
                        <AutoControl.Option
                            props={props}
                            option={option}
                            state={state}
                        >
                            <ListItemAvatar>
                                <Avatars.Individual
                                    subject={option}
                                    size={25}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={option.name}
                                primaryTypographyProps={{ fontSize: 12 }}
                            />
                        </AutoControl.Option>
                    )}
                    options={RowFilter.options}
                    disableCloseOnSelect
                    PopperComponent={AutoControl.Popper}
                    renderTags={() => null}
                    noOptionsText="No labels"
                    getOptionLabel={(option) => option.name}
                    sx={{
                        "& .MuiList-Root": {
                            width: 400,
                        },
                    }}
                    renderInput={(params) => (
                        <AutoControl.Header
                            {...params}
                            title="Ressourcefilter"
                        />
                    )}
                />
            </div>
        );
    }
);

export default RowPicker;
