import type { IconDefinition as LightIcon } from "@fortawesome/pro-light-svg-icons";
import type { IconDefinition as SolidIcon } from "@fortawesome/pro-solid-svg-icons";
import {
    FontAwesomeIcon,
    FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import "./symbolstyles.css";

export type IconDef = LightIcon | SolidIcon;
export type IIcon = Omit<FontAwesomeIconProps, "icon" | "size"> & {
    icon?: IconDef;
    hidden?: boolean;
    size?: number;
};

export type SymbolProps = IIcon;

export const Symbol = (props: SymbolProps) => {
    const { icon, size, hidden, ...rest } = props;
    if (hidden) return null;
    if (!icon) return null;
    return (
        <FontAwesomeIcon
            icon={icon as IconProp}
            fontSize={`${size}rem`}
            {...rest}
        />
    );
};
