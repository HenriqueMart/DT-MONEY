import { TransactionsContext } from "../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";
import {useMemo} from "react"

export function useSummary(){
    const transactions = useContextSelector(TransactionsContext, (context) => {
        return context.transactions;
    });
    
    const summary = useMemo(() => {
        return transactions.reduce((acc, trasaction) => {
        if(trasaction.type === 'income'){
            acc.income += trasaction.price;
            acc.all += trasaction.price;
        }else{
            acc.outcome += trasaction.price;
            acc.all -= trasaction.price;
        }
    
        return acc;
        }, {income: 0, outcome: 0, all: 0});
    }, [transactions])

    return summary;
}