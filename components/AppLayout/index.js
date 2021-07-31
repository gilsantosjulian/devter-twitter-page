import React from 'react';

import Head from 'next/head'

import './index.module.css'

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
    </>
  );
}

export default AppLayout;
