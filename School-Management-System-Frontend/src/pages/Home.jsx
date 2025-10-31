import React from 'react'
import { Link } from "react-router-dom"; 

const Home = () => {
  return (
    <div>
      <h1 className='text-blue-500'>This is the Home Page</h1>
      <Link to="/login">
        <h3 className='cursor-pointer'>
          Go to Auth Page
        </h3>
      </Link>
    </div>
  )
}

export default Home
