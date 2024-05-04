import React from 'react'
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { CiSearch } from "react-icons/ci";
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <div>
    <Navbar fluid rounded className=' py-5 border-b-2'>
      <Navbar.Brand href="https://flowbite-react.com">
        <img src="https://assets-global.website-files.com/63e857eaeaf853471d5335ff/63e86ab4c21faa7bc0bd90dd_Logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Button gradientDuoTone='greenToBlue' outline className='ml-3'>Sign In</Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" active as={'div'}>
          <Link to='/' className='text-lg'>
          Home
          </Link>
        </Navbar.Link>
        <Navbar.Link href="#" as={'div'}>
            <Link to='/about' className='text-lg'>
            About
            </Link>
        </Navbar.Link>
        <Navbar.Link href="#" as={'div'}>
            <Link to='/service' className='text-lg'>Services</Link>
        </Navbar.Link>
        <Navbar.Link href="#" as={'div'}>
            <Link to='/pricing' className='text-lg'>Pricing</Link>
        </Navbar.Link> 
        <Navbar.Link href="#" as={'div'}>
            <Link to='/contact' className='text-lg'>Contact</Link>
        </Navbar.Link>
      </Navbar.Collapse>
      <TextInput type='search' placeholder='Search' rightIcon={CiSearch} className='w-[25rem]'/>
    </Navbar>

    </div>
  )
}

export default Header