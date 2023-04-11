import { GridRenderCellParams } from "@mui/x-data-grid-pro";
import { Activity } from "gantt-models";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Feedback } from "~/src/design-system";
import { ActivityIdentityCellDisplay } from "./cell.display";
import { ActivityIdentityCellEdit } from "./cell.edit";

export const ActivityIdentityCell = observer((props: GridRenderCellParams<Activity>) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const { row: Activity } = props;

    const { inform, informProps } = Feedback.useInform();

    const [nameState, setNameState] = useState<string>(Activity.name ?? "Plan");


    const cancelEdit = () => {
        setIsEditing(false);
        if (Activity.name !== nameState) {
            inform("Ændringerne blev annulleret.", "info");
        }
        if (Activity.name) {
            setNameState(Activity.name);
        }
    };

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setNameState(event.target.value);
    };

    const startEditing = () => {
        setIsEditing(true);
    };

    const finishEditing = () => {
        setIsEditing(false);
        if (!nameState && Activity.name) {
            setNameState(Activity.name);
            inform("Navnet blev ikke ændret. Det må ikke være tomt.", "error");
        } else if (nameState !== Activity.name) {
            Activity.handleNameChange(nameState);
            inform("Navnet blev gemt.", "success");
        }
    };

    return (
        <>
            {isEditing && Activity.name !== null ? (
                <ActivityIdentityCellEdit
                    state={nameState}
                    finishEditing={finishEditing}
                    handleChange={handleChange}
                    cancelEdit={cancelEdit}
                />
            ) : (
                <ActivityIdentityCellDisplay
                    {...props}
                    startEditing={startEditing}
                />
            )}
            <Feedback.Inform {...informProps} />
        </>
    );
});
