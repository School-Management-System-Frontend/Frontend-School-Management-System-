import React from 'react'
import { Link } from "react-router-dom"; 

const Home = () => {
  return (
    <div>
      <h1 className='text-blue-500'>This is the Home Page</h1>
      <Link to="/login">
        <h3 className='cursor-pointer'>
          Go to Login Page
        </h3>
      </Link>
      <Link to="/personal">
        <h3 className='cursor-pointer'>
          Go to Personal Info Page
        </h3>
      </Link>
      <Link to="/guardian">
        <h3 className='cursor-pointer'>
          Go to Guardian Info Page
        </h3>
      </Link>
      <Link to="/academic">
        <h3 className='cursor-pointer'>
          Go to Academic History Page
        </h3>
      </Link>
      <Link to="/health">
        <h3 className='cursor-pointer'>
          Go to Health Info Page
        </h3>
      </Link>
      <Link to="/documents">
        <h3 className='cursor-pointer'>
          Go to Document Upload Page
        </h3>
      </Link>
      <Link to="/review">
        <h3 className='cursor-pointer'>
          Go to Review Page
        </h3>
      </Link>
    </div>
  )
}

export default Home
