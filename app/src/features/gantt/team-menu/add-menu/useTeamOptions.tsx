import { TeamMemberJson } from "gantt/types";
import { useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import invariant from "tiny-invariant";
import { useWorkpackage } from "useWorkpackage";

export const useTeamOptions = (open: boolean) => {
    const {Gantt: {Transport: {socket}}} = useWorkpackage();

    const {workpackageId} = useParams()
    invariant(workpackageId)

    const [options, setOptions] = useState<TeamMemberJson[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const loadOptions = () => {
        setIsLoading(true);
        socket?.emit("get:team-options", workpackageId, updateOptions);
    };

    const updateOptions = (options: TeamMemberJson[]) => {
        setOptions(options);
        setIsLoading(false);
    };

    useEffect(() => {
        if (open) {
            loadOptions();
        } else  {
            updateOptions([]);
        }
    }, [open]);

    return {
        options,
        isLoading,
    };
};
