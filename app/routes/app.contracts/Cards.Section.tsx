import { useLoaderData } from "@remix-run/react";
import { Page, View } from "~/src/design-system";
import { ContractsLoader } from "./route";



export function CardsSection() {
    const data = useLoaderData<ContractsLoader>();
    return (
        <Page.SubLayout>
            <View.Wrapper size="large">
                {data.map((card) => (
                    <View.Card
                        title={card.node.name}
                        subtitle={card.node.abbrevation}
                        key={card.node.id}
                        to={`${card.node.id}`}
                    />
                ))}
            </View.Wrapper>
        </Page.SubLayout>
    );
}
