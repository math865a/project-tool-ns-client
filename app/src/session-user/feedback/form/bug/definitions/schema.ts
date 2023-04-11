import * as yup from "yup"

export const schema = yup.object({
    type: yup.string().required(),
    priority: yup.number().min(0).max(3).required(),
    summary: yup.string().required(),
    page: yup.string(),
    stepsToReproduce: yup.string(),
    expectedResult: yup.string(),
    actualResult: yup.string(),
    comments: yup.string(),
})