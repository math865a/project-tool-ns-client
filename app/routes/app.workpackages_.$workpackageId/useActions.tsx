import { useMatches } from "@remix-run/react"
import { Child } from "~/src/design-system";


export const useActions = () => {
    const matches = useMatches();
    const match = matches.find(
        (match) => match.handle?.["Actions"] 
    );

    return match?.handle?.["Actions"] as Child[] | Child | undefined

}