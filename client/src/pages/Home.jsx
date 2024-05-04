import React from 'react'
import '../index.css'
const Home = () => {
  return (
    <div>
        <div className='relative '>
        <svg width="100%" id="svg" viewBox="0 0 1440 1380" xmlns="http://www.w3.org/2000/svg" className="transition duration-300 ease-in-out delay-150">
          <path d="M 0,700 L 0,408 C 114.39285714285714,403 228.78571428571428,398 350,383 C 471.2142857142857,368 599.2499999999999,343 710,364 C 820.7500000000001,385 914.2142857142858,452 1033,467 C 1151.7857142857142,482 1295.892857142857,445 1440,408 L 1440,700 L 0,700 Z" stroke="none" style={{strokeWidth:0, fillOpacity:1}} fill="#00d084" className="transition-all duration-300 ease-in-out delay-150 path-1" transform="rotate(-180 720 350)"></path>
          </svg>
       <div className='flex flex-col md:fkex-row'>
       <div className='absolute top-8 mx-5 flex-1 flex flex-col'>
        <h1 className='text-7xl text-white font-bold'>Shopping And<br/> Department Store.</h1>
          <p className='text-white text-lg mt-4'>Shopping is a bit of a relaxing hobby for me, which is<br className='hidden md:inline'/>  sometimes troubling for the bank balance.</p>
        </div>
        <div className='absolute flex-1 top-0 right-2'>
            <img className='w-[80rem] h-72' src='https://assets-global.website-files.com/63e857eaeaf853471d5335ff/63e9b930e006824963189865_bg-stage.png'/>
        </div>
       </div>
        </div>
    </div>
  )
}

export default Home