import * as yup from "yup";

export const schema = yup.object({
    name: yup.string().required("En ressourcetype skal have et navn."),
    abbrevation: yup.string().required("Du mangler at angive en forkortelse."),
    typeNo: yup
        .number()
        .required("Du mangler at angive et typenummer.")
        .min(1, "Typenummeret skal minimum være 1.")
        .default(1),
    salesDefault: yup.number().default(0).min(0, "Prisen skal minimum være 0."),
    salesOvertime: yup
        .number()
        .default(0)
        .min(0, "Prisen skal minimum være 0."),
    contract: yup.string().required("Du mangler at angive en kontrakt."),
    resources: yup
        .array(
            yup.object({
                id: yup.string(),
                name: yup.string(),
            })
        )
        .default([]),
});