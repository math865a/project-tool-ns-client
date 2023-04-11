import { observer } from "mobx-react-lite";
import { useBoard } from "../../../_provider";
import CapacityHeaderCell from "./HeaderCell";

const RenderHeaderCells = observer(() => {
    const Board = useBoard();

    return (
        <>
            {Board.View.Columns.map((interval) => (
                <CapacityHeaderCell interval={interval} />
            ))}
        </>
    );
});

export default RenderHeaderCells;
