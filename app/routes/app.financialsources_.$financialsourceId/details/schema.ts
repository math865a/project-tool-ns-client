import * as yup from "yup";
export const schema = yup.object({
    name: yup.string().required("Du mangler at angive et navn"),
});
