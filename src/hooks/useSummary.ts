import { useContext } from "react";
import { TransactionsContext } from "../contexts/TransactionsContext";

export function useSummary(){
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
        }, {income: 0, outcome: 0, all: 0});

    return summary;
}