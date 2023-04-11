import { useLoaderData } from "@remix-run/react";
import { Page, View } from "~/src/design-system";
import { FinancialSourcesLoader } from "./route";



export default function CardsSection() {
    const data = useLoaderData<FinancialSourcesLoader>();
    return (
        <Page.SubLayout>
            <View.Wrapper>
                {data.map((financialSource) => (
                    <View.Card
                        title={financialSource.node.name}
                        key={financialSource.node.id}
                        to={`${financialSource.node.id}`}
                        titleProps={{ fontSize: 22 }}
                    />
                ))}
            </View.Wrapper>
        </Page.SubLayout>
    );
}
