import { HeaderContainer, HeaderContent, NewTransactionButton } from "./style";
import logoIMG from '../../assets/Logo.svg'
import * as Dialog from '@radix-ui/react-dialog'

export function Header(){
    return (
        <div>
            <HeaderContainer>
                <HeaderContent>
                    <img src={logoIMG}/>
                    <Dialog.Root>
                        {/* Botão da Biblioteca: `asChild` faz com que o Trigger use o elemento filho sem criar um botão extra */}
                        <Dialog.Trigger asChild>
                            <NewTransactionButton>
                                Nova transação
                            </NewTransactionButton>
                        </Dialog.Trigger>

                        <Dialog.Portal>
                            <Dialog.Overlay/> {/*fundo preto */}
                            <Dialog.Content>
                                <Dialog.Title>Nova transação</Dialog.Title>
                                <Dialog.Close/>
                            </Dialog.Content>
  
                        </Dialog.Portal>
                    </Dialog.Root>
                        
                </HeaderContent>
            </HeaderContainer>
        </div>
    )
}