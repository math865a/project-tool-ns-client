import { Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useBoard } from "~/pages/capacity/_provider";

const FilterCount = observer(() => {
    const {
        Filter: { RowFilter },
    } = useBoard();

    return (
        <Typography fontSize={12} py={0.75}>
            {`${RowFilter.filterCount} ${
                RowFilter.filterCount === 1 ? "række" : "rækker"
            } valgt`}
        </Typography>
    );
});

export default FilterCount;
