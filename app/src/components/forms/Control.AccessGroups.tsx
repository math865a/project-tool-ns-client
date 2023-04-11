import { Box, Chip, Stack } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";
import { AccessGroupOption } from "~/src";
import { FormUI } from "~/src/design-system";
import { IFormValues } from "../../../routes/app.users.create/form";

export function AccessGroupsControl({
    accessGroups,
}: {
    accessGroups: AccessGroupOption[];
}) {
    const {
        control,
        setValue,
        formState: { errors },
    } = useFormContext<IFormValues>();

    const value = useWatch<IFormValues, "accessGroups">({
        name: "accessGroups",
        control,
    });

    const handleToggle = (d: AccessGroupOption) => {
        if (value.find((x) => x.id === d.id)) {
            const newValue = value.filter((x) => x.id !== d.id);
            setValue("accessGroups", newValue, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
            });
        } else {
            const newValue = [...value, d];
            setValue("accessGroups", newValue, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
            });
        }
    };

    return (
        <FormUI.Label
            label="Adgangsgrupper"
            fullWidth
            errorText={errors["accessGroups"]?.message}
        >
            <Stack direction="row" alignItems="center">
                {accessGroups.map((d) => (
                    <Box m={1} key={d.id}>
                        <Chip
                            label={d.name}
                            sx={{
                                borderRadius: 2,
                                borderColor: value.find(
                                    (x) => x.id === d.id
                                ) ? "transparent" : undefined,
                                backgroundColor: value.find(
                                    (x) => x.id === d.id
                                )
                                    ? d.color + "90"
                                    : "transparent",
                                "&:hover": {
                                    backgroundColor: d.color + "60",
                                },
                            }}
                            variant="outlined"
                            onClick={() => handleToggle(d)}
                        />
                    </Box>
                ))}
            </Stack>
        </FormUI.Label>
    );
}
