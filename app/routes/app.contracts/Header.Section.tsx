import { useTheme } from "@mui/material";
import { Action, Page } from "~/src/design-system";
import { Can } from "~/src/session-user";
import { Action as A, Subject } from "~/src/_definitions";
import { IconPlus } from "@tabler/icons-react";

export function HeaderSection() {
    const theme = useTheme();
    return (
        <Page.Header
            actions={
                <Can I={A.Write} a={Subject.Contracts} passThrough>
                    {(allowed) => (
                        <Action.TextLink
                            icon={IconPlus}
                            symbolProps={{ color: theme.palette.success.main }}
                            text="Tilføj kontrakt"
                            to="/app/contracts/create"
                            disabled={!allowed}
                        />
                    )}
                </Can>
            }
        />
    );
}
