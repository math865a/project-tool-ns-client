import { getContrastColor } from "~/util";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Assignment } from "gantt-models";
import { Avatars } from "~/src/design-system";

export const AssignmentIdentityCell = observer(
    ({ Assignment }: { Assignment: Assignment }) => {
        return (
            <Box
                flexGrow={1}
                display="flex"
                alignItems="center"
       
            >
                <Box minWidth={40}>
                    <Avatars.Individual subject={Assignment.TeamMember?.Resource} size={23}/>
  
                </Box>
                <Stack spacing={-0.25}>
                    <Typography fontSize={12} color="text.secondary">
                        {Assignment.TeamMember?.Resource.name}
                    </Typography>
                    <Typography
                        fontSize={11}
                        sx={{ color: (theme) => theme.palette.text.secondary }}
                    >
                        {Assignment.TeamMember?.ResourceType.name}
                    </Typography>
                </Stack>
            </Box>
        );
    }
);
