import { Page } from "design";
import { Can } from "~/src/session-user";
import { Action, Subject } from "~/src/_definitions";
import { useWorkpackage } from "~/src/state";
import { IconFile, IconReceipt } from "@tabler/icons-react";

export function Tags() {
    const {
        details: { contract, financialSource },
    } = useWorkpackage();

    return (
        <Page.Tags>
            <Can I={Action.Read} a={Subject.Contracts} passThrough>
                {(allowed) => (
                    <Page.Tag
                        title={contract.name}
                        icon={IconFile}
                        to={`/app/contracts/${contract?.id}`}
                        disabled={!allowed}
                    />
                )}
            </Can>
            <Can I={Action.Read} a={Subject.FinancialSources} passThrough>
                {(allowed) => (
                    <Page.Tag
                        title={financialSource.name}
                        icon={IconReceipt}
                        to={`/app/financialsources/${financialSource.id}`}
                        disabled={!allowed}
                    />
                )}
            </Can>
        </Page.Tags>
    );
}
