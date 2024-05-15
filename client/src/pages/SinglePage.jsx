import { Button } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SinglePage = () => {
    const [productData, setProductData] = useState(null)
    const {productId} = useParams()
    console.log(productId)
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const res = await fetch(`/api/user/product/${productId}`);
            const data = await res.json();
            if (res.ok) {
              setProductData(data);
            }
          } catch (error) {
            console.log(error);
          }
        };
       if(productId){
        fetchProducts()
       }
      
      }, [productId]);
  return (
    <div className='flex gap-10 min-h-screen justify-center items-center'>
      {
        productData ? (
            <>
             <div className='mx-20'>
        <img className='w-[40rem] object-contain h-[40rem] rounded-2xl' src={productData && productData.image}/>
        </div>
        <div>
         <div className='mt-10 '>
             <h1 className='text-3xl text-center font-bold'>{productData && productData.title}</h1>
           <div className='flex gap-20 mb-10 border-b-2 border-gray-200 items-center'>
           <div className="rating flex justify-center">
   <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" />
   <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400"  />
   <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" />
   <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" />
   <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" />
 </div>
 <p>5/5 (50 reviews)</p>
           </div>
           <p className='text-2xl text-orange-400 font-semibold border-b border-gray-200 space-y-10'>${productData && productData.price}</p>
         </div>
         <p className='text-lg'>{productData && productData.description}</p>
        <div className='flex gap-10 mt-20'>
         <Button gradientDuoTone='greenToBlue'>Buy Now</Button>
         <Button gradientDuoTone='greenToBlue' outline>Add to Cart</Button>
        </div>
        </div>
        </>): (<p>Data not available</p>)
      }
    </div>
  )
}

export default SinglePage