import { AppProps } from 'next/app'
import { Layout } from '../components/Layout'
import '../styles/globals.css'
import { KeyContextProvider } from '../components/KeyContext'

function App({ Component, pageProps }: AppProps) {
  return (
    <KeyContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </KeyContextProvider>
  )
}

export default App
