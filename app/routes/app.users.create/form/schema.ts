import * as yup from "yup";

const resourceSchema = yup.object({
    initials: yup.string().required("Du mangler at angive en forkortelse."),
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

export const schema = yup.object({
    uid: yup.string().required(),
    name: yup.string().required("Du mangler at angive et navn."),
    email: yup
        .string()
        .email("Den angivede mail har et forkert format.")
        .required("Du mangler at angive en email."),
    color: yup.string(),
    isResource: yup.boolean(),
    isProjectManager: yup.boolean(),
    connect: yup.string(),
    resourceDto: yup.mixed().when(["isResource", "connected"], {
        is: [true, "Ingen"],
        then: resourceSchema,
        otherwise: yup.mixed().default(null),
    }),
    sendWelcomeMail: yup.boolean(),
    accessGroups: yup.array(yup.string())
});
