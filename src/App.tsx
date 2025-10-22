import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Transaction } from "./pages/Transaction";
import { TransactionsProvider } from "./contexts/TransactionsContext";


function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle /> {/* Configuração Global */}
      <TransactionsProvider> {/*Contexto*/}
        <Transaction/> 
      </TransactionsProvider>
    </ThemeProvider>
    
  )
}

export default App
