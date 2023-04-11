import { faPencil } from "@fortawesome/pro-light-svg-icons";
import { useHover } from "@mantine/hooks";
import { Box, Menu, Typography } from "@mui/material";
import {
    GridRowId,
    GridRowModes,
    GridRowModesModel,
} from "@mui/x-data-grid-pro";
import { useMemo } from "react";
import { Action } from "~/src/design-system";
import { useMenuState } from "~/src/hooks/useMenu";
import UserPicker from "./UserPicker";

export interface UsersCellProps {
    id: GridRowId;
    value: string[];
    field: string;
    rowModesModel: GridRowModesModel;
}

export default function UsersCell({
    id,
    value: uids,
    field,
    rowModesModel,
}: UsersCellProps) {
    const suffix = useMemo(() => {
        if (uids.length === 1) return " Bruger";
        return " Brugere";
    }, [uids]);

    const isEditing = useMemo(() => {
        return rowModesModel[id]?.mode === GridRowModes.Edit;
    }, [rowModesModel, id]);

    const { handleOpen, ...menuProps } = useMenuState();

    const { ref, hovered } = useHover();

    return (
        <>
            <Box
                flexGrow={1}
                display="flex"
                alignItems="center"
                justifyContent="center"
                position="relative"
                ref={ref}
            >
                <Typography>{uids.length + suffix}</Typography>
                <Box
                    position="absolute"
                    right={20}
                    height={55}
                    display="flex"
                    alignItems="center"
                >
                    {isEditing && (hovered || menuProps.open) && (
                        <Action.Symbol
                            icon={faPencil}
                            title="Rediger"
                            onClick={handleOpen}
                        />
                    )}
                </Box>
            </Box>
            <Menu
                {...menuProps}
                PaperProps={{
                    sx: {
                        backgroundColor: "#fff",
                        borderRadius: 4,
                        width: "max-content",
                        p: 1,
                    },
                }}
            >
                <UserPicker id={id} field={field} value={uids} />
            </Menu>
        </>
    );
}
