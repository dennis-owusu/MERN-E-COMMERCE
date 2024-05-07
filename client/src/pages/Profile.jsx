import { Button, TextInput } from 'flowbite-react'
import React from 'react'

const Profile = () => {
  return (
    <div className='w-full'>
        <div className='flex flex-col justify-center items-center mx-auto'>
            <h1 className='text-3xl font-semibold my-5'>Profile</h1>
            <div className='border-8 border-gray-400 mb-5 rounded-full'>
            <img className='w-36 h-36 rounded-full' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKSzhiQWKfmkIEgC4nK9ShYjiWz6-DJgxeNyMoBLLabBo1e5kzMq_TE9_rFzSJpPow264&usqp=CAU'/>
            </div>
        </div>
          <form className='flex justify-center items-center w-full'>
          <div className='space-y-3 w-full mx-20 lg:mx-56'>
           <TextInput/>
            <TextInput/>
            <TextInput/>
            <Button className='w-full' outline gradientDuoTone='greenToBlue'>Update</Button>
          </div>
           </form>

    </div>
  )
}

export default Profile