import { useElementSize } from "@mantine/hooks";
import { Box, Stack } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Action, Subject } from "~/src/_definitions";
import ProjectManagerRoot from "~/src/components/project-manager/ProjectManagerRoot";
import { PlanDays, PlanPeriod, PlanWork } from "~/src/features";
import { Can } from "~/src/session-user";
import { useWorkpackage, useWorkpackageLoader } from "~/src/state";


export const PlanningSectionFooter = observer(() => {
    const {
        Gantt: {
            Analysis: { PlanningChart },
        },
    } = useWorkpackage();

    const {
        managers: { projectManager },
    } = useWorkpackageLoader()

    const { ref, height } = useElementSize();

    useEffect(() => {
        PlanningChart.footerHeight = height;
    }, [height]);

    return (
        <Box
            ref={ref}
            flexGrow={1}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            height={PlanningChart.footerHeight}
            minHeight={PlanningChart.footerHeight}
        >
            <Box>
                <Can I={Action.Write} a={Subject.Workpackages} passThrough>
                    {(allowed) => (
                        <ProjectManagerRoot
                            disabled={!allowed}
                            initialProjectManager={projectManager}
                            socketMessage="update:project-manager"
                        />
                    )}
                </Can>
            </Box>
            <Stack direction="row" alignItems="center" spacing={2}>
                <PlanPeriod />
                <PlanDays />
                <PlanWork />
            </Stack>
        </Box>
    );
});
