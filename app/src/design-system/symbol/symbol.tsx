import type { IconDefinition as LightIcon } from "@fortawesome/pro-light-svg-icons";
import type { IconDefinition as SolidIcon } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import "./symbolstyles.css";

export type IconDef =
    | LightIcon
    | SolidIcon
export interface IIcon {
    icon?: IconDef;
    size?: number;
    color?: string;
    className?: string;
    inverse?: boolean;
    mask?: IconDef;
    hidden?: boolean;
}

export type SymbolProps = IIcon;

export const Symbol = (props: SymbolProps) => {
    const {
        icon,
        size,
        color,
        className,
        inverse = false,
        mask,
        hidden,
    } = props;
    if (hidden) return null;
    if (!icon) return null;
    return (
        <FontAwesomeIcon
            icon={icon as IconProp}
            fontSize={`${size}rem`}
            color={color}
            className={className}
            inverse={inverse}
            mask={mask as IconProp | undefined}
        />
    );
};
