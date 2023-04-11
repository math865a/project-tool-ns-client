import {
    faFileContract,
    faHashtag,
    faReceipt,
} from "@fortawesome/pro-light-svg-icons";
import { Page } from "design";
import { Can } from "~/src/session-user";
import { Action, Subject } from "~/src/_definitions";
import { useWorkpackage } from "~/src/state";

export function Tags() {
    const {
        details: {
            contract,
            financialSource,
        },
    } = useWorkpackage();

    return (
        <Page.Tags>
            <Can I={Action.Read} a={Subject.Contracts} passThrough>
                {(allowed) => (
                    <Page.Tag
                        title={contract.name}
                        icon={faFileContract}
                        to={`/app/contracts/${contract?.id}`}
                        disabled={!allowed}
                    />
                )}
            </Can>
            <Can
                I={Action.Read}
                a={Subject.FinancialSources}
                passThrough
            >
                {(allowed) => (
                    <Page.Tag
                        title={financialSource.name}
                        icon={faReceipt}
                        to={`/app/financialsources/${financialSource.id}`}
                        disabled={!allowed}
                    />
                )}
            </Can>
        </Page.Tags>
    );
}
