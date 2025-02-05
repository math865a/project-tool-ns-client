import { useLoaderData, useSubmit, useTransition } from "@remix-run/react";
import { Action, ConfirmationDialog, Fallback } from "design";
import { useState } from "react";
import { Can } from "~/src/session-user";
import { Action as A, Subject } from "~/src/_definitions";
import { WorkpackageLoader } from "../route";
import { IconTrash } from "@tabler/icons-react";

export function DeleteAction() {
    const {
        node: { id },
    } = useLoaderData<WorkpackageLoader>();
    // const {toggleFavorite} = useFavorites()
    const submit = useSubmit();
    const transition = useTransition();
    const [open, setOpen] = useState<boolean>(false);
    const [hasDeleted, setHasDeleted] = useState<boolean>(false);
    const isSubmitting = transition.state !== "idle";

    const handleDelete = () => {
        // toggleFavorite(id)
        setHasDeleted(true);
        setOpen(false);

        submit(
            {},
            {
                action: `/app/workpackages/${id}`,
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
            <Can I={A.Delete} a={Subject.Workpackages} passThrough>
                {(allowed) => (
                    <Action.TextButton
                        text="Slet"
                        icon={IconTrash}
                        onClick={handleOpen}
                        disabled={!allowed}
                    />
                )}
            </Can>

            <ConfirmationDialog
                open={open}
                onCancel={handleCancel}
                onConfirm={handleDelete}
            />
            <Fallback.FullScreenLoading
                isLoading={isSubmitting && hasDeleted}
                text="Sletter arbejdspakke..."
            />
        </>
    );
}
