import { useTheme } from "@mui/material";
import { Action, Page } from "~/src/design-system";
import { Can } from "~/src/session-user";
import { Action as A, Subject } from "~/src/_definitions";
import { useRowState } from "./hooks/useRowState";
import { IconPlus } from "@tabler/icons-react";

export default function HeaderSection({
    handleCreateClick,
}: Pick<ReturnType<typeof useRowState>, "handleCreateClick">) {
    const theme = useTheme();
    return (
        <Page.Header
            actions={
                <Can I={A.Write} a={Subject.AccessGroups} passThrough>
                    {(allowed) => (
                        <Action.TextButton
                            icon={IconPlus}
                            symbolProps={{ color: theme.palette.success.main }}
                            text="Opret adgangsgruppe"
                            onClick={handleCreateClick}
                            disabled={!allowed}
                        />
                    )}
                </Can>
            }
        />
    );
}
