import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/FormInput.jsx';
import GuardianPic from '../assets/guardian.png';

const GuardianForm = () => {
    const [fullName, setFullName] = useState('');
    const [relationship, setRelationship] = useState('');
    const [occupation, setOccupation] = useState('');
    const [emergencyNumber, setEmergencyNumber] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');
    const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation for required fields
     if (!fullName || !relationship || !occupation|| !emergencyNumber || !address || !phoneNumber || !email) {
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
    const phoneEmergencyRegex = /^[0-9]{10}$/;
    if (!phoneEmergencyRegex.test(emergencyNumber)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    console.log('Form submitted✅👍');
    // Navigate to the next page (e.g., academic history)
    navigate('/academic');
  };


  return (
    <div className=''>
          <p className='text-4xl font-bold text-center mt-4 text-blue-600 p-1'>Guardian Information</p>
      <div className='grid grid-cols-1 lg:grid-cols-[650px_auto]'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-2 mt-4 mb-6 p-6 lg:pl-42 order-2 lg:order-1'>
          
          <Input 
            label="Full Name"
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            width='100%'
          />
          
          <span className='flex flex-col gap-2'>
            <p className='font-bold text-lg text-blue-700'>Relationship to Applicant</p>
            <select
              name="relationship"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              required
              className='w-72 p-3 rounded-md border-b-2 border-black bg-transparent 
                text-black placeholder-gray-400 focus:outline-none focus:ring-0 
                focus:border-b-2 focus:border-blue-700 shadow-sm'
            >
              <option value="">Select Relationship</option>
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Guardian">Guardian</option>
              <option value="Other">Other</option>
            </select>
          </span>
          
          <Input 
            label="Occupation"
            name="occupation"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
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
            placeholder="e.g., 0223456781"
          />
          
          <Input 
            label="Emergency Number"
            name="emergencyNumber"
            type="tel"
            value={emergencyNumber}
            onChange={(e) => setEmergencyNumber(e.target.value)}
            required
            width='100%'
            placeholder="e.g., 0242345678"
          />
          
          <Input 
            label="Email Address (Optional)"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            width='100%'
            placeholder="e.g., name@example.com"
          />
          
          <Input 
            label="Address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            width='100%'
          />

          <span className="mt-4">
            <button
              type="submit"
              className="w-full mt-4 bg-blue-700 text-white font-bold cursor-pointer py-2 px-4 
                rounded-md hover:bg-blue-800 transition duration-150 ease-in-out"
            >
              Next
            </button>
          </span>
        </form>
      
      <div className='flex-1 flex items-start justify-center pt-16 order-1 lg:order-2'>
        <img src={GuardianPic} alt="Guardian Information" className='w-60 lg:w-120 h-auto lg:fixed lg:top-30 lg:right-30' />
      </div>
      </div>
    </div>
  );
};

export default GuardianForm;
