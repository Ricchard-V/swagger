import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

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
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      <p>¿No tienes una cuenta? <Link href="/register">Regístrate aquí</Link></p>
    </div>
  );
};

export default LoginForm;