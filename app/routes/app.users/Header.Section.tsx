import { faPlus } from "@fortawesome/pro-solid-svg-icons";
import { useTheme } from "@mui/material";
import { Form } from "@remix-run/react";
import { Action, Page } from "~/src/design-system";

export default function HeaderSection() {
    const theme = useTheme();

    return (
        <Page.Header
            actions={
                <Form method="get" action="create">
                    <Action.TextButton
                        icon={faPlus}
                        symbolProps={{ color: theme.palette.success.main }}
                        text="Opret bruger"
                        type="submit"
                    />
                </Form>
            }
        />
    );
}
