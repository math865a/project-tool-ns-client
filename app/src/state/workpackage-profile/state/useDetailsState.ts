import { useLoaderData } from "@remix-run/react";
import { useMemo, useState } from "react";
import { WorkpackageLoader } from "~/routes/app.workpackages_.$workpackageId/route";
import { ContractNode, FinancialSourceNode } from "~/src/_definitions";


export interface IWorkpackageDetails {
    financialSourceId: string;
    contractId: string;
    workpackageId: string;
    name: string;
    description: string;
    serialNo: string;
}

export const useDetails = () => {
    const {
        node: { name, description, id: workpackageId, serialNo },
        foreignKeys: { financialSourceId, contractId }
    } = useLoaderData<WorkpackageLoader>();

    const [details, setDetails] = useState<IWorkpackageDetails>({
        name,
        description,
        workpackageId,
        contractId,
        financialSourceId,
        serialNo,
    });

    const contract = useContract(details.contractId);
    const financialSource = useFinancialSource(details.financialSourceId);

    const systematicName = useMemo(() => {
        return `${contract.abbrevation}-${financialSource.name}-${details.serialNo}`;
    }, [contract.abbrevation, financialSource.name, details.serialNo]);

    const updateDetails = (newDetails: IWorkpackageDetails) =>
        setDetails(newDetails);

    return {
        state: details,
        updateDetails,
        systematicName,
        contract,
        financialSource,
    };
};

export const useContract = (contractId: string) => {
    const {
        options: { contracts: options },
    } = useLoaderData<WorkpackageLoader>();

    const contract = useMemo(() => {
        return options.find((d) => d.id === contractId) as ContractNode;
    }, [options, contractId]);

    return contract;
};

export const useFinancialSource = (financialSourceId: string) => {
    const {
        options: { financialSources: options },
    } = useLoaderData<WorkpackageLoader>();

    const financialSource = useMemo(() => {
        return options.find(
            (d) => d.id === financialSourceId
        ) as FinancialSourceNode;
    }, [options, financialSourceId]);

    return financialSource;
};

export type DetailsBag = ReturnType<typeof useDetails>;
