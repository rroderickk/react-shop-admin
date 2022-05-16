import React from 'react';
import Header from '@components/Header';
import Nav from '@common/Nav';
import Head from 'next/head';

const MainLayout =({ children })=> { return ( <>
  <Head>
    <title>My Store</title>
  </Head>

  <div className="min-h-full">
  <Header/>
  <Nav/>
    <main className="min-h-full z-0">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </div>
    </main>
  </div>
</>); }; export default MainLayout;
