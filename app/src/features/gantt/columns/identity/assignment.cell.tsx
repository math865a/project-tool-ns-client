import { getContrastColor } from "~/util";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Assignment } from "gantt-models";

export const AssignmentIdentityCell = observer(
    ({ Assignment }: { Assignment: Assignment }) => {
        return (
            <Box
                flexGrow={1}
                display="flex"
                alignItems="center"
       
            >
                <Box minWidth={40}>
                    <Avatar
                        sx={{
                            height: 23,
                            width: 23,
                            backgroundColor:
                                Assignment.TeamMember?.resource.color,
                        }}
                    >
                        <Typography fontWeight="bold" fontSize={11} color={getContrastColor(Assignment?.TeamMember?.resource.color ?? "#fff")}>
                            {Assignment.TeamMember?.resource.avatarName}
                        </Typography>
                    </Avatar>
                </Box>
                <Stack spacing={-0.25}>
                    <Typography fontSize={12} color="text.secondary">
                        {Assignment.TeamMember?.resource.name}
                    </Typography>
                    <Typography
                        fontSize={11}
                        sx={{ color: (theme) => theme.palette.text.secondary }}
                    >
                        {Assignment.TeamMember?.resourceType.name}
                    </Typography>
                </Stack>
            </Box>
        );
    }
);
