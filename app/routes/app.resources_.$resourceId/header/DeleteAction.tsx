import { useLoaderData, useSubmit } from "@remix-run/react";
import { useState } from "react";
import { Action as A, Subject } from "~/src/_definitions";
import { Action as UIAction, ConfirmationDialog } from "~/src/design-system";
import { Can } from "~/src/session-user";
import { ResourceLoader } from "../route";
import { IconTrash } from "@tabler/icons-react";

export function DeleteAction() {
    const { node } = useLoaderData<ResourceLoader>();
    const submit = useSubmit();
    const [open, setOpen] = useState<boolean>(false);

    const handleDelete = () => {
        setOpen(false);
        submit(
            {},
            {
                method: "delete",
                replace: true,
            }
        );
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };
    return (
        <>
            <Can I={A.Delete} a={Subject.Resources} passThrough>
                {(allowed) => (
                    <UIAction.TextButton
                        disabled={!allowed}
                        text="Slet"
                        icon={IconTrash}
                        onClick={handleOpen}
                    />
                )}
            </Can>
            <ConfirmationDialog
                open={open}
                title={`Er du sikker på, at du vil slette ressourcen ${node.name}?`}
                text={`Ressourcen vil blive fjernet fra alle abejdspakker, herunder allokeringer og bookinger. Dette kan ikke fortrydes. \n \n Såfremt ressourcen også er en bruger, vil denne dog ikke blive slettet.`}
                onCancel={handleCancel}
                onConfirm={handleDelete}
            />
        </>
    );
}
