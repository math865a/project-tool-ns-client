import { Box } from "@mui/material";
import { ResourceTypeChips } from "./ResourceTypeChips";
import ResourceTypesEditor from "./ResourceTypesEditor";
import ResourceTypeProvider from "./_provider";
import { Details } from "~/src/design-system";
import { useHover } from "@mantine/hooks";

export function ResourceTypes() {
    const { hovered, ref } = useHover();
    return (
        <ResourceTypeProvider>
            <Box flexGrow={1} ref={ref}>
                <Details.Item
                    xsTitle={4}
                    xsValue={4}
                    title="Ressourcetyper"
                    action={<ResourceTypesEditor isHovering={hovered} />}
                    value={<ResourceTypeChips />}
                />
            </Box>
        </ResourceTypeProvider>
    );
}
