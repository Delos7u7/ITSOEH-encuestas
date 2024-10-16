import React from 'react';
import ProductCard from './Home/TarjetaProducto';

function Home() {
  const products = [
    {
      id: 1,
      image: 'https://pngimg.com/uploads/washing_machine/washing_machine_PNG15578.png',
      title: 'Producto 1',
      description: 'Descripción breve del producto 1.',
      price: 19.99
    },
    {
      id: 2,
      image: 'http://pluspng.com/img-png/tv-hd-png-tcl-48-inch-1080p-led-hdtv-sam-s-club-techwelike-cruz-2-5184.png',
      title: 'Producto 2',
      description: 'Descripción breve del producto 2.',
      price: 29.99
    },
    {
      id: 3,
      image: 'https://muebleriaconsorciocruz.com/wp-content/uploads/2022/11/GUARDAROPA-GIGANTE.png',
      title: 'Producto 3',
      description: 'Descripción breve del producto 3.',
      price: 39.99
    },
    {
      id: 1,
      image: 'https://pngimg.com/uploads/washing_machine/washing_machine_PNG15578.png',
      title: 'Producto 4',
      description: 'Descripción breve del producto 4.',
      price: 19.99
    },
    {
      id: 2,
      image: 'http://pluspng.com/img-png/tv-hd-png-tcl-48-inch-1080p-led-hdtv-sam-s-club-techwelike-cruz-2-5184.png',
      title: 'Producto 5',
      description: 'Descripción breve del producto 5.',
      price: 29.99
    },
    {
      id: 3,
      image: 'https://muebleriaconsorciocruz.com/wp-content/uploads/2022/11/GUARDAROPA-GIGANTE.png',
      title: 'Producto 6',
      description: 'Descripción breve del producto 6.',
      price: 39.99
    }
  ];

  return (
    <div className="container mx-auto mt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            title={product.title}
            description={product.description}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;