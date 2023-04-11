import { Chip } from "@mui/material";

interface Props {
    label: string;
    color: string;
}

export function StageCell({label, color}: Props){

    return(
        <Chip
            label={label}
            sx={{
                transition: "all 200ms ease",
                borderRadius: 2,
                fontSize: 12,
                backgroundColor: color + "60",
                borderColor: "transparent",
            }}
            size="small"
            clickable={false}
            variant="outlined"
        />
    )

}