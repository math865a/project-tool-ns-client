import { observer } from "mobx-react-lite";
import { useMenuState } from "~/src/hooks/useMenu";
import ViewsAction from "./ViewsAction";
import ViewsMenu from "./ViewsMenu";

const CapacityViews = observer(() => {
    const { handleOpen, ...menuProps } = useMenuState();

    return (
        <>
            <ViewsAction handleOpen={handleOpen} open={menuProps.open} />
            <ViewsMenu {...menuProps} />
        </>
    );
});

export default CapacityViews;
