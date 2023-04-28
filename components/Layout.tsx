import Head from 'next/head'
import { PropsWithChildren } from 'react'

export function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Head>
        <title>Chordy</title>
      </Head>
      <div className="flex flex-col min-h-screen bg-slate-900">
        <header className="p-4 flex justify-between" />
        <main className="flex-1 p-4">{children}</main>
        <footer className="bg-transparent" />
      </div>
    </>
  )
}
