import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import Input from '../components/FormInput.jsx';
import PersonalPic from '../assets/personal.png';

const Personal = () => {
  const { formData, updateFormData } = useFormContext();
  const [personalData, setPersonalData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    gender: '',
    dateOfBirth: '',
    nationality: '',
    address: '',
    phoneNumber: '',
    email: ''
  });

  // Load saved data if it exists
  useEffect(() => {
    if (formData.personal) {
      setPersonalData(formData.personal);
    }
  }, [formData.personal]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation for required fields (middle name is optional)
    const { firstName, lastName, gender, dateOfBirth, nationality, address, phoneNumber, email } = personalData;
    if (!firstName || !lastName || !gender || !dateOfBirth
       || !nationality || !address || !phoneNumber || !email) {
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

    // Save to context
    updateFormData('personal', personalData);
    console.log('Personal information saved✅👍');
    // Navigate to the next page
    navigate('/guardian');
  };

  return (
    <div className=''>
          <p className='text-4xl font-bold text-blue-600 text-center mt-4'>Personal Information</p>
      <div className='grid grid-cols-1 lg:grid-cols-[650px_auto]'>
        <form noValidate onSubmit={handleSubmit} className='flex flex-col gap-2 mt-4 mb-6 p-6 lg:pl-42 order-2 lg:order-1'>
          
          {/* Required Fields */}
          <Input 
            label="First Name" 
            name="firstName"
            value={personalData.firstName ?? ''}
            onChange={(e) => setPersonalData(prev => ({ ...prev, firstName: e.target.value }))}
            required
            width='100%'
          />
          
          <Input 
            label="Last Name"
            name="lastName"
            value={personalData.lastName ?? ''}
            onChange={(e) => setPersonalData(prev => ({ ...prev, lastName: e.target.value }))}
            required
            width='100%'
          />
          
          {/* Optional Field */}
          <Input 
            label="Middle Name (Optional)"
            name="middleName"
            value={personalData.middleName ?? ''}
            onChange={(e) => setPersonalData(prev => ({ ...prev, middleName: e.target.value }))}
            width='100%'
          />
          
          <span className='flex flex-col gap-2'>
            <p className='font-bold text-lg text-blue-700'>Gender</p>
            <select
              name="gender"
              value={personalData.gender ?? ''}
              onChange={(e) => setPersonalData(prev => ({ ...prev, gender: e.target.value }))}
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
            value={personalData.dateOfBirth ?? ''}
            onChange={(e) => setPersonalData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
            required
            width='100%'
          />
          
          <Input 
            label="Nationality"
            name="nationality"
            value={personalData.nationality ?? ''}
            onChange={(e) => setPersonalData(prev => ({ ...prev, nationality: e.target.value }))}
            required
            width='100%'
          />
          
          <Input 
            label="Address"
            name="address"
            value={personalData.address ?? ''}
            onChange={(e) => setPersonalData(prev => ({ ...prev, address: e.target.value }))}
            required
            width='100%'
          />
          
          <Input 
            label="Phone Number"
            name="phoneNumber"
            type="tel"
            value={personalData.phoneNumber ?? ''}
            onChange={(e) => setPersonalData(prev => ({ ...prev, phoneNumber: e.target.value }))}
            required
            width='100%'
            placeholder="e.g., 0242345678"
          />
          
          <Input 
            label="Email Address"
            name="emailAddress"
            type="email"
            value={personalData.email ?? ''}
            onChange={(e) => setPersonalData(prev => ({ ...prev, email: e.target.value }))}
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
