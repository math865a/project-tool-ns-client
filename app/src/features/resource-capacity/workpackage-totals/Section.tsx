import { Typography } from "@mui/material";
import _ from "lodash";
import { useMemo } from "react";
import { Fallback, Page } from "~/src/design-system";
import { useCapacityCharts } from "../_state";
import { WorkpackageTotalsChart } from "./Chart";

export function WorkpackageTotalsSection() {
    const {
        workpackage: { totals },
        activeWorkpackage: { activeWorkpackage },
    } = useCapacityCharts();

    const total = useMemo(() => {
        return _.sumBy(totals, (d) => d.booked);
    }, [totals]);

    return (
        <Page.Section
            title="Timer fordelt på arbejdspakke"
            xs={4}
            xxl={4}
            px={1}
            pxTitle={2}
            titlePadding={0}
            alignSelf="stretch"
            overflowX
            overflowY
            startActions={
                activeWorkpackage ? (
                    <Typography>{total + " timer i alt"}</Typography>
                ) : null
            }
        >
            {!activeWorkpackage ? (
                <Fallback.Empty />
            ) : (
                <WorkpackageTotalsChart />
            )}
        </Page.Section>
    );
}
