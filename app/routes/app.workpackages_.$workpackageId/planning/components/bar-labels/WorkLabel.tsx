import { useTheme } from "@mui/material";
import { Text } from "@visx/text";

import { useMemo } from "react";


const WorkLabel = 
    (props: any) => {
        const x = useMemo(
            () => (props.x) + (props.width) + 10,
            [props.x, props.width]
        );

        const y = useMemo(
            () => props.y + props.height / 2,
            [props.y, props.height]
        );

        const theme = useTheme();

        if (props.id === props.hoverId){
            return (
                <Text
                    x={x}
                    y={y}
                    width={100}
                    color={theme.palette.text.secondary}
                    verticalAnchor="middle"
                    fontFamily="Poppins"
                    fontSize={12}
                    fontWeight={200}
                >
                    {props.value + "t"}
                </Text>
            );
        }
        return <></>
       
    }


export default WorkLabel;
