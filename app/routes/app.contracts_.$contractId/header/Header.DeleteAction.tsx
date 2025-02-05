import { useLoaderData, useSubmit } from "@remix-run/react";
import { Action, ConfirmationDialog } from "design";
import { useState } from "react";
import { loader } from "../route";
import { IconTrash } from "@tabler/icons-react";

export function DeleteAction() {
    const { node } = useLoaderData<typeof loader>();

    const submit = useSubmit();

    const [open, setOpen] = useState<boolean>(false);

    const handleDelete = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };
    return (
        <>
            <Action.TextButton
                text="Slet"
                icon={IconTrash}
                onClick={handleOpen}
                disabled={true}
            />
            <ConfirmationDialog
                open={open}
                onCancel={handleCancel}
                onConfirm={handleDelete}
                title={`Er du sikker på, at du vil slette kontrakten ${node.name}?`}
                text="Denne handling vil slette ALLE arbejdspakker og ressourcetyper associeret med denne kontrakt uden mulighed for genskabelse. Dette gælder også alle planer, leverancer, opgaver, allokeringer og bookinger. Venligst vær sikker!"
            />
        </>
    );
}
