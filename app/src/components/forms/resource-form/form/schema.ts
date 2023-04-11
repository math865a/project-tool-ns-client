import * as yup from "yup";

export const schema = yup.object({
    name: yup.string().required("En ressource skal have et navn."),
    initials: yup.string().required("Du mangler at angive en forkortelse."),
    color: yup.string().default("#416986"),
    costDefault: yup.number().default(0).min(0, "Lønnen skal minimum være 0."),
    costOvertime: yup.number().default(0).min(0, "Lønnen skal minimum være 0."),
    calendar: yup.string().required("Du mangler at angive en kalender."),
    resourceTypes: yup
        .array(
            yup.object({
                id: yup.string(),
                name: yup.string(),
                contractName: yup.string(),
            })
        )
        .default([]),
});