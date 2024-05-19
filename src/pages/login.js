import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import '../app/globals.css';

const LoginForm = () => {
  const id = 21;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Manejadores de cambios para los campos de correo y contraseña
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Peticion de inicio de sesion
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
    const response = await axios.get(`http://swagger-api.somee.com/api/User/${email}`);
      if(response.data['email'] == email && response.data['password'] == password){
        Cookies.set('user', JSON.stringify(response.data), { expires: 0.5 }); 
        router.push("/clientes");
      }else{
      alert('Error de usuario o Clave');   
      console.log('Respuesta de la API:', response.data);
      }
    } catch (error) {
      console.error('Error al enviar datos:', error);
    }
  };

  return (
    <div className='h-screen w-full flex items-center justify-center bg-white p-5'>
      
      <div className='w-1/3 bg-blue-300 p-5'>
      <div className='flex justify-center'>   
        <img className='' src='https://creazilla-store.fra1.digitaloceanspaces.com/emojis/49427/waving-hand-emoji-clipart-md.png' width="20%"/>
      </div>
      <h2 className='text-center  text-3xl font-bold'>Inicio de Sesion</h2>
        <form className='px-10 flex flex-col gap-2 justify-center bg-gray-100 rounded w-full' onSubmit={handleSubmit}>
          <div className='flex flex-col my-5'>
            <label htmlFor="email">Correo Electrónico:</label><br/>
            <input className='p-3 border-blue-300 border-2 rounded'
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className='flex flex-col my-5'>
            <label htmlFor="password">Contraseña:</label><br/>
            <input className='p-3 border-blue-300 border-2 rounded'
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button className="p-1 rounded-xl border-2 border-white bg-blue-500 hover:bg-blue-300" type="submit">Iniciar Sesión</button>

          <p className='text-gray-800 font-bold'>¿No tienes una cuenta? <Link className=' hover:text-gray-400' href="/register">Regístrate aquí</Link></p>
        </form>
      </div>
      
    </div>
  );
};

export default LoginForm;