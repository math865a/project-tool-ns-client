import { GridApiPro } from "@mui/x-data-grid-pro/models/gridApiPro";
import { Model, model, modelAction, prop } from "mobx-keystone";
import { CapacityStore } from "../_models/capacity/capacity.store";
import { RowStore } from "../_models/row/row.store";
import { CapacityViewsStore } from "../_models/views/view.store";
import { Boundary } from "./boundary";
import { Calendar } from "./calendar";
import { Dimensions } from "./dimensions";
import { Filter } from "./filter";
import { Pagination } from "./pagination";
import { Transport } from "./transport";
import { View } from "./view";

@model("capacity-board")
export class CapacityBoard extends Model({
    Transport: prop<Transport>(() => new Transport({})),
    Dimensions: prop<Dimensions>(() => new Dimensions({})),
    Calendar: prop<Calendar>(() => new Calendar({})),
    Pagination: prop<Pagination>(() => new Pagination({})),
    Boundary: prop<Boundary>(() => new Boundary({})),
    View: prop<View>(() => new View({})),
    Filter: prop<Filter>(),
    RowStore: prop<RowStore>(() => new RowStore({})),
    CapacityStore: prop<CapacityStore>(() => new CapacityStore({})),
    CapacityViewStore: prop<CapacityViewsStore>(
        () => new CapacityViewsStore({})
    ),
}) {
    api: React.MutableRefObject<GridApiPro> | undefined;

    @modelAction
    updateApi(api: React.MutableRefObject<GridApiPro>) {
        this.api = api;
    }


}
