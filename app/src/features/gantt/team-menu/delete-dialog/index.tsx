import { faTimes, faTrash } from "@fortawesome/pro-light-svg-icons";
import { ListItemIcon, ListItemText, MenuItem, useTheme } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import {
    Action,
    ConfirmationDialog,
    Dialog,
    Symbol,
} from "~/src/design-system";
import { useWorkpackage } from "useWorkpackage";
import ConsequencesBody from "./ConsequencesBody";
import { TeamMember } from "gantt-models";
import { Can } from "~/src/session-user";
import { Action as A, Subject } from "~/src/_definitions";

const TeamMemberDelete = observer(
    ({ TeamMember }: { TeamMember: TeamMember }) => {
        const {
            Gantt: { TeamStore },
        } = useWorkpackage();

        const [removeConfOpen, setRemoveConfOpen] = useState<boolean>(false);
        const handleRemoveConfOpen = () => setRemoveConfOpen(true);
        const handleRemoveConfClose = () => setRemoveConfOpen(false);

        const handleDeleteClick = () => {
            if (TeamMember.Allocations.length > 0) {
                handleRemoveConfOpen();
            } else {
                handleDelete();
            }
        };

        const handleDelete = () => {
            handleRemoveConfClose();
            TeamStore.deleteTeamMember(TeamMember);
        };

        const theme = useTheme();

        return (
            <>
                <Can
                    I={A.Write}
                    a={Subject.Workpackages}>
              
                        <Action.Symbol
                            icon={faTrash}
                            title="Fjern"
                            onClick={handleDeleteClick}
                        />
                 
                </Can>
                <Dialog.Modal open={removeConfOpen}>
                    <Dialog.Title
                        title={`Vil du fjerne ${TeamMember.resource.name} (${TeamMember.resourceType.name}) fra dit team?`}
                        subtitle="Teammedlemmet har allokkeringer tildelt. Dette betyder, at nedenstående allokeringer også vil blive slettet, hvis du sletter teammedlemmet."
                    />
                    <Dialog.Body sx={{ pb: 0 }}>
                        <ConsequencesBody TeamMember={TeamMember} />
                    </Dialog.Body>
                    <Dialog.Footer>
                        <Action.TextButton
                            text="Annuller"
                            icon={faTimes}
                            onClick={handleRemoveConfClose}
                        />
                        <Action.TextButton
                            text="Slet"
                            icon={faTrash}
                            onClick={handleDelete}
                        />
                    </Dialog.Footer>
                </Dialog.Modal>
            </>
        );
    }
);

export default TeamMemberDelete;

/*                <ConfirmationDialog
                    body={}
                    open={removeConfOpen}
                    hideDefaultActions
                    maxWidth="sm"
                    onCancel={handleRemoveConfClose}
                    actions={
                        <>
                            <Action.TextButton
                                text="Annuller"
                                onClick={handleRemoveConfClose}
                            />
                            <Action.TextButton
                                text="Bekræft og slet"
                                color="error"
                                onClick={handleDelete}
                            />
                        </>
                    }
                />*/
