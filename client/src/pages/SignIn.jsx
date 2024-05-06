import { Alert, Button, Spinner, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';

const SignIn = () => {
  const dispatch = useDispatch()
  const {error:errorMessage} = useSelector((state) => state.user)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  console.log(formData)

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim()})
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()
    if(!formData.email || !formData.password || formData.email === '' || formData.password === ''){
      return dispatch(signInFailure('Please fill out all fields'))
    } 
    dispatch(signInStart())
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if(!res.ok) {
        dispatch(signInFailure(data.message))
      }else{
        dispatch(signInSuccess(data))
        toast.success('Sign up successfully', {
          position: 'top-center'
        })
        navigate('/') 
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  return (
    <div className='flex flex-col md:flex-row-reverse gap-0 justify-center items-center mx-auto w-full shadow-2xl min-h-screen'>
      {/* left */}
      <motion.div initial={{scale:0}} animate={{scale:1}} transition={{duration:1}} className='flex-1 hidden md:inline'>
        <img className='w-[45rem] border-r rounded-l-3xl h-[40rem]' src='https://i.pinimg.com/474x/80/8c/a9/808ca9faf763e259fcf4976ce6933f6e.jpg'/>
      </motion.div>
      {/* right */}
      <div className='flex-1 space-y-5 justify-center items-center min-h-screen md:min-h-0'>
       <motion.div initial={{y:-960}} animate={{y:0}} transition={{duration:1, delay:1, type:'spring', stiffness:60}}>
       <h1 className='text-5xl font-semibold text-center mt-20 md:mt-0'>Hello <span className='text-green-500'>Fams</span></h1>
        <p className='text-center text-gray-400'>Discover the Razer headset you should be gaming with</p>
       </motion.div>
        <motion.form initial={{x:-360}} animate={{x:0}} transition={{duration:1}} onSubmit={handleSubmit} className='space-y-4 md:mx-20'>
          <TextInput type='email' id='email' placeholder='name@gmail.com' onChange={handleChange}/>
          <TextInput type='password' id='password' placeholder='Enter your password' onChange={handleChange}/>
          <Button type='submit' outline gradientDuoTone='greenToBlue' className='w-full text-2xl' disabled={loading}>
            {
              loading ? (
                <>
                <Spinner size='sm' className='mr-3'/>
                <span>Loading ...</span>
                </>
              ) : ('Sign In')
            }
          </Button>
        {
          errorMessage && (<Alert color='failure'>{errorMessage}</Alert>)
        }
        </motion.form>
      </div>
    </div>
  )
}

export default SignIn