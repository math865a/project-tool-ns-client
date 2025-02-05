import { Menu } from "@mui/material";
import { GridRowId } from "@mui/x-data-grid-pro";
import { useMemo } from "react";
import { Directory } from "~/src/design-system";
import { useMenuState } from "~/src/hooks/useMenu";
import { useRowState } from "../../hooks/useRowState";
import { LinkResourceMenu } from "../link-resource/LinkResourceMenu";
import { useNotifications } from "~/src";
import {
    IconArrowsSplit,
    IconKey,
    IconLink,
    IconLock,
    IconLockOpen,
    IconMailForward,
    IconTrash,
    IconUser,
    IconUserMinus,
    IconUserPlus,
    IconWaveSine,
} from "@tabler/icons-react";

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
    forwardWelcome,
    handleResetPassword,
    ...menuProps
}: Props) {
    const record = useMemo(() => {
        return rows.find((row) => row.uid === id);
    }, [rows, id]);

    const { notify } = useNotifications();

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
                    icon={IconWaveSine}
                    label="Aktivitet"
                    disabled
                    space={!record.isResource}
                />

                {record.isResource && (
                    <Directory.ContextMenuItem
                        icon={IconUser}
                        label="Gå til ressource"
                        to={`/app/resources/${record.uid}`}
                        space
                    />
                )}

                <Directory.ContextMenuItem
                    icon={IconKey}
                    label="Nulstil password"
                    onClick={() => {
                        handleResetPassword(record);
                        menuProps.onClose();
                        notify(
                            "Brugerens password blev nulstillet og sendt til brugeren via mail."
                        );
                    }}
                />

                <Directory.ContextMenuItem
                    icon={IconMailForward}
                    label={
                        record.lastSeen
                            ? "Mail adgangsoplysninger"
                            : "Mail velkomst"
                    }
                    onClick={() => {
                        if (record.lastSeen) {
                            forwardCredentials(record.uid);
                            notify(
                                "Adgangsoplysningerne blev sendt til brugeren."
                            );
                        } else {
                            forwardWelcome(record.uid);
                            notify("Velkomstmailen blev sendt til brugeren.");
                        }

                        menuProps.onClose();
                    }}
                    space
                />

                {record.isResource && (
                    <Directory.ContextMenuItem
                        icon={IconUserMinus}
                        label="Slet ressource"
                        onClick={() => {
                            deleteResource(record);
                            menuProps.onClose();
                            notify("Ressourcen blev slettet.");
                        }}
                    />
                )}
                {record.isResource && (
                    <Directory.ContextMenuItem
                        icon={IconArrowsSplit}
                        label="Split fra ressource"
                        onClick={() => {
                            split(record);
                            menuProps.onClose();
                            notify("Ressourcen blev splittet fra brugeren.");
                        }}
                    />
                )}

                {!record.isResource && (
                    <Directory.ContextMenuItem
                        icon={IconUserPlus}
                        label="Opret ressource"
                        to={`create/${record.uid}/resource`}
                        onClick={menuProps.onClose}
                    />
                )}
                {!record.isResource && (
                    <Directory.ContextMenuItem
                        icon={IconLink}
                        label="Forbind ressource"
                        onClick={handleOpen}
                    />
                )}

                <Directory.ContextMenuItem
                    icon={IconUser}
                    label={
                        record.isProjectManager
                            ? "Fjern som projektleder"
                            : "Gør til projektleder"
                    }
                    onClick={() => {
                        notify(
                            record.isProjectManager
                                ? "Brugeren er ikke længere projektleder."
                                : "Brugeren er nu projektleder."
                        );
                        toggleProjectManager(record);
                        menuProps.onClose();
                    }}
                    space
                />

                <Directory.ContextMenuItem
                    icon={record.isDeactivated ? IconLockOpen : IconLock}
                    label={record.isDeactivated ? "Aktivér" : "Deaktivér"}
                    onClick={() => {
                        notify(
                            record.isDeactivated
                                ? "Brugeren er nu aktiv."
                                : "Brugeren er nu deaktiveret."
                        );
                        toggleActive(record);
                        menuProps.onClose();
                    }}
                    disabled={record.isSessionUser}
                />

                {record.isDeactivated && (
                    <Directory.ContextMenuItem
                        icon={IconTrash}
                        label="Slet"
                        onClick={() => {
                            console.log(record.uid);
                            handleDeleteClick(record.uid);
                            menuProps.onClose();
                            notify("Brugeren blev slettet.");
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
