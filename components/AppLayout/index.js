import React from 'react';

import Head from 'next/head'
import { colors, fonts } from '../../styles/theme';
import { addOpacityToColor } from '../../styles/utils';

const backgroundColor = addOpacityToColor(colors.primary, 0.3)

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
          background-image:
            radial-gradient(${backgroundColor} 1px, transparent 1px),
            radial-gradient(${backgroundColor} 1px, transparent 1px);
          background-position: 0 0, 25px 25px;
          background-size: 50px 50px;
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
