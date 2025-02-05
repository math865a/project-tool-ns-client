import {
    AutocompleteRenderOptionState,
    ListItemSecondaryAction,
    MenuItem,
    MenuItemProps,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { Symbol } from "../../symbol";
import { Child } from "../../types";
import { IconCheck } from "@tabler/icons-react";

function Option<T>({
    props,
    option,
    state,
    children,
    disableCheck,
    ...itemProps
}: {
    props: React.HTMLAttributes<HTMLLIElement>;
    option: T;
    state: AutocompleteRenderOptionState;
    children: Child | Child[];
    disableCheck?: boolean;
} & MenuItemProps) {
    return (
        <MenuItem {...props} {...itemProps}>
            {children}
            {!disableCheck && (
                <ListItemSecondaryAction>
                    {state.selected && <Symbol icon={IconCheck} />}
                </ListItemSecondaryAction>
            )}
        </MenuItem>
    );
}

export const AutocompleteOption = observer(Option);
