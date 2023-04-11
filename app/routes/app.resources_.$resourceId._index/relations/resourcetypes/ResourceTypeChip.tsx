import { faTrash } from "@fortawesome/pro-light-svg-icons";
import { useHover } from "@mantine/hooks";
import { Chip, Typography } from "@mui/material";
import { ResourceAgent, usePermissions } from "~/src";
import { Action } from "~/src/design-system";
import { disableInteraction } from "~/styles";
import { useResourceTypeContext } from "./_provider";
import { Subject, Action as A } from "~/src";
export function ResourceTypeChip({
    resourceType,
    disabled,
}: {
    resourceType: ResourceAgent;
    disabled?: boolean;
}) {
    const {
       requestDeletion,
       isDeleting
    } = useResourceTypeContext();

    const { ref, hovered } = useHover();

    const permissions = usePermissions();

    return (
        <Chip
            label={resourceType.name}
            sx={{
                fontSize: 12,
                borderRadius: 2,
                //borderColor: "transparent",
            }}
            icon={<Typography pl={1} fontSize={12} color="text.secondary">{resourceType.typeNo}</Typography>}
            variant="outlined"
            style={disabled ? (disableInteraction as React.CSSProperties) : {}}
            clickable={false}
            ref={ref}
            onDelete={() => requestDeletion(resourceType)}
            deleteIcon={
                hovered &&
                permissions.can(A.Write, Subject.Resources) &&
                permissions.can(A.Write, Subject.ResourceTypes) ? (
                    <Action.Symbol
                        icon={faTrash}
                        disabled={isDeleting}
                        title="Slet"
                        size="small"
                        iconSize={0.9}
                    />
                ) : (
                    <></>
                )
            }
        />
    );
}
