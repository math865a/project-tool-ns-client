import { Box } from "@mui/material";
import { Assignment } from "gantt-models";
import { observer } from "mobx-react-lite";
import { ROW_HEIGHT } from "gantt/constants";
import { Action, Subject } from "~/src/_definitions";
import { Can } from "~/src/session-user";
import Closures from "../shared/Closures";
import Bar from "./allocation/Bar";
import { Preview } from "./allocation/Preview";
import SchedulingCanvas from "./canvas";
import { AllocationDndProvider } from "./dnd";

export const AssignmentTimelineCell = observer(
    ({ Assignment }: { Assignment: Assignment }) => {
        return (
            <Box
                width="100%"
                minWidth="100%"
                maxWidth="100%"
                height={ROW_HEIGHT}
                position="relative"
            >
                <Closures />
                <Can I={Action.Write} a={Subject.Workpackages}>
                    <SchedulingCanvas Assignment={Assignment} />
                </Can>
                <AllocationDndProvider Assignment={Assignment}>
                    <RenderAllocations Assignment={Assignment} />
                </AllocationDndProvider>
            </Box>
        );
    }
);

const RenderAllocations = observer(
    ({ Assignment }: { Assignment: Assignment }) => {
        return (
            <>
                {Assignment.Allocations.map((Allocation) => (
                    <>
                        <Bar Allocation={Allocation} key={Allocation.id} />
                        <Preview
                            Allocation={Allocation}
                            key={Allocation.id + "-preview"}
                        />
                    </>
                ))}
            </>
        );
    }
);
