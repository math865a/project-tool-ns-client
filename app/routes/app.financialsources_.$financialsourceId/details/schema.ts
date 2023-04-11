import * as yup from "yup"
export const schema = yup
    .object({
        financialsourceId: yup.string().required(),
        name: yup.string().required(),
    })
    .required();