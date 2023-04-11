import * as yup from "yup";
export const schema = yup.object({
    workpackageId: yup.string(),
    contractId: yup.string().required("En kontrakt skal være tilknyttet"),
    financialSourceId: yup
        .string()
        .required("En finanskilde skal være tilknyttet"),
    name: yup.string().optional(),
    description: yup.string().optional(),
    serialNo: yup.string().required("Du mangler at angive et serienr."),
});
