import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import Header from '../components/header.jsx';
import NavBar from '../components/navBar.jsx';
import Status from '../components/status.jsx';
import PersonalPic from '../assets/personal.png';

const Personal = () => {
  const { formData, updateFormData } = useFormContext();
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const [personalData, setPersonalData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    gender: '',
    dateOfBirth: '',
    nationality: '',
    address: '',
    phoneNumber: '',
    email: '',
  });
  
  const [statusModal, setStatusModal] = useState({
    isOpen: false,
    isSuccess: false,
    title: '',
    message: '',
    missingFields: []
  });

  // Load saved data if it exists
  useEffect(() => {
    if (formData.personal) {
      setPersonalData(formData.personal);
    }
  }, [formData.personal]);

 // Close on outside click
     useEffect(() => {
       function handleClickOutside(e) {
         if (!open) return;
   
         if (menuRef.current && menuRef.current.contains(e.target)) return;
   
         if (navRef.current && !navRef.current.contains(e.target)) {
           setOpen(false);
         }
       }
   
       document.addEventListener("mousedown", handleClickOutside);
       return () => document.removeEventListener("mousedown", handleClickOutside);
     }, [open]);
  

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Restrict phone number to 10 digits only
    if (name === 'phoneNumber') {
      const numericValue = value.replace(/\D/g, ''); // Remove non-digits
      if (numericValue.length <= 10) {
        setPersonalData((prev) => ({ ...prev, [name]: numericValue }));
      }
      return;
    }
    
    setPersonalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const missingFields = [];

    // Check for required fields
    if (!personalData.firstName) missingFields.push('First Name');
    if (!personalData.lastName) missingFields.push('Last Name');
    if (!personalData.gender) missingFields.push('Gender');
    if (!personalData.dateOfBirth) missingFields.push('Date Of Birth');
    if (!personalData.nationality) missingFields.push('Nationality');
    if (!personalData.address) missingFields.push('Address');
    if (!personalData.phoneNumber) missingFields.push('Phone Number');
    if (!personalData.email) missingFields.push('Email');

    if (missingFields.length > 0) {
      setStatusModal({
        isOpen: true,
        isSuccess: false,
        title: 'Application Incomplete',
        message: 'Please provide your data for all required fields',
        missingFields
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(personalData.email)) {
      setStatusModal({
        isOpen: true,
        isSuccess: false,
        title: 'Invalid Email',
        message: 'Please enter a valid email address',
        missingFields: ['Email']
      });
      return;
    }

    // Validate phone number (assumes Ghana format)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(personalData.phoneNumber)) {
      setStatusModal({
        isOpen: true,
        isSuccess: false,
        title: 'Invalid Phone Number',
        message: 'Please enter a valid 10-digit phone number',
        missingFields: ['Phone Number']
      });
      return;
    }

    // Save to context
    updateFormData('personal', personalData);
    
    // Show success modal
    setStatusModal({
      isOpen: true,
      isSuccess: true,
      title: 'Application Submitted Successfully',
      message: 'Your Personal information has been saved and submitted for review',
      missingFields: []
    });

    // Navigate after 2 seconds
    setTimeout(() => {
      setStatusModal({ ...statusModal, isOpen: false });
      navigate('/guardian');
    }, 2000);
  };

  const handleCloseModal = () => {
    setStatusModal({ ...statusModal, isOpen: false });
  };

  return (
    <div className='p-4'>
      <Status 
        isOpen={statusModal.isOpen}
        isSuccess={statusModal.isSuccess}
        title={statusModal.title}
        message={statusModal.message}
        missingFields={statusModal.missingFields}
        onClose={handleCloseModal}
      />
      {/* page header */}
         <div className='flex justify-between fixed top-0 left-0 w-full p-4 px-3 bg-white shadow-md shadow-gray-200'>
          <Header open={open} setOpen={setOpen} menuRef={menuRef}/>
          <div className='flex flex-col justify-center items-center gap-1 mr-4 fixed bottom-0 border-t border-gray-300 md:border-none md:static bg-white md:bg-transparent p-5  md:p-0 '>
            <span className='flex gap-1 items-center'>
              <p className='text-[#0063FF] font-semibold'>Step 1</p>
              <p className='text-[#D9D9D9]'>of 6</p>
            </span>
            <span className='flex items-center gap-2'>
              <span class="bg-[#0063FF] w-11 h-3 rounded-full"></span>
              <span class="bg-[#D9D9D9] w-11 h-3 rounded-full"></span>
              <span class="bg-[#D9D9D9] w-11 h-3 rounded-full"></span>
              <span class="bg-[#D9D9D9] w-11 h-3 rounded-full"></span>
              <span class="bg-[#D9D9D9] w-11 h-3 rounded-full"></span>
              <span class="bg-[#D9D9D9] w-11 h-3 rounded-full"></span>
            </span>
          </div>
          {open && (
            <div className='fixed top-15 left-0' ref={navRef}>
            <NavBar/>
          </div>
          )}
         </div>
         {/* page content */}
         <div className='grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-10 mt-20 mb-10'>
          {/* illustration display */}
          <div className=''>
            <div className='flex flex-col gap-2 w-full'>
              <span className='text-3xl md:text-4xl font-extrabold text-center md:text-start'>Personal Information</span>
              <span className='text-gray-500 text-center md:text-start'>Enter your basic personal details as they appear on official documents.</span>
            </div>
            <div className='flex justify-center'>
              <img 
                src={PersonalPic} 
                alt="Personal Information Illustration" 
                className="w-70 md:w-90 h-auto mt-4" 
              />
            </div>
          </div>
          {/* form */}
          <div className='w-full'>
            <span className='text-2xl font-bold'>Enter your personal details</span>
            <form noValidate onSubmit={handleSubmit} className='flex flex-col gap-4 mt-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-10'>
                <div>
                  {/* label */}
                  <div className='flex'>
                    <span className='font-semibold'>First Name</span>
                    <span className='text-red-500'>*</span>
                  </div>
                  {/* input */}
                  <input
                    type="text"
                    name="firstName"
                    placeholder='Enter your First Name'
                    value={personalData.firstName}
                    onChange={handleChange}
                    className='bg-[#f38ef334] rounded-3xl p-2 px-4 w-full focus:outline-[#0063FF] focus:scale-105 hover:scale-105 transition-transform delay-150'
                  />
                </div>
                <div>
                  {/* label */}
                  <div className='flex'>
                    <span className='font-semibold'>Last Name</span>
                    <span className='text-red-500'>*</span>
                  </div>
                  {/* input */}
                  <input
                    type="text"
                    name="lastName"
                    placeholder='Enter your Last Name'
                    value={personalData.lastName}
                    onChange={handleChange}
                    className='bg-[#f38ef334] rounded-3xl p-2 px-4 w-full focus:outline-[#0063FF] focus:scale-105 hover:scale-105 transition-transform delay-150'
                  />
                </div>
              </div>
              <div className='grid grid-cols-1 gap-5'>
                <div>
                  {/* label */} 
                  <div className='flex'>
                    <span className='font-semibold'>Other Names</span>
                  </div>
                  {/* input */}
                  <input
                    type="text"
                    name="middleName"
                    placeholder='Enter your Other Names'
                    value={personalData.middleName}
                    onChange={handleChange}
                    className='bg-[#f38ef334] rounded-3xl p-2 px-4 w-full focus:outline-[#0063FF] focus:scale-103 hover:scale-103 transition-transform delay-150'
                  />
                </div>
                <div>
                  {/* label */}
                  <div className='flex'>
                    <span className='font-semibold'>Gender</span>
                    <span className='text-red-500'>*</span>
                  </div>
                  {/* input */}
                  <select
                    name="gender"
                    value={personalData.gender}
                    onChange={handleChange}
                    className='bg-[#f38ef334] rounded-3xl p-2 px-4 w-full focus:outline-[#0063FF] focus:scale-103 hover:scale-103 transition-transform delay-150'
                  >
                    <option value="" disabled>Select your Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  {/* label */}
                  <div className='flex'>
                    <span className='font-semibold'>Date Of Birth</span>
                    <span className='text-red-500'>*</span>
                  </div>
                  {/* input */}
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={personalData.dateOfBirth}
                    onChange={handleChange}
                    className='bg-[#f38ef334] rounded-3xl p-2 px-4 w-full focus:outline-[#0063FF] focus:scale-103 hover:scale-103 transition-transform delay-150'
                  />
                </div>
                <div>
                  {/* label */}
                  <div className='flex'>
                    <span className='font-semibold'>Nationality</span>
                    <span className='text-red-500'>*</span>
                  </div>
                  {/* input */}
                  <input
                    type="text"
                    name="nationality"
                    placeholder="Enter your Country's Name"
                    value={personalData.nationality}
                    onChange={handleChange}
                    className='bg-[#f38ef334] rounded-3xl p-2 px-4 w-full focus:outline-[#0063FF] focus:scale-103 hover:scale-103 transition-transform delay-150'
                  />
                </div>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-10'>
                <div>
                  {/* label */}
                  <div className='flex'>
                    <span className='font-semibold'>Phone Number</span>
                    <span className='text-red-500'>*</span>
                  </div>
                  {/* input */}
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder='Enter your Phone Number'
                    value={personalData.phoneNumber}
                    onChange={handleChange}
                    className='bg-[#f38ef334] rounded-3xl p-2 px-4 w-full focus:outline-[#0063FF] focus:scale-105 hover:scale-105 transition-transform delay-150'
                  />
                </div>
                <div>
                  {/* label */}
                  <div className='flex'>
                    <span className='font-semibold'>Email</span>
                    <span className='text-red-500'>*</span>
                  </div>
                  {/* input */}
                  <input
                    type="email"
                    name="email"
                    placeholder='Enter your Email Address'
                    value={personalData.email}
                    onChange={handleChange}
                    className='bg-[#f38ef334] rounded-3xl p-2 px-4 w-full focus:outline-[#0063FF] focus:scale-105 hover:scale-105 transition-transform delay-150'
                  />
                </div>
              </div>
              <div>
                  {/* label */}
                  <div className='flex'>
                    <span className='font-semibold'>Address</span>
                    <span className='text-red-500'>*</span>
                  </div>
                  {/* input */}
                  <input
                    type="text"
                    name="address"
                    placeholder='Enter your House Address'
                    value={personalData.address}
                    onChange={handleChange}
                    className='bg-[#f38ef334] rounded-3xl p-2 px-4 w-full focus:outline-[#0063FF] focus:scale-103 hover:scale-103 transition-transform delay-150'
                  />
                </div>
              <div className='flex justify-end items-center mt-6 mb-12 w-full'>
                {/* <button 
                  type="button"
                  onClick={() => navigate(-1)}
                  className='bg-white border-2 border-blue-600 text-[#002359] font-semibold px-4 py-2 rounded-lg flex gap-2 cursor-pointer hover:font-bold active:scale-105'
                >
                  <span className='font-bold'>&lt;</span>
                  <span>Previous</span>
                </button> */}
                <button 
                  type="submit"
                  className='bg-blue-700 text-white shadow-md shadow-blue-400 font-semibold px-4 py-2 rounded-lg flex gap-2 cursor-pointer hover:font-bold active:scale-105'
                >
                  <span>Continue</span>
                  <span className='font-bold'>&gt;</span>
                </button>
              </div>
            </form>
          </div>
         </div>
    </div>
  );
};

export default Personal;
