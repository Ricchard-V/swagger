import Layout from '../components/layout';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Tiendas = () => {
  const [stores, setStores] = useState([]);
  const [newStore, setNewStore] = useState(' ');
  const [newAddress, setNewAddress] = useState(' ');

  const handleStoreChange = (event) => {
    setNewStore(event.target.value);
  };

  const handleAddressChange = (event) => {
    setNewAddress(event.target.value);
  };
 
  //Funcion para llamar los datos de la API
  const fetchStores = async () => {
    try {
      const response = await axios.get('http://swagger-api.somee.com/api/Store');
      setStores(response.data);
    } catch (error) {
      console.error('Error al obtener las Tiendas:', error);
    }
  };

  /*///////
    - Busca cambios en el formulario y actualiza la tabla, haciendo la llamada al fetch
  *////////
  useEffect(() => {
    fetchStores();
  }, []);

  /*//////////////
    - Funcion para Crear LLamando la API
  *//////////////
  const storeCreate = async ( ) => {
    if (!newStore.trim()) {
      alert('El campo nombre no puede estar vacío');
      return;
    }

    try {
      const response = await axios.post(`http://swagger-api.somee.com/api/Store`,{
        "idClient": 0,
        "storeName": newStore,
        "storeAddress": newAddress
      });
      if (response.status === 201) {
        fetchStores();
        alert('Tienda Creada con Exito');
      } else {
        console.error('Error al Crear la Tienda:', response.statusText);
      }
    } catch (error) {
      console.error('Error al Crear la Tienda:', error);
    }
  };

  /*//////////////
    - Funcion para Eliminar LLamando la API
  *//////////////
  const storeDelete = async (id) => {
    try {
      const response = await axios.delete(`http://swagger-api.somee.com/api/Store/${id}`);
      if (response.status === 204) {
        fetchStores();
      } else {
        console.error('Error al eliminar la Tineda:', response.statusText);
      }
    } catch (error) {
      console.error('Error al eliminar la Tineda:', error);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-4xl font-bold text-center mb-8">Lista de Tiendas</h1>
        <table className="min-w-full bg-white shadow-md rounded my-6">
          <thead>
            <tr className=' bg-gray-200'>
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4 bg-gray-200">Nombre</th>
              <th className="py-2 px-4 bg-gray-200">Direccion</th>
              <th colSpan="2"></th>   
            </tr>
          </thead>
          <tbody>
            {stores.map(store => (
              <tr key={stores.id}>
                <td className="border px-4 py-2">{store.idStore}</td>
                <td className="border px-4 py-2">{store.storeName}</td>
                <td className="border px-4 py-2">{store.storeAddress}</td>
                <td className='border px-4 py-2'>
                  <button
                    className='bg-red-600 hover:bg-red-800 px-6 py-2 rounded border-2 border-white text-white'
                    onClick={() => storeDelete(store.idStore)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
          <div className='p-5 flex justify-center bg-gray-300'>
            <div className=' bg-gray-200 rounded p-5 w-1/3 flex flex-col justify-center'>
              <h3 className=' text-xl text-center justify-center'>Crear Nueva Tienda</h3>
              <section className='my-3'>
                <label htmlFor="newStore">Nombre de Tienda </label>
                <input type='text'
                    id='newStore'
                    value={newStore} 
                    className='form-control rounded p-2 w-full'
                    onChange={handleStoreChange}
                    placeholder='Nombre de Tienda'
                    />
                </section>
                
                <section className='my-3'>
                    <label htmlFor="newAddress">Direccion de Tienda </label>
                    <input type='text'
                        id='newAddress'
                        value={newAddress} 
                        className='form-control rounded p-2 w-full'
                        onChange={handleAddressChange}
                        placeholder='Nombre de Tienda'
                        />
                </section>

              <button 
                className='rounded p-3 bg-green-700 hover:bg-green-600 text-white boreder-2 border-white' 
                onClick={() => storeCreate()}>Crear Tienda
              </button>
          </div>

        </div>
      </div>
    </Layout>
  );
};
export default Tiendas;