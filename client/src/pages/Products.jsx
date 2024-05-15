/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
const Products = () => {
  const [productsData, setProductData] = useState([])
  console.log(productsData)

  useEffect(()=> {
    const fetchData = async()=>{
      try {
        const res = await fetch('/api/user/allproducts')
        const data = await res.json()
        if(res.ok){
          setProductData(data.products.slice(0, 8))
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])


  return (
    <>
    <div className='w-full bg-green-300'>
        <div className='flex flex-col md:flex-row gap-20 justify-center items-center rounded-3xl'>
            <div className=' flex-col mx-20'>
            <h1 className='text-5xl font-bold'>Get The Decibels Delivered To Your Ears Perfectly</h1>
            <p className='mt-5'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy</p>
            </div>
         
  <div className="flex-col justify-center items-center mx-auto carousel">
  <div className="carousel-item w-full">
    <img src="../row2.png" className="w-[25rem] h-[20rem]" />
  </div>
</div>
     </div>
    </div>
    <div className='mt-20 mb-20'>
      <h1 className='text-center font-semibold text-4xl'>Best Sales Of Our Ear Product</h1>
    </div>
    <div className='flex flex-wrap justify-center items-center gap-5'> 
      {
       productsData.length > 0 ? productsData.map((product)=>( 
         <>
        <Link to={`/single-page/${product._id}`}>
        <img src={product.image} className='w-68 h-72 rounded-3xl'/>
        <div className="rating flex justify-center">
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400"  />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" />
</div>
<p className='text-center font-semibold text-xl'>{product.description}</p>
        <div className='flex gap-16 justify-center items-center'>
        <h1 key={product._id} className='text-bold font-semibold'>{product.title}</h1>
        <p className='text-orange-400 text-2xl font-semibold'>${product.price}</p>
        </div>
        
        </Link>
         </>
)) : (<p className='text-center'>Loading ...</p>)
      }
    </div>
    </>
  
  )
}

export default Products