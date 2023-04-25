import { Stack, Unstable_Grid2 as Grid, Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Details, Page } from "~/src/design-system";
import { useWorkpackage } from "~/src/state";
import { Workdays } from "./stats/Workdays";
import { WorkStatus } from "./stats/Workstatus";

const StatsSection = observer(() => {
    const {
        Gantt: {
            Store: {
                ActivityStore: { Plan },
            },
        },
    } = useWorkpackage();

    return (
        <Page.Section xs={5} title="Planlægning" alignSelf="stretch">
            <Stack direction="row" alignItems="center" flexGrow={1}>
                <Box width="50%">
                    <Details.Container spacing={2}>
                        <Details.Item
                            title="Startdato"
                            value={Plan?.Interval.display.dates.long.start}
                            plValue={1}
                        />
                        <Details.Item
                            title="Slutdato"
                            value={Plan?.Interval.display.dates.long.end}
                            plValue={1}
                        />
                        <Details.Item
                            title="Varighed"
                            plValue={1}
                            value={<Workdays />}
                        />
                    </Details.Container>
                </Box>
                <Box width="50%">
                    <Details.Container spacing={2}>
                        <Details.Item
                            title="Arbejde"
                            plValue={1}
                            value={Plan?.Work.display.total + " time(r)"}
                        />
                        <Details.Item
                            title="Arbejde/dag"
                            plValue={1}
                            value={Plan?.Work.display.dailyWork + " time(r)"}
                        />
                        <Details.Item
                            title="Arbejdsstatus"
                            plValue={1}
                            value={<WorkStatus />}
                        />
                    </Details.Container>
                </Box>
            </Stack>
        </Page.Section>
    );
});

export default StatsSection;
