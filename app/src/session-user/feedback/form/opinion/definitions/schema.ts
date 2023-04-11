import * as yup from 'yup';

export const schema = yup.object({
    type: yup.string().required(),
    topic: yup.string().required("Du mangler at angive et emne."),
    text: yup.string().required("Du mangler at angive en besked."),
})

