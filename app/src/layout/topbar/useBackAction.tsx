import { useMatches } from "@remix-run/react"


export const useBackAction = () => {
    const matches = useMatches();
    const match = matches.find(
        (match) => match.handle?.["BackAction"] 
    );

    return match?.handle?.["BackAction"]

}