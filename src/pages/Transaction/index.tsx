import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/searchForm";
import { PriceHightLight, TransactionContainer, TransactionsTable } from "./styles";

interface Transaction {
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createAt: string;
}

export function Transaction(){

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
        
    return (
        <div>
            <Header/>
            <Summary/>

            <TransactionContainer>
                <SearchForm/>
                <TransactionsTable>
                    <tbody>
                        {transactions.map(transaction => {
                            return(
                                <tr key={transaction.id}>
                                    <td width="40%">{transaction.description}</td>
                                    <td>
                                        <PriceHightLight variant={transaction.type}>
                                        {transaction.price}
                                        </PriceHightLight>
                                    </td>
                                    <td>{transaction.category}</td>
                                    <td>{transaction.createAt}</td>
                                    
                                </tr>
                            )
                        })}
                        
                    </tbody>
                </TransactionsTable>
            </TransactionContainer>
        </div>
    )
}