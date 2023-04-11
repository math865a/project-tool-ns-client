import { Menu } from "@mui/material";
import { useProjectManagerMenu } from "./ProjectManagerMenuProvider";
import ProjectManagerPicker from "./ProjectManagerPicker";

export default function ProjectManagerMenu() {
    const { open, anchorEl, handleClose } = useProjectManagerMenu();

    return (
        <Menu
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            PaperProps={{
                sx: {
                    px: 2,
                    py: 1,
                    borderRadius: 4,
                    backgroundColor: "#fff",
                    width: 330
                },
            }}
        >
            <ProjectManagerPicker />
        </Menu>
    );
}
