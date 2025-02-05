import { Box, Stack, Typography } from "@mui/material";
import _ from "lodash";
import { useState } from "react";
import { Action, Avatars } from "~/src/design-system";
import { useProjectManagerMenu } from "./ProjectManagerMenuProvider";
import { IconPencil } from "@tabler/icons-react";

export default function ProjectManagerDisplay({
    displayMinWidth,
    pl,
    disabled,
}: {
    displayMinWidth: number;
    pl: number;
    disabled?: boolean;
}) {
    const { handleOpen, open, title, projectManager } = useProjectManagerMenu();

    const [isHovering, setIsHovering] = useState<boolean>(false);

    const showButton = (open || isHovering) && !disabled;

    return (
        <Box
            pl={pl}
            flexGrow={2}
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            onMouseOver={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <Stack direction="row" alignItems="center" spacing={2}>
                <Stack
                    sx={{ minWidth: displayMinWidth }}
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-start"
                    spacing={1}
                >
                    <Avatars.Individual
                        subject={projectManager}
                        size={25}
                        fontSize={11}
                    />
                    <Stack spacing={-0.5}>
                        <Typography fontSize={12} color="text.primary">
                            {projectManager.name}
                        </Typography>
                        <Typography fontSize={12} color="text.secondary">
                            {_.capitalize(title)}
                        </Typography>
                    </Stack>
                </Stack>
                <Box minWidth={20}>
                    {showButton && (
                        <Action.Symbol
                            icon={IconPencil}
                            title={`Vælg ${_.lowerCase(title)}`}
                            onClick={handleOpen}
                        />
                    )}
                </Box>
            </Stack>
        </Box>
    );
}
