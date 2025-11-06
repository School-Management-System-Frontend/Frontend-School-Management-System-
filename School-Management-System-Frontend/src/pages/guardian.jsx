import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/FormInput.jsx';
import GuardianPic from '../assets/guardian.png';

const GuardianForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    relationship: "",
    occupation: "",
    phoneNumber: "",
    emergencyNumber: "",
    email: "",
    address: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation for required fields (excluding email which is optional)
    const requiredFields = ['fullName', 'relationship', 'occupation', 
      'phoneNumber', 'emergencyNumber', 'address'];
    
    const emptyFields = requiredFields.filter(field => !formData[field]);
    
    if (emptyFields.length > 0) {
      alert("Please fill in all required fields before proceeding.");
      return;
    }

    // Validate phone numbers (assumes Nigerian format)
    const phoneRegex = /^[0-9]{11}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      alert("Please enter a valid 11-digit phone number.");
      return;
    }
    if (!phoneRegex.test(formData.emergencyNumber)) {
      alert("Please enter a valid 11-digit emergency number.");
      return;
    }

    // Validate email only if provided (optional field)
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert("Please enter a valid email address or leave it empty.");
      return;
    }

    console.log('Form submitted:', formData);
    // Navigate to the next page (e.g., documents or review)
    navigate('/documents');
  };

  return (
    <div className=''>
          <p className='text-4xl font-bold text-center mt-4 text-blue-600 p-1'>Guardian Information</p>
      <div className='grid grid-cols-1 lg:grid-cols-[650px_auto]'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-2 mt-4 mb-6 p-6 lg:pl-42 order-2 lg:order-1'>
          
          <Input 
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            width='100%'
          />
          
          <span className='flex flex-col gap-2'>
            <p className='font-bold text-lg text-blue-700'>Relationship to Applicant</p>
            <select
              name="relationship"
              value={formData.relationship}
              onChange={handleChange}
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
            value={formData.occupation}
            onChange={handleChange}
            required
            width='100%'
          />
          
          <Input 
            label="Phone Number"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            width='100%'
            placeholder="e.g., 08012345678"
          />
          
          <Input 
            label="Emergency Number"
            name="emergencyNumber"
            type="tel"
            value={formData.emergencyNumber}
            onChange={handleChange}
            required
            width='100%'
            placeholder="e.g., 0242345678"
          />
          
          <Input 
            label="Email Address (Optional)"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            width='100%'
            placeholder="e.g., name@example.com"
          />
          
          <Input 
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
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
        <img src={GuardianPic} alt="Guardian Information" className='w-60 lg:w-120 h-auto ' />
      </div>
      </div>
    </div>
  );
};

export default GuardianForm;
