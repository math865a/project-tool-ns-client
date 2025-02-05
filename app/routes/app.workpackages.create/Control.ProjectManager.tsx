import {
    Autocomplete,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    TextField,
} from "@mui/material";
import _ from "lodash";
import { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { AutoControl, Avatars, FormUI } from "~/src/design-system";
import { IconCheck } from "@tabler/icons-react";
import { ProjectManager } from "~/src";

export default function ProjectManagerControl({
    options,
}: {
    options: ProjectManager[];
}) {
    const { control, setValue } = useFormContext();
    const projectManager: string = useWatch({
        name: "projectManager",
        control,
    });

    const value = useMemo(() => {
        return _.find(options, (d) => d.id === projectManager) ?? null;
    }, [projectManager, options]);

    return (
        <FormUI.Label label="Projektleder" widthFrac={1.3}>
            <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                    if (newValue === null || newValue.id === projectManager) {
                        const defaultPM = options.find(
                            (d) => d.name === "Ingen"
                        );
                        setValue("projectManager", defaultPM?.id ?? null);
                    } else {
                        setValue("projectManager", newValue.id);
                    }
                }}
                renderOption={(props, option, state) => {
                    if (option.name === "Ingen") return null;
                    return (
                        <AutoControl.Option
                            key={option.id}
                            props={props}
                            option={option}
                            state={state}
                            sx={{ py: 2 }}
                        >
                            <ListItemAvatar sx={{ minWidth: 40 }}>
                                <Avatars.Individual
                                    subject={option}
                                    size={25}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={option.name}
                                primaryTypographyProps={{ fontSize: 13 }}
                                secondaryTypographyProps={{ fontSize: 13 }}
                            />
                            <ListItemSecondaryAction>
                                {state.selected && <IconCheck />}
                            </ListItemSecondaryAction>
                        </AutoControl.Option>
                    );
                }}
                options={options}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                    <TextField
                        variant="outlined"
                        {...params}
                        fullWidth
                        size="small"
                    />
                )}
            />
        </FormUI.Label>
    );
}
