import {
    faKey,
    faLink,
    faLock,
    faMailForward,
    faSplit,
    faTrash,
    faUnlock,
    faUser,
    faUserPlus,
    faUserSlash,
    faUserTie,
    faWavePulse,
} from "@fortawesome/pro-light-svg-icons";
import { Menu } from "@mui/material";
import { GridRowId } from "@mui/x-data-grid-pro";
import { useMemo } from "react";
import { Directory } from "~/src/design-system";
import { useMenuState } from "~/src/hooks/useMenu";
import { useRowState } from "../../hooks/useRowState";
import { LinkResourceMenu } from "../link-resource/LinkResourceMenu";

type Props = Omit<ReturnType<typeof useMenuState>, "handleOpen"> & {
    id: GridRowId;
} & Omit<
        ReturnType<typeof useRowState>,
        | "handleSaveClick"
        | "handleCancelClick"
        | "handleEditClick"
        | "isEditing"
        | "rowModesModel"
    >;

export function ActionsMenu({
    id,
    rows,
    toggleActive,
    toggleProjectManager,
    deleteResource,
    handleDeleteClick,
    split,
    merge,
    forwardCredentials,
    ...menuProps
}: Props) {
    const record = useMemo(() => {
        return rows.find((row) => row.uid === id);
    }, [rows, id]);

    const { handleOpen, ...linkMenuProps } = useMenuState<HTMLLIElement>();

    if (!record) return null;

    return (
        <>
            <Menu
                {...menuProps}
                PaperProps={{
                    sx: {
                        backgroundColor: "#fff",
                        borderRadius: 3,
                    },
                }}
            >
                <Directory.ContextMenuItem
                    icon={faWavePulse}
                    label="Aktivitet"
                    disabled
                    space={!record.isResource}
                />

                {record.isResource && (
                    <Directory.ContextMenuItem
                        icon={faUser}
                        label="Gå til ressource"
                        to={`/app/resources/${record.uid}`}
                        space
                    />
                )}

                <Directory.ContextMenuItem
                    icon={faKey}
                    label="Nulstil password"
                />

                <Directory.ContextMenuItem
                    icon={faMailForward}
                    label={
                        record.lastSeen
                            ? "Mail adgangsoplysninger"
                            : "Mail velkomst"
                    }
                    onClick={() => {
                        forwardCredentials(record.uid);
                        menuProps.onClose();
                    }}
                    space
                />

                {record.isResource && (
                    <Directory.ContextMenuItem
                        icon={faUserSlash}
                        label="Slet ressource"
                        onClick={() => {
                            deleteResource(record);
                            menuProps.onClose();
                        }}
                    />
                )}
                {record.isResource && (
                    <Directory.ContextMenuItem
                        icon={faSplit}
                        label="Split fra ressource"
                        onClick={() => {
                            split(record);
                            menuProps.onClose();
                        }}
                    />
                )}

                {!record.isResource && (
                    <Directory.ContextMenuItem
                        icon={faUserPlus}
                        label="Opret ressource"
                        to={`create/${record.uid}/resource`}
                        onClick={menuProps.onClose}
                    />
                )}
                {!record.isResource && (
                    <Directory.ContextMenuItem
                        icon={faLink}
                        label="Forbind ressource"
                        onClick={handleOpen}
                    />
                )}

                <Directory.ContextMenuItem
                    icon={faUserTie}
                    label={
                        record.isProjectManager
                            ? "Fjern som projektleder"
                            : "Gør til projektleder"
                    }
                    onClick={() => {
                        toggleProjectManager(record);
                        menuProps.onClose();
                    }}
                    space
                />

                <Directory.ContextMenuItem
                    icon={record.isDeactivated ? faUnlock : faLock}
                    label={record.isDeactivated ? "Aktivér" : "Deaktivér"}
                    onClick={() => {
                        toggleActive(record);
                        menuProps.onClose();
                    }}
                    disabled={record.isSessionUser}
                />

                {record.isDeactivated && (
                    <Directory.ContextMenuItem
                        icon={faTrash}
                        label="Slet"
                        onClick={() => {
                            console.log(record.uid);
                            handleDeleteClick(record.uid);
                            menuProps.onClose();
                        }}
                        disabled={record.isSessionUser}
                    />
                )}
            </Menu>
            <LinkResourceMenu
                user={record}
                {...linkMenuProps}
                merge={merge}
                handleCloseMain={menuProps.onClose}
            />
        </>
    );
}
