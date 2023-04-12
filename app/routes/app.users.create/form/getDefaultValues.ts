import { AccessGroupOption, ResourceTypeOption } from "~/src";
import { ICreateValues, IFormValues, IOptions } from "./types";
import { generateId } from "~/util";
import { defaultColors } from "~/src/design-system/controls/color-picker/defaultColors";

export function getDefaultValues(options: IOptions): IFormValues {
    //const accessGroup = accessGroups.find((g) => g.isDefault);
    //if (!accessGroup) throw new Error("No default access group found");
    let accessGroups: AccessGroupOption[] = [];
    if (options.accessGroups.length === 1) {
        accessGroups = [options.accessGroups[0]];
    }

    let calendar: string = "";
    if (options.calendars.length === 1) {
        calendar = options.calendars[0].id;
    }

    let resourceTypes: ResourceTypeOption[] = [];
    if (options.resourceTypes.length === 1) {
        resourceTypes = [options.resourceTypes[0]];
    }

    return {
        uid: generateId(),
        name: "",
        email: "",
        color: defaultColors[0],
        accessGroups: accessGroups,
        isProjectManager: false,
        connect: "Ingen",
        isResource: false,
        resourceDto: {
            initials: "",
            costDefault: 0,
            costOvertime: 0,
            calendar: calendar,
            resourceTypes: resourceTypes,
        },
        sendWelcomeEmail: false,
    };
}
