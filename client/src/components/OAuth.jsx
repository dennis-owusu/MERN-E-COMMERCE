import { Button } from 'flowbite-react'
import React from 'react'
import {FcGoogle} from 'react-icons/fc'

const OAuth = () => {
  return (
        <Button outline className='w-full flex justify-center items-center'>
            <span>Continue with Google</span>
            <FcGoogle className='ml-3 w-5 h-5'/>
        </Button>

  )
}

export default OAuth