import * as yup from "yup"
export const schema = yup
    .object({
        contractId: yup.string().required(),
        name: yup.string().required(),
        abbrevation: yup.string().required()
    })
    .required();