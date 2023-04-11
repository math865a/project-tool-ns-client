import { useWorkpackage } from "~/src/state"

export const useGantt = () => {
    const {Gantt} = useWorkpackage();
    return Gantt;
}