import Layout from '../components/layout';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Tiendas = () => {
  const [Games, setGames] = useState([]);


  const handleProductChange = (event) => {
    setNewProduct(event.target.value);
  };

  const handleAddressChange = (event) => {
    setNewAddress(event.target.value);
  };
 
  //Funcion para llamar los datos de la API
  const fetchGames = async () => {
    try {
      const response = await axios.get('http://swagger-api.somee.com/api/Game');
      setGames(response.data);
    } catch (error) {
      console.error('Error al obtener los Puntajes:', error);
    }
  };

  /*///////
    - Busca cambios en el formulario y actualiza la tabla, haciendo la llamada al fetch
  *////////
  useEffect(() => {
    fetchGames();
  }, []);



  /*//////////////
    - Funcion para Eliminar LLamando la API
  *//////////////
  const ProductDelete = async (id) => {
    try {
      const response = await axios.delete(`http://swagger-api.somee.com/api/Game/${id}`);
      if (response.status === 204) {
        fetchGames();
      } else {
        console.error('Error al eliminar el Puntaje:', response.statusText);
      }
    } catch (error) {
      console.error('Error al eliminar el Puntaje:', error);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-4xl font-bold text-center mb-8">Puntajes Semillas de Colombia </h1>
        <table className="min-w-full bg-white shadow-md rounded my-6">
          <thead>
            <tr className=' bg-gray-200'>
              <th className="py-2 px-4">ID del Juego</th>
              <th className="py-2 px-4 bg-gray-200">Nivel</th>
              <th className="py-2 px-4 bg-gray-200">jugador</th>
              <th className="py-2 px-4 bg-gray-200">Puntos</th>
              <th className="py-2 px-4 bg-gray-200">Tiempo</th>
              <th colSpan="2"></th>   
            </tr>
          </thead>
          <tbody>
            {Games.map(game => (
              <tr key={game.idgame}>
                <td className="border px-4 py-2">{game.idGame}</td>
                <td className="border px-4 py-2">{game.level}</td>
                <td className="border px-4 py-2">{game.idUser ? game.idUser['Name'] : game.userId} </td>
                <td className="border px-4 py-2">{game.points}</td>
                <td className="border px-4 py-2">{game.time} Segundos</td>

                <td className='border px-4 py-2'>
                  <button
                    className='bg-red-600 hover:bg-red-800 px-6 py-2 rounded border-2 border-white text-white'
                    onClick={() => ProductDelete(game.idGame)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};
export default Tiendas;