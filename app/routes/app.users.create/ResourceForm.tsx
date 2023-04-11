import { useLoaderData } from "@remix-run/react";
import { CreateUserLoader } from "./route";
import { useFormContext, useWatch } from "react-hook-form";
import { Box, Collapse } from "@mui/material";
import { ResourceControls } from "~/src/components/forms";
import { FormUI } from "~/src/design-system";

export default function ResourceForm({isConnected}: {isConnected: boolean}) {
    const options = useLoaderData<CreateUserLoader>();
    const { control } = useFormContext();

    const isResource = useWatch({ control, name: "isResource" });
    return (
        <Collapse in={isResource && !isConnected} > 
            <FormUI.VStack>
                <ResourceControls
                    prefix="resourceDto"
                    calendars={options.calendars}
                    resourceTypes={options.resourceTypes}
                />
            </FormUI.VStack>
          </Collapse>
  
    );
}
