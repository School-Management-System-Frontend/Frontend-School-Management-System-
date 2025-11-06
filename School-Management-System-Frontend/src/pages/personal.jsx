import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/FormInput.jsx';
import PersonalPic from '../assets/personal.png';

const Personal = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setdateOfBirth] = useState('');
  const [nationality, setNationality] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation for required fields
     if (!firstName || !lastName || !gender || !dateOfBirth || !nationality || !address || !phoneNumber || !email) {
      alert("Please fill in all required fields before proceeding.");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Validate phone number (assumes Nigerian format)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    console.log('Form submitted✅👍');
    // Navigate to the next page (e.g., academic history)
    navigate('/guardian');
  };

  return (
    <div className=''>
          <p className='text-4xl font-bold text-blue-600 text-center mt-4'>Personal Information</p>
      <div className='grid grid-cols-1 lg:grid-cols-[650px_auto]'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-2 mt-4 mb-6 p-6 lg:pl-42 order-2 lg:order-1'>
          
          {/* Required Fields */}
          <Input 
            label="First Name" 
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            width='100%'
          />
          
          <Input 
            label="Last Name"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            width='100%'
          />
          
          {/* Optional Field */}
          <Input 
            label="Middle Name (Optional)"
            name="middleName"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
            width='100%'
          />
          
          <span className='flex flex-col gap-2'>
            <p className='font-bold text-lg text-blue-700'>Gender</p>
            <select
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
              className='w-72 p-3 rounded-md border-b-2 border-black bg-transparent 
                text-black placeholder-gray-400 focus:outline-none focus:ring-0 
                focus:border-b-2 focus:border-blue-700 shadow-sm'
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </span>
          
          <Input 
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={dateOfBirth}
            onChange={(e) => setdateOfBirth(e.target.value)}
            required
            width='100%'
          />
          
          <Input 
            label="Nationality"
            name="nationality"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            required
            width='100%'
          />
          
          <Input 
            label="Address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            width='100%'
          />
          
          <Input 
            label="Phone Number"
            name="phoneNumber"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setphoneNumber(e.target.value)}
            required
            width='100%'
            placeholder="e.g., 0242345678"
          />
          
          <Input 
            label="Email Address"
            name="emailAddress"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            width='100%'
            placeholder="e.g., name@example.com"
          />

          <span className="mt-4 flex">
            <button
              type="submit"
              className="w-full mt-4 bg-blue-700 text-white font-bold cursor-pointer py-2 px-4 rounded-md 
                hover:bg-blue-800 transition duration-150 ease-in-out"
            >
              Next
            </button>
          </span>
        </form>
      
      <div className='flex-1 flex items-start justify-center pt-16 order-1 lg:order-2'>
        <img src={PersonalPic} alt="Personal Information" className='w-60 lg:w-96 h-auto lg:fixed lg:top-30 lg:right-40' />
      </div>
      </div>
    </div>
  );
};

export default Personal;
