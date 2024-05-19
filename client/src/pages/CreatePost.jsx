import { Button, Label, TextInput } from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';

const CreatePost = () => {
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [publishError, setPublishError] = useState(null);

<<<<<<< HEAD
=======
    console.log(formData)

>>>>>>> 3ee5f5806a5db214ce4942ab3829c6aa75a681b8
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/user/product', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if(res.ok){
               toast.success(data, {
                position: 'top-center'
               })
                navigate('/products')  
            }else{
                toast.error(data.message, {
            })
        }
        } catch (error) {
            console.log(error)
        }
    }
    const handleUpdloadImage = async () => {
        try {
          if (!file) {
            setImageUploadError('Please select an image');
            return;
          }
          setImageUploadError(null);
          const storage = getStorage(app);
          const fileName = new Date().getTime() + '-' + file.name;
          const storageRef = ref(storage, fileName);
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setImageUploadProgress(progress.toFixed(0));
            },
            (error) => {
              setImageUploadError('Image upload failed');
              setImageUploadProgress(null);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImageUploadProgress(null);
                setImageUploadError(null);
                setFormData({ ...formData, image: downloadURL });
              });
            }
          );
        } catch (error) {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
          console.log(error);
        }
      };
     
  return (
    <div className='space-y-6 min-h-screen'>
        <h1 className='text-center font-semibold text-3xl mt-10'>Create a Post</h1>
        <div className='w-full'>
        <form onSubmit={handleSubmit} className='w-96 md:w-[30rem] flex flex-col justify-center mx-auto'>
            <Label value='Title'/>
            <TextInput id='title' onChange={(e)=>setFormData({...formData,[e.target.id]: e.target.value})} type='text' placeholder='Enter the title of the product'/>
          <div className='space-y-20 mt-10'>
          <div className='flex justify-center items-center gap-6'>
                <input type='file' onChange={(e) => setFile(e.target.files[0])} accept='image/*'/>
                <Button outline onClick={handleUpdloadImage} className=''>
                    {
                        imageUploadProgress ? (
                            <div className='w-16 h-16'>
                              <CircularProgressbar
                                value={imageUploadProgress}
                                text={`${imageUploadProgress || 0}%`}
                              />
                            </div>
                          ) : (
                            'Upload Image'
                          )
                    }
                </Button>
            </div>
               <div className='w-full'>
               {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-56 mx-auto flex justify-center h-56 object-cover'
          />
        )}
               </div>
          </div>
          <div className=''>
            <Label value='Description'/>
          <TextInput type='text' id='description' onChange={(e)=>setFormData({...formData, [e.target.id]:e.target.value})} className='' theme="snow" placeholder='Write something about the product' />
          <Label value='Price of item' className='mt-2'/>
          <TextInput onChange={(e)=>setFormData({...formData, [e.target.id]:e.target.value})} type='number' placeholder='Prie of the items' id='price'/>
          </div>
         <div className=''>
         <Button type='submit' className='mt-3 w-full' gradientDuoTone='greenToBlue'>Publish</Button>
         </div>

        </form>
        </div>
    </div>
  )
}

export default CreatePost