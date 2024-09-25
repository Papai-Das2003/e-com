import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

// Component to handle product image and thumbnails
const ProductImages = ({ images, selectedImage, onSelectImage }) => (
  <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
    {/* Thumbnails */}
    <div className='flex overflow-x-auto justify-between sm:flex-col sm:justify-start gap-3'>
      {images.map((item, index) => (
        <img
          key={index}
          src={item}
          className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer object-cover'
          alt={`Thumbnail ${index}`}
          onClick={() => onSelectImage(item)}
        />
      ))}
    </div>

    {/* Main Image */}
    <div className='w-full sm:w-[80%]'>
      <img
        src={selectedImage}
        className='w-full h-auto max-h-[60vh] object-cover'
        alt='Selected Product'
      />
    </div>
  </div>
);

// Component to display product details
const ProductDetails = ({ product, selectedSize, onSelectSize, currency, addToCart, productData }) => (
  <div className='flex-1'>
    <h1 className='font-medium text-2xl mt-2'>{product.name}</h1>

    {/* Product Rating */}
    <div className='flex items-center gap-1 mt-2'>
      {[...Array(4)].map((_, index) => (
        <img key={index} src={assets.star_icon} alt='Star' className='w-3 5' />
      ))}
      <img src={assets.star_dull_icon} alt='Star Dull' className='w-3 5' />
      <p className='pl-2'>(122)</p>
    </div>

    {/* Product Price */}
    <p className='mt-5 text-3xl font-medium'>{currency}{product.price}</p>

    {/* Product Description */}
    <p className='mt-5 text-gray-500 md:w-4/5'>{product.description}</p>

    {/* Size Selector */}
    <div className='flex flex-col gap-4 my-8'>
      <p>Select Size</p>
      <div className='flex gap-2'>
        {product.sizes.map((size, index) => (
          <button
            key={index}
            onClick={() => onSelectSize(size)}
            className={`border py-2 px-4 bg-gray-100 ${size === selectedSize ? 'border-orange-500' : ''}`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>

    {/* Add to Cart Button */}
    <button onClick={() => addToCart(productData._id, selectedSize)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>
      ADD TO CART
    </button>

    {/* Additional Info */}
    <hr className='mt-8 sm:w-4/5' />
    <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
      <p>100% Original product</p>
      <p>Cash on delivery is available on this product.</p>
      <p>Easy return and exchange policy within 7 days.</p>
    </div>
  </div>
);

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundProduct = products.find(item => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]); // Set the first image by default
      setLoading(false);
    }
  }, [productId, products]);

  if (loading) {
    return <div>Loading...</div>; // Display loading message
  }

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex flex-col sm:flex-row sm:gap-12 gap-12'>
        {/* Product Images */}
        <ProductImages
          images={productData.image}
          selectedImage={image}
          onSelectImage={setImage}
        />

        {/* Product Information */}
        <ProductDetails
          product={productData}
          selectedSize={size}
          onSelectSize={setSize}
          currency={currency}
          addToCart={addToCart} // Pass the addToCart function
          productData={productData} // Pass the product data
        />
      </div>

      {/* Description and review section */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur ex, iure corporis ad fugiat hic aspernatur, nemo, nulla aperiam explicabo temporibus alias quasi quos ea nihil dolorum corrupti. Quasi, sapiente.
          </p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, voluptate repellat. Tempore vero numquam ipsa eligendi debitis. Earum esse recusandae numquam fuga voluptate repellat qui natus rerum et vero. Sunt!</p>
        </div>
      </div>
      
      {/* Display Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  );
};

export default Product;
