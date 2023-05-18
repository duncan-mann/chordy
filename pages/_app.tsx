import { AppProps } from 'next/app'
import { Layout } from '../components/Layout/Layout'
import '../styles/globals.css'
import { KeyContextProvider } from '../components/KeyContext'
import { MobileWrapper } from '../components/Layout/MobileWrapper'

function App({ Component, pageProps }: AppProps) {
  return (
    <KeyContextProvider>
      <Layout>
        <MobileWrapper>
          <Component {...pageProps} />
        </MobileWrapper>
      </Layout>
    </KeyContextProvider>
  )
}

export default App
