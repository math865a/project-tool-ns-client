import { Box, Pagination, Typography } from "@mui/material";
import { useGridApiContext } from "@mui/x-data-grid-pro";
import { observer } from "mobx-react-lite";
import { FOOTER_HEIGHT } from "../_config/contants";
import { useBoard } from "../_provider";

const Footer = observer(() => {
    const {Pagination: P} = useBoard()
    const apiRef = useGridApiContext();

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            flexGrow={1}
            height={FOOTER_HEIGHT}
        >
            <Typography pr={2}>
                {`${P.rowRange.first+1}-${P.rowRange.last} ud af ${P.rowCount}`}
            </Typography>
            <Pagination
                color="primary"
                count={P.pageCount}
                page={P.page + 1}
                onChange={(event, value) => {
                    P.updatePage(value - 1);
                    apiRef.current.setPage(value - 1);
                }}
            />
        </Box>
    );
});

export default Footer;
