import { faSave } from "@fortawesome/pro-light-svg-icons";
import { Box, Button, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Action } from "~/src/design-system";
import { useBoard } from "../../../_provider";

const NoViews = observer(() => {
    const View = useBoard().View;
    const { CapacityViewStore } = useBoard();

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexGrow={1}
            minHeight={150}
            flexDirection="column"
            maxWidth={300}
        >
            <Typography fontWeight="bold" pb={2}>
                Du har ikke oprettet nogle visninger
            </Typography>
            {View.hasFiltered ? (
                <Box maxWidth={175}>

                    <Action.TextButton
                    iconSize={1.3}
                        text="Gem nuværende filter som visning"
                        icon={faSave}
                        onClick={() => CapacityViewStore.createView()}
                    />
                </Box>
            ) : (
                <Typography textAlign="center">
                    Filtrer på enten ressourcer eller bookingtype for at oprette
                    en visning
                </Typography>
            )}
        </Box>
    );
});

export default NoViews;
