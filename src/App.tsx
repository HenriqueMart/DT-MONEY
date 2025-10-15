import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Header } from "./components/Header";
import { Transaction } from "./pages/Transaction";


function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle /> {/* Configuração Global */}
      <Transaction/>
    </ThemeProvider>
    
  )
}

export default App
