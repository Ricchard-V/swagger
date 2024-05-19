import '../app/globals.css';
import Layout from '../components/layout';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Tiendas = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState(' ');
  const [newAddress, setNewAddress] = useState(' ');

  const handleProductChange = (event) => {
    setNewProduct(event.target.value);
  };

  const handleAddressChange = (event) => {
    setNewAddress(event.target.value);
  };
 
  //Funcion para llamar los datos de la API
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://swagger-api.somee.com/api/Product');
      setProducts(response.data);
    } catch (error) {
      console.error('Error al obtener los Productos:', error);
    }
  };

  /*///////
    - Busca cambios en el formulario y actualiza la tabla, haciendo la llamada al fetch
  *////////
  useEffect(() => {
    fetchProducts();
  }, []);

  /*//////////////
    - Funcion para Crear LLamando la API
  *//////////////
  const ProductCreate = async ( ) => {
    if (!newProduct.trim()) {
      alert('El campo nombre no puede estar vacío');
      return;
    }

    try {
      const response = await axios.post(`http://swagger-api.somee.com/api/Product`,{
        "idClient": 0,
        "productName": newProduct,
        "productAddress": newAddress
      });
      if (response.status === 201) {
        fetchProducts();
        alert('Tienda Creada con Exito');
      } else {
        console.error('Error al Crear el Producto:', response.statusText);
      }
    } catch (error) {
      console.error('Error al Crear el Producto:', error);
    }
  };

  /*//////////////
    - Funcion para Eliminar LLamando la API
  *//////////////
  const ProductDelete = async (id) => {
    try {
      const response = await axios.delete(`http://swagger-api.somee.com/api/Product/${id}`);
      if (response.status === 204) {
        fetchProducts();
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
        <h1 className="text-4xl font-bold text-center mb-8">Lista de Productos</h1>
        <table className="min-w-full bg-white shadow-md rounded my-6">
          <thead>
            <tr className=' bg-gray-200'>
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4 bg-gray-200">Nombre</th>
              <th className="py-2 px-4 bg-gray-200">Tipo</th>
              <th className="py-2 px-4 bg-gray-200">Precio</th>
              <th className="py-2 px-4 bg-gray-200">Stock</th>
              <th colSpan="2"></th>   
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.idProduct}>
                <td className="border px-4 py-2">{product.idProduct}</td>
                <td className="border px-4 py-2">{product.productName}</td>
                <td className="border px-4 py-2">{product.idProductType ? product.idProductType['productTypeName'] : product.productTypeID} </td>
                <td className="border px-4 py-2">${product.price}</td>
                <td className="border px-4 py-2">{product.stock}</td>

                <td className='border px-4 py-2'>
                  <button
                    className='bg-red-600 hover:bg-red-800 px-6 py-2 rounded border-2 border-white text-white'
                    onClick={() => ProductDelete(product.idProduct)}
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
                <label htmlFor="newProduct">Nombre de Tienda </label>
                <input type='text'
                    id='newProduct'
                    value={newProduct} 
                    className='form-control rounded p-2 w-full'
                    onChange={handleProductChange}
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
                onClick={() => ProductCreate()}>Crear Tienda
              </button>
          </div>

        </div>
      </div>
    </Layout>
  );
};
export default Tiendas;