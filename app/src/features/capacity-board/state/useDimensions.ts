import { create } from "zustand";

export const useDimensions = create((set, get) => ({
    dataWidth: 800,
    updateWidth: (newWidth: number) => set({ dataWidth: newWidth }),
}));

export const createDimensionsSlice = (
    set: (partial: unknown, replace?: boolean | undefined) => void
) => ({
    dataWidth: 800,
    updateWidth: (newWidth: number) => set({ dataWidth: newWidth }),
});
