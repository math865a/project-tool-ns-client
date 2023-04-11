import {
    Autocomplete,
    AutocompleteCloseReason,
    ListItemAvatar,
    ListItemText,
} from "@mui/material";
import { useGridApiContext } from "@mui/x-data-grid-pro";
import { useLoaderData } from "@remix-run/react";
import { useMemo } from "react";
import { AutoControl, Avatars } from "~/src/design-system";
import { UsersLoader } from "../../route";
import { AccessGroupOption } from "~/src";

export default function AccessGroupsPicker({
    value,
    handleToggle,
}: {
    value: string[];
    handleToggle: (value: string) => void;
}) {
    const { accessGroupOptions } = useLoaderData<UsersLoader>();

    const apiRef = useGridApiContext();

    const values = useMemo(() => {
        if (!value) return [];
        return value
            .map((x) => accessGroupOptions.find((d) => d.id === x))
            .filter((d) => d) as AccessGroupOption[];
    }, [value, accessGroupOptions]);

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
                    }
                }}
                value={values}
                onChange={(event, newValue, reason, details) => {
                    if (
                        event.type === "keydown" &&
                        (event as React.KeyboardEvent).key === "Backspace" &&
                        reason === "removeOption"
                    ) {
                        return;
                    }
                    if (details?.option) {
                        handleToggle(details.option.id);
                    }
                }}
                renderOption={(props, option, state) => (
                    <AutoControl.Option
                        props={props}
                        option={option}
                        state={state}
                    >
                        <ListItemAvatar>
                            <Avatars.Individual subject={option} size={25} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={option.name}
                            primaryTypographyProps={{ fontSize: 12 }}
                        />
                    </AutoControl.Option>
                )}
                options={accessGroupOptions}
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
                    <AutoControl.Header {...params} title="Ressourcefilter" />
                )}
            />
        </div>
    );
}
