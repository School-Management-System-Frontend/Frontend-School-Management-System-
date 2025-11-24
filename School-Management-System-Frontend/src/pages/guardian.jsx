import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import Header from '../components/header.jsx';
import NavBar from '../components/navBar.jsx';
import Status from '../components/status.jsx';
import GuardianPic from '/illustrations/guardian.png';
import updateIcon from '../assets/update.png';
import { motion } from 'framer-motion';

const Guardian = () => {
  const { formData, updateFormData } = useFormContext();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [guardianData, setGuardianData] = useState({
    fullName: '',
    relationship: '',
    occupation: '',
    nationality: '',
    phoneNumber: '',
    emergencyNumber: '',
    email: '',
    address: '',
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
    if (formData.guardian) {
      setGuardianData(formData.guardian);
    }
    
    // Check if user came from Review page (edit mode) - persisted in sessionStorage
    const isEditingMode = sessionStorage.getItem('isEditing') === 'true';
    if (isEditingMode) {
      setIsEditing(true);
    }
  }, [formData.guardian]);

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

    // scroll to top
    useEffect(() => {
      window.scrollTo(0,0)
    }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Restrict phone number and emergency number to 10 digits only
    if (name === 'phoneNumber' || name === 'emergencyNumber') {
      const numericValue = value.replace(/\D/g, ''); // Remove non-digits
      if (numericValue.length <= 10) {
        setGuardianData((prev) => ({ ...prev, [name]: numericValue }));
      }
      return;
    }
    
    setGuardianData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const missingFields = [];

    // Check for required fields
    if (!guardianData.fullName) missingFields.push('Full Name');
    if (!guardianData.relationship) missingFields.push('Relationship To Applicant');
    if (!guardianData.occupation) missingFields.push('Occupation');
    if (!guardianData.nationality) missingFields.push('Nationality');
    if (!guardianData.phoneNumber) missingFields.push('Phone Number');
    if (!guardianData.emergencyNumber) missingFields.push('Emergency Line');
    if (!guardianData.address) missingFields.push('Address');

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

    // Validate email format if provided
    if (guardianData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(guardianData.email)) {
        setStatusModal({
          isOpen: true,
          isSuccess: false,
          title: 'Invalid Email',
          message: 'Please enter a valid email address',
          missingFields: ['Email']
        });
        return;
      }
    }

    // Validate phone numbers
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(guardianData.phoneNumber)) {
      setStatusModal({
        isOpen: true,
        isSuccess: false,
        title: 'Invalid Phone Number',
        message: 'Please enter a valid 10-digit phone number',
        missingFields: ['Phone Number']
      });
      return;
    }

    if (!phoneRegex.test(guardianData.emergencyNumber)) {
      setStatusModal({
        isOpen: true,
        isSuccess: false,
        title: 'Invalid Emergency Number',
        message: 'Please enter a valid 10-digit emergency number',
        missingFields: ['Emergency Line']
      });
      return;
    }

    // Validate that phone number and emergency number are different
    if (guardianData.phoneNumber === guardianData.emergencyNumber) {
      setStatusModal({
        isOpen: true,
        isSuccess: false,
        title: 'Duplicate Phone Numbers',
        message: 'Phone number and emergency number must be different',
        missingFields: ['Phone Number', 'Emergency Line']
      });
      return;
    }

    // Save to context
    updateFormData('guardian', guardianData);
    
    // Show success modal
    setStatusModal({
      isOpen: true,
      isSuccess: true,
      title: isEditing ? 'Changes Saved Successfully' : 'Application Submitted Successfully',
      message: 'Your Guardian information has been saved and submitted for review',
      missingFields: []
    });

    // Navigate after 2 seconds
    setTimeout(() => {
      setStatusModal({ ...statusModal, isOpen: false });
      // Clear the editing flag from sessionStorage
      sessionStorage.removeItem('isEditing');
      if (isEditing) {
        navigate('/review');
      } else {
        navigate('/academic');
      }
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
      <div className='flex justify-between fixed top-0 left-0 w-full p-4 px-3 bg-white shadow-md shadow-gray-200 z-50'>
          <Header open={open} setOpen={setOpen} menuRef={menuRef}/>
          <div className='flex flex-col justify-center items-center md:items-start gap-1 fixed bottom-0 left-0 right-0 border-t border-gray-300 md:border-none md:static bg-white md:bg-transparent p-5  md:p-0 '>
            <span className='flex gap-1 items-center'>
              <p className='text-blue-700 font-semibold'>Step 1</p>
              <p className='text-gray-400'>of 6</p>
            </span>
          <span className='flex items-center gap-2'>
            <span className="bg-[#0063FF] w-11 h-3 rounded-full"></span>
            <span className="bg-[#0063FF] w-11 h-3 rounded-full"></span>
            <span className="bg-[#D9D9D9] w-11 h-3 rounded-full"></span>
            <span className="bg-[#D9D9D9] w-11 h-3 rounded-full"></span>
            <span className="bg-[#D9D9D9] w-11 h-3 rounded-full"></span>
            <span className="bg-[#D9D9D9] w-11 h-3 rounded-full"></span>
          </span>
          </div>
          {open && (
            <div className='fixed top-15 left-0' ref={navRef}>
            <NavBar/>
          </div>
          )}
         </div>
         <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
      {/* page content */}
      <div className='grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-5 md:gap-10 mt-20 mb-10'>
        {/* illustration display */}
        <div className=''>
          <div className='flex flex-col gap-2'>
            <span className='text-3xl md:text-4xl font-extrabold text-center md:text-start text-[#002359]'>Guardian Information</span>
            <span className='text-gray-500 text-center md:text-start'>Provide your guardian contact information</span>
          </div>
          <div className='flex justify-center w-full'>
            <img 
              src={GuardianPic} 
              alt="Guardian Information Illustration" 
              className="w-100 h-auto mt-8 ml-18" 
            />
          </div>
        </div>
        {/* form */}
        <div className=' md:ml-0'>
          <span className='text-2xl font-bold text-[#002359]'>Enter your guardian's details</span>
          <form noValidate onSubmit={handleSubmit} className='flex flex-col gap-4 mt-6'>
            <div className='grid grid-cols-1 gap-5'>
              <div>
                {/* label */}
                <div className='flex'>
                  <span className='font-semibold text-[#002359]'>Full Name</span>
                  <span className='text-red-500'>*</span>
                </div>
                {/* input */}
                <input
                  type="text"
                  name="fullName"
                  placeholder='Enter your Full Name'
                  value={guardianData.fullName}
                  onChange={handleChange}
                  className='bg-[#f38ef334] rounded-3xl p-2 px-4 w-full focus:outline-[#0063FF] focus:scale-103 hover:scale-103 transition-transform delay-150'
                />
              </div>
              <div>
                {/* label */}
                <div className='flex'>
                  <span className='font-semibold text-[#002359]'>Relationship To Applicant</span>
                  <span className='text-red-500'>*</span>
                </div>
                {/* input */}
                <select
                  name="relationship"
                  value={guardianData.relationship}
                  onChange={handleChange}
                  className='bg-[#f38ef334] rounded-3xl p-2 px-4 w-full focus:outline-[#0063FF] focus:scale-103 hover:scale-103 transition-transform delay-150'
                >
                  <option value="" disabled>Select your Relationship</option>
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Guardian">Guardian</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            
            <div className='grid grid-cols-1 gap-5'>
              <div>
                {/* label */}
                <div className='flex'>
                  <span className='font-semibold text-[#002359]'>Occupation</span>
                  <span className='text-red-500'>*</span>
                </div>
                {/* input */}
                <input
                  type="text"
                  name="occupation"
                  placeholder='Enter your Occupation'
                  value={guardianData.occupation}
                  onChange={handleChange}
                  className='bg-[#f38ef334] rounded-3xl p-2 px-4 w-full focus:outline-[#0063FF] focus:scale-103 hover:scale-103 transition-transform delay-150'
                />
              </div>
              <div>
                {/* label */}
                <div className='flex'>
                  <span className='font-semibold text-[#002359]'>Nationality</span>
                  <span className='text-red-500'>*</span>
                </div>
                {/* input */}
                <input
                  type="text"
                  name="nationality"
                  placeholder="Enter your Country's Name"
                  value={guardianData.nationality}
                  onChange={handleChange}
                  className='bg-[#f38ef334] rounded-3xl p-2 px-4 w-full focus:outline-[#0063FF] focus:scale-103 hover:scale-103 transition-transform delay-150'
                />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-10'>
              <div>
                {/* label */}
                <div className='flex'>
                  <span className='font-semibold text-[#002359]'>Phone Number</span>
                  <span className='text-red-500'>*</span>
                </div>
                {/* input */}
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder='Enter your Phone Number'
                  value={guardianData.phoneNumber}
                  onChange={handleChange}
                  className='bg-[#f38ef334] rounded-3xl p-2 px-4 w-full focus:outline-[#0063FF] focus:scale-103 hover:scale-103 transition-transform delay-150'
                />
              </div>
              <div>
                {/* label */}
                <div className='flex'>
                  <span className='font-semibold text-[#002359]'>Emergency Line</span>
                  <span className='text-red-500'>*</span>
                </div>
                {/* input */}
                <input
                  type="tel"
                  name="emergencyNumber"
                  placeholder='Enter your Emergency Number'
                  value={guardianData.emergencyNumber}
                  onChange={handleChange}
                  className='bg-[#f38ef334] rounded-3xl p-2 px-4 w-full focus:outline-[#0063FF] focus:scale-103 hover:scale-103 transition-transform delay-150'
                />
              </div>
            </div>
            <div>
              {/* label */}
              <div className='flex'>
                <span className='font-semibold text-[#002359]'>Email</span>
              </div>
              {/* input */}
              <input
                type="email"
                name="email"
                placeholder='Enter your Email Address'
                value={guardianData.email}
                onChange={handleChange}
                className='bg-[#f38ef334] rounded-3xl p-2 px-4 w-full focus:outline-[#0063FF] focus:scale-103 hover:scale-103 transition-transform delay-150'
              />
            </div>
            <div>
              {/* label */}
              <div className='flex'>
                <span className='font-semibold text-[#002359]'>Address</span>
                <span className='text-red-500'>*</span>
              </div>
              {/* input */}
              <input
                type="text"
                name="address"
                placeholder='Enter your House Address'
                value={guardianData.address}
                onChange={handleChange}
                className='bg-[#f38ef334] rounded-3xl p-2 px-4 w-full focus:outline-[#0063FF] focus:scale-103 hover:scale-103 transition-transform delay-150'
              />
            </div>
            {/* Proceeding to Next page */}
            <div className={`${!isEditing ? 'flex' : 'hidden'} items-center justify-between mt-6 mb-10`}>
              <button 
                type="button"
                onClick={() => navigate('/personal')}
                className='bg-white border-2 border-blue-600 text-[#002359] font-semibold px-4 py-2 rounded-lg flex gap-2 cursor-pointer hover:font-bold active:scale-105'
              >
                <span className='font-bold'>&lt;</span>
                <span>Previous</span>
              </button>
              <button 
                type="submit"
                className='bg-blue-700 text-white shadow-md shadow-blue-400 font-semibold px-4 py-2 rounded-lg flex gap-2 cursor-pointer hover:font-bold active:scale-105'
              >
                <span>Continue</span>
                <span className='font-bold'>&gt;</span>
              </button>
            </div>
            {/* button For Update */}
            <div className={`${isEditing ? 'flex' : 'hidden'} items-center mt-6 mb-12 w-full`}>
              <button 
                type="submit"
                className='bg-blue-700 text-white shadow-md shadow-blue-400 text-lg font-semibold px-4 py-2 rounded-lg flex justify-center items-center gap-2 cursor-pointer hover:font-bold active:scale-105 w-full'
              >
                <span>Update</span>
                <span className='font-bold'>
                  <img src={updateIcon} alt='Update icon' className='w-5 h-5' />
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
      </motion.div>
    </div>
  );
};

export default Guardian;
