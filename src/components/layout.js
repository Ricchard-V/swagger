import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Link from 'next/link';
import LogoutButton from './logoutButton';
import '../app/globals.css';

const Layout = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = Cookies.get('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push('/login');
    }
  }, []);

  return (
    <div>
      <header className='w-full fixed flex justify-around text-white bg-black p-4 z-10'>
        <div className='bg-blue-800 text-white flex gap-3 justify-around p-2 w-2/3 rounded'>
            <Link href='/productos'> <p className='p-2 hover:bg-blue-700 rounded'>Productos</p> </Link>
            <Link href='/tiendas'>   <p className='p-2 hover:bg-blue-700 rounded'>Tiendas</p> </Link>
            <Link href='/clientes'>  <p className='p-2 hover:bg-blue-700 rounded'>Clientes</p> </Link>
            <Link href='/score'>  <p className='p-2 hover:bg-blue-700 rounded'>Puntajes</p> </Link>
            
        </div>
        <div className='flex gap-2'>
          <h2 className='text-center p-2'> {user && <p>Bienvenido, {user.userName}</p>}</h2>
          <LogoutButton /> 
        </div>
        
      </header>
      <main className='relative top-16'>{children}</main>
    </div>
  );
};

export default Layout;