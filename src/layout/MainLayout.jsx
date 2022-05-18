import React from 'react';
import Header from '@components/Header';
import Nav from '@common/Nav';
import Head from 'next/head';
import { useRouter } from 'next/router';

const MainLayout =({ children })=> {
  const router = useRouter();
  const route = router.pathname.substring(1);

return ( <>
  <Head>
    <title>My Store - {route}</title>
  </Head>

  <div className="min-h-full">
    <Header/>
    <Nav/>

    <main>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </div>
    </main>

  </div>
</>); }; export default MainLayout;