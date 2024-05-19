import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('user');
    router.push('/login');
  };

  return (
    <button onClick={handleLogout} className="bg-red-600 hover:bg-red-800 px-6 py-2 rounded border-2 border-white text-white">
      Cerrar Sesión
    </button>
  );
};

export default LogoutButton;