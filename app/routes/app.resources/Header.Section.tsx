import { useTheme } from "@mui/material";
import { Action, Page } from "~/src/design-system";
import { Can } from "~/src/session-user";
import { Action as A, Subject } from "~/src/_definitions";
import { IconPlus } from "@tabler/icons-react";

export default function HeaderSection() {
    const theme = useTheme();
    return (
        <Page.Header
            actions={
                <Can I={A.Write} a={Subject.Resources} passThrough>
                    {(allowed) => (
                        <Action.TextLink
                            text="Tilføj ressource"
                            icon={IconPlus}
                            symbolProps={{ color: theme.palette.success.main }}
                            to="/app/resources/create"
                            disabled={!allowed}
                        />
                    )}
                </Can>
            }
        />
    );
}
