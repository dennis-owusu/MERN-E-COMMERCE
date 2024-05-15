import { Button, TextInput } from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React from 'react'

const CreatePost = () => {
  return (
    <div className='space-y-6 min-h-screen'>
        <h1 className='text-center font-semibold text-3xl mt-10'>Create a Post</h1>
        <div className='w-full'>
        <form onSubmit className='w-96 md:w-[30rem] flex flex-col justify-center mx-auto space-y-5'>
            <TextInput type='text' placeholder='Enter the title of the product'/>
            <div className='flex justify-center items-center gap-6'>
                <input type='file' accept='image/*'/>
                <Button outline>Uplaod Image</Button>
            </div>
          <div className=''>
          <ReactQuill className='h-56' theme="snow" placeholder='Write something about the product' />
          </div>
         <div className=''>
         <Button type='submit' className='mt-10 w-full' gradientDuoTone='greenToBlue'>Publish</Button>
         </div>

        </form>
        </div>
    </div>
  )
}

export default CreatePost