import { FormOption } from "@math865a/project-tool.types";
import {
    Checkbox,
    FormControlLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    Typography,
    RadioGroup as MuiRadioGroup,
    Radio as MuiRadio,
    Stack,
    Chip,
    Box,
    InputProps,
} from "@mui/material";
import { useEffect } from "react";
import { Path, useWatch } from "react-hook-form";
import { FieldValues, useFormContext } from "react-hook-form";
import { Child, FormUI, IconDef, Symbol, SymbolProps } from "~/src/design-system";
import { ColorPickerControl } from "~/src/design-system";

interface DefaultProps<T extends FieldValues = FieldValues> {
    name: Path<T>;
    label: string;
    widthFrac?: number;
    required?: boolean;
    fullWidth?: boolean;
    disabled?: boolean;
}

interface TextProps<T extends FieldValues = FieldValues>
    extends DefaultProps<T> {
    adornmentText?: string;
    rows?: number;
    autoFocus?: boolean;
    minRows?: number;
    maxRows?: number;
    placeholder?: string;
    type?: InputProps["type"]
    helperText?: Child
}

function Text<T extends FieldValues = FieldValues>({
    name,
    label,
    widthFrac,
    required = false,
    fullWidth = false,
    adornmentText,
    rows,
    disabled = false,
    autoFocus,
    minRows,
    maxRows,
    placeholder,
    type,
    helperText
}: TextProps<T>) {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    return (
        <FormUI.Label
            required={required}
            widthFrac={widthFrac}
            fullWidth={fullWidth}
            label={label}
            errorText={errors[name]?.message as string | undefined}
        >
            <Stack justifyContent="flex-start" spacing={0.5}>
            <OutlinedInput
                placeholder={placeholder}
                readOnly={disabled}
                fullWidth
                autoFocus={autoFocus}
                multiline={rows || minRows || maxRows ? true : false}
                rows={rows}
                minRows={minRows}
                maxRows={maxRows}
                type={type}
                {...register(name)}
                size="small"
                error={errors[name] !== undefined}
                endAdornment={
                    adornmentText && (
                        <FormUI.TextAdornment text={adornmentText} />
                    )
                }
            />
            {helperText}
            </Stack>
        </FormUI.Label>
    );
}

function Color<T extends FieldValues = FieldValues>({
    name,
    label,
    widthFrac,
    required = false,
    disabled,
    fullWidth = false,
}: DefaultProps<T>) {
    return (
        <FormUI.Label
            required={required}
            widthFrac={widthFrac}
            fullWidth={fullWidth}
            label={label}
            direction="row"
        >
            <ColorPickerControl name={name} disabled={disabled} />
        </FormUI.Label>
    );
}

interface SelectProps<T extends FieldValues = FieldValues>
    extends DefaultProps<T> {
    options: FormOption[];
    multiple?: boolean;
}

function Dropdown<T extends FieldValues = FieldValues>({
    name,
    label,
    widthFrac,
    required = false,
    fullWidth = false,
    options,
    disabled,
}: SelectProps<T>) {
    const {
        register,
        formState: { errors },
        control,
        setValue,
    } = useFormContext();

    const value = useWatch({ control, name: name });

    if (options.length === 0) return null;

    return (
        <FormUI.Label
            required={required}
            widthFrac={widthFrac}
            fullWidth={fullWidth}
            label={label}
            errorText={errors[name]?.message as string | undefined}
        >
            <Select
                onChange={(e, v) => {
                    setValue(name, e.target.value as T[typeof name], {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                    });
                }}
                readOnly={disabled}
                name={name}
                size="small"
                value={value}
                error={errors[name] !== undefined}
                renderValue={(value) => {
                    const val = value as unknown as string;
                    const values = options.find((d) => d.id === val);
                    return (
                        <Typography fontSize={12} pt={0.25}>
                            {values?.name}
                        </Typography>
                    );
                }}
            >
                {options.map((d) => (
                    <MenuItem value={d.id} key={d.id}>
                        <ListItemText
                            primary={d.name}
                            primaryTypographyProps={{
                                fontSize: 12,
                            }}
                        />
                    </MenuItem>
                ))}
            </Select>
        </FormUI.Label>
    );
}

function Boolean<T extends FieldValues = FieldValues>({
    name,
    label,
    disabled,
    widthFrac,
    fullWidth = false,
}: DefaultProps<T>) {
    const {
        register,
        formState: { errors },
        control,
        setValue,
    } = useFormContext();

    const value: boolean = useWatch({ control, name });

    return (
        <FormControlLabel
            control={
                <Checkbox
                    readOnly={disabled}
                    name={name}
                    onChange={ disabled ? undefined : (e, v) =>
                        setValue(name, v as T[typeof name], {
                            shouldValidate: true,
                            shouldDirty: true,
                            shouldTouch: true,
                        })
                    }
                    checked={value}
                    size="small"
                />
            }
            label={label}
        />
    );
}

interface RadioControlOption {
    label: string;
    value: string | number;
    icon?: IconDef;
    symbolProps?: Omit<SymbolProps, "icon">;
}

interface RadioGroupControlProps<T extends FieldValues = FieldValues>
    extends DefaultProps<T> {
    options: RadioControlOption[];
    direction?: "row" | "column";
}

function RadioGroup<T extends FieldValues = FieldValues>({
    name,
    options,
    direction = "column",
    ...labelProps
}: RadioGroupControlProps<T>) {
    const {
        register,
        formState: { errors },
        control,
        setValue,
    } = useFormContext();

    const value: Path<keyof T> = useWatch({ control, name });

    const handleChange = (value: Path<keyof T>) => {
        setValue(name, value, {
            shouldDirty: true,
            shouldValidate: true,
            shouldTouch: true,
        });
    };

    return (
        <FormUI.Label {...labelProps}>
            <MuiRadioGroup
                value={value}
                onChange={(e, value) => handleChange(value as Path<keyof T>)}
                row={direction === "row"}
            >
                {options.map((d) => (
                    <FormControlLabel
                        key={d.value}
                        value={d.value}
                        control={<MuiRadio size="small" />}
                        label={
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={0.5}
                            >
                                <Symbol icon={d.icon} {...d.symbolProps} />
                                <Typography
                                    fontSize={12}
                                    color="text.secondary"
                                >
                                    {d.label}
                                </Typography>
                            </Stack>
                        }
                    />
                ))}
            </MuiRadioGroup>
        </FormUI.Label>
    );
}

function AdvancedDropdown<T extends FieldValues = FieldValues>({
    name,
    label,
    widthFrac,
    required = false,
    fullWidth = false,
    options,
}: SelectProps<T>) {}

export const Default = {
    Text,
    Color,
    Dropdown,
    Boolean,
    RadioGroup,
};
