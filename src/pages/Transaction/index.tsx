import { useContext} from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/searchForm";
import { PriceHightLight, TransactionContainer, TransactionsTable } from "./styles";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dataFormatter, priceFormatter } from "../../utils/formatter";


export function Transaction(){

   const {transactions} = useContext(TransactionsContext);

   
        
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
                                            {transaction.type == 'outcome' && '- '} {/* Quando a primeira condição é executado, a segunda é verificado, nesse caso podemos fazer uma condicional sem else  */}
                                        {priceFormatter.format(transaction.price)}
                                        </PriceHightLight>
                                    </td>
                                    <td>{transaction.category}</td>
                                    <td>
                                        {dataFormatter.format(new Date(transaction.createAt))} {/*Transformando de String para Date */}
                                    </td>
                                    
                                </tr>
                            )
                        })}
                        
                    </tbody>
                </TransactionsTable>
            </TransactionContainer>
        </div>
    )
}