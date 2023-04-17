import InfiniteLoader from "react-window-infinite-loader";
import { ICapacity } from "../types";
import { useCallback } from "react";

interface Props {
    hasNextPage: boolean;
    isNextPageLoading: boolean;
    items: ICapacity[];
    loadBatch: (startIndex: number, stopIndex: number) => void;
}

export default function LoaderWrapper({
    loadBatch,
    hasNextPage,
    isNextPageLoading,
    items,
}: Props) {
    const loadNextBatch = useCallback(
        (startIndex: number, stopIndex: number) => {
            if (isNextPageLoading) return null;
            return loadBatch(startIndex, stopIndex);
        },
        [isNextPageLoading, loadBatch]
    );
}
