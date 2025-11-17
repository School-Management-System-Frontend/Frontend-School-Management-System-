import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import Header from '../components/header.jsx';
import NavBar from '../components/navBar.jsx';
import Status from '../components/status.jsx';
import HealthPic from '../assets/health.png';

const HealthInfo = () => {
  const { formData, updateFormData } = useFormContext();
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const menuRef = useRef(null);

  const [healthData, setHealthData] = useState({
    bloodGroup: '',
    genotype: '',
    allergies: '',
    medicalCondition: '',
    doctorContact: '',
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
    if (formData.health) {
      setHealthData(formData.health);
    }
  }, [formData.health]);

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
    
    // Restrict doctor contact to 10 digits only
    if (name === 'doctorContact') {
      const numericValue = value.replace(/\D/g, ''); // Remove non-digits
      if (numericValue.length <= 10) {
        setHealthData((prev) => ({ ...prev, [name]: numericValue }));
      }
      return;
    }
    
    setHealthData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Collect missing fields
    const missingFields = [];
    if (!healthData.bloodGroup) missingFields.push('Blood Group');
    if (!healthData.genotype) missingFields.push('Genotype');
    if (!healthData.allergies) missingFields.push('Allergies');
    if (!healthData.medicalCondition) missingFields.push('Medical Conditions');

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

    // Save to context
    updateFormData('health', healthData);

    // Show success modal
    setStatusModal({
      isOpen: true,
      isSuccess: true,
      title: 'Application Submitted Successfully',
      message: 'Your Health information has been saved and submitted for review',
      missingFields: []
    });

    // Navigate after 2 seconds
    setTimeout(() => {
      setStatusModal({ ...statusModal, isOpen: false });
      navigate('/documents');
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
            <p className='text-[#0063FF] font-semibold'>Step 4</p>
            <p className='text-[#D9D9D9]'>of 6</p>
          </span>
          <span className='flex items-center gap-2'>
            <span className="bg-[#0063FF] w-11 h-3 rounded-full"></span>
            <span className="bg-[#0063FF] w-11 h-3 rounded-full"></span>
            <span className="bg-[#0063FF] w-11 h-3 rounded-full"></span>
            <span className="bg-[#0063FF] w-11 h-3 rounded-full"></span>
            <span className="bg-[#D9D9D9] w-11 h-3 rounded-full"></span>
            <span className="bg-[#D9D9D9] w-11 h-3 rounded-full"></span>
          </span>
        </div>
        {open && (
          <div className='fixed top-16 left-0' ref={navRef}>
            <NavBar/>
          </div>
        )}
      </div>
      {/* page content */}
      <div className='grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-1 md:gap-10 mt-20 mb-10'>
        {/* illustration display */}
        <div className='flex flex-col gap-2 w-full'>
          <div className='flex flex-col gap-2'>
            <span className='text-3xl md:text-4xl font-extrabold text-center md:text-start'>Health Information</span>
            <span className='text-gray-500 text-center md:text-start'>Provide your health details for records</span>
          </div>
          <div className='flex justify-center mt-4'>
            <img 
              src={HealthPic}
              alt="Health Information Illustration"
              className="w-100 h-auto -mt-8" 
            />
          </div>
        </div>
        {/* form */}
        <div className='w-full'>
          <span className='text-2xl font-bold'>Please provide your health information</span>
          <form noValidate onSubmit={handleSubmit} className='flex flex-col gap-4 mt-6'>
            <div className='grid grid-cols-1 gap-5'>
              <div>
                {/* label */}
                <div className='flex'>
                  <span className='font-semibold'>Blood Group</span>
                  <span className='text-red-500'>*</span>
                </div>
                {/* input */}
                <select
                  name="bloodGroup"
                  value={healthData.bloodGroup}
                  onChange={handleChange}
                  className='bg-[#f38ef334] rounded-3xl p-2 px-4 w-full focus:outline-[#0063FF] focus:scale-103 hover:scale-103 transition-transform delay-150'
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div>
                {/* label */}
                <div className='flex'>
                  <span className='font-semibold'>Genotype</span>
                  <span className='text-red-500'>*</span>
                </div>
                {/* input */}
                <select
                  name="genotype"
                  value={healthData.genotype}
                  onChange={handleChange}
                  className='bg-[#f38ef334] rounded-3xl p-2 px-4 w-full focus:outline-[#0063FF] focus:scale-103 hover:scale-103 transition-transform delay-150'
                >
                  <option value="">Select Genotype</option>
                  <option value="AA">AA</option>
                  <option value="AS">AS</option>
                  <option value="SS">SS</option>
                  <option value="AC">AC</option>
                  <option value="SC">SC</option>
                </select>
              </div>
            </div>
            <div>
              {/* label */}
              <div className='flex'>
                <span className='font-semibold'>Allergies</span>
                <span className='text-red-500'>*</span>
              </div>
              {/* input */}
              <textarea
                name="allergies"
                placeholder='List any allergies (optional)'
                value={healthData.allergies}
                onChange={handleChange}
                className='bg-[#f38ef334] rounded-3xl p-2 px-4 w-full h-18 focus:outline-[#0063FF] focus:scale-103 hover:scale-103 transition-transform delay-150'
              />
            </div>
            <div>
              {/* label */}
              <div className='flex'>
                <span className='font-semibold'>Medical Conditions</span>
                <span className='text-red-500'>*</span>
              </div>
              {/* input */}
              <textarea
                name="medicalCondition"
                placeholder='List any medical conditions (optional)'
                value={healthData.medicalCondition}
                onChange={handleChange}
                className='bg-[#f38ef334] rounded-3xl p-2 px-4 w-full h-18 focus:outline-[#0063FF] focus:scale-103 hover:scale-103 transition-transform delay-150'
              />
            </div>
            <div>
              {/* label */}
              <div className='flex'>
                <span className='font-semibold'>Doctor's Contact</span>
              </div>
              {/* input */}
              <input
                type="text"
                name="doctorContact"
                placeholder="Doctor's phone number or email (optional)"
                value={healthData.doctorContact}
                onChange={handleChange}
                className='bg-[#f38ef334] rounded-3xl p-2 px-4 w-full focus:outline-[#0063FF] focus:scale-103 hover:scale-103 transition-transform delay-150'
              />
            </div>
            <div className='flex items-center justify-between mt-6 mb-10'>
              <button 
                type="button"
                onClick={() => navigate('/academic')}
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default HealthInfo;
