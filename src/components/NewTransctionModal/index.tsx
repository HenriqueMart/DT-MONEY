import * as Dialog from '@radix-ui/react-dialog'
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './style'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import { useContextSelector } from 'use-context-selector';

const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome'])
})

type newTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;


export function NewTransactionModal(){
    const createTransaction = useContextSelector(TransactionsContext,
        (context) => {
        return context.createTransaction;
    });

    const {
        control,
        handleSubmit, 
        register,
        formState: {isSubmitting},
        reset
    } = useForm<newTransactionFormInputs>({
        resolver: zodResolver(newTransactionFormSchema),
        defaultValues: { //Definindo o valor padrão. Precisa que o componentes tenha o value que tem on onChange
            type: 'income'
        }
    })

    async function handleCreateNewTransaction(data: newTransactionFormInputs){
        const {description,category,price,type} = data;


        createTransaction({
            description,
            category,
            price,
            type
        });

        

        reset();
    }


    return(
        <Dialog.Portal>
            <Overlay/> {/*fundo preto */}
            <Content >
                <CloseButton>
                    <X />     
                </CloseButton>
                <Dialog.Title>Nova transação</Dialog.Title>

                <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                    <input 
                        type="text" 
                        placeholder="Descrição" 
                        required
                        {...register('description')}
                        />
                    <input 
                        type="number" 
                        placeholder="Preço" 
                        required
                        {...register('price', {valueAsNumber: true})}
                        />
                    <input 
                        type="text" 
                        placeholder="Categoria" 
                        required
                        {...register('category')}
                        />

                    <Controller
                        control={control}
                        name='type'
                        render={( {field }) => {
                            //field -> eventos; fieldState -> Ações do Formulário; FormState: informação do formulário
                            return(
                                <TransactionType 
                                    onValueChange={field.onChange} 
                                    value={field.value}>
                                    <TransactionTypeButton variant='income' value='income'>
                                        <ArrowCircleUp size={24}/>
                                        Entrada
                                    </TransactionTypeButton>
                                    <TransactionTypeButton variant='outcome' value='outcome'>
                                        <ArrowCircleDown size={24}/>
                                        Saída
                                    </TransactionTypeButton>
                                </TransactionType>
                            )
                        }}
                    />

                    <button type="submit" disabled={isSubmitting}>
                        Cadastrar
                    </button>

                </form>


                
            </Content>
  
        </Dialog.Portal>
    )
}