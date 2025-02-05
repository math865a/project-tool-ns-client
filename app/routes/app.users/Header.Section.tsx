import { useTheme } from "@mui/material";
import { Form } from "@remix-run/react";
import { Action, Page } from "~/src/design-system";
import { IconPlus } from "@tabler/icons-react";

export default function HeaderSection() {
    const theme = useTheme();

    return (
        <Page.Header
            actions={
                <Form method="get" action="create">
                    <Action.TextButton
                        icon={IconPlus}
                        symbolProps={{ color: theme.palette.success.main }}
                        text="Opret bruger"
                        type="submit"
                    />
                </Form>
            }
        />
    );
}
