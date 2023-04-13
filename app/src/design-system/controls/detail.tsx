import { faChevronDown, faChevronUp } from "@fortawesome/pro-light-svg-icons";
import { FormOption } from "@math865a/project-tool.types";
import {
    Box,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import _ from "lodash";
import { useState } from "react";
import { Path, useWatch } from "react-hook-form";
import { FieldValues, useFormContext } from "react-hook-form";
import { FormUI } from "../forms";
import { Symbol } from "../symbol";
import { disableInteraction } from "~/styles";

interface DefaultProps<T extends FieldValues = FieldValues> {
    name: Path<T>;
    adornmentText?: string;
    width?: number;
    placeHolder?: string;
    disabled?: boolean;
}

interface TextControlProps<T extends FieldValues = FieldValues>
    extends DefaultProps<T> {
    rows?: number;
    select?: boolean;
}

function Text<T extends FieldValues = FieldValues>({
    name,
    adornmentText,
    width,
    rows,
    placeHolder = "-",
    disabled,
}: TextControlProps<T>) {
    const { register } = useFormContext<T>();

    return (
        <OutlinedInput
            fullWidth={!width}
            style={disabled ? disableInteraction : undefined}
            sx={{
                width: width,
                py: rows ? 0.5 : undefined,
                color: "text.secondary",
                fontFamily: "Poppins",
                fontSize: 13,
                ...(disabled
                    ? {
                          "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "transparent",
                          },
                      }
                    : {}),
            }}
            size="small"
            readOnly={disabled}
            {...register(name)}
            className="display-text"
            endAdornment={
                adornmentText && <FormUI.TextAdornment text={adornmentText} />
            }
            multiline={rows !== undefined}
            rows={rows}
            placeholder={placeHolder}
        />
    );
}

interface SelectProps<T extends FieldValues = FieldValues>
    extends DefaultProps<T> {
    options: FormOption[];
}

function Dropdown<T extends FieldValues = FieldValues>({
    name,
    adornmentText,
    width,
    placeHolder = "-",
    options,
    disabled,
}: SelectProps<T>) {
    const {
        register,
        formState: { errors },
        control,
    } = useFormContext();

    const value = useWatch({ control, name: name });

    const [open, setOpen] = useState<boolean>(false);
    const [isHovering, setIsHovering] = useState<boolean>(false);

    const Icon = () => {
        return (
            <Box mr={2} minHeight={5}>
                {(isHovering || open) && (
                    <Symbol icon={open ? faChevronDown : faChevronUp} />
                )}
            </Box>
        );
    };

    if (options.length === 0) return null;

    return (
        <Select
            {...register(name)}
            fullWidth={!width}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            IconComponent={Icon}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onBlur={() => setIsHovering(false)}
            style={disabled ? disableInteraction : undefined}
            open={open}
            sx={{
                width: width,
                py: 0,
               
            }}
            size="small"
            value={value}
       
            error={errors[name] !== undefined}
            SelectDisplayProps={{
                style: {
                    paddingTop: "5.5px",
                    paddingBottom: "5.5px",
                    paddingLeft: "12px",
                    borderColor: "transparent",
                },
            }}
            placeholder={placeHolder}
            className="display-text"
            renderValue={(value) => {
                const record = options.find((d) => d.id === value);
                return (
                    <Typography color="text.secondary" fontSize={13}>
                        {record?.name}
                    </Typography>
                );
            }}
            endAdornment={
                adornmentText && <FormUI.TextAdornment text={adornmentText} />
            }
        >
            {options.map((d) => (
                <MenuItem value={d.id} key={d.id}>
                    <ListItemText
                        primary={d.name}
                        primaryTypographyProps={{
                            fontSize: 13,
                        }}
                    />
                </MenuItem>
            ))}
        </Select>
    );
}

export const Detail = {
    Text,
    Dropdown,
};
