import { Stack, Unstable_Grid2 as Grid, Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Details, Page } from "~/src/design-system";
import { useWorkpackage } from "~/src/state";
import { Workdays } from "./stats/Workdays";
import { WorkStatus } from "./stats/Workstatus";

const StatsSection = observer(() => {
    const {
        Gantt: {
            Store: {ActivityStore: {Plan}}
        },
    } = useWorkpackage();

    return (
        <Page.Section xs={12} title="Planlægning" alignSelf="stretch">
            <Stack direction="row" alignItems="center" flexGrow={1}>
                <Box width="50%">
                    <Details.Container>
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
                        <Details.Item title="Varighed" value={<Workdays />} />
                    </Details.Container>
                </Box>
                <Box width="50%">
                    <Details.Container>
                        <Details.Item
                            title="Arbejde (hh:mm)"
                            value={Plan?.Work.display.total}
                        />
                        <Details.Item
                            title="Arbejde/dag (hh:mm)"
                            value={Plan?.Work.display.dailyWork}
                        />
                        <Details.Item
                            title="Arbejdsstatus"
                            value={<WorkStatus />}
                        />
                    </Details.Container>
                </Box>
            </Stack>
        </Page.Section>
    );
});

export default StatsSection;
