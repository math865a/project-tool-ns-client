import { Menu } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useMenuState } from "~/src/hooks/useMenu";
import RowFilterMenuFooter from "./footer";
import RowPicker from "./RowPicker";

const RowFilterMenu = observer(
    ({
        open,
        anchorEl,
        onClose,
    }: Omit<ReturnType<typeof useMenuState>, "handleOpen">) => {
        return (
            <Menu
                open={open}
                anchorEl={anchorEl}
                onClose={onClose}
                PaperProps={{
                    sx: {
                        p: 2,
                        pb: 1,
                        borderRadius: 4,
                        backgroundColor: "#fff",
                    },
                }}
            >
                <RowPicker handleClose={onClose} />
                <RowFilterMenuFooter />
            </Menu>
        );
    }
);

export default RowFilterMenu;
