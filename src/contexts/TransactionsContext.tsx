import { createContext, useEffect, useState, type ReactNode } from "react";

interface Transaction {
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createAt: string;
}


interface TransactionContextType {
    transactions: Transaction[];
}

interface TransactionsProviderProps {
    children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType); //Dessa forma não tem necessidade de definir os valores dentro do Context sendo que a próprio atributo estará passando.

export function TransactionsProvider({children}: TransactionsProviderProps){
     const [transactions, setTransactions] = useState<Transaction[]>([]);
    
        /*fetch("http://localhost:3000/transactions")
        .then(response => response.json()) // Caso tenha esse response.json -> voce pode colocar a promessa em baixo em vez de ser dentro do then
        .then(data => {
            console.log(data)
        })*/
    
        //Para ter a forma assíncrona o typescript e React não aceita no useEffect, precisa criar um function para utilizar
    
        async function loadTransactions() {
            const response = await fetch('http://localhost:3000/transactions'); //Requisição
            const data = await response.json(); //Pega a resposta no formato Json
            console.log(data);
            setTransactions(data);
           
        }
    
        useEffect(() => { //chamada 1 vez
            loadTransactions();
        }, []);

    return(
        <TransactionsContext.Provider value={{transactions}}>
            {children}
        </TransactionsContext.Provider>
    )
}