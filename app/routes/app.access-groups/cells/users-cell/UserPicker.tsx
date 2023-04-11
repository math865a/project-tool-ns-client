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
import { UserOption } from "../../definitions/types";
import { AccessGroupsLoader } from "../../route";
import { UsersCellProps } from "./UserCountCell";

export default function UserPicker({ id, value, field }: Omit<UsersCellProps, "rowModesModel">) {
    const { userOptions } = useLoaderData<AccessGroupsLoader>();

    const apiRef = useGridApiContext();

    const values = useMemo(() => {
        if (!value) return [];
        return value
            .map((x) => userOptions.find((d) => d.uid === x))
            .filter((d) => d) as UserOption[];
    }, [value, userOptions]);

    const handleChange = (option: UserOption) => {
        const currentVal = value ?? [];
        if (currentVal.includes(option.uid)) {
            apiRef.current.setEditCellValue({
                id,
                field,
                value: currentVal.filter((x) => x !== option.uid),
            });
        } else {
            apiRef.current.setEditCellValue({
                id,
                field,
                value: [...currentVal, option.uid],
            });
        }
    };

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
                        handleChange(details.option);
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
                options={userOptions}
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

