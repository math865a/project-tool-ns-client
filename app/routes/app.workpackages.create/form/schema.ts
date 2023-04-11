import * as yup from "yup";

export const schema = yup.object({
    name: yup.string().optional(),
    description: yup.string().optional(),
    contract: yup.string().required("Du mangler at angive en kontrakt."),
    financialSource: yup
        .string()
        .required("Du mangler at angive en finanskilde."),
    serialNo: yup.string().required("Du mangler at angive et serienummer."),
    startDate: yup.string(),
    endDate: yup.string(),
    projectManager: yup.string(),
    stage: yup.string()
});