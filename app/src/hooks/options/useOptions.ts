import { useEffect, useState } from "react";
import { useSocketContext } from "~/src/socket";
import { IOption, IUseOptionsProps } from "./_types";

export const useOptions = <T extends IOption = IOption>({
    loadMessage,
    loadParams = {},
}: IUseOptionsProps) => {
    const socket = useSocketContext();
    const [options, setOptions] = useState<T[]>([]);
    const [isLoadingOptions, setIsLoadingOptions] = useState<boolean>(false);

    const loadOptions = () => {
        setIsLoadingOptions(true);
        socket?.emit(loadMessage, loadParams, updateOptions);
    };

    const updateOptions = (options: T[]) => {
        setOptions(options);
        setIsLoadingOptions(false);
    };

    const clearOptions = () => {
        setOptions([]);
    };

    useEffect(() => {
        return () => {
            clearOptions()
        }
    },[])

    return {
        options,
        isLoadingOptions,
        loadOptions,
        clearOptions
    };
};
