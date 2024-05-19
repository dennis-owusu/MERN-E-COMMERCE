import { Button } from 'flowbite-react'
import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import {useNavigate} from 'react-router-dom'
import { app } from '../firebase';
import { toast } from 'react-toastify';
import { signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

const OAuth = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = getAuth(app)
  const handleGoogleClick = async() =>{
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({prompt: 'select_account'})
    try {
      const resultFromGoogle =  await signInWithPopup(auth, provider)
      console.log(resultFromGoogle)
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          googlePhotoUrl: resultFromGoogle.user.photoURL
        })
      })
      const data = await res.json()
      if(res.ok){
        toast.success('Sign in successful', {
          position: 'top-center'
        })
        dispatch(signInSuccess(data))
        navigate('/')
      }else{
        dispatch(signInFailure(data.message))
        toast.error(data.message, {
          position: 'top-center'
        })
      }
    } catch (error) {
      toast.error(error.message, {
        position: 'top-center'
      })
    }
  }
  return (
        <Button outline className='w-full flex justify-center items-center' onClick={handleGoogleClick}>
            <span>Continue with Google</span>
            <FcGoogle className='ml-3 w-5 h-5'/>
        </Button>

  )
}

export default OAuth