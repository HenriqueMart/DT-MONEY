import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :focus{
        outline: 0;
        box-shadow: 0 0 0 20x ${props => props.theme['green-500']};
    }

    body{
        background-color: ${props => props.theme['gray-800']};
    }

    body, input, textarea, button {
        font: 400 1rem Roboto, sans-serif; // Espessira, tamanho e Tipografia
        color: ${props => props.theme['gray-100']};
    }

`