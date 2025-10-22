import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { SummaryCard, SummaryContainer } from "./styles";
import { useContext } from "react";
import { TransactionsContext } from "../../contexts/TransactionsContext";

export function Summary(){
    const {transactions} = useContext(TransactionsContext);

    const summary = transactions.reduce((acc, trasaction) => {
        if(trasaction.type === 'income'){
            acc.income += trasaction.price;
            acc.all += trasaction.price;
        }else{
            acc.outcome += trasaction.price;
            acc.all -= trasaction.price;
        }
    
        return acc;
       }, {income: 0, outcome: 0, all: 0})

    return(

            <SummaryContainer>
                <SummaryCard>
                    <header>
                        <span>Entrada</span>
                        <ArrowCircleUp size={32} color="#00b37e"/>
                    </header>
                    <strong > {summary.income} </strong>
                </SummaryCard>

                <SummaryCard>
                    <header>
                        <span>Saída</span>
                        <ArrowCircleDown size={32} color="#c00404"/>
                    </header>
                    <strong> {summary.outcome} </strong>
                </SummaryCard>

                <SummaryCard variant="green">
                    <header>
                        <span>Total</span>
                        <CurrencyDollar size={32} color="#fff"/>
                    </header>
                    <strong> {summary.all} </strong>
                </SummaryCard>
            </SummaryContainer>
    )
}