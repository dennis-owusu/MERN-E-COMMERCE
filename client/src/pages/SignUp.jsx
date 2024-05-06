import { Button, TextInput } from 'flowbite-react'
import React from 'react'

const SignUp = () => {
  return (
    <div className='flex flex-col md:flex-row gap-0 justify-center items-center mx-auto w-full shadow-2xl bg-green-100'>
      {/* left */}
      <div className='flex-1'>
        <img className='w-[45rem] border-r rounded-r-3xl h-[40rem]' src='https://i.pinimg.com/474x/80/8c/a9/808ca9faf763e259fcf4976ce6933f6e.jpg'/>
      </div>
      {/* right */}
      <div className='flex-1 space-y-5'>
        <h1 className='text-5xl font-semibold text-center'>Hello <span className='text-green-500'>Fams</span></h1>
        <p className='text-center text-gray-400'>Discover the Razer headset you should be gaming with</p>
        <form className='space-y-4 mx-20'>
          <TextInput type='text' id='username' placeholder='Username'/>
          <TextInput type='email' id='email' placeholder='name@gmail.com'/>
          <TextInput type='password' id='password' placeholder='Enter your password'/>
          <Button outline gradientDuoTone='greenToBlue' className='w-full text-2xl'>Sign Up</Button>
        </form>
      </div>
    </div>
  )
}

export default SignUp