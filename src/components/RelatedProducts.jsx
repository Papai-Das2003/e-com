import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();

      // Filter by category and subCategory
      productsCopy = productsCopy.filter((item) => category === item.category);
      productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);

      // Set the first 5 related products
      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category, subCategory]);

  return (
    <div className='my-24'>
      {/* Title for related products */}
      <div className='text-center text-3xl py-2'>
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </div>

      {/* Display related products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {related.map((item, index) => (
          <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
