import { useState } from 'react';

export const useSort = () => {
    const [order, setOrder] = useState<1 | -1>(1);

    const toggleSort = () => {
        setOrder((prev) => (prev === 1 ? -1 : 1));
    };

    return {
        toggleSort,
        order,
    };
};
