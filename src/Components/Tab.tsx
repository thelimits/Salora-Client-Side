import { useState, useEffect } from 'react';
import { NextPageContext } from 'next';
import Link from 'next/link';

interface Props {
  path: string;
}

export default function Tab({ path: initialPath }: Props) {
  const [path, setPath] = useState(initialPath);

  useEffect(() => {
    const handleRouteChange = () => {
      if (typeof window !== 'undefined') {
        setPath(window.location.pathname);
      }
    };

    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return (
    <div className='flex flex-row justify-center items-center gap-10'>
      <Link href="/customer/account/create/">
        <div className={path === '/customer/account/create/' ? 'border-b-2 border-black' : ''}>
          Pelanggan baru
        </div>
      </Link>
      <Link href="/customer/account/login/">
        <div className={path === '/customer/account/login/' ? 'border-b-2 border-black' : ''}>
          Pelanggan lama
        </div>
      </Link>
    </div>
  );
}

Tab.getInitialProps = ({ req }: NextPageContext) => {
  const path = req ? req.url : window.location.pathname;
  return { path };
}
