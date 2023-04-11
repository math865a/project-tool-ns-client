import { FormOption } from "@math865a/project-tool.types";
import {
    Autocomplete,
    AutocompleteChangeDetails,
    Box,
    Chip,
    ListItemText,
    TextField,
} from "@mui/material";
import _ from "lodash";
import { useFormContext, useWatch } from "react-hook-form";
import { ResourceTypeOption } from "~/src/_definitions";
import { AutoControl, FormUI } from "~/src/design-system";

export function ResourceTypesControl({
    options,
    name = "resourceTypes",
}: {
    options: ResourceTypeOption[];
    name?: string;
}): JSX.Element {
    const { control, setValue } = useFormContext();

    const resourceTypes: ResourceTypeOption[] = useWatch({
        control,
        name: name,
    });

    return (
        <FormUI.Label label="Ressourcetyper" fullWidth widthFrac={2}>
            <Autocomplete
                disableCloseOnSelect
                fullWidth
                value={resourceTypes}
                options={options}
                multiple
                isOptionEqualToValue={(option, value) => _.isEqual(option, value)}
                onChange={(
                    e,
                    value,
                    reason,
                    details: AutocompleteChangeDetails<FormOption> | undefined
                ) => {
                    if (reason === "selectOption" && details) {
                        if (
                            resourceTypes.find(
                                (d) => d.id === details.option.id
                            )
                        ) {
                            setValue(
                                name,
                                resourceTypes.filter(
                                    (d) => d.id !== details.option.id
                                ),
                                {
                                    shouldValidate: true,
                                    shouldDirty: true,
                                    shouldTouch: true,
                                }
                            );
                        } else {
                            setValue(name, [...resourceTypes, details.option], {
                                shouldValidate: true,
                                shouldDirty: true,
                                shouldTouch: true,
                            });
                        }
                    }
                }}
                renderInput={(props) => (
                    <TextField {...props} variant="outlined" size="small" />
                )}
                renderTags={(value, getProps, state) =>
                    value.map((d) => (
                        <Box m={0.5} key={d.id}>
                            <Chip
                                variant="outlined"
                                label={d.name}
                                size="small"
                                {...getProps}
                                onDelete={() =>
                                    setValue(
                                        name,
                                        resourceTypes.filter(
                                            (x) => x.id !== d.id
                                        ),
                                        {
                                            shouldValidate: true,
                                            shouldDirty: true,
                                            shouldTouch: true,
                                        }
                                    )
                                }
                            />
                        </Box>
                    ))
                }
                getOptionLabel={(option) => option.name}
                renderOption={(props, option, state) => (
                    <AutoControl.Option
                        key={option.id}
                        props={props}
                        option={option}
                        state={state}
                    >
                        <ListItemText
                            primary={option.name}
                            primaryTypographyProps={{
                                fontSize: 12,
                            }}
                            secondaryTypographyProps={{ fontSize: 12 }}
                            secondary={
                                "Type " + (option as ResourceTypeOption).typeNo
                            }
                        />
                    </AutoControl.Option>
                )}
            />
        </FormUI.Label>
    );
}
