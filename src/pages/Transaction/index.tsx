import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/searchForm";
import { PriceHightLight, TransactionContainer, TransactionsTable } from "./styles";

export function Transaction(){
    return (
        <div>
            <Header/>
            <Summary/>

            <TransactionContainer>
                <SearchForm/>
                <TransactionsTable>
                    <tbody>
                        <tr>
                            <td width="40%">Desenvolvimento de Site</td>
                            <td>
                                <PriceHightLight variant="income">
                                R$ 12.800,00
                                </PriceHightLight>
                            </td>
                            <td>Venda</td>
                            <td>
                                13/04/2022
                            </td>
                        </tr>
                    
                        <tr>
                            <td width="40%">Hamburguer</td>
                            <td>

                            
                                <PriceHightLight variant="outcome">
                                - R$ 54,80
                                </PriceHightLight>
                            </td>
                            <td>Alimentação</td>
                            <td>
                                13/04/2022
                            </td>
                        </tr>
                        
                    </tbody>
                </TransactionsTable>
            </TransactionContainer>
        </div>
    )
}