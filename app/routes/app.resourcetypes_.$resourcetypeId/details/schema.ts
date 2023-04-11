import * as yup from "yup"
export const schema = yup
    .object({
        name: yup.string().required(),
        abbrevation: yup.string().required(),
        salesDefault: yup.number().default(0),
        salesOvertime: yup.number().default(0),
        typeNo: yup.number().required().min(1),
    })
    .required();