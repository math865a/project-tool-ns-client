import { FormResponse } from "@math865a/project-tool.types";
import { useSubmit } from "@remix-run/react";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import { Socket } from "socket.io-client";
import { useInform } from "../design-system/feedback/info";
import { useSocketContext } from "../socket";
import { toFormData } from "~/util";


interface UseSubmitProps<
    I extends FieldValues = FieldValues,
    O extends FieldValues = I
> {
    transform?: (values: I) => O;
    afterSubmit?: (data: I | O) => void;

}

export interface UseActionSubmitProps<
    I extends FieldValues = FieldValues,
    O extends FieldValues = I
> extends UseSubmitProps<I, O> {
    action?: string;
}

export interface UseSocketSubmitProps<
    I extends FieldValues = FieldValues,
    O extends FieldValues = I,
    C extends any = any
> extends UseSubmitProps<I, O> {
    message: string;
    callback?: (data: FormResponse) => any;
    inform: ReturnType<typeof useInform>["inform"]
    socket?: Socket
}


const useActionSubmit = <
    I extends FieldValues = FieldValues,
    O extends FieldValues = I
>(
    props?: UseActionSubmitProps<I, O>
) => {
    const submit = useSubmit();

    const onSubmit = (values: I) => {
        const formData = new FormData();
        const transformedValues: O | I = props?.transform
            ? props?.transform(values)
            : values;
        submit(toFormData(transformedValues), {
            action: props?.action,
            method: "post",
            replace: true,
        });
        props?.afterSubmit && props.afterSubmit(transformedValues);
    };

    return onSubmit;
};

const useSocketSubmit = <
    I extends FieldValues = FieldValues,
    O extends FieldValues = I,
    C extends any = any
>({
    message,
    transform,
    afterSubmit,
    callback,
    inform,
    socket: socketProp
}: UseSocketSubmitProps<I, O, C>) => {
    const socketContext = useSocketContext();
    const { reset } = useFormContext();

    const socket = socketProp || socketContext;

    const handleResponse = (values: O | I, response: FormResponse) => {
        if (response.status === "error" && response?.message){
            inform(response.message, "error")
        } else if (response.status === "ok" && response.message){
            inform(response.message, "success")
            afterSubmit && afterSubmit(values)
            reset(values)
        }
        callback && response && callback(response);
    }

    const onSubmit = (values: I) => {
        const data = transform ? transform(values) : values;
   
        socket?.emit(message, data, (response: FormResponse) => handleResponse(data, response));
    };

    return onSubmit
   
};

export const formSubmit = {
    useSocketSubmit,
    useActionSubmit,
};
