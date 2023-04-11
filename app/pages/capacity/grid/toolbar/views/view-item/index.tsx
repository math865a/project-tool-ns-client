import {
    Checkbox, ListItem,
    ListItemIcon, Stack
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { CapacityView } from "~/pages/capacity/_models";
import DeleteAction from "./actions/DeleteAction";
import MakeDefaultAction from "./actions/MakeDefaultAction";
import ViewItemDisplay from "./ViewItemDisplay";
import ViewItemEdit from "./ViewItemEdit";

const ViewItem = observer(
    ({ CapacityView }: { CapacityView: CapacityView }) => {
        const [isHovering, setIsHovering] = useState<boolean>(false);
        const [isEditing, setIsEditing] = useState<boolean>(false);

        const [name, setName] = useState<string>(CapacityView.name);

        const saveName = () => {
            if (name === CapacityView.name || name === "") {
                setName(CapacityView.name);
            } else {
                CapacityView.updateName(name);
            }
            setIsEditing(false);
        };

        const cancelEdit = () => {
            setName(CapacityView.name);
            setIsEditing(false);
        };

        const handleChange = (
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
        ) => {
            setName(event.target.value);
        };

        return (
            <ListItem
                onMouseLeave={() => setIsHovering(false)}
                onMouseEnter={() => setIsHovering(true)}
                secondaryAction={
                    !isEditing ? (
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={0.5}
                        >
                            <MakeDefaultAction CapacityView={CapacityView} />
                            <DeleteAction CapacityView={CapacityView} />
                        </Stack>
                    ) : undefined
                }
            >
                <ListItemIcon sx={{ minWidth: 50 }}>
                    <Checkbox
                        size="small"
                        checked={CapacityView.isActive}
                        value={CapacityView.isActive}
                        onChange={() => CapacityView.toggle()}
                    />
                </ListItemIcon>
                {isEditing ? (
                    <ViewItemEdit
                        saveName={saveName}
                        handleChange={handleChange}
                        name={name}
                        cancelEdit={cancelEdit}
                    />
                ) : (
                    <ViewItemDisplay
                        CapacityView={CapacityView}
                        updateIsEditing={() => setIsEditing(true)}
                        isHovering={isHovering}
                    />
                )}
            </ListItem>
        );
    }
);

export default ViewItem;