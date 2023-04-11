import { Stack, Tooltip, Typography } from "@mui/material";
import { Link } from "@remix-run/react";
import { useCapacityCharts } from "../../_state";
import { Action, Subject, usePermissions } from "~/src";

export default function TasksSectionTitle() {
    const {
        activeWorkpackage: { activeWorkpackage },
    } = useCapacityCharts();

    return (
        <Stack spacing={0.5}>
            <Stack direction="row" alignItems="center" spacing={1}>
                <Typography
                    fontSize={14}
                    fontWeight="bold"
                    color="text.secondary"
                >
                    Opgaver
                </Typography>
                <Typography
                    fontSize={14}
                    fontWeight="bold"
                    color="text.secondary"
                >
                    -
                </Typography>
        <WorkpackageLink/>
            </Stack>
            <Typography fontSize={12} color="text.secondary">
                {activeWorkpackage.name}
            </Typography>
        </Stack>
    );
}

function WorkpackageLink() {
    const {
        activeWorkpackage: { activeWorkpackage },
    } = useCapacityCharts();

    const permissions = usePermissions();

    if (permissions.can(Action.Read, Subject.Workpackages)) {
        return (
            <Tooltip title="Gå til">
                <Typography
                    fontSize={14}
                    component={Link}
                    prefetch="intent"
                    to={`/app/workpackages/${activeWorkpackage.id}`}
                    color="text.primary"
                    sx={{
                        textDecoration: "none",
                        "&:hover": {
                            textDecoration: "underline",
                        },
                    }}
                >
                    {activeWorkpackage.systematicName}
                </Typography>
            </Tooltip>
        );
    }
    return (
        <Typography fontSize={14} color="text.primary">
            {activeWorkpackage.systematicName}
        </Typography>
    );
}
