import Head from 'next/head'
import { PropsWithChildren } from 'react'

export function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Head>
        <title>Fretboard</title>
      </Head>
      <div className="flex flex-col min-h-screen bg-zinc-100">
        <header className="flex justify-between" />
        <main className="flex-1">{children}</main>
        <footer className="bg-transparent" />
      </div>
    </>
  )
}
