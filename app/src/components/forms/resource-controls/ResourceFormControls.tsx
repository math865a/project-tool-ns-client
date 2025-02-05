import { ResourceTypeOption } from "~/src/_definitions";
import { Controls, FormUI } from "~/src/design-system";
import { ResourceTypesControl } from "./Control.Resourcetypes";
import { useMemo } from "react";

export function ResourceControls({
    prefix,
    resourceTypes,
    calendars,
    autoFocus = false,
}: {
    resourceTypes: ResourceTypeOption[];
    calendars: any[];
    prefix?: string;
    autoFocus?: boolean;
}) {
    const names = useMemo(() => {
        if (prefix) {
            return {
                initials: `${prefix}.initials`,
                costDefault: `${prefix}.costDefault`,
                costDefaultOvertime: `${prefix}.costOvertime`,
                calendar: `${prefix}.calendar`,
                resourceTypes: `${prefix}.resourceTypes`,
            };
        } else {
            return {
                initials: `initials`,
                costDefault: `costDefault`,
                costDefaultOvertime: `costOvertime`,
                calendar: `calendar`,
                resourceTypes: `resourceTypes`,
            };
        }
    }, [prefix]);

    return (
        <>
            <Controls.Default.Text
                name={names.initials}
                label="Forkortelse"
                required
                autoFocus={autoFocus}
            />

            <FormUI.HStack>
                <Controls.Default.Text
                    name={names.costDefault}
                    label="Kostpris"
                    widthFrac={0.75}
                    adornmentText="kr/t"
                />
                <Controls.Default.Text
                    name={names.costDefaultOvertime}
                    label="Kostpris overtid"
                    widthFrac={0.75}
                    adornmentText="kr/t"
                />
            </FormUI.HStack>
            <ResourceTypesControl
                options={resourceTypes}
                name={names.resourceTypes}
            />
            <Controls.Default.Dropdown
                name={names.calendar}
                label="Kalender"
                widthFrac={1}
                required
                options={calendars}
            />
        </>
    );
}
