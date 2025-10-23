import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./style";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

export function SearchForm(){

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
        await new Promise(resolve => setTimeout(resolve, 2000)); //Criando uma promessa, caso para ser revolda em 2000 milisegundos

        console.log(data);
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