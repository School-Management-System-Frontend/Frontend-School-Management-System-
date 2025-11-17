import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import Header from '../components/header.jsx';
import NavBar from '../components/navBar.jsx';
import Status from '../components/status.jsx';
import ReviewPic from '../assets/review.png';
import editIcon from '../assets/edit.png';
import closeWhiteIcon from '../assets/closeWhite.png';
import monkeyIcon from '../assets/monkey.png';
import correctIcon from '../assets/correct.png';
import fireworksIcon from '../assets/fireworks.gif';
import logoutWhite from '../assets/logoutW.png';
import submitIcon from '../assets/submit.png';

const Review = () => {
  const { formData, clearFormData } = useFormContext();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const menuRef = useRef(null);
  
  const [statusModal, setStatusModal] = useState({
    isOpen: false,
    isSuccess: false,
    title: '',
    message: '',
    missingFields: []
  });

  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

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

  const renderValue = (value) => {
    if (!value) {
      return <span className='text-red-600 font-semibold'>Not provided</span>;
    }
    return <span>{value}</span>;
  };

  const renderDocumentPreview = (preview) => {
    if (!preview) {
      return <span className='text-red-600 font-semibold'>Not provided</span>;
    }
    if (preview.startsWith('data:image')) {
      return <img src={preview} alt="Document" className='w-20 h-20 object-cover rounded-lg'/>;
    }
    return <div className='w-20 h-20 bg-gray-300 rounded-lg flex items-center justify-center text-xs'>PDF/Doc</div>;
  };

  const handleSubmit = () => {
    // Show custom modal with success state
    setShowSubmissionModal(true);
    setSubmissionSuccess(true);
  };

  const handleCloseModal = () => {
    setStatusModal({ ...statusModal, isOpen: false });
  };

  const handleContinueAfterSubmission = () => {
    setShowSubmissionModal(false);
    navigate('/');
  };

  const handleLogout = () => {
    clearFormData();
    setShowSubmissionModal(false);
    navigate('/');
  };

  const handleRetry = () => {
    setShowSubmissionModal(false);
    setSubmissionSuccess(false);
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
            <p className='text-[#0063FF] font-semibold'>Step 6</p>
            <p className='text-[#D9D9D9]'>of 6</p>
          </span>
          <span className='flex items-center gap-2'>
            <span className="bg-[#0063FF] w-11 h-3 rounded-full"></span>
            <span className="bg-[#0063FF] w-11 h-3 rounded-full"></span>
            <span className="bg-[#0063FF] w-11 h-3 rounded-full"></span>
            <span className="bg-[#0063FF] w-11 h-3 rounded-full"></span>
            <span className="bg-[#0063FF] w-11 h-3 rounded-full"></span>
            <span className="bg-[#0063FF] w-11 h-3 rounded-full"></span>
          </span>
        </div>
        {open && (
          <div className='fixed top-16 left-0' ref={navRef}>
            <NavBar/>
          </div>
        )}
      </div>
      {/* page content */}
      <div className='grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-10 mt-20 mb-10'>
        {/* illustration display */}
        <div className=''>
          <div className='flex flex-col gap-2 w-full'>
            <span className='text-3xl md:text-4xl font-extrabold text-center md:text-start'>Review Information</span>
            <span className='text-gray-500 text-center md:text-start'>Review and confirm your information</span>
          </div>
          <div className='flex justify-center'>
            <img 
              src={ReviewPic} 
              alt="Review Information Illustration" 
              className="w-80 h-auto mt-6" 
            />
          </div>
        </div>
        {/* form */}
        <div className='w-full'>
          <span className='text-2xl font-bold'>Please verify that all the details entered are correct</span>
          
          {/* Personal Information */}
          {formData.personal && (
            <div className='flex flex-col mt-6 mb-8'>
              <div className='flex justify-between items-center mb-4'>
                <span className='text-blue-700 text-xl font-semibold'>Personal Information</span>
                <button 
                  onClick={() => navigate('/personal')}
                  className='bg-blue-600 text-white shadow-md shadow-blue-400 font-semibold px-4 py-2 rounded-lg flex gap-2 cursor-pointer hover:font-bold active:scale-103'
                >
                  <span>
                    <img src={editIcon} alt="Edit Icon" className='w-5 h-5'/>
                  </span>
                  <span>Edit</span>
                </button>
              </div>
              <div className='mt-2 flex flex-col gap-3 shadow-md p-4 rounded-xl hover:scale-103 transition-transform duration-200'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='gap-2 bg-pink-100 p-3 rounded-2xl'>
                    <span className='font-semibold text-gray-700'>First Name:</span>
                    <span>{renderValue(formData.personal.firstName)}</span>
                  </div>
                  <div className='gap-2 bg-pink-100 p-3 rounded-2xl'>
                    <span className='font-semibold text-gray-700'>Last Name:</span>
                    <span>{renderValue(formData.personal.lastName)}</span>
                  </div>
                  <div className='gap-2 bg-pink-100 p-3 rounded-2xl'>
                    <span className='font-semibold text-gray-700'>Other Names:</span>
                    <span>{formData.personal.middleName ? <span>{formData.personal.middleName}</span> : <span className='text-red-600 font-semibold'>Not provided</span>}</span>
                  </div>
                  <div className='gap-2 bg-pink-100 p-3 rounded-2xl'>
                    <span className='font-semibold text-gray-700'>Gender:</span>
                    <span>{renderValue(formData.personal.gender)}</span>
                  </div>
                  <div className='gap-2 bg-pink-100 p-3 rounded-2xl'>
                    <span className='font-semibold text-gray-700'>Date of Birth:</span>
                    <span>{renderValue(formData.personal.dateOfBirth)}</span>
                  </div>
                  <div className='gap-2 bg-pink-100 p-3 rounded-2xl'>
                    <span className='font-semibold text-gray-700'>Nationality:</span>
                    <span>{renderValue(formData.personal.nationality)}</span>
                  </div>
                  <div className='gap-2 bg-pink-100 p-3 rounded-2xl'>
                    <span className='font-semibold text-gray-700'>Phone Number:</span>
                    <span>{renderValue(formData.personal.phoneNumber)}</span>
                  </div>
                  <div className='gap-2 bg-pink-100 p-3 rounded-2xl'>
                    <span className='font-semibold text-gray-700'>Email:</span>
                    <span>{renderValue(formData.personal.email)}</span>
                  </div>
                  <div className='col-span-1 md:col-span-2 gap-2 bg-pink-100 p-3 rounded-2xl'>
                    <span className='font-semibold text-gray-700'>Address:</span>
                    <span>{renderValue(formData.personal.address)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Guardian Information */}
          {formData.guardian && (
            <div className='flex flex-col mt-6 mb-8'>
              <div className='flex justify-between items-center mb-4'>
                <span className='text-blue-700 text-xl font-semibold'>Guardian Information</span>
                <button 
                  onClick={() => navigate('/guardian')}
                  className='bg-blue-600 text-white shadow-md shadow-blue-400 font-semibold px-4 py-2 rounded-lg flex gap-2 cursor-pointer hover:font-bold active:scale-103'
                >
                  <img src={editIcon} alt="Edit Icon" className='w-5 h-5'/>
                  <span>Edit</span>
                </button>
              </div>
              <div className='mt-2 flex flex-col gap-3 shadow-md p-4 rounded-xl hover:scale-103 transition-transform duration-200'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='gap-2 bg-pink-100 p-3 rounded-2xl'>
                    <span className='font-semibold text-gray-700'>Full Name:</span>
                    <span>{renderValue(formData.guardian.fullName)}</span>
                  </div>
                  <div className='gap-2 bg-pink-100 p-3 rounded-2xl'>
                    <span className='font-semibold text-gray-700'>Relationship:</span>
                    <span>{renderValue(formData.guardian.relationship)}</span>
                  </div>
                  <div className='gap-2 bg-pink-100 p-3 rounded-2xl'>
                    <span className='font-semibold text-gray-700'>Occupation:</span>
                    <span>{renderValue(formData.guardian.occupation)}</span>
                  </div>
                  <div className='gap-2 bg-pink-100 p-3 rounded-2xl'>
                    <span className='font-semibold text-gray-700'>Nationality:</span>
                    <span>{renderValue(formData.guardian.nationality)}</span>
                  </div>
                  <div className='gap-2 bg-pink-100 p-3 rounded-2xl'>
                    <span className='font-semibold text-gray-700'>Phone Number:</span>
                    <span>{renderValue(formData.guardian.phoneNumber)}</span>
                  </div>
                  <div className='gap-2 bg-pink-100 p-3 rounded-2xl'>
                    <span className='font-semibold text-gray-700'>Emergency Number:</span>
                    <span>{renderValue(formData.guardian.emergencyNumber)}</span>
                  </div>
                  <div className='gap-2 bg-pink-100 p-3 rounded-2xl'>
                    <span className='font-semibold text-gray-700'>Email:</span>
                    <span>{formData.guardian.email ? <span>{formData.guardian.email}</span> : <span className='text-red-600 font-semibold'>Not provided</span>}</span>
                  </div>
                  <div className='col-span-1 md:col-span-2 gap-2 bg-pink-100 p-3 rounded-2xl'>
                    <span className='font-semibold text-gray-700'>Address:</span>
                    <span>{renderValue(formData.guardian.address)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Academic Information */}
          {formData.academic && (
            <div className='flex flex-col mt-6 mb-8'>
              <div className='flex justify-between items-center mb-4'>
                <span className='text-blue-700 text-xl font-semibold'>Academic Information</span>
                <button 
                  onClick={() => navigate('/academic')}
                  className='bg-blue-600 text-white shadow-md shadow-blue-400 font-semibold px-4 py-2 rounded-lg flex gap-2 cursor-pointer hover:font-bold active:scale-103'
                >
                  <img src={editIcon} alt="Edit Icon" className='w-5 h-5'/>
                  <span>Edit</span>
                </button>
              </div>
              <div className='mt-2 flex flex-col gap-3 shadow-md p-4 rounded-xl hover:scale-103 transition-transform duration-200'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='gap-2 bg-pink-100 p-3 rounded-2xl'>
                    <span className='font-semibold text-gray-700'>School Name:</span>
                    <span>{renderValue(formData.academic.schoolName)}</span>
                  </div>
                  <div className='gap-2 bg-pink-100 p-3 rounded-2xl'>
                    <span className='font-semibold text-gray-700'>School Address:</span>
                    <span>{renderValue(formData.academic.schoolAddress)}</span>
                  </div>
                  <div className='gap-2 bg-pink-100 p-3 rounded-2xl'>
                    <span className='font-semibold text-gray-700'>Start Date:</span>
                    <span>{renderValue(formData.academic.startDate)}</span>
                  </div>
                  <div className='gap-2 bg-pink-100 p-3 rounded-2xl'>
                    <span className='font-semibold text-gray-700'>End Date:</span>
                    <span>{renderValue(formData.academic.endDate)}</span>
                  </div>
                  <div className='col-span-1 md:col-span-2 gap-2 bg-pink-100 p-3 rounded-2xl'>
                    <span className='font-semibold text-gray-700'>Class Completed:</span>
                    <span>{renderValue(formData.academic.classCompleted)}</span>
                  </div>
                  <div className='col-span-1 md:col-span-2 gap-2 bg-pink-100 p-3 rounded-2xl'>
                    <span className='font-semibold text-gray-700'>Reason for Leaving:</span>
                    <span>{formData.academic.reasonForLeaving ? <span>{formData.academic.reasonForLeaving}</span> : <span className='text-red-600 font-semibold'>Not provided</span>}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Health Information */}
          {formData.health && (
            <div className='flex flex-col mt-6 mb-8'>
              <div className='flex justify-between items-center mb-4'>
                <span className='text-blue-700 text-xl font-semibold'>Health Information</span>
                <button 
                  onClick={() => navigate('/health')}
                  className='bg-blue-600 text-white shadow-md shadow-blue-400 font-semibold px-4 py-2 rounded-lg flex gap-2 cursor-pointer hover:font-bold active:scale-103'
                >
                  <img src={editIcon} alt="Edit Icon" className='w-5 h-5'/>
                  <span>Edit</span>
                </button>
              </div>
              <div className='mt-2 flex flex-col gap-3 shadow-md p-4 rounded-xl hover:scale-103 transition-transform duration-200'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='gap-2 bg-pink-100 p-3 rounded-2xl'>
                    <span className='font-semibold text-gray-700'>Blood Group:</span>
                    <span>{renderValue(formData.health.bloodGroup)}</span>
                  </div>
                  <div className='gap-2 bg-pink-100 p-3 rounded-2xl'>
                    <span className='font-semibold text-gray-700'>Genotype:</span>
                    <span>{renderValue(formData.health.genotype)}</span>
                  </div>
                  <div className='col-span-1 md:col-span-2 gap-2 bg-pink-100 p-3 rounded-2xl'>
                    <span className='font-semibold text-gray-700'>Allergies:</span>
                    <span>{formData.health.allergies ? <span>{formData.health.allergies}</span> : <span className='text-red-600 font-semibold'>Not provided</span>}</span>
                  </div>
                  <div className='col-span-1 md:col-span-2 gap-2 bg-pink-100 p-3 rounded-2xl'>
                    <span className='font-semibold text-gray-700'>Medical Conditions:</span>
                    <span>{formData.health.medicalCondition ? <span>{formData.health.medicalCondition}</span> : <span className='text-red-600 font-semibold'>Not provided</span>}</span>
                  </div>
                  <div className='col-span-1 md:col-span-2 gap-2 bg-pink-100 p-3 rounded-2xl'>
                    <span className='font-semibold text-gray-700'>Doctor's Contact:</span>
                    <span>{formData.health.doctorContact ? <span>{formData.health.doctorContact}</span> : <span className='text-red-600 font-semibold'>Not provided</span>}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Documents */}
          {formData.documents && (
            <div className='flex flex-col mt-6 mb-8'>
              <div className='flex justify-between items-center mb-4'>
                <span className='text-blue-700 text-xl font-semibold'>Documents</span>
                <button 
                  onClick={() => navigate('/documents')}
                  className='bg-blue-600 text-white shadow-md shadow-blue-400 font-semibold px-4 py-2 rounded-lg flex gap-2 cursor-pointer hover:font-bold active:scale-103'
                >
                  <img src={editIcon} alt="Edit Icon" className='w-5 h-5'/>
                  <span>Edit</span>
                </button>
              </div>
              <div className='mt-2 flex flex-col gap-3 shadow-md p-4 rounded-xl hover:scale-103 transition-transform duration-200'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='gap-2 bg-pink-100 p-3 rounded-2xl'>
                    <span className='font-semibold text-gray-700'>Passport Photo:</span>
                    <div className='mt-2'>{renderDocumentPreview(formData.documents.passportPhotoPreview)}</div>
                  </div>
                  <div className='gap-2 bg-pink-100 p-3 rounded-2xl'>
                    <span className='font-semibold text-gray-700'>Birth Certificate:</span>
                    <div className='mt-2'>{renderDocumentPreview(formData.documents.birthCertificatePreview)}</div>
                  </div>
                  <div className='gap-2 bg-pink-100 p-3 rounded-2xl'>
                    <span className='font-semibold text-gray-700'>Terminal Result:</span>
                    <div className='mt-2'>{renderDocumentPreview(formData.documents.terminalResultPreview)}</div>
                  </div>
                  <div className='gap-2 bg-pink-100 p-3 rounded-2xl'>
                    <span className='font-semibold text-gray-700'>Medical Report:</span>
                    <div className='mt-2'>{renderDocumentPreview(formData.documents.medicalReportPreview)}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className='flex items-center justify-between mt-10 mb-20'>
            <button 
              type="button"
              onClick={handleSubmit}
              className='bg-green-600 text-white w-full shadow-md shadow-green-400 font-semibold text-lg px-4 py-2 rounded-lg flex justify-center items-center gap-2 cursor-pointer hover:font-bold active:scale-105'
            >
              <span>Submit</span>
              <span>
                <img src={submitIcon} alt='submit icon' className='w-5 h-5' />
              </span>
            </button>
          </div>
        </div>
      </div>

        <div className={`${showSubmissionModal ? 'flex' : 'hidden'} bg-black/80 fixed inset-0 items-center justify-center z-50`}>  
            {/* Submission Failed */}
          <div className={`${!submissionSuccess ? 'flex' : 'hidden'} bg-white p-6 rounded-2xl w-96 relative gap-4 flex-col`}>
            <div className='flex justify-center items-center'>
              <div className='bg-[#F02C2C52] p-8 rounded-full flex justify-center items-center'>
                <span className='bg-[#F02C2C] flex justify-center items-center rounded-full p-4'>
                  <img src={closeWhiteIcon} alt="Wrong Icon" className='w-10 h-10'/>
                </span>
              </div>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <span className='text-[#002359] text-2xl font-bold'>Something Went Wrong</span> 
              <span className='flex flex-col justify-center items-center mt-4 text-gray-500 font-semibold'>
                <span>
                  <img src={monkeyIcon} alt="monkey Icon" className='w-8 h-8'/>
                </span>
                <span>Oops!</span>
              </span>
              <span className='text-gray-500 text-center'>We couldn't process your submission. Please try again.</span>
            </div>
            <div className='flex items-center mt-2 gap-8'>
              <button 
                onClick={() => setShowSubmissionModal(false)}
                className='bg-white border-2 border-blue-600 w-full text-[#002359] font-semibold px-4 py-2 rounded-lg flex gap-2 cursor-pointer hover:font-bold active:scale-105 justify-center'
              >
                <span>Cancel</span>
              </button>
              <button 
                onClick={handleRetry}
                className='bg-blue-700 text-white w-full shadow-md shadow-blue-400 font-semibold px-4 py-2 rounded-lg flex gap-2 cursor-pointer hover:font-bold active:scale-105 justify-center'
              >
                <span>Retry</span>
              </button>
            </div>
          </div>

            {/* Submission Successful */}
          <div className={`${submissionSuccess ? 'flex' : 'hidden'} bg-white p-6 rounded-2xl w-96 relative gap-4 flex-col`}>
            <div className='flex justify-center items-center'>
              <div className='bg-[#08A17052] p-8 rounded-full flex justify-center items-center'>
                <span className='bg-[#08A170] flex justify-center items-center rounded-full p-4'>
                  <img src={correctIcon} alt="Correct Icon" className='w-10 h-10'/>
                </span>
              </div>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <span className='text-[#002359] text-2xl font-bold'>Application Completed</span> 
              <span className='flex flex-col justify-center items-center -mt-4 text-gray-500 font-semibold'>
                <span className='-mt-10'>
                  <img src={fireworksIcon} alt="Fireworks Icon" className='w-42 h-14'/>                </span>
              </span>
              <span className='text-gray-500 text-center mt-3'>Congratulations! You have successfully submitted your application. All your details and documents have been received. You will be notified via email or SMS</span>
            </div>
            <div className='flex items-center mt-2 gap-8'>
              <button 
                onClick={handleContinueAfterSubmission}
                className='bg-white border-2 border-blue-600 w-full text-[#002359] font-semibold px-4 py-2 rounded-lg flex gap-2 cursor-pointer hover:font-bold active:scale-105 justify-center'
              >
                <span>Continue</span>
              </button>
              <button 
                onClick={handleLogout}
                className='bg-blue-700 text-white w-full flex justify-center items-center shadow-md shadow-blue-400 font-semibold px-4 py-2 rounded-lg gap-2 cursor-pointer hover:font-bold active:scale-105'
              >
                <span>Logout</span>
                <span>
                  <img src={logoutWhite} alt='logout icon' className='w-5 h-5' />
                </span>
              </button>
            </div>
          </div>
        </div>

    </div>
  );
};

export default Review;
