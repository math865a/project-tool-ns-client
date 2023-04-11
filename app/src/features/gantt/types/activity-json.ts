import { DeliveryJson } from "./delivery-json";
import { PlanJson } from "./plan-json";
import { TaskJson } from "./task-json";


export type ActivityJson = PlanJson | DeliveryJson | TaskJson;