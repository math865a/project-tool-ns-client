import _ from "lodash";
import { useCallback, useMemo, useState } from "react";
import { usePersist } from "./usePersist";
import { IOption, IUseOptionStateProps } from "./_types";

export const useOptionState = <
    T extends IOption = IOption,
    C extends any = any
>({
    initialValue,
    options,
    handleToggle,
    ...persistProps
}: IUseOptionStateProps<T, C>) => {
    const [currentValue, setCurrentValue] = useState<string>(initialValue);
    const persist = usePersist<C>(persistProps);

    const update = (newValue: T | null) => {
        if (handleToggle) {
            const val = handleToggle(newValue, value, options);
            if (val && val.id !== currentValue) {
                persist(val.id);
            }
        } else if (newValue && newValue.id !== currentValue) {
            setCurrentValue(newValue.id);
            persist(newValue.id);
        }
    };

    const findOption = useCallback(
        (id: string) => _.find(options, (d) => d.id === id) as T,
        [options]
    );

    const value = useMemo(
        () => findOption(currentValue),
        [currentValue, options]
    );

    return {
        state: value,
        update,
    };
};
