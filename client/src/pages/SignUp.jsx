import { Alert, Button, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

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
      setLoading(false)
    }
  }
  return (
    <div className='flex flex-col md:flex-row gap-0 justify-center items-center mx-auto w-full shadow-2xl bg-green-100'>
      {/* left */}
      <div className='flex-1 hidden md:inline'>
        <img className='w-[45rem] border-r rounded-r-3xl h-[40rem]' src='https://i.pinimg.com/474x/80/8c/a9/808ca9faf763e259fcf4976ce6933f6e.jpg'/>
      </div>
      {/* right */}
      <div className='flex-1 space-y-5 justify-center items-center min-h-screen md:min-h-0'>
        <h1 className='text-5xl font-semibold text-center mt-20 md:mt-0'>Hello <span className='text-green-500'>Fams</span></h1>
        <p className='text-center text-gray-400'>Discover the Razer headset you should be gaming with</p>
        <form onSubmit={handleSubmit} className='space-y-4 md:mx-20'>
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
        </form>
      </div>
    </div>
  )
}

export default SignUp