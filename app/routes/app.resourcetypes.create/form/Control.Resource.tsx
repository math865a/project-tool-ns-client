//import { FormOption }
import { FormUI, Symbol } from "design";
import {
    Autocomplete,
    AutocompleteChangeDetails,
    Box,
    Chip,
    ListItemIcon,
    ListItemText,
    MenuItem,
    TextField,
} from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";
import { IconCheck } from "@tabler/icons-react";

export function ResourcesControl({ options }: { options: any[] }) {
    const { control, setValue } = useFormContext();

    const resources: any[] = useWatch({ control, name: "resources" });

    return (
        <FormUI.Label label="Ressourcer" fullWidth widthFrac={2}>
            <Autocomplete
                disableCloseOnSelect
                fullWidth
                value={resources}
                options={options}
                multiple
                onChange={(
                    e,
                    value,
                    reason,
                    details: AutocompleteChangeDetails<any> | undefined
                ) => {
                    if (reason === "selectOption" && details) {
                        if (resources.find((d) => d.id === details.option.id)) {
                            setValue(
                                "resources",
                                resources.filter(
                                    (d) => d.id !== details.option.id
                                )
                            );
                        } else {
                            setValue("resources", [
                                ...resources,
                                details.option,
                            ]);
                        }
                    }
                }}
                renderInput={(props) => (
                    <TextField {...props} variant="outlined" size="small" />
                )}
                renderTags={(value, getProps, state) =>
                    value.map((d) => (
                        <Box m={0.5}>
                            <Chip
                                variant="outlined"
                                label={d.name}
                                size="small"
                                {...getProps}
                                onDelete={() =>
                                    setValue(
                                        "resources",
                                        resources.filter((x) => x.id !== d.id)
                                    )
                                }
                            />
                        </Box>
                    ))
                }
                getOptionLabel={(option) => option.name}
                renderOption={(props, option, state) => (
                    <MenuItem {...props}>
                        <ListItemIcon>
                            {resources.find((d) => d.id === option.id) !==
                                undefined && <Symbol icon={IconCheck} />}
                        </ListItemIcon>
                        <ListItemText
                            primary={option.name}
                            primaryTypographyProps={{
                                fontSize: 12,
                            }}
                        />
                    </MenuItem>
                )}
            />
        </FormUI.Label>
    );
}
