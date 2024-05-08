import { Button, Modal, TextInput } from 'flowbite-react'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { app } from '../firebase'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { CircularProgressbar } from 'react-circular-progressbar';
import {HiOutlineExclamationCircle} from 'react-icons/hi'
import 'react-circular-progressbar/dist/styles.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { deleteFailure, deleteSuccess, signOutSuccess, updateFailure, updateSuccess } from '../redux/user/userSlice'

const Profile = () => {
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch()
  const [imageFile, setImageFile] = useState(null)
  const [imageFileProgressError, setImageFileProgressError] = useState(null)
  const [imageFileUploading, setImageFileUploading] = useState(null)
  const [imageFileUrl, setImageFileUrl] = useState(null)
  const [userUpdateError, setUserUpdateError] = useState(null)
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
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
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

    const handleSubmit = async(e)=>{
      e.preventDefault()
      if (Object.keys(formData).length === 0) {
        setUserUpdateError('No changes made');
        return;
      }
      if (imageFileUploading) {
        setUserUpdateError('Please wait for image to upload');
        return;
      }
      setErrorMessage(null)
      try {
        const res = await fetch(`/api/user/update/${currentUser._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
        const data = await res.json()
        if(data.success === false){
          dispatch(updateFailure(data.message))
        }else{
          dispatch(updateSuccess(data));
        }
      } catch (error) {
        console.log(error)
      }
    }

    const handleDelete = async() =>{
      try {
        const res = await fetch(`/api/user/delete/${currentUser._id}`, {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(formData)
        })
        const data = await res.json()
        if(res.ok){
          dispatch(deleteSuccess(data))
          toast.success('Account has been deleted successfully', {
            position: 'top-center'
          })
          navigate('/sign-in')
        }else{
          dispatch(deleteFailure(data.message))
        }
      } catch (error) {
        console.log(error)
      }
    }

    const handleSignOut = async() =>{
      try {
        const res = await fetch(`/api/user/signout/${currentUser._id}`, {
          method: 'POST',
        })
        const data = await res.json()
        if(res.ok){
          dispatch(signOutSuccess(data))
          toast.success('Sign out successfully', {
            position: 'top-center'
          })
          navigate('/sign-in')
        }
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div className='w-full'>
        <div className='flex flex-col justify-center items-center mx-auto'>
            <h1 className='text-3xl font-semibold my-5'>Profile</h1>
            <input type='file' onChange={handleImageChange} ref={filePickerRef} hidden/>
            <div className='relative cursor-pointer  mb-5 rounded-full' onClick={()=>filePickerRef.current.click()}>
            {imageFileProgress && (
            <CircularProgressbar
              value={imageFileProgress || 0}
              text={`${imageFileProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileProgress / 100
                  })`,
                },
              }}
            />
          )}
            <img className='w-36 h-36 border-8  border-gray-400 rounded-full' src={imageFileUrl || currentUser.profilePicture}/>
            </div>
        </div>
          <form onSubmit={handleSubmit} className='flex justify-center items-center w-full'>
          <div className='space-y-3 w-full mx-20 lg:mx-56'>
           <TextInput type='text' id='username' defaultValue={currentUser.username} onChange={handleChange}/>
            <TextInput type='email' id='email' defaultValue={currentUser.email} onChange={handleChange}/>
            <TextInput type='password' id='password' placeholder='Password' onChange={handleChange}/>
            <Button type='submit' className='w-full' outline gradientDuoTone='greenToBlue'>Update</Button>
          <div className='flex flex-row justify-between items-center text-red-500'>
            <h1 className='cursor-pointer' onClick={() => setOpenModal(true)}>Delete Account</h1>
            <Modal show={openModal} size="md" position='center' onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
            <h1 className='cursor-pointer' onClick={handleSignOut}>Sign Out</h1>
          </div>
          </div>
           </form>
    </div>
  )
}

export default Profile