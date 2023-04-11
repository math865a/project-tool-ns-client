import { Box, Divider, Stack, TextField, Typography } from "@mui/material";
import { FormUI } from "design";
import { Duration as dur } from "luxon";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import v from "voca";
const reg = /[0-9,]*/;
export const WorkControl = observer(({allowed}: {allowed: boolean}) => {
    const { control, register, setValue } = useFormContext();

    const defaultWork: string = useWatch({ control, name: "defaultWork" });
    const overtimeWork: string = useWatch({ control, name: "overtimeWork" });

    const handleChange = (
        type: "defaultWork" | "overtimeWork",
        value: string
    ) => {
        let filtered = value.match(reg);
        if (filtered) {
            let val = filtered[0];
            if (val === ","){
                setValue(type, "", {shouldDirty: true, shouldValidate: true, shouldTouch: true})
            } else {
                setValue(type, val, {shouldDirty: true, shouldValidate: true, shouldTouch: true});
            }
            //const val = Number(filtered[0]) > 0 ? Number(filtered) : 0

        }
    };

    const total = useMemo(() => {
        return Number(
            (
                Number(String(defaultWork).replace(",", ".")) +
                Number(String(overtimeWork).replace(",", "."))
            ).toFixed(2)
        );
    }, [defaultWork, overtimeWork]);

    const displayTotal = useMemo(() => {
        const duration = dur
            .fromObject({ hours: total }, { locale: "da" })
            .shiftTo("hours", "minutes")
            .toHuman({ listStyle: "short", unitDisplay: "long" })
        if (duration === "0 timer og 0 minutter") {
            return "-";
        } else if (duration.startsWith("0 timer og ")) {
            return duration.replace("0 timer og ", "");
        } else if (duration.includes(" og 0 minutter")) {
            return duration.replace(" og 0 minutter", "");
        }
        return duration;
    }, [total]);

    const handleBlur = (type: "defaultWork" | "overtimeWork") => {
        const val = type === "defaultWork" ? String(defaultWork) : String(overtimeWork);
        if (val === ""){
            setValue(type, "0", {shouldDirty: true, shouldValidate: true, shouldTouch: true});
        } else if (val.startsWith(",")) {
            setValue(type, v.substring(val, 1, val.length), {shouldDirty: true, shouldValidate: true, shouldTouch: true});
        } else if (val.endsWith(",")) {
            setValue(type, v.substring(val, 0, val.length-1), {shouldDirty: true, shouldValidate: true, shouldTouch: true});
        }
    }

    return (
        <Stack direction="row" alignItems="center" spacing={3} pl={2}>
            <FormUI.Label label="Timer" widthFrac={0.5}>
                {allowed ? <TextField
                    value={defaultWork}
                    variant="standard"
                    size="small"
                    onBlur={() => handleBlur("defaultWork")}
                    onChange={(event) =>
                        handleChange("defaultWork", event.target.value)
                    }
                /> : <Typography>
                    {defaultWork}
                </Typography>}
            </FormUI.Label>
            <FormUI.Label label="Overarbejde (t)" widthFrac={0.5}>
                {allowed ? <TextField
                    value={overtimeWork}
                    onBlur={() => handleBlur("overtimeWork")}
                    onChange={(event) =>
                        handleChange("overtimeWork", event.target.value)
                    }
                    name="overtime"
                    variant="standard"
                    size="small"
                />: <Typography>{overtimeWork}</Typography>}
            </FormUI.Label>

            <Divider orientation="vertical" variant="middle" flexItem />

            <Box pt={3}>
                <Typography fontSize={16} fontWeight={550}>
                    {displayTotal}
                </Typography>
            </Box>
        </Stack>
    );
});
