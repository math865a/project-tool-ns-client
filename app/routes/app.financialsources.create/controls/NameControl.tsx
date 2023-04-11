import { OutlinedInput } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { FormUI } from "~/src/design-system";


export default function NameControl() {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    return (
        <FormUI.VStack>
            <FormUI.Label
                required
                widthFrac={1}
                label="Navn"
                errorText={errors["name"]?.message as string | undefined}
            >
                <OutlinedInput
                    fullWidth
                    {...register("name")}
                    size="small"
                    error={errors["name"] !== undefined}
                />
            </FormUI.Label>
        </FormUI.VStack>
    );
}