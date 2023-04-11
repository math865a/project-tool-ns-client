import { ProjectManager } from "@math865a/project-tool.types";
import { Stack, Tooltip, Typography } from "@mui/material";
import { Link } from "@remix-run/react";
import { Avatars } from "~/src/design-system";

export default function ProjectManagerDisplay({
    projectManager,
}: {
    projectManager: ProjectManager | null;
}) {
    if (!projectManager) return null;
    return (
        <Stack direction="row" alignItems="center" spacing={1} pr={1}>
            <Avatars.Individual subject={projectManager} size={28} />
            <Stack>
                <Tooltip title="Gå til">
                    <Typography
                        fontSize={12}
                        component={Link}
                        to={`/app/resources/${projectManager.id}`}
                        color="text.primary"
                        prefetch="intent"
                        sx={{
                            textDecoration: "none",
                            "&:hover": {
                                textDecoration: "underline",
                            },
                        }}
                    >
                        {projectManager.name}
                    </Typography>
                </Tooltip>
                <Typography fontSize={12} color="text.secondary">
                    Projektleder
                </Typography>
            </Stack>
        </Stack>
    );
}
