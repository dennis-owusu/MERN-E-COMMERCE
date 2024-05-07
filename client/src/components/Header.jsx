import React, { useState } from 'react'
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { CiSearch } from "react-icons/ci";
import { FaMoon, FaSearch, FaSun } from "react-icons/fa";
import {useSelector, useDispatch} from 'react-redux'
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toggleTheme } from '../redux/theme/themeSlice';
const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {currentUser} = useSelector((state) => state.user)
  const path = useLocation().pathname
  const {theme} = useSelector((state)=> state.theme)
  return (
    <div className=' sticky top-0 z-50'>
    <Navbar fluid rounded className=' py-5 border-b-2'>
      <Navbar.Brand onClick={()=>navigate('/')} className='cursor-pointer'>
        <img src="https://assets-global.website-files.com/63e857eaeaf853471d5335ff/63e86ab4c21faa7bc0bd90dd_Logo.svg" className="mr-3 h-6 sm:h-9 dark:text-green-500" alt="Flowbite React Logo" />
      </Navbar.Brand>
      <div className="flex md:order-2">
      <Button className='md:hidden mr-4' outline><FaSearch/></Button>
      <Button className='mr-3' gradientDuoTone='greenToBlue' onClick={()=> dispatch(toggleTheme())} outline pill>
        {
          theme === 'light' ? <FaMoon/> : <FaSun/>
        }
      </Button>
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">@{currentUser.username}</span>
            <span className="block truncate text-sm font-medium">{currentUser.email}</span>
          </Dropdown.Header>
          <Dropdown.Item onClick={()=>navigate('/profile')}>Profile</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <button className={`ml-1 border py-2 px-4 rounded-lg text-white hover:opacity-70 transition-all ease-in-out duration-300 ${currentUser ? "bg-none border-none" : "bg-green-400"}`} onClick={()=> navigate('/sign-in')}>
          {
            currentUser ? null : "Sign In"
          }
        </button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" active={path === '/'} as={'div'}>
          <Link to='/' className='text-lg'>
          Home
          </Link>
        </Navbar.Link>
        <Navbar.Link href="#" active={path === '/about'} as={'div'}>
            <Link to='/about' className='text-lg'>
            About
            </Link>
        </Navbar.Link>
        <Navbar.Link href="#" active={path === '/service'} as={'div'}>
            <Link to='/service' className='text-lg'>Services</Link>
        </Navbar.Link>
        <Navbar.Link href="#" active={path === '/pricing'} as={'div'}>
            <Link to='/pricing' className='text-lg'>Pricing</Link>
        </Navbar.Link> 
        <Navbar.Link href="#" active={path === '/contact'} as={'div'}>
            <Link to='/contact' className='text-lg'>Contact</Link>
        </Navbar.Link>
      </Navbar.Collapse>
      <TextInput type='search' placeholder='Search' rightIcon={CiSearch} className='w-[25rem] hidden md:inline'/>
      
    </Navbar>

    </div>
  )
}

export default Header