import _ from "lodash";
import { useMemo } from "react";
import { ITask, IWorkpackageIdentity } from "~/src";

export interface IWorkpackageIdentityColored extends IWorkpackageIdentity {
    color: string;
}

export const useWorkpackages = (tasks: ITask[]) => {
    const workpackages: IWorkpackageIdentityColored[] = useMemo(() => {
        return _.map(
            _.uniqBy(
                _.map(tasks, (d) => d.workpackage),
                (d) => d.id
            ),
            (d, index) => ({
                ...d,
                color: colors[index],
            })
        );
    }, [tasks]);

    return workpackages
};

const colors = [
    "#A8C5DA",
    "#BAEDBD",
    "#C6C7F8",
    "#B1E3FF",
    "#95A4FC",
    "#A1E3CB",
    "#A8C5DA",
    "#BAEDBD",
    "#C6C7F8",
    "#B1E3FF",
    "#95A4FC",
    "#A1E3CB",
    "#A8C5DA",
    "#BAEDBD",
    "#C6C7F8",
    "#B1E3FF",
    "#95A4FC",
    "#A1E3CB",
    "#A8C5DA",
    "#BAEDBD",
    "#C6C7F8",
    "#B1E3FF",
    "#95A4FC",
    "#A1E3CB",
    "#A8C5DA",
    "#BAEDBD",
    "#C6C7F8",
    "#B1E3FF",
    "#95A4FC",
    "#A1E3CB",
    "#A8C5DA",
    "#BAEDBD",
    "#C6C7F8",
    "#B1E3FF",
    "#95A4FC",
    "#A1E3CB",
];
