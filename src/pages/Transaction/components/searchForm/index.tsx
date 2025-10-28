import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./style";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionsContext } from "../../../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";

export function SearchForm(){

    //Observando só uma atributo ou método do contexto para não gerar renderização desnecessária
    const fetchTransactions = useContextSelector(TransactionsContext, (context) => {
        return context.fetchTransactions
    });

    const searchFormSchema = z.object({
        query: z.string(),
    })

    const {
        register, 
        handleSubmit,
        formState: {isSubmitting}
        } = useForm<SearchFormInputs>({
        resolver: zodResolver(searchFormSchema),
    });

    type SearchFormInputs = z.infer<typeof searchFormSchema>;

    async function handleSearchTransactions(data: SearchFormInputs){ //handle -> ação do usuário 
       await fetchTransactions(data.query);
    }


    return (
        <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
            <input 
                type="text" 
                placeholder="Busque por transações"
                {...register('query')}    
            />
            <button type="submit" disabled={isSubmitting}>
                <MagnifyingGlass size={20}/>
                Buscar
            </button>
        </SearchFormContainer>
    )
}