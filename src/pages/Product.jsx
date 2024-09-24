import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'

const Product = () => {
  const { productId } = useParams()
  const { products,currency } = useContext(ShopContext)
  const [productData, setProductData] = useState(null)
  const [image, setImage] = useState('')
  const [size,setSize]=useState('')

  useEffect(() => {
    const foundProduct = products.find(item => item._id === productId)
    if (foundProduct) {
      setProductData(foundProduct)
      setImage(foundProduct.image[0]) // Set the first image by default
    }
  }, [productId, products])

  return productData ? (
    <div className='border-t pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex flex-col sm:flex-row gap-12'>
        
        {/* Main Image on the Right */}
        <div className='flex-1 sm:w-[80%]'>
          <img src={image} className='w-full h-auto object-contain' alt='Selected Product' />
        </div>

        {/* Thumbnails at the Bottom */}
        <div className='w-full sm:w-[20%] mt-5 sm:mt-0 flex flex-col'>
          <div className='flex overflow-x-auto justify-center sm:flex-col sm:justify-start gap-3'>
            {productData.image.map((item, index) => (
              <img
                src={item}
                key={index}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                alt='Product Thumbnail'
                onClick={() => setImage(item)} // Set clicked image
              />
            ))}
          </div>
        </div>
        {/* ---------------Product Info---------------------- */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item,index)=>(
                <button 
                onClick={() => setSize(item)} 
                className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`} 
                key={index}
              >
                {item}
              </button>
              ))}
            </div>
          </div>
          <button className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5'/>
        </div>
      </div>
    </div>
  ) : <div className='opacity-0'>Loading...</div>
}

export default Product
