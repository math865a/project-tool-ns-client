import { Box, Divider, List, Menu, Stack, Typography } from "@mui/material";
import { computed } from "mobx";
import { observer } from "mobx-react-lite";
import { Feedback } from "~/src/design-system";
import { useMenuState } from "~/src/hooks/useMenu";
import { useBoard } from "../../../_provider";
import ClearView from "./actions/ClearView";
import SaveAsNew from "./actions/SaveAsNew";
import SaveChanges from "./actions/SaveChanges";
import NoViews from "./NoViews";
import ViewItem from "./view-item";

const ViewsMenu = observer(
    ({
        open,
        onClose,
        anchorEl,
    }: Omit<ReturnType<typeof useMenuState>, "handleOpen">) => {
        const { CapacityViewStore: Store } = useBoard();

        const content = computed(() => {
            if (Store.Views.length === 0) {
                return <NoViews />;
            } else {
                return (
                    <List>
                        {Store.sortedViews.map((d) => (
                            <ViewItem CapacityView={d} key={d.id} />
                        ))}
                    </List>
                );
            }
        });

        return (
            <Menu
                open={open}
                onClose={onClose}
                anchorEl={anchorEl}
                PaperProps={{
                    sx: {
                        px: 2,
                        minWidth: 300,
                        borderRadius: 4,
                        backgroundColor: "#fff",
                    },
                }}
            >
                <Box
                    flexGrow={1}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    pb={1}
                >
                    <Typography fontWeight="bold">Visninger</Typography>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                        <ClearView />
                        <SaveChanges />
                        <SaveAsNew />
                    </Stack>
                </Box>
                <Divider />
                {content.get()}
         
                    <Feedback.InfoTooltip text="Du kan med visninger gemme filteringer som du bruger ofte. For at oprette en ny visning, skal du lave en filterering, og så gemme den her fra menuen." placement="bottom" />
               
            </Menu>
        );
    }
);

export default ViewsMenu;
