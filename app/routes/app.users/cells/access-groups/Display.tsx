import { Box, Chip, Stack } from "@mui/material";
import { useLoaderData } from "@remix-run/react";
import { useMemo } from "react";
import { AccessGroupOption } from "~/src";
import { UsersLoader } from "../../route";
import { AccessGroupsCellProps } from "./AccessGroupsCell";

export function AccessGroupsDisplay({
    value,
    isEditing,
    handleToggle,
}: AccessGroupsCellProps & {
    isEditing: boolean;
    handleToggle: (accessGroupId: string) => void;
}) {
    const { accessGroupOptions } = useLoaderData<UsersLoader>();

    const accessGroups = useMemo(() => {
        return accessGroupOptions.filter((s) => value.includes(s.id));
    }, [accessGroupOptions, value]);

    return (
        <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="flex-start"
            flexGrow={1}
        >
            <Box
                width="100%"
                maxWidth="100%"
                overflow="hidden"
                pt={0.5}
                pl={0.5}
            >
                <Stack
                    direction="row"
                    maxWidth="100%"
                    flexWrap="wrap"
                    justifyContent="flex-start"
                >
                    {accessGroups.map((s) => (
                        <Box width="min-width" m={0.5} key={s.name}>
                            <AccessGroupChip
                                accessGroup={s}
                                handleToggle={handleToggle}
                                isEditing={isEditing}
                            />
                        </Box>
                    ))}
                </Stack>
            </Box>
        </Stack>
    );
}

function AccessGroupChip({
    accessGroup,
    isEditing,
    handleToggle,
}: {
    accessGroup: AccessGroupOption;
    isEditing: boolean;
    handleToggle: (accessGroupId: string) => void;
}) {


    return (
        <Chip
            label={accessGroup.name}
            sx={{
                transition: "all 200ms ease",
                borderRadius: 2,
                fontSize: 13,
                backgroundColor: accessGroup.color + "60",
                color: "text.primary",
                borderColor: "transparent",
            }}
            clickable={false}
            variant="outlined"
            onDelete={
                isEditing ? () => handleToggle(accessGroup.id) : undefined
            }
        />
    );
}
