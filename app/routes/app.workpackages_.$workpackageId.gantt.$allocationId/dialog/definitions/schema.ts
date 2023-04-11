import * as yup from "yup"

export const schema = yup.object({
    id: yup.string().required(),
    agentId: yup.string().required(),
    startDate: yup.string().required(),
    endDate: yup.string().required(),
    defaultWork: yup.number().required().min(0).default(0),
    overtimeWork: yup.number().required().min(0).default(0),
})