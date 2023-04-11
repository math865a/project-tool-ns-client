import { faTimes, faTrash } from "@fortawesome/pro-light-svg-icons";
import { List } from "@mui/material";
import { useRouteLoaderData } from "@remix-run/react";
import { ResourceProfile } from "~/src";
import { Action, Dialog } from "~/src/design-system";
import { useResourceTypeContext } from "../_provider";
import { WorkpackageItem } from "./WorkpackageItem";

export default function RemoveDialog() {
    const { dialogOpen, onCancel, resourceType, consequences, handleDelete } =
        useResourceTypeContext();

    const { node } = useRouteLoaderData(
        "routes/app.resources_.$resourceId"
    ) as ResourceProfile;

    return (
        <Dialog.Modal open={dialogOpen} onClose={onCancel}>
            <Dialog.Title
                title={`Vil du fjerne ${resourceType?.name} fra ${node.name}?`}
                subtitle="Konsekvensen vil være, at nedenstående allokeringer også vil blive fjernet."
                fontSize={16}
            />
            <Dialog.Body>
                <List>
                    {consequences?.map((wp) => (
                        <WorkpackageItem key={wp.id} {...wp} />
                    ))}
                </List>
            </Dialog.Body>
            <Dialog.Footer>
                <Action.TextButton
                    text="Annuller"
                    icon={faTimes}
                    onClick={onCancel}
                />
                <Action.TextButton
                    text="Slet"
                    icon={faTrash}
                    onClick={() => (resourceType ? handleDelete() : null)}
                />
            </Dialog.Footer>
        </Dialog.Modal>
    );
}
