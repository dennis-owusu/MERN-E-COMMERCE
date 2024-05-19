/* eslint-disable react/no-unescaped-entities */
import { TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
const Products = () => {
  const [productsData, setProductData] = useState([])
  const [filterData, setFilterData] = useState([])
  console.log(productsData)

  useEffect(()=> {
    const fetchData = async()=>{
      try {
        const res = await fetch('/api/user/allproducts')
        const data = await res.json()
        if(res.ok){
          setProductData(data.products.slice(0, 10))
          setFilterData(data.products.slice(0, 10));
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const handleFilter = (value) =>{
    const response = productsData.filter(data => data.title.toLowerCase().includes(value.toLowerCase()));
    setFilterData(response)
  }

  return (
    <>
    <div className='w-full bg-green-300 dark:text-gray-50'>
      
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
    <div className='mt-20 mb-20 flex justify-between items-center mx-20'>
      <h1 className='text-center font-semibold text-4xl'>Best Sales Of Our Ear Product</h1>
      <TextInput onChange={(e)=>handleFilter(e.target.value)} className='w-full max-w-96' type='search' placeholder='Search...'/>
    </div>
    <div className='grid grid-cols-5 grid-rows-2 justify-center items-center gap-5'> 
      {
       filterData.length > 0 ? filterData.map((product)=>( 
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
        <div className='flex flex-col justify-center items-center'>
        <h1 key={product._id} className='text-bold text-3xl font-semibold'>{product.title}</h1>
        <p className='text-orange-400 text-2xl font-semibold'>${product.price}</p>
        </div>
        
        </Link>
         </>
)) : (<p className='text-center'>Loading...</p>)
      }
    </div>
    </>
  
  )
}

export default Products