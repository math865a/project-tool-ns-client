import { Icon } from "@tabler/icons-react";

export type IconDef = Icon;

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
        icon: Icon,
        size,
        color,
        className,
        inverse = false,
        mask,
        hidden,
    } = props;

    if (hidden) return null;
    if (!Icon) return null;

    return <Icon size={size} color={color} className={className} />;
};
