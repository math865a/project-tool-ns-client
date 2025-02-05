import { useSubmit } from "@remix-run/react";
import { Action, ConfirmationDialog } from "design";
import { useState } from "react";
import { Can } from "~/src/session-user";
import { Action as A, Subject } from "~/src/_definitions";
import { IconTrash } from "@tabler/icons-react";

export function ResourceTypeDeleteAction() {
    const submit = useSubmit();

    const [open, setOpen] = useState<boolean>(false);

    const handleDelete = () => {
        setOpen(false);
        /*submit(
            {},
            {
                action: `/app/workpackages/${workpackageId}`,
                method: 'delete',
                replace: true,
            }
        );*/
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };
    return (
        <>
            <Can I={A.Delete} a={Subject.ResourceTypes} passThrough>
                {(allowed) => (
                    <Action.TextButton
                        text="Slet"
                        icon={IconTrash}
                        onClick={handleOpen}
                        disabled
                    />
                )}
            </Can>
            <ConfirmationDialog
                open={open}
                onCancel={handleCancel}
                onConfirm={handleDelete}
            />
        </>
    );
}
