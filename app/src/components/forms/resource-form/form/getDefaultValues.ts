import { ResourceTypeOption } from "~/src/_definitions";
import { IResourceFormOptons, IResourceFormValues } from "./types";
import { defaultColors, generateId } from "~/util";

export function getDefaultValues(
    options: IResourceFormOptons,
    base?: Pick<IResourceFormValues, "id" | "name" | "color">
): IResourceFormValues {
    let baseValues: Pick<IResourceFormValues, "id" | "name" | "color"> = {
        id: generateId(),
        name: "",
        color: defaultColors[0],
    };
    if (base) {
        baseValues = {
            ...base,
        };
    }

    let calendar = "";
    if (options.calendars.length > 0) {
        calendar = options.calendars[0].id;
    }

    return {
        ...baseValues,
        resourceTypes: [] as ResourceTypeOption[],
        initials: "",
        costDefault: 0,
        costOvertime: 0,
        calendar: calendar,
    };
}
