import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import Header from '../components/header.jsx';
import NavBar from '../components/navBar.jsx';
import Status from '../components/status.jsx';
import AcademicPic from '/illustrations/Academic.png';
import updateIcon from '../assets/update.png';
import { motion } from 'framer-motion';

const Academic = () => {
  const { formData, updateFormData } = useFormContext();
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const [academicData, setAcademicData] = useState({
    schoolName: '',
    schoolAddress: '',
    startDate: '',
    endDate: '',
    classCompleted: '',
    reasonForLeaving: '',
  });
  
  const [statusModal, setStatusModal] = useState({
    isOpen: false,
    isSuccess: false,
    title: '',
    message: '',
    missingFields: []
  });
  const [isEditing, setIsEditing] = useState(false);

  // Load saved data if it exists
  useEffect(() => {
    if (formData.academic) {
      setAcademicData(formData.academic);
    }
    // Check if user came from Review page (edit mode) - persisted in sessionStorage
    const isEditingMode = sessionStorage.getItem('isEditing') === 'true';
    if (isEditingMode) {
      setIsEditing(true);
    }
  }, [formData.academic]);

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

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAcademicData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const missingFields = [];

    // Check for required fields
    if (!academicData.schoolName) missingFields.push('Previous School Attended');
    if (!academicData.schoolAddress) missingFields.push('School Address');
    if (!academicData.startDate) missingFields.push('Start Date (From)');
    if (!academicData.endDate) missingFields.push('End Date (To)');
    if (!academicData.classCompleted) missingFields.push('Class Completed');

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

    // Validate that start date is before end date
    const startDate = new Date(academicData.startDate);
    const endDate = new Date(academicData.endDate);
    
    if (startDate >= endDate) {
      setStatusModal({
        isOpen: true,
        isSuccess: false,
        title: 'Invalid Date Range',
        message: 'Start date must be before end date',
        missingFields: ['Start Date (From)', 'End Date (To)']
      });
      return;
    }

    // Save to context
    updateFormData('academic', academicData);
    
    // Show success modal
    setStatusModal({
      isOpen: true,
      isSuccess: true,
      title: isEditing ? 'Changes Saved Successfully' : 'Application Submitted Successfully',
      message: 'Your Academic information has been saved and submitted for review',
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
        navigate('/health');
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
        <Header open={open} setOpen={setOpen} menuRef={menuRef} />
        <div className='flex flex-col justify-center items-center md:items-start gap-1 fixed bottom-0 left-0 right-0 border-t border-gray-300 md:border-none md:static bg-white md:bg-transparent p-5  md:p-0 '>
          <span className='flex gap-1 items-center'>
            <p className='text-blue-700 font-semibold'>Step 3</p>
            <p className='text-gray-400'>of 6</p>
          </span>
          <span className='flex items-center gap-2'>
            <span className="bg-[#0063FF] w-11 h-3 rounded-full"></span>
            <span className="bg-[#0063FF] w-11 h-3 rounded-full"></span>
            <span className="bg-[#0063FF] w-11 h-3 rounded-full"></span>
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
      <div className='grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-10 mt-20 mb-10'>
        {/* illustration display */}
        <div className='flex flex-col gap-2 w-full'>
          <div className='flex flex-col gap-2'>
            <span className='text-3xl md:text-4xl font-extrabold text-center md:text-start text-[#002359]'>Academic Information</span>
            <span className='text-gray-500 text-center md:text-start'>Provide your academic history from your previous school</span>
          </div>
          <div className='flex justify-center'>
            <img 
              src={AcademicPic}
              alt="Academic Information Illustration" 
              className="w-100 h-auto -mt-8" 
            />
          </div>
        </div>
        {/* form */}
        <div className='w-full'>
          <span className='text-2xl font-bold text-[#002359]'>Please provide your academic history</span>
          <form noValidate onSubmit={handleSubmit} className='flex flex-col gap-4 mt-6'>
            <div className='grid grid-cols-1 gap-5'>
              <div>
                {/* label */}
                <div className='flex'>
                  <span className='font-semibold text-[#002359]'>Previous School Attended</span>
                  <span className='text-red-500'>*</span>
                </div>
                {/* input */}
                <input
                  type="text"
                  name="schoolName"
                  placeholder='Enter the Name of your Previous School'
                  value={academicData.schoolName}
                  onChange={handleChange}
                  className='bg-[#f38ef334] rounded-3xl p-2 px-4 w-full focus:outline-[#0063FF] focus:scale-103 hover:scale-103 transition-transform delay-150'
                />
              </div>
              <div>
                {/* label */}
                <div className='flex'>
                  <span className='font-semibold text-[#002359]'>School Address</span>
                  <span className='text-red-500'>*</span>
                </div>
                {/* input */}
                <input
                  type="text"
                  name="schoolAddress"
                  placeholder='Enter the Address of your Previous School'
                  value={academicData.schoolAddress}
                  onChange={handleChange}
                  className='bg-[#f38ef334] rounded-3xl p-2 px-4 w-full focus:outline-[#0063FF] focus:scale-103 hover:scale-103 transition-transform delay-150'
                />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-10'>
              <div>
                {/* label */}
                <div className='flex'>
                  <span className='font-semibold text-[#002359]'>From</span>
                  <span className='text-red-500'>*</span>
                </div>
                {/* input */}
                <input
                  type="date"
                  name="startDate"
                  value={academicData.startDate}
                  onChange={handleChange}
                  className='bg-[#f38ef334] rounded-3xl p-2 px-4 w-full focus:outline-[#0063FF] focus:scale-103 hover:scale-103 transition-transform delay-150'
                />
              </div>
              <div>
                {/* label */}
                <div className='flex'>
                  <span className='font-semibold text-[#002359]'>To</span>
                  <span className='text-red-500'>*</span>
                </div>
                {/* input */}
                <input
                  type="date"
                  name="endDate"
                  value={academicData.endDate}
                  onChange={handleChange}
                  className='bg-[#f38ef334] rounded-3xl p-2 px-4 w-full focus:outline-[#0063FF] focus:scale-103 hover:scale-103 transition-transform delay-150'
                />
              </div>
            </div>
            <div>
              {/* label */}
              <div className='flex'>
                <span className='font-semibold text-[#002359]'>Class Completed</span>
                <span className='text-red-500'>*</span>
              </div>
              {/* input */}
              <select
                name="classCompleted"
                value={academicData.classCompleted}
                onChange={handleChange}
                className='bg-[#f38ef334] rounded-3xl p-2 px-4 w-full focus:outline-[#0063FF] focus:scale-103 hover:scale-103 transition-transform delay-150'
              >
                <option value="" disabled>Select your previous class</option>
                <option value="JHS-3">JHS-3</option>
                <option value="JHS-2">JHS-2</option>
                <option value="JHS-1">JHS-1</option>
                <option value="Upper Primary 6">Upper Primary 6</option>
                <option value="Upper Primary 5">Upper Primary 5</option>
                <option value="Upper Primary 4">Upper Primary 4</option>
                <option value="Lower Primary 3">Lower Primary 3</option>
                <option value="Lower Primary 2">Lower Primary 2</option>
                <option value="Lower Primary 1">Lower Primary 1</option>
              </select>
            </div>
            <div>
              {/* label */}
              <div className='flex'>
                <span className='font-semibold text-[#002359]'>Reason for Leaving</span>
              </div>
              {/* input */}
              <textarea
                name="reasonForLeaving"
                placeholder='Enter the Reason for Leaving your Previous School'
                value={academicData.reasonForLeaving}
                onChange={handleChange}
                className='bg-[#f38ef334] rounded-3xl p-2 px-4 w-full h-18 focus:outline-[#0063FF] focus:scale-103 hover:scale-103 transition-transform delay-150 '
              />
            </div>
            {/* Proceeding to Next page */}
            <div className={`${!isEditing ? 'flex' : 'hidden'} justify-between items-center mt-6 mb-10`}>
              <button 
                type="button"
                onClick={() => navigate('/guardian')}
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

export default Academic;
