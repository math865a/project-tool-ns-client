import {
    Box,
    Stack,
    Typography
} from "@mui/material";
import { computed } from "mobx";
import { observer } from "mobx-react-lite";
import { useFormContext, useWatch } from "react-hook-form";
import { useWorkpackage } from "useWorkpackage";
import { Avatars } from "~/src/design-system";
import { TeamMember } from "gantt-models";

export const TeamMemberControl = observer(() => {
    const {
        Gantt: { TeamStore },
    } = useWorkpackage();

    const { control, setValue } = useFormContext();
    const value: string = useWatch({ control, name: "agentId" });
    const record = computed(() => {
        return TeamStore.TeamMembers.find(
            (d) => d.id === value
        ) as TeamMember
    })
    return (
        <Box flexGrow={1} pl={2} py={2}>
                     <Stack
                            spacing={1.5}
                            direction="row"
                            alignItems="center"
                        >
                            <Avatars.Individual
                                subject={record.get().resource}
                                size={24}
                            />
                            <Stack spacing={-0.25}>
                                <Typography fontSize={13}>
                                    {record.get().resource.name}
                                </Typography>
                                <Typography
                                    color="text.secondary"
                                    fontSize={11}
                                >
                                    {record.get().resourceType.name}
                                </Typography>
                            </Stack>
                        </Stack>


        </Box>
    );
});

/*<FormUI.Label label="Ressource" widthFrac={1.5}>
            <Select
                onChange={(e: SelectChangeEvent) => {
                    setValue("agentId", e.target.value);
                }}
                size="small"
                variant="standard"
                value={value}
                MenuProps={{ PaperProps: { sx: { minWidth: 150 } } }}
                renderValue={(value) => {
                    const record = TeamStore.TeamMembers.find(
                        (d) => d.id === value
                    ) as TeamMember;

                    return (
                        <Stack
                            spacing={1.5}
                            direction="row"
                            alignItems="center"
                        >
                            <Avatars.Individual
                                subject={record.resource}
                                size={24}
                            />
                            <Stack spacing={-0.25}>
                                <Typography fontSize={13}>
                                    {record.resource.name}
                                </Typography>
                                <Typography
                                    color="text.secondary"
                                    fontSize={11}
                                >
                                    {record.resourceType.name}
                                </Typography>
                            </Stack>
                        </Stack>
                    );
                }}
            >
                {TeamStore.TeamMembers.map((member) => (
                    <MenuItem value={member.id}>
                        <ListItemAvatar sx={{ minWidth: 40 }}>
                            <Avatars.Individual
                                subject={member.resource}
                                size={24}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={member.resource.name}
                            secondary={member.resourceType.name}
                            primaryTypographyProps={{ fontSize: 12 }}
                            secondaryTypographyProps={{ fontSize: 12 }}
                        />

                        <ListItemSecondaryAction>
                            {member.id === value ? (
                                <Symbol icon={faCheck} />
                            ) : null}
                        </ListItemSecondaryAction>
                    </MenuItem>
                ))}
            </Select>
        </FormUI.Label>*/