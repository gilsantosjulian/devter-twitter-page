import React from 'react';

import Head from 'next/head'
import { fonts } from '../../styles/theme';

const AppLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Devter Twitter App</title>
        <meta name="description" content="Tutorial to recreate Twitter web site using Next js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav></nav>
      <main>
        {children}
      </main>
      <footer></footer>

      <style jsx global>{`

        html,
        body {
          padding: 0;
          margin: 0;
          font-family: ${fonts.base}
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        * {
          box-sizing: border-box;
        }

      `}
      </style>

    </>
  );
}

export default AppLayout;
