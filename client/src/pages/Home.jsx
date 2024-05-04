import React from 'react'
import '../index.css'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div className='bg-green-200'>
        <div className='relative'>
       <div className=''>
       <svg id="svg" width='100%' viewBox="0 0 1080 1035" xmlns="http://www.w3.org/2000/svg" className="transition overflow-hidden duration-300 ease-in-out delay-150">
          <path d="M 0,700 L 0,408 C 114.39285714285714,403 228.78571428571428,398 350,383 C 471.2142857142857,368 599.2499999999999,343 710,364 C 820.7500000000001,385 914.2142857142858,452 1033,467 C 1151.7857142857142,482 1295.892857142857,445 1440,408 L 1440,700 L 0,700 Z" stroke="none" style={{fillOpacity:1}} fill="#00d084" className="transition-all duration-300 ease-in-out delay-150 path-1" transform="rotate(-180 720 350)"></path>
          </svg>
       </div>
       <div className='flex flex-col-reverse md:flex-row'>
       <div className='absolute top-8 mx-5 flex-1 flex flex-col'>
        <h1 className='text-7xl text-white font-bold'>Shopping And<br/> Department Store</h1>
          <p className='text-white text-lg mt-4'>Shopping is a bit of a relaxing hobby for me, which is<br className='hidden md:inline'/>  sometimes troubling for the bank balance.</p>
        </div>
        <div className='absolute flex-1 top-0 right-2'>
            <img className='w-[80rem] h-72 hidden md:block' src='https://assets-global.website-files.com/63e857eaeaf853471d5335ff/63e9b930e006824963189865_bg-stage.png'/>
        </div>
       </div>
        </div>
        <section className='md:-mt-[20rem] lg:-mt-[43rem] -mt-[2rem] py-10 mx-10'>
            <h1 className='font-bold text-3xl mb-6 ml-10'>Shop Our Top Categories</h1>
           <div className='flex flex-col md:flex-row gap-6 justify-center mx-auto items-center w-full'>
    <div className="card">
    <img className='w-60 h-80 rounded-2xl' src="https://i.pinimg.com/474x/a8/33/7f/a8337f50ffaf22a9f4c350ed63362ec8.jpg" alt="Shoes" />
        </div>
           <div className="card bg-base-100 shadow-xl">
  
    <img className='w-60 h-80 rounded-2xl' src="https://i.pinimg.com/474x/1f/a6/bf/1fa6bf8a77a9ecfbba12afa7d316223c.jpg" alt="Shoes" />
        </div>
           <div className="card bg-base-100 shadow-xl">
  
    <img className='w-60 h-80 rounded-2xl' src="https://i.pinimg.com/474x/42/eb/4e/42eb4ee048c29bf2554ac5e5174942d1.jpg" alt="Shoes" />
        </div>
           <div className="card bg-base-100 shadow-xl">
  
    <img className='w-60 h-80 rounded-2xl' src="https://i.pinimg.com/474x/cc/57/81/cc578109560c9a568cd9305f8259a21a.jpg" alt="Shoes" />
        </div>
           <div className="card bg-base-100 shadow-xl">
  
    <img className='w-60 h-80 rounded-2xl' src="https://i.pinimg.com/474x/6e/e8/8c/6ee88c7603865feaf95d9dcc69ba85a1.jpg" alt="Shoes" />
        </div>
           </div>
        </section> 
</div>
  )
}

export default Home