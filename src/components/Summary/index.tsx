import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { SummaryCard, SummaryContainer } from "./styles";

export function Summary(){

    return(

            <SummaryContainer>
                <SummaryCard>
                    <header>
                        <span>Entrada</span>
                        <ArrowCircleUp size={32} color="#00b37e"/>
                    </header>
                    <td > R$: 17.400,00 </td>
                </SummaryCard>

                <SummaryCard>
                    <header>
                        <span>Saída</span>
                        <ArrowCircleDown size={32} color="#FFF"/>
                    </header>
                    <td> R$: 17.400,00 </td>
                </SummaryCard>

                <SummaryCard variant="green">
                    <header>
                        <span>Total</span>
                        <CurrencyDollar size={32} color="#fff"/>
                    </header>
                    <strong> R$: 17.400,00 </strong>
                </SummaryCard>
            </SummaryContainer>
    )
}