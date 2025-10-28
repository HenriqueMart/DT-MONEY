import { useEffect, useState, useCallback, type ReactNode } from "react";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";

interface Transaction {
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createAt: string;
}
interface CreateTransactionInput {
    description: string;
    price: number;
    category: string;
    type: 'income' | 'outcome';
}

interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionContextType {
    transactions: Transaction[];
    fetchTransactions: (query?: string) => Promise<void>;
    createTransaction: (data:CreateTransactionInput) => Promise<void>;
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
    
        const fetchTransactions = useCallback(async (query?: string) => {
           const response = await api.get('/transactions', {
            params: {
                _sort: 'createAt',
                _order: 'desc',
            },
           })

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

            setTransactions(filtered);
        },
        [])
            
            /*const response = await fetch('/transactions'); //Requisição
            const data = await response.json(); //Pega a resposta no formato Json*/
     
       

        //Utilizando o hook callBack do React para não permitir que a função altere sendo que não tenha nem um atributos que modifica
        const createTransaction = useCallback(
            async (data: CreateTransactionInput) => {
            const {description,category,price,type} = data;

            const response = await api.post('transactions', {
                description,
                category,
                price,
                type,
                createAt: new Date()
            
            })

            setTransactions((state:any) => [response.data, ...state]);
            
            },
            []
        )
    
        useEffect(() => { //chamada 1 vez
            fetchTransactions();
        }, []);
         

    return(
        <TransactionsContext.Provider value={{
            transactions,
            fetchTransactions,
            createTransaction
            }}>
            {children}
        </TransactionsContext.Provider>
    )
}