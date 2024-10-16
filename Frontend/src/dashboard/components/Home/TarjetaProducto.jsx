import React from 'react';

const ProductCard = ({ image, title, description, price }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-5">
            <div className="w-full h-48 overflow-hidden rounded-t-lg">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-contain"
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="text-gray-600 my-2">{description}</p>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold text-green-500">${price}</span>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Comprar</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
