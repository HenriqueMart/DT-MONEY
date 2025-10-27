import { Item } from "@radix-ui/react-radio-group";
import type { promises } from "dns";
import { createContext, useEffect, useState, type ReactNode } from "react";
import { api } from "../lib/axios";

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
    fetchTransactions: (query?: string) => Promise<void>;
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
    
        async function fetchTransactions(query?: string) {
           const response = await api.get('/transactions');
            
            /*const response = await fetch('/transactions'); //Requisição
            const data = await response.json(); //Pega a resposta no formato Json*/
     


            const filtered = query
                ? response.data.filter((item: Transaction) => {
                      const q = query.toLowerCase().trim(); //trim() -> remove espaço no início e no fim da frase

                      return ( // Pesquisando por todos os campos do array retornado da API de forma manual. Pois o server Json Não faz essa pesquisa global depois da versão 0.75.0 
                          item.description.toLowerCase().includes(q) ||
                          item.category.toLowerCase().includes(q) ||
                          item.type.toLowerCase().includes(q) ||
                          String(item.price).includes(q) ||
                          item.createAt.toLowerCase().includes(q)
                      );
                  })
                : response.data;

            console.log(response);
            
            setTransactions(filtered);

        }
    
        useEffect(() => { //chamada 1 vez
            fetchTransactions();
        }, []);

    return(
        <TransactionsContext.Provider value={{
            transactions,
            fetchTransactions
            }}>
            {children}
        </TransactionsContext.Provider>
    )
}