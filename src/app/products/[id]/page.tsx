import Image from 'next/image';
import { FaFacebook, FaWhatsapp, FaCopy } from 'react-icons/fa';
import { useState } from 'react';

function ProductDetailPage() {

  // Función para copiar el enlace


  return (
    <div className="flex flex-col lg:flex-row items-center justify-center">
      <div className="lg:w-1/3 lg:mr-8">
        <Image src="/t-shirt.jpg" width={400} height={400} alt="T-Shirt ArtStreet" />
      </div>
      <div className="lg:w-2/3">
        <h1 className="text-3xl font-bold">T-Shirt ArtStreet</h1>
        <p className="text-xl font-semibold">$45.000</p>
        <div className="w-full lg:w-1/3">
          <label htmlFor="quantity" className="mt-2 px-1 text-xs text-gray-600 bg-white">Cantidad de Productos</label>
          <input type="number" id="quantity" name="quantity" min="1" max="999" required className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black focus:text-black" />
        </div>
        <p className="text-lg">T-Shirt oficial de ArtStreet. Perfecta para usar en tu día a día o en tus presentaciones.</p>
        <button className="mt-4 px-6 py-3 bg-primaryColor text-white rounded-md">Agregar al Carrito</button>
      </div>
      <div className="mt-8 flex items-center">

       
      </div>
    </div>
  )
}

export default ProductDetailPage;
