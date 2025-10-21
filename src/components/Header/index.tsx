import { HeaderContainer, HeaderContent, NewTransactionButton } from "./style";
import logoIMG from '../../assets/Logo.svg'
import * as Dialog from '@radix-ui/react-dialog'
import { NewTransactionModal } from "../NewTransctionModal";

export function Header(){
    return (
        <HeaderContainer>
            <HeaderContent>
                <img src={logoIMG} alt=""/>
                <Dialog.Root>
                    {/* Botão da Biblioteca: `asChild` faz com que o Trigger use o elemento filho sem criar um botão extra */}
                    <Dialog.Trigger asChild>
                        <NewTransactionButton>
                            Nova transação
                        </NewTransactionButton>
                    </Dialog.Trigger>

                    <NewTransactionModal/>
                    
                </Dialog.Root>
                    
            </HeaderContent>
        </HeaderContainer>
   
    )
}