import { Page } from "~/src/design-system";
import { WorkLoadChart } from "./work-load-chart/Chart";
import { useElementSize } from "@mantine/hooks";
import { Box } from "@mui/material";

export default function WorkLoadSection() {

    const {ref, width, height} = useElementSize()

    return (
        <Page.Section title="Arbejdsbelastning" xs={4}  ref={ref} alignSelf="stretch">
          
            <WorkLoadChart width={width} height={height} />
         
           
        </Page.Section>
    );
}
