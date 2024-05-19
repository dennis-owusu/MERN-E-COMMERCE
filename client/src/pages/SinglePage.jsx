import { Button } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SinglePage = () => {
    const [productData, setProductData] = useState(null)
    const {productId} = useParams()
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
    <div className='flex flex-col md:flex-row gap-10 min-h-screen justify-center items-center'>
      {
        productData ? (
            <>
             <div className='md:mx-20 mx-10'>
        <img className='w-[40rem] h-[40rem] rounded-2xl' src={productData && productData.image}/>
        </div>
        <div className='max-w-[30rem]'>
         <div className='md:mt-10 '>
             <h1 className='text-3xl text-center mb-5 font-bold'>{productData && productData.title}</h1>
           <div className='flex gap-20 mb-10 border-b-2 justify-center border-gray-200 items-center'>
           <div className="rating flex justify-center">
   <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" />
   <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400"  />
   <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" />
   <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" />
   <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" />
 </div>
 <p>5/5 (50 reviews)</p>
           </div>
           <p className='text-4xl text-orange-400 font-semibold border-b border-gray-200 space-y-10'>${productData && productData.price}.99</p>
         </div>
         <p className='text-lg'>{productData && productData.description}</p>
        <div className='flex gap-10 md:mt-20 mt-10 justify-center'>
         <Button gradientDuoTone='greenToBlue'>Buy Now</Button>
         <Button gradientDuoTone='greenToBlue' outline>Add to Cart</Button>
        </div>
        </div>
        </>): (<p>Product not available</p>)
      }
    </div>
  )
}

export default SinglePage