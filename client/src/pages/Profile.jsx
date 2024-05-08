import { Button, TextInput } from 'flowbite-react'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { app } from '../firebase'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

const Profile = () => {
  const [imageFile, setImageFile] = useState(null)
  const [imageFileProgressError, setImageFileProgressError] = useState(null)
  const [imageFileUploading, setImageFileUploading] = useState(null)
  const [imageFileUrl, setImageFileUrl] = useState(null)
  const [formData, setFormData] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const [imageFileProgress, setImageFileProgress] = useState(null)
  const {currentUser} = useSelector((state)=>state.user)
  const filePickerRef = useRef()
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile)

    uploadTask.on('state_changed', (snapshot)=>{
      const progress = (snapshot.bytesTransferred / snapshot.totalBytesTransferred) * 100
      setImageFileProgress(progress.toFixed(0))
    }, (error)=>{
      setImageFileProgressError('Could not upload image (File must be less than 2MB)')
      setErrorMessage(null)
    },() => 
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setImageFileUrl(downloadURL);
        setFormData({ ...formData, profilePicture: downloadURL });
        setImageFileUploading(false);
      })
    )}

    const handleChange = (e)=>{
      setFormData({ ...formData, [e.target.id]:e.target.value });
    }
  return (
    <div className='w-full'>
        <div className='flex flex-col justify-center items-center mx-auto'>
            <h1 className='text-3xl font-semibold my-5'>Profile</h1>
            <input type='file' onChange={handleImageChange} ref={filePickerRef} hidden/>
            <div className='border-8 cursor-pointer border-gray-400 mb-5 rounded-full' onClick={()=>filePickerRef.current.click()}>
            <img className='w-36 h-36 rounded-full' src={imageFileUrl || currentUser.profilePicture}/>
            </div>
        </div>
          <form className='flex justify-center items-center w-full'>
          <div className='space-y-3 w-full mx-20 lg:mx-56'>
           <TextInput type='text' id='username' defaultValue={currentUser.username} onChange={handleChange}/>
            <TextInput type='email' id='email' defaultValue={currentUser.email} onChange={handleChange}/>
            <TextInput type='password' id='password' placeholder='Password' onChange={handleChange}/>
            <Button className='w-full' outline gradientDuoTone='greenToBlue'>Update</Button>
          </div>
           </form>

    </div>
  )
}

export default Profile