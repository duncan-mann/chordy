import { AppProps } from 'next/app'
import { Layout } from '../components/Layout/Layout'
import '../styles/globals.css'
import { KeyContextProvider } from '../components/KeyContext'
import { MobileWrapper } from '../components/Layout/MobileWrapper'
import Script from 'next/script'

function App({ Component, pageProps }: AppProps) {
  return (
    <KeyContextProvider>
      <GoogleScripts />
      <Layout>
        <MobileWrapper>
          <Component {...pageProps} />
        </MobileWrapper>
      </Layout>
    </KeyContextProvider>
  )
}

const GoogleScripts = () => {
  const GOOGLE_MEASUREMENT_ID = process.env.GOOGLE_MEASUREMENT_ID
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `,
        }}
      />
    </>
  )
}

export default App
