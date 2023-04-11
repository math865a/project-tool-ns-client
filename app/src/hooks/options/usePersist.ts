import { useSocketContext } from "~/src/socket";
import { IUsePersistProps } from "./_types";

export const usePersist = <C extends any = any>({
    recordId,
    persistMessage,
    callback,
    recordKey = "recordId",
    valueKey = "valueId",
}: IUsePersistProps<C>) => {
    const socket = useSocketContext();

    const persist = (value: string) => {
        const dto = { [recordKey]: recordId, [valueKey]: value }
        socket?.emit(
            persistMessage,
            dto,
            //callback
        );
    };

    return persist;
};
