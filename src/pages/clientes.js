import '../app/globals.css';
import Layout from '../components/layout';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Clientes = () => {
  const [clientes, setClients] = useState([]);
  const [newClient, setNewClient] = useState(' ');

  const handleNombreChange = (event) => {
    setNewClient(event.target.value);
  };
 
  //Funcion para llamar los datos de la API
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://swagger-api.somee.com/api/Client');
      setClients(response.data);
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
    }
  };

  /*///////
    - Busca cambios en el fdformulario y actualiza la tabla, hgaciendo la llamada al fetch
  *////////
  useEffect(() => {
    fetchUsers();
  }, []);

  /*//////////////
    - Funcion para eliminar clientes
  *//////////////
  const userCreate = async ( ) => {
    if (!newClient.trim()) {
      alert('El campo nombre no puede estar vacío');
      return;
    }
    try {
      const response = await axios.post(`http://swagger-api.somee.com/api/Client`,{
        "idClient": 0,
        "clientName": newClient
      });
      console.log(response.status);
      if (response.status === 201) {
        fetchUsers();
        alert('Cliente Creado con Exito');
      } else {
        console.error('Error al Crear el usuario:', response.statusText);
      }
    } catch (error) {
      console.error('Error al Crear el usuario:', error);
    }
  };

  const userDelete = async (id) => {
    try {
      const response = await axios.delete(`http://swagger-api.somee.com/api/Client/${id}`);
      if (response.status === 204) {
        fetchUsers();
      } else {
        console.error('Error al eliminar el usuario:', response.statusText);
      }
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-4xl font-bold text-center mb-8">Lista de Clientes</h1>
        <table className="min-w-full bg-white shadow-md rounded my-6">
          <thead>
            <tr className=' bg-gray-200'>
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4 bg-gray-200">Nombre</th>
              <th colSpan="2"></th>   
            </tr>
          </thead>
          <tbody>
            {clientes.map(cliente => (
              <tr key={cliente.id}>
                <td className="border px-4 py-2">{cliente.idClient}</td>
                <td className="border px-4 py-2">{cliente.clientName}</td>
                <td className='border px-4 py-2'>
                  <button
                    className='bg-red-600 hover:bg-red-800 px-6 py-2 rounded border-2 border-white text-white'
                    onClick={() => userDelete(cliente.idClient)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
          <div className='p-5 flex justify-center bg-gray-300'>
            <div class=' bg-gray-200 rounded p-5 w-1/3 flex flex-col justify-center'>
              <h3 className=' text-xl text-center justify-center'>Crear Nuevo Cliente</h3>
              <input type='text'
                id='newClient'
                value={newClient} 
                className='form-control rounded my-5 p-3'
                onChange={handleNombreChange}
                />
              <button 
                className='rounded p-3 bg-green-700 hover:bg-green-600 text-white boreder-2 border-white' 
                onClick={() => userCreate()}>Crear Cliente
              </button>
          </div>

        </div>
      </div>
    </Layout>
  );
};
export default Clientes;