import { useMemo } from "react";
import { IPerson } from "~/src/design-system";
import DeliveryTeam from "./DeliveryTeam";
import WorkLabel from "./WorkLabel";

const xPad = 10;

function BarLabels(
    props
: any) {
    const coords = useMemo(
        () => ({
            xBar: props.x as number,
            yBar: props.y as number,
            hBar: props.height as number,
            wBar: props.width as number,
            xPad: xPad,
        }),
        [props.x, props.y, props.width, props.height]
    );

    return (
        <g >
            <DeliveryTeam {...coords} avatars={props.value.avatars as IPerson[]} />
            <WorkLabel {...coords} workHours={props.value.workHours as number} />
        </g>
    );
}
export default BarLabels;
