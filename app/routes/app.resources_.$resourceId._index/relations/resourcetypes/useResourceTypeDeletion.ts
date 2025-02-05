import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import { FormResponse, ResourceAgent } from "~/src";

export interface IDeletionAllocation {
    taskName: string;
    startDate: string;
    endDate: string;
    hours: string;
}

export interface IDeletionConsequence {
    id: string;
    name: string;
    systematicName: string;
    allocations: IDeletionAllocation[];
    totalWork: string;
}

export const useResourceTypeDeletion = () => {
    const consequencesFetcher = useFetcher<IDeletionConsequence[]>();
    const deleteAgentFetcher = useFetcher<FormResponse>();

    const [resourceType, setResourceType] = useState<ResourceAgent | null>(
        null
    );
    const [consequences, setConsequences] = useState<
        IDeletionConsequence[] | null
    >(null);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const requestDeletion = (resourceType: ResourceAgent) => {
        setResourceType(resourceType);
        setIsLoading(true);
        emitRequest(resourceType);
    };

    const emitRequest = (resourceType: ResourceAgent) => {
        consequencesFetcher.load(
            `/api/resource-portfolio/${resourceType.agentId}`
        );
    };

    useEffect(() => {
        if (consequencesFetcher.data && resourceType) {
            if (consequencesFetcher.data.length === 0) {
                handleDelete();
            } else {
                setConsequences(
                    consequencesFetcher.data as IDeletionConsequence[]
                );
                setDialogOpen(true);
                setIsLoading(false);
            }
        }
    }, [consequencesFetcher.data]);

    const handleDelete = () => {
        if (resourceType) {
            setIsLoading(true);
            deleteAgentFetcher.submit(
                {},
                {
                    action: `/api/resource-portfolio/${resourceType.agentId}`,
                    method: "delete",
                }
            );
            onDeleted();
        }
    };

    const onDeleted = () => {
        setResourceType(null);
        setConsequences(null);
        setDialogOpen(false);
        setIsLoading(false);
    };

    useEffect(() => {
        if (deleteAgentFetcher.data) {
            onDeleted();
        }
    }, [deleteAgentFetcher.data]);

    const onCancel = () => {
        onDeleted();
    };

    return {
        requestDeletion,
        handleDelete,
        consequences,
        resourceType,
        dialogOpen,
        isLoading,
        onCancel,
        isDeleting: deleteAgentFetcher.state === "submitting",
    };
};
