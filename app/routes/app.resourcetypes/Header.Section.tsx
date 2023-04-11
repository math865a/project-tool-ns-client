import { faPlus } from "@fortawesome/pro-solid-svg-icons";
import { useTheme } from "@mui/material";
import { Action, Page } from "~/src/design-system";
import { Can } from "~/src/session-user";
import { Action as A, Subject } from "~/src/_definitions";
export default function HeaderSection() {
    const theme = useTheme();
    return (
        <Page.Header
            actions={
                <Can
                    I={A.Write}
                    a={Subject.ResourceTypes}
                    passThrough
                >
                    {(allowed) => (
                        <Action.TextLink
                            text="Tilføj ressourcetype"
                            icon={faPlus}
                            symbolProps={{ color: theme.palette.success.main }}
                            to="/app/resourcetypes/create"
                            disabled={!allowed}
                        />
                    )}
                </Can>
            }
        />
    );
}
