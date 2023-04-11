import * as yup from "yup";
export const schema = yup.object({
    uid: yup.string(),
    password: yup
        .string()
        .required("Du mangler at angive en ny adgangskode.")
        .min(8, "Dit password skal minimum have en længe på 8 bogstaver/tal"),
    confirmPassword: yup
        .string()
        .required("Du skal bekræfte din nye adgangskode.")
        .oneOf(
            [yup.ref("password"), null],
            "Adgangskoderne stemmer ikke overens"
        ),
});