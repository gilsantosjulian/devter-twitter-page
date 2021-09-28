import React from 'react'

import Head from 'next/head'
import styles, { globalStyles } from './styles'

const AppLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Devter Twitter App</title>
        <meta name="description" content="Tutorial to recreate Twitter web site using Next js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav></nav>

      <div>
        <main>
          {children}
        </main>
      </div>
      <footer></footer>

      <style jsx>{styles}</style>
      <style jsx global>{globalStyles}
</style>

    </>
  )
}

export default AppLayout
