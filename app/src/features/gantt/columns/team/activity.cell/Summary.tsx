import { Box, AvatarGroup, Avatar, Typography } from "@mui/material";
import _ from "lodash";
import { observer } from "mobx-react-lite";
import { Activity } from "gantt-models";
import { getAvatarName, getContrastColor } from "~/util";

export const Summary = observer(({ Activity }: { Activity: Activity }) => {
    return (
        <Box
            flexGrow={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <AvatarGroup>
                {_.map(Activity.Team, (t) => (
                    <Avatar
                        key={"avatar-" + t.id}
                        sx={{
                            height: 25,
                            width: 25,
                            backgroundColor: t.Resource.color,
                        }}
                    >
                        <Typography
                            fontWeight="bold"
                            fontSize={11}
                            sx={{ color: getContrastColor(t.Resource.color) }}
                        >
                            {getAvatarName(t.Resource.name)}
                        </Typography>
                    </Avatar>
                ))}
            </AvatarGroup>
        </Box>
    );
});
