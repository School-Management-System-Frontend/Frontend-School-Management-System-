import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import Header from '../components/header.jsx';
import NavBar from '../components/navBar.jsx';
import Status from '../components/status.jsx';
import DocumentPic from '../assets/document.png';
import userPic from '../assets/user.png';
import addIcon from '../assets/add.png';
import viewIcon from '../assets/view.png';

const DocumentsUpload = () => {
  const { formData, updateFormData } = useFormContext();
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const fileInputRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [modalDocType, setModalDocType] = useState('');
  const [chosenFileName, setChosenFileName] = useState('No document chosen');

  const [documentsData, setDocumentsData] = useState({
    passportPhoto: null,
    passportPhotoPreview: null,
    passportPhotoName: '',
    birthCertificate: null,
    birthCertificatePreview: null,
    birthCertificateName: '',
    terminalResult: null,
    terminalResultPreview: null,
    terminalResultName: '',
    medicalReport: null,
    medicalReportPreview: null,
    medicalReportName: '',
  });

  const [statusModal, setStatusModal] = useState({
    isOpen: false,
    isSuccess: false,
    title: '',
    message: '',
    missingFields: []
  });

  useEffect(() => {
    if (formData.documents) {
      setDocumentsData(prev => ({
        ...prev,
        ...formData.documents
      }));
    }
  }, [formData.documents]);

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

  // Handle passport photo upload
  const handlePassportPhotoClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const validDocTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    // Determine if it's a passport photo or other document
    let isOtherDocument = false;

    if (validImageTypes.includes(file.type)) {
      isOtherDocument = true;
    }
    if (validDocTypes.includes(file.type)) {
      isOtherDocument = true;
    }

    if (!isOtherDocument) {
      setStatusModal({
        isOpen: true,
        isSuccess: false,
        title: 'Invalid File Type',
        message: 'Please upload a valid image or document file',
        missingFields: []
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      // If modal is open and document type selected, store file temporarily
      if (showModal && modalDocType) {
        // Store the file temporarily and show the file name
        setDocumentsData(prev => ({
          ...prev,
          tempFile: file,
          tempPreview: reader.result
        }));
        setChosenFileName(file.name);
      } else {
        // Otherwise upload as passport photo immediately
        setDocumentsData(prev => ({
          ...prev,
          passportPhoto: file,
          passportPhotoPreview: reader.result,
          passportPhotoName: file.name
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle Add Document button in modal
  const handleOpenModal = () => {
    setShowModal(true);
    setModalDocType('');
    setChosenFileName('No document chosen');
  };

  // Handle Choose button in modal
  const handleChooseFile = () => {
    setChosenFileName('File selected, click Upload Document to confirm');
    fileInputRef.current?.click();
  };

  // Handle Upload Document button
  const handleUploadFromModal = () => {
    if (!modalDocType) {
      setStatusModal({
        isOpen: true,
        isSuccess: false,
        title: 'Error',
        message: 'Please select a document type',
        missingFields: []
      });
      return;
    }

    if (chosenFileName === 'No document chosen') {
      setStatusModal({
        isOpen: true,
        isSuccess: false,
        title: 'Error',
        message: 'Please choose a file first',
        missingFields: []
      });
      return;
    }

    // Upload the temporary file to the document type
    const docTypeMap = {
      'BirthCertificate': 'birthCertificate',
      'Testimonial/Result': 'terminalResult',
      'Medical Report': 'medicalReport'
    };

    const docKey = docTypeMap[modalDocType];
    const previewKey = `${docKey}Preview`;
    const nameKey = `${docKey}Name`;

    setDocumentsData(prev => ({
      ...prev,
      [docKey]: prev.tempFile,
      [previewKey]: prev.tempPreview,
      [nameKey]: chosenFileName,
      tempFile: null,
      tempPreview: null
    }));

    setChosenFileName('No document chosen');
    setModalDocType('');
    setShowModal(false);
    
    // Show success
    setStatusModal({
      isOpen: true,
      isSuccess: true,
      title: 'Document Uploaded',
      message: `${chosenFileName} has been uploaded successfully`,
      missingFields: []
    });
  };

  // Handle Cancel button
  const handleCancelModal = () => {
    setShowModal(false);
    setModalDocType('');
    setChosenFileName('No document chosen');
  };

  // Handle View button
  const handleViewDocument = (docType) => {
    const previewKey = `${docType}Preview`;
    const preview = documentsData[previewKey];

    if (!preview) {
      setStatusModal({
        isOpen: true,
        isSuccess: false,
        title: 'No Document',
        message: 'No document has been uploaded for this type',
        missingFields: []
      });
      return;
    }

    // Open in new window/tab
    const newWindow = window.open();
    if (newWindow) {
      if (preview.startsWith('data:image')) {
        newWindow.document.write(`<img src="${preview}" style="max-width:100%; height:auto;" />`);
      } else {
        // For PDF and documents, show as iframe
        newWindow.document.write(`<iframe src="${preview}" style="width:100%; height:100vh; border:none;"></iframe>`);
      }
    }
  };

  // Handle Remove document
  // const handleRemoveDocument = (docType) => {
  //   const previewKey = `${docType}Preview`;
  //   const nameKey = `${docType}Name`;
  //   setDocumentsData(prev => ({
  //     ...prev,
  //     [docType]: null,
  //     [previewKey]: null,
  //     [nameKey]: ''
  //   }));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasAnyDocument = documentsData.passportPhoto || documentsData.birthCertificate || 
                          documentsData.terminalResult || documentsData.medicalReport;

    if (!hasAnyDocument) {
      setStatusModal({
        isOpen: true,
        isSuccess: false,
        title: 'Application Incomplete',
        message: 'Please upload at least one required document',
        missingFields: ['At least one document']
      });
      return;
    }

    updateFormData('documents', documentsData);
    
    setStatusModal({
      isOpen: true,
      isSuccess: true,
      title: 'Application Submitted Successfully',
      message: 'Your Documents have been saved and submitted for review',
      missingFields: []
    });

    setTimeout(() => {
      setStatusModal({ ...statusModal, isOpen: false });
      navigate('/review');
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
        className='z-50'
      />
      <div className='flex justify-between fixed top-0 left-0 w-full p-4 px-3 bg-white shadow-md shadow-gray-200'>
        <Header open={open} setOpen={setOpen} menuRef={menuRef}/>
        <div className='flex flex-col justify-center items-center gap-1 mr-4 fixed bottom-0 border-t border-gray-300 md:border-none md:static bg-white md:bg-transparent p-5  md:p-0 '>
          <span className='flex gap-1 items-center'>
            <p className='text-[#0063FF] font-semibold'>Step 5</p>
            <p className='text-[#D9D9D9]'>of 6</p>
          </span>
          <span className='flex items-center gap-2'>
            <span className="bg-[#0063FF] w-11 h-3 rounded-full"></span>
            <span className="bg-[#0063FF] w-11 h-3 rounded-full"></span>
            <span className="bg-[#0063FF] w-11 h-3 rounded-full"></span>
            <span className="bg-[#0063FF] w-11 h-3 rounded-full"></span>
            <span className="bg-[#0063FF] w-11 h-3 rounded-full"></span>
            <span className="bg-[#D9D9D9] w-11 h-3 rounded-full"></span>
          </span>
        </div>
        {open && (
          <div className='fixed top-16 left-0' ref={navRef}>
            <NavBar/>
          </div>
        )}
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-10 mt-20 mb-10'>
        <div className='flex flex-col gap-2 w-full'>
          <div className='flex flex-col gap-2'>
            <span className='text-3xl md:text-4xl font-extrabold text-center md:text-start'>Required Documents</span>
            <span className='text-gray-500 text-center md:text-start'>Upload all required documents below</span>
          </div>
          <div className='flex justify-center'>
            <img 
              src={DocumentPic}
              alt="Document Information Illustration"
              className="w-60 h-auto mt-8" 
            />
          </div>
        </div>
        <div className='w-full'>
          <span className='text-2xl font-bold'>Please provide the required documents</span>
          <form noValidate onSubmit={handleSubmit} className='flex flex-col gap-6 mt-6'>  
            <div className='flex flex-col justify-center items-center gap-3 sm:gap-4 md:gap-6'>
              <span className='text-sm sm:text-base md:text-md font-bold'>Passport Photography</span>
              {/* Passport */}
              <div className='bg-pink-100 border-2 border-dashed border-green-600 rounded-2xl w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 flex flex-col justify-center items-center group cursor-pointer mb-8' onClick={handlePassportPhotoClick}>
                <span className='bg-white rounded-full w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex justify-center items-center flex-shrink-0'>
                  <img src={documentsData.passportPhotoPreview || userPic} alt="User Icon" className='w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-full' />
                </span>
                <span className='bg-blue-700 rounded-full p-2 cursor-pointer hover:scale-105 group -mt-8 ml-20' onClick={(e) => {
                  e.stopPropagation();
                  handlePassportPhotoClick();
                }}>
                  <img src={addIcon} alt="Add Icon" className='w-5 h-5 sm:w-6 sm:h-6 cursor-pointer group-hover:rotate-90 active:scale-110 duration-300' />
                </span>
              </div>
              <div className='w-full max-w-xs sm:max-w-sm md:max-w-none'>
                <button type="button" className='bg-blue-700 flex gap-2 rounded-md p-2 px-3 sm:px-4 shadow-md shadow-blue-400 group cursor-pointer w-full justify-center text-sm sm:text-base' onClick={handleOpenModal}>
                  <span>
                    <img src={addIcon} alt="Add Icon" className='w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:scale-110 group-hover:rotate-90 duration-300' />
                  </span>
                  <span className='text-white font-semibold group-active:font-bold'>Add Document</span>
                </button>
              </div>
            </div>
            <div className='grid grid-rows-4 gap-4 p-2 sm:p-3 md:p-4 overflow-x-auto'>
              <div className='grid grid-cols-[1fr_1.5fr_auto] gap-2 sm:gap-3 md:gap-6 md:text-start'>
                <span className='font-bold text-sm sm:text-base md:text-lg'>DOCUMENT TYPE</span>
                <span className='font-bold text-sm sm:text-base md:text-lg'>DOCUMENT NAME</span>
                <span className='font-bold text-sm sm:text-base md:text-lg'>VIEW</span>
              </div>
              <div className='grid grid-cols-[1fr_1.5fr_auto] gap-2 sm:gap-3 md:gap-6 items-center'>
                <span className='text-xs sm:text-sm md:text-md font-semibold text-blue-700 truncate'>Birth Certificate</span>
                <span className='text-xs sm:text-sm md:text-md text-green-800 truncate'>{documentsData.birthCertificateName || 'No file uploaded'}</span>
                <span className='w-6 sm:w-7 md:w-8 flex justify-center'>
                  <img 
                    src={viewIcon} 
                    alt='View icon' 
                    className='w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6 cursor-pointer active:scale-110 hover:opacity-70 transition-opacity' 
                    onClick={() => handleViewDocument('birthCertificate')} 
                  />
                </span>
              </div>
              <div className='grid grid-cols-[1fr_1.5fr_auto] gap-2 sm:gap-3 md:gap-6 items-center'>
                <span className='text-xs sm:text-sm md:text-md font-semibold text-blue-700 truncate'>Testimonial/Result</span>
                <span className='text-xs sm:text-sm md:text-md text-green-800 truncate'>{documentsData.terminalResultName || 'No file uploaded'}</span>
                <span className='w-6 sm:w-7 md:w-8 flex justify-center'>
                  <img 
                    src={viewIcon} 
                    alt='View icon' 
                    className='w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6 cursor-pointer active:scale-110 hover:opacity-70 transition-opacity' 
                    onClick={() => handleViewDocument('terminalResult')} 
                  />
                </span>
              </div>
              <div className='grid grid-cols-[1fr_1.5fr_auto] gap-2 sm:gap-3 md:gap-6 items-center'>
                <span className='text-xs sm:text-sm md:text-md font-semibold text-blue-700 truncate'>Medical Report</span>
                <span className='text-xs sm:text-sm md:text-md text-green-800 truncate'>{documentsData.medicalReportName || 'No file uploaded'}</span>
                <span className='w-6 sm:w-7 md:w-8 flex justify-center'>
                  <img 
                    src={viewIcon} 
                    alt='View icon' 
                    className='w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6 cursor-pointer active:scale-110 hover:opacity-70 transition-opacity' 
                    onClick={() => handleViewDocument('medicalReport')} 
                  />
                </span>
              </div>
            </div>

            <div className='flex items-center justify-between mt-10 mb-10'>
              <button 
                type="button"
                onClick={() => navigate('/health')}
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

      {/* Hidden file input */}
      <input 
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept="image/*,.pdf,.doc,.docx"
      />
    
      {/* Modal - Document Upload Dialog */}
      {showModal && (
        <div className='bg-black/80 fixed inset-0 flex items-center justify-center z-50'>  
          <div className='bg-white p-6 rounded-2xl w-96 relative gap-4 flex flex-col'>
            <div>
              {/* label */}
              <div className='flex'>
                <span className='font-semibold'>Document Type</span>
                <span className='text-red-500'>*</span>
              </div>
              {/* input */}
              <select
                name="documentType"
                value={modalDocType}
                onChange={(e) => setModalDocType(e.target.value)}
                className='bg-[#f38ef334] rounded-3xl p-2 px-4 w-full focus:outline-[#0063FF] focus:scale-103 hover:scale-103 transition-transform delay-150'
              >
                <option value="">Select the type of document</option>
                <option value="BirthCertificate">Birth Certificate</option>
                <option value="Testimonial/Result">Testimonial / Result</option>
                <option value="Medical Report">Medical Report</option>
              </select>
            </div>
            <div>
              {/* label */}
              <div className='flex'>
                <span className='font-semibold'>Choose Document</span>
                <span className='text-red-500'>*</span>
              </div>
              {/* input */}
              <div className='flex gap-2'>
                <input
                  type="text"
                  name="chosenDocument"
                  placeholder='No document chosen'
                  value={chosenFileName}
                  readOnly
                  className='bg-[#f38ef334] rounded-3xl p-2 px-4 w-full focus:outline-[#0063FF] focus:scale-103 hover:scale-103 transition-transform delay-150'
                />
                <button
                  type="button"
                  onClick={handleChooseFile}
                  className='bg-white border-2 border-blue-600 text-[#002359] font-semibold px-4 py-2 rounded-2xl flex gap-1 cursor-pointer hover:font-bold active:scale-105 whitespace-nowrap'
                >
                  <span>Choose</span>
                </button>
              </div>
            </div>
            <hr className='border-gray-300'/>
            <div className='flex items-center justify-between mt-2'>
              <button 
                type="button"
                onClick={handleCancelModal}
                className='bg-white border-2 border-blue-600 text-[#002359] font-semibold px-4 py-2 rounded-lg flex gap-2 cursor-pointer hover:font-bold active:scale-105'
              >
                <span>Cancel</span>
              </button>
              <button 
                type="button"
                onClick={handleUploadFromModal}
                className='bg-blue-700 text-white shadow-md shadow-blue-400 font-semibold px-4 py-2 rounded-lg flex gap-2 cursor-pointer hover:font-bold active:scale-105'
              >
                <span>Upload Document</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsUpload;
