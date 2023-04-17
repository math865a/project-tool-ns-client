import { useElementSize } from "@mantine/hooks";
import { CapacityBoardState, SetCapacityBoardState } from "./useBoardState";

export const useDimensions = (
    state: CapacityBoardState,
    setState: SetCapacityBoardState
) => {
    const { ref, width, height } = useElementSize();



    
};
