import { Carousel } from "@mantine/carousel";
import { Box } from "@mui/material";
import { DeadlineCard } from "./Deadline.Card";
import { useSummary } from "../_state";

export function DeadlinesCarousel() {
    const {
        deadline: { title, deadlines },
    } = useSummary();

    return (
        <Box width="100%">
            <Carousel
                slideSize={275}
                slideGap="lg"
                w="100%"
                align="start"
                height={130}
            >
                {deadlines.map((d) => (
                    <Carousel.Slide key={d.id}>
                        <DeadlineCard {...d} />
                    </Carousel.Slide>
                ))}
            </Carousel>
        </Box>
    );
}
