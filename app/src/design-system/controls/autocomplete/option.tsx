import { faCheck } from "@fortawesome/pro-light-svg-icons";
import { AutocompleteRenderOptionState, ListItemSecondaryAction, MenuItem, MenuItemProps } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Symbol } from "../../symbol";
import { Child } from "../../types";

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
    children: Child | Child[],
    disableCheck?: boolean
    
} & MenuItemProps) {
    return (
        <MenuItem {...props}  {...itemProps}>
            {children}
            {!disableCheck && <ListItemSecondaryAction>
                {state.selected && <Symbol icon={faCheck} />}
            </ListItemSecondaryAction>}
        </MenuItem>
    );
}



export const AutocompleteOption = observer(Option)