import { action } from "mobx";
import { useLocalObservable } from "mobx-react-lite";
import { useState } from "react";


export const useHoverBar = () => {
    const [data, setData] = useState<any | null>(null);

    const onMouseOver = (data: any) => {
        setData(data);
    };

    const onMouseLeave = () => {
        setData(null);
    };

    return {
        hoverData: data,
        onMouseOver,
        onMouseLeave,
    };
};
