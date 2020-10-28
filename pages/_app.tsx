import '../styles/globals.css'
import { AppProps } from 'next/app'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { TasksProvider } from "../contexts/TasksContext"
import { ToastProvider } from 'react-toast-notifications'
const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;400;500;600&display=swap');
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
  }
  h1,h2,h3,h4,h5,h6,p{
    margin:0;
    padding:0
  }
`

const theme = {
  colors: {
    primary: '#0D19A3',
    secondary: '#15DB95',
    lightgreen: '#dff5f5',
    red: '#cf0c1e',
    lightred: '#fee7e9',
    textcolorlight: '#636779',
    textcolordark: '#1a1a1a',
    black: '#1f2223',
    white: '#ffff',
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '22px',
    '3xl': '24px',
    '4xl': '28px',
    maxL: '48px',
  },
  width: {
    max: '1150px',
  },
  boxShadow: {
    shadow1:'0 3px 20px #0000001a'
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <GlobalStyle />
   

   
    <ThemeProvider theme={theme}>
      <TasksProvider>
        <ToastProvider>
        <Component {...pageProps} />
        </ToastProvider>
        
        </TasksProvider>
      </ThemeProvider>
      
    
  </>
}

export default MyApp
