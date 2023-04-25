import { Box } from "@mui/material";
import { useMemo } from "react";
import { Avatars } from "~/src/design-system";

const wTeam = 100;

const DeliveryTeam = (props: any) => {
    const x = useMemo(() => (props.x as number) - wTeam - 10, [props.x]);
    if (props.id !== props.hoverId) return <></>;
    return (
        <foreignObject y={props.y} x={x} height={props.height} width={wTeam}>
            <Box
                flexGrow={1}
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
                height={props.height}
                width={wTeam}
            >
                <Avatars.EllipsisGroup
                    People={props.value}
                    variant="rounded"
                    size={18}
                    fontSize={11}
                    groupProps={{
                        spacing: "medium",

                        sx: {
                            p: 0.5,
                            "& .MuiAvatar-root": {
                                borderWidth: 1,
                                borderColor: "transparent",
                            },
                        },
                    }}
                />
            </Box>
        </foreignObject>
    );
};

export default DeliveryTeam;
