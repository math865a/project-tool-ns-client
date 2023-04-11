import { disableInteraction } from  "~/styles";
import { Box, Tooltip, Typography } from "@mui/material";
import { Link, useNavigate } from "@remix-run/react";
import { Text } from "@visx/text";
import _ from "lodash";
import { PieLabelRenderProps, Sector } from "recharts";
import { Can } from "~/src/session-user";
import { Action as A, Subject } from "~/src/_definitions";
import { formatDecimal } from "~/util/format";
export default function PieActiveLabel(props: PieLabelRenderProps) {
    const RADIAN = Math.PI / 180;
    const ratio = 8;
    const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius = 0,
        startAngle,
        endAngle,
        fill,
        payload,
        percent,
        value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = Number(cx) + (Number(outerRadius) + 8) * cos;
    const sy = Number(cy) + (Number(outerRadius) + 8) * sin;
    const mx = Number(cx) + (Number(outerRadius) + 22) * cos;
    const my = Number(cy) + (Number(outerRadius) + 22) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 8;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
        <g>
            <foreignObject
                x={Number(cx) - Number(innerRadius)}
                y={Number(cy) - 25}
                width={2 * Number(innerRadius)}
                height={50}
            >
                <Can
                    I={A.Read}
                    a={Subject.Workpackages}
                    passThrough
                >
                    {(allowed) => (
                        <Box
                            flexGrow={1}
                            height={50}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Tooltip title="Gå til" placement="top">
                                <Typography
                                    {...(allowed
                                        ? {
                                              to: `/app/workpackages/${payload.id}`,
                                              component: Link,
                                              prefetch: "intent",
                                          }
                                        : {
                                              style: disableInteraction as React.CSSProperties,
                                          })}
                                    fontSize={12}
                                    mt={1}
                                    fontWeight="bold"
                                    align="center"
                                    sx={{
                                        color: "rgba(0, 0, 0, 0.6)",
                                        textDecoration: "none",
                                        "&:hover": {
                                            textDecoration: allowed
                                                ? "underline"
                                                : "none",
                                        },
                                    }}
                                >
                                    {payload.systematicName}
                                </Typography>
                            </Tooltip>
                        </Box>
                    )}
                </Can>
            </foreignObject>
            <Sector
                cx={cx as number}
                cy={cy as number}
                innerRadius={innerRadius as number}
                outerRadius={outerRadius as number}
                startAngle={startAngle ?? 0}
                endAngle={endAngle ?? 0}
                fill={fill as string}
            />
            <Sector
                cx={cx as number}
                cy={cy as number}
                startAngle={startAngle ?? 0}
                endAngle={endAngle ?? 0}
                innerRadius={(outerRadius as number) + 6}
                outerRadius={(outerRadius as number) + 10}
                fill={fill}
            />
            <path
                d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                stroke={fill}
                fill="none"
            />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text
                x={ex + (cos >= 0 ? 1 : -1) * ratio}
                y={ey}
                textAnchor={textAnchor}
                fill="#333"
                fontSize={12}
            >{`${formatDecimal(_.round(Number(value), 1))} timer`}</text>
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                dy={14}
                textAnchor={textAnchor}
                fill="#999"
                fontSize={11}
            >
                {`${payload.bookingStage} (${formatDecimal(
                    _.round(Number(percent) * 100, 1)
                )}%)`}
            </text>
        </g>
    );
}
