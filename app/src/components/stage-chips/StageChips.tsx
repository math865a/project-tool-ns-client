import { Box, Stack } from "@mui/material";
import { StageChip } from "./StageChip";
import { Stage } from "~/src/_definitions";

export interface IRenderStageChipsProps {
    options: Stage[];
    update: (stage: Stage) => void, 
    state: Stage | null
    disabled?: boolean
}

export default function StageChips({options, update, state, disabled}: IRenderStageChipsProps) {

    return (
        <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="center"
        >
            <Box
                width="100%"
                maxWidth="100%"
                overflow="hidden"
                pt={0.5}
                pl={0.5}
            >
                <Stack
                    direction="row"
                    maxWidth="100%"
                    flexWrap="wrap"
                    justifyContent="flex-start"
                >
                    {options.map((s) => (
                        <Box width="min-width" m={1} key={s.name}>
                            <StageChip stage={s} update={update} state={state} disabled={disabled}/>
                        </Box>
                    ))}
                </Stack>
            </Box>
        </Stack>
    );
}
