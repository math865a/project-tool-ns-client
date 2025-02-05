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
        submit(
            {},
            {
                action: `/app/financialsources/${node.id}`,
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
            <Action.TextButton
                text="Slet"
                icon={IconTrash}
                onClick={handleOpen}
                disabled
            />
            <ConfirmationDialog
                open={open}
                onCancel={handleCancel}
                onConfirm={handleDelete}
                title={`Er du sikker på, at du vil slette finanskilden ${node.name}?`}
                text="Denne handling vil slette ALLE arbejdspakker associeret med denne finanskilde uden mulighed for genskabelse. Dette gælder også alle planer, leverancer, opgaver, allokeringer og bookinger. Venligst vær sikker!"
            />
        </>
    );
}
