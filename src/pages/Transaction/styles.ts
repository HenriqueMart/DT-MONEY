import styled from "styled-components"

export const TransactionContainer = styled.main`
    width: 100%;
    max-width:1120px;
    margin: 4rem auto 0;
    padding: 0 1.5rem;
`

export const TransactionsTable = styled.table`
    width: 100%;
    border-collapse: 0 0.5rem;
    border-spacing: 0 0.5rem;
    margin-top: 1.5rem;
    td{
        padding: 1.25rem 2rem;
        background: ${props => props.theme['gray-700']};

        &:first-child{
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;
        }

        &:last-child{
            border-top-right-radius: 6px;
            border-bottom-right-radius: 6px;
        }
        @media(max-width: 600px){
        padding: 1.25rem 1rem;
        
    }
    @media(max-width: 500px){
        padding: 1.25rem 0.4rem;
    }
    }

    @media(max-width: 700px){
        font-size: 14px;
    }
    @media(max-width: 650px){
        font-size: 12px;
    }
    @media(max-width: 600px){
        display: flex;
        align-items: center;
        justify-content: center;
    
    }
`
interface PriceHightLightProps {
    variant: 'income' | 'outcome';
}

export const PriceHightLight = styled.span<PriceHightLightProps>`
    color: ${props => props.variant === 'income' ? props.theme["green-300"] : props.theme["red-300"]};
`