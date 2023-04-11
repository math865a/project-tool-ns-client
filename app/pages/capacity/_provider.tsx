import { Child } from "design";
import {
    CapacityJson,
    CapacityBoardRows,
    BookingStageNode,
    CapacityViewJson,
} from "@math865a/project-tool.types";
import _ from "lodash";
import { registerRootStore } from "mobx-keystone";
import { observer } from "mobx-react-lite";
import React, { createContext, useContext, useState } from "react";
import { CapacityBoard } from "./_controllers/_board";
import { Filter } from "./_controllers/filter";
import { BookingStageFilter } from "./_controllers/filter/BookingStageFilter";
import { useSocket } from "~/src/socket";
import { GridApiPro } from "@mui/x-data-grid-pro/models/gridApiPro";
import { useGridApiRef } from "@mui/x-data-grid-pro";
import { Socket } from "socket.io-client";
import { useSession } from "~/src";

const BoardContext = createContext<CapacityBoard | undefined>(undefined);

function createBoard(
    rows: CapacityBoardRows,
    bookingStages: BookingStageNode[],
    views: CapacityViewJson[],
    capacities: CapacityJson[],
    socket: Socket,
    api: React.MutableRefObject<GridApiPro>
) {
    const model = new CapacityBoard({
        Filter: new Filter({
            BookingStageFilter: new BookingStageFilter({
                filterState: _.map(bookingStages, (d) => d.name),
                bookingStages: bookingStages,
            }),
        }),
    });
    model.Transport.updateSocket(socket);
    model.updateApi(api);
    registerRootStore(model);
    model.RowStore.resolveResourceTypeRows(rows.resourceTypes);
    model.RowStore.resolveResourceRows(rows.resources);
    model.CapacityStore.resolveMany(capacities);
    model.CapacityViewStore.initialize(views);
    return model;
}

const useCapacityBoard = (
    rows: CapacityBoardRows,
    bookingStages: BookingStageNode[],
    views: CapacityViewJson[],
    capacities: CapacityJson[],
    api: React.MutableRefObject<GridApiPro>,
    socket: Socket
) => {


    const [model] = useState<CapacityBoard>(() =>
        createBoard(rows, bookingStages, views, capacities, socket, api)
    );
    return model;
};

const CapacityBoardProvider = observer(
    ({
        children,
        rows = new CapacityBoardRows([], []),
        capacities = [],
        bookingStages,
        views,
        socket
    }: {
        children?: (api: React.MutableRefObject<GridApiPro>) => Child | Child[];
        rows?: CapacityBoardRows;
        capacities?: CapacityJson[];
        bookingStages: BookingStageNode[];
        views: CapacityViewJson[];
        socket: Socket;
    }) => {
        const api = useGridApiRef();
        const Board = useCapacityBoard(
            rows,
            bookingStages,
            views,
            capacities,
            api,
            socket
        );

        return (
            <BoardContext.Provider value={Board}>
                {children ? children(api) : null}
            </BoardContext.Provider>
        );
    }
);

export default CapacityBoardProvider;

export const useBoard = () => {
    const board = useContext(BoardContext);
    if (!board) {
        throw new Error("No board");
    }
    return board;
};
