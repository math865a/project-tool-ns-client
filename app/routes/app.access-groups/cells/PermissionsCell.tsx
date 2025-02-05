import {
    GridRenderEditCellParams,
    useGridApiContext,
} from "@mui/x-data-grid-pro";
import { useMemo } from "react";
import { Action, IconDef } from "~/src/design-system";
import { AccessGroupRow, Permissions } from "../definitions/types";
import { Box, Stack } from "@mui/material";
import {
    IconEdit,
    IconEditOff,
    IconEye,
    IconEyeSpark,
    IconTrash,
    IconTrashOff,
} from "@tabler/icons-react";

export default function PermissionsCell({
    id,
    value,
    field,
    isEditing,
}: GridRenderEditCellParams<AccessGroupRow, Permissions> & {
    isEditing: boolean;
}) {
    const apiRef = useGridApiContext();

    const handleToggle = (permission: keyof Permissions) => {
        console.log(id, value, field);
        if (!value || !isEditing) return;
        const newValue = {
            ...value,
            [permission]: !value[permission],
        };
        apiRef.current.setEditCellValue({ id, field, value: newValue });
    };

    if (!value) return null;

    return (
        <Box
            width={125}
            display="flex"
            alignItems="center"
            justifyContent="center"
            height={25}
            sx={{ borderLeft: (theme) => "1px solid rgba(0,0,0,0.05)" }}
        >
            <Stack direction="row" alignItems="center">
                <Permission
                    permission="read"
                    value={value.read}
                    onToggle={handleToggle}
                    disabled={!isEditing}
                />
                <Permission
                    permission="write"
                    value={value.write}
                    onToggle={handleToggle}
                    disabled={!isEditing}
                />
                <Permission
                    permission="delete"
                    value={value.delete}
                    onToggle={handleToggle}
                    disabled={!isEditing}
                />
            </Stack>
        </Box>
    );
}

function Permission({
    permission,
    value,
    onToggle,
    disabled = false,
}: {
    permission: keyof Permissions;
    value: boolean;
    onToggle: (permission: keyof Permissions) => void;
    disabled?: boolean;
}) {
    const { active, inactive } = permissionIconMap[permission];

    const actionProps = useMemo(() => {
        return value ? active : inactive;
    }, [value, active, inactive]);

    return (
        <Action.Symbol
            title={actionProps.title}
            disableFocusRipple={disabled}
            disableRipple={disabled}
            disableTouchRipple={disabled}
            iconSize={0.9}
            icon={actionProps.icon}
            onClick={() => onToggle(permission)}
            sx={{ cursor: disabled ? "default" : "pointer" }}
        />
    );
}

const permissionIconMap: {
    [property in keyof Permissions]: {
        active: {
            icon: IconDef;
            title: string;
        };
        inactive: {
            icon: IconDef;
            title: string;
        };
    };
} = {
    read: {
        active: {
            icon: IconEye,
            title: "Kan læse",
        },
        inactive: {
            icon: IconEyeSpark,
            title: "Kan ikke læse",
        },
    },
    write: {
        active: {
            icon: IconEdit,
            title: "Kan redigere",
        },
        inactive: {
            icon: IconEditOff,
            title: "Kan ikke redigere",
        },
    },
    delete: {
        active: {
            icon: IconTrash,
            title: "Kan slette",
        },
        inactive: {
            icon: IconTrashOff,
            title: "kan ikke slette",
        },
    },
};
