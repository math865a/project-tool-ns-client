import { TextProps } from "@visx/text/lib/Text";
import { disableInteraction } from  "~/styles";

export const SpanTextProperties: TextProps = {
    fontFamily: "Inter",
    verticalAnchor: "middle",
    style: disableInteraction as React.CSSProperties,
    fill: "#282828",
    x: 5,
};
