import { Alert, Button, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const SignUp = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  console.log(formData)

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim()})
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()
    if(!formData.email || !formData.password || formData.email === '' || formData.password === ''){
      return setErrorMessage('Please fill out all fields')
    }
    setLoading(true)
    setErrorMessage(false)
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if(data.success === false) {
        setErrorMessage(data.message)
        setLoading(false)
      }else{
        toast.success('Sign up successfully', {
          position: 'top-center'
        })
        navigate('/sign-in')
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='flex flex-col md:flex-row gap-0 justify-center items-center mx-auto w-full shadow-2xl bg-green-100 min-h-screen'>
      {/* left */}
      <motion.div initial={{scale:0}} animate={{scale:1}} transition={{duration:1}} className='flex-1 hidden md:inline'>
        <img className='w-[45rem] border-r rounded-r-3xl h-[40rem]' src='https://i.pinimg.com/474x/80/8c/a9/808ca9faf763e259fcf4976ce6933f6e.jpg'/>
      </motion.div>
      {/* right */}
      <div className='flex-1 space-y-5 justify-center items-center min-h-screen md:min-h-0'>
       <motion.div initial={{y:-960}} animate={{y:0}} transition={{duration:1, delay:1, type:'spring', stiffness:60}}>
       <h1 className='text-5xl font-semibold text-center mt-20 md:mt-0'>Hello <span className='text-green-500'>Fams</span></h1>
        <p className='text-center text-gray-400'>Discover the Razer headset you should be gaming with</p>
       </motion.div>
        <motion.form initial={{x:360}} animate={{x:0}} transition={{duration:1}} onSubmit={handleSubmit} className='space-y-4 md:mx-20'>
          <TextInput type='text' id='username' placeholder='Username' onChange={handleChange}/>
          <TextInput type='email' id='email' placeholder='name@gmail.com' onChange={handleChange}/>
          <TextInput type='password' id='password' placeholder='Enter your password' onChange={handleChange}/>
          <Button type='submit' outline gradientDuoTone='greenToBlue' className='w-full text-2xl' disabled={loading}>
            {
              loading ? (
                <>
                <Spinner size='sm' className='mr-3'/>
                <span>Loading ...</span>
                </>
              ) : ('Sign Up')
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

export default SignUp