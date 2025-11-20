import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import { saveDocumentData, loadDocumentData } from '../utils/indexedDB';
import Header from '../components/header.jsx';
import NavBar from '../components/navBar.jsx';
import Status from '../components/status.jsx';
import DocumentPic from '../assets/document.png';
import userPic from '../assets/user.png';
import addIcon from '../assets/add.png';
import viewIcon from '../assets/view.png';
import updateIcon from '../assets/update.png';

const DocumentsUpload = () => {
  const { formData, updateFormData } = useFormContext();
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const fileInputRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [modalDocType, setModalDocType] = useState('');
  const [chosenFileName, setChosenFileName] = useState('No document chosen');

  // Memory-based storage for file objects and previews (NOT persisted)
  const filesRef = useRef({
    passportPhoto: null,
    passportPhotoPreview: null,
    birthCertificate: null,
    birthCertificatePreview: null,
    terminalResult: null,
    terminalResultPreview: null,
    medicalReport: null,
    medicalReportPreview: null,
    tempFile: null,
    tempPreview: null,
  });

  // State for file names and metadata (persisted to localStorage)
  const [documentsData, setDocumentsData] = useState({
    passportPhotoName: '',
    birthCertificateName: '',
    terminalResultName: '',
    medicalReportName: '',
  });

  // State to track current previews (updated in real-time as files are uploaded)
  const [currentPreviews, setCurrentPreviews] = useState({
    passportPhotoPreview: null,
    birthCertificatePreview: null,
    terminalResultPreview: null,
    medicalReportPreview: null,
  });

  const [statusModal, setStatusModal] = useState({
    isOpen: false,
    isSuccess: false,
    title: '',
    message: '',
    missingFields: []
  });
  const [isEditing, setIsEditing] = useState(false);
  const [, _setDocumentRefresh] = useState(0); // Force re-render on document load

  useEffect(() => {
    if (formData.documents) {
      setDocumentsData(prev => ({
        ...prev,
        passportPhotoName: formData.documents.passportPhotoName || '',
        birthCertificateName: formData.documents.birthCertificateName || '',
        terminalResultName: formData.documents.terminalResultName || '',
        medicalReportName: formData.documents.medicalReportName || '',
      }));
      
      // Restore file objects and previews from IndexedDB (persisted across page refreshes)
      loadDocumentData().then(documentData => {
        if (documentData) {
          console.log('Loaded document data from IndexedDB:', {
            hasPassportPhoto: !!documentData.passportPhoto,
            hasPassportPhotoPreview: !!documentData.passportPhotoPreview,
            hasBirthCertificate: !!documentData.birthCertificate,
            hasBirthCertificatePreview: !!documentData.birthCertificatePreview,
            hasTerminalResult: !!documentData.terminalResult,
            hasTerminalResultPreview: !!documentData.terminalResultPreview,
            hasMedicalReport: !!documentData.medicalReport,
            hasMedicalReportPreview: !!documentData.medicalReportPreview,
          });
          
          // Restore file objects
          if (documentData.passportPhoto) filesRef.current.passportPhoto = documentData.passportPhoto;
          if (documentData.birthCertificate) filesRef.current.birthCertificate = documentData.birthCertificate;
          if (documentData.terminalResult) filesRef.current.terminalResult = documentData.terminalResult;
          if (documentData.medicalReport) filesRef.current.medicalReport = documentData.medicalReport;
          
          // Restore previews
          if (documentData.passportPhotoPreview) filesRef.current.passportPhotoPreview = documentData.passportPhotoPreview;
          if (documentData.birthCertificatePreview) filesRef.current.birthCertificatePreview = documentData.birthCertificatePreview;
          if (documentData.terminalResultPreview) filesRef.current.terminalResultPreview = documentData.terminalResultPreview;
          if (documentData.medicalReportPreview) filesRef.current.medicalReportPreview = documentData.medicalReportPreview;
          
          // Also update the currentPreviews state for real-time display
          setCurrentPreviews({
            passportPhotoPreview: documentData.passportPhotoPreview || null,
            birthCertificatePreview: documentData.birthCertificatePreview || null,
            terminalResultPreview: documentData.terminalResultPreview || null,
            medicalReportPreview: documentData.medicalReportPreview || null,
          });
          
          // Cache in window for immediate access (MUST be set before view icon is clicked)
          window.__documentData = documentData;
          console.log('Window cache set:', window.__documentData);
          // Force component update by updating state
          setDocumentsData(prev => ({ ...prev }));
        }
      }).catch(error => {
        console.error('Failed to load document data:', error);
      });
    }
    // Check if user came from Review page (edit mode) - persisted in sessionStorage
    const isEditingMode = sessionStorage.getItem('isEditing') === 'true';
    if (isEditingMode) {
      setIsEditing(true);
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

    const PASSPORT_MAX_SIZE = 5 * 1024 * 1024; // 5MB for passport photo (images only)
    const DOCUMENT_MAX_SIZE = 20 * 1024 * 1024; // 20MB for other documents (images or PDFs)
    const validImageTypes = ['image/jpeg', 'image/png'];
    const validDocTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    // Determine if it's a passport photo or other document
    let isValidFile = false;
    let isPassportPhotoContext = false;
    let maxFileSize = DOCUMENT_MAX_SIZE;

    // If modal is open and a document type is selected (not passport photo)
    if (showModal && modalDocType) {
      // For documents: accept both images and PDFs, up to 20MB
      isValidFile = validImageTypes.includes(file.type) || validDocTypes.includes(file.type);
    } else {
      // For passport photo: only accept images, up to 5MB
      isValidFile = validImageTypes.includes(file.type);
      isPassportPhotoContext = true;
      maxFileSize = PASSPORT_MAX_SIZE;
    }

    if (!isValidFile) {
      const message = isPassportPhotoContext 
        ? 'Passport photo must be an image file (JPEG or PNG)'
        : 'Please upload a valid image or document file (PDF, DOC, DOCX, JPEG, PNG)';
      setStatusModal({
        isOpen: true,
        isSuccess: false,
        title: 'Invalid File Type',
        message: message,
        missingFields: []
      });
      return;
    }

    // Check file size based on type
    if (file.size > maxFileSize) {
      const sizeLimit = isPassportPhotoContext ? '5MB' : '20MB';
      setStatusModal({
        isOpen: true,
        isSuccess: false,
        title: 'File Too Large',
        message: `File size must be less than ${sizeLimit}`,
        missingFields: []
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      console.log('File read completed:', {
        fileName: file.name,
        fileSize: file.size,
        previewSize: reader.result?.length || 0,
        isBase64: reader.result?.startsWith('data:') || false,
        isModal: showModal && modalDocType,
        modalDocType: modalDocType
      });
      
      // If modal is open and document type selected, store file temporarily in memory
      if (showModal && modalDocType) {
        // Store the file temporarily in memory (not in state)
        filesRef.current.tempFile = file;
        filesRef.current.tempPreview = reader.result;
        setChosenFileName(`${file.name}`);
      } else {
        // Otherwise upload as passport photo immediately (store in memory)
        filesRef.current.passportPhoto = file;
        filesRef.current.passportPhotoPreview = reader.result;
        // Update current previews state for immediate display
        setCurrentPreviews(prev => ({
          ...prev,
          passportPhotoPreview: reader.result
        }));
        // Also cache in window object for immediate access
        if (!window.__documentData) window.__documentData = {};
        window.__documentData.passportPhotoPreview = reader.result;
        setDocumentsData(prev => ({
          ...prev,
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

    // Store file and preview in memory (not in state)
    filesRef.current[docKey] = filesRef.current.tempFile;
    filesRef.current[previewKey] = filesRef.current.tempPreview;

    // Update current previews state for immediate display
    setCurrentPreviews(prev => ({
      ...prev,
      [previewKey]: filesRef.current.tempPreview
    }));

    // Also cache in window object for immediate access
    if (!window.__documentData) window.__documentData = {};
    window.__documentData[previewKey] = filesRef.current.tempPreview;

    // Only store file name in state (which gets persisted to localStorage)
    setDocumentsData(prev => ({
      ...prev,
      [nameKey]: chosenFileName
    }));

    filesRef.current.tempFile = null;
    filesRef.current.tempPreview = null;

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
    
    // Try to get from multiple sources in order of priority:
    // 1. filesRef (always has latest in-memory data)
    // 2. currentPreviews state (newly uploaded files)
    // 3. window cache (recently saved data)
    let preview = filesRef.current[previewKey] || currentPreviews[previewKey] || window.__documentData?.[previewKey];

    console.log('View Document - PRIORITY ORDER:', {
      docType,
      previewKey,
      hasFilesRef: !!filesRef.current[previewKey],
      hasCurrentPreview: !!currentPreviews[previewKey],
      hasWindowData: !!window.__documentData?.[previewKey],
      selectedPreview: preview ? 'FOUND' : 'NOT FOUND',
      previewLength: preview?.length || 0,
      filesRefContent: {
        passportPhotoPreview: !!filesRef.current.passportPhotoPreview,
        birthCertificatePreview: !!filesRef.current.birthCertificatePreview,
        terminalResultPreview: !!filesRef.current.terminalResultPreview,
        medicalReportPreview: !!filesRef.current.medicalReportPreview,
      }
    });

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

    try {
      if (preview.startsWith('data:image')) {
        // For images, open directly using blob URL
        const byteString = atob(preview.split(',')[1]);
        const mimeType = preview.split(';')[0].split(':')[1];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeType });
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, '_blank');
        // Clean up the blob URL after a delay
        setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
      } else if (preview.startsWith('data:application/pdf')) {
        // For PDF, use blob URL as well
        const byteString = atob(preview.split(',')[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, '_blank');
        setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
      } else if (preview.startsWith('data:')) {
        // For other data URLs, open in new window with HTML wrapper
        const newWindow = window.open();
        if (newWindow) {
          newWindow.document.write('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Document Preview</title><style>body{margin:0;padding:20px;background:#f0f0f0;font-family:Arial,sans-serif;} .container{background:white;padding:20px;border-radius:8px;}</style></head><body><div class="container"><p>Document Preview</p><iframe src="' + preview + '" style="width:100%;height:80vh;border:1px solid #ccc;"></iframe></div></body></html>');
          newWindow.document.close();
        }
      }
    } catch (error) {
      console.error('Error opening preview:', error);
      // Fallback: try direct approach
      try {
        const newWindow = window.open();
        if (newWindow) {
          newWindow.document.write('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Document Preview</title></head><body style="margin:0;overflow:hidden;"><img src="' + preview + '" style="width:100%;height:100%;object-fit:contain;" onerror="this.alt=\'Unable to load preview\'"/></body></html>');
          newWindow.document.close();
        }
      } catch (fallbackError) {
        console.error('Fallback preview also failed:', fallbackError);
        setStatusModal({
          isOpen: true,
          isSuccess: false,
          title: 'Preview Error',
          message: 'Failed to open document preview. Please try again.',
          missingFields: []
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check required documents: Passport Photo, Birth Certificate, Terminal Result
    const missingFields = [];
    if (!filesRef.current.passportPhoto) missingFields.push('Passport Photo');
    if (!filesRef.current.birthCertificate) missingFields.push('Birth Certificate');
    if (!filesRef.current.terminalResult) missingFields.push('Terminal Result/Testimonial');

    if (missingFields.length > 0) {
      setStatusModal({
        isOpen: true,
        isSuccess: false,
        title: 'Required Documents Missing',
        message: 'Please upload all required documents',
        missingFields: missingFields
      });
      return;
    }

    // Store both file objects and previews in IndexedDB (persists across page refreshes - 50MB+ quota)
    const dataToStore = {
      passportPhoto: filesRef.current.passportPhoto,
      birthCertificate: filesRef.current.birthCertificate,
      terminalResult: filesRef.current.terminalResult,
      medicalReport: filesRef.current.medicalReport,
      passportPhotoPreview: filesRef.current.passportPhotoPreview,
      birthCertificatePreview: filesRef.current.birthCertificatePreview,
      terminalResultPreview: filesRef.current.terminalResultPreview,
      medicalReportPreview: filesRef.current.medicalReportPreview,
    };

    console.log('Storing document data to IndexedDB:', {
      hasPassportPhotoPreview: !!filesRef.current.passportPhotoPreview,
      hasBirthCertificatePreview: !!filesRef.current.birthCertificatePreview,
      hasTerminalResultPreview: !!filesRef.current.terminalResultPreview,
      hasMedicalReportPreview: !!filesRef.current.medicalReportPreview,
      previewSizes: {
        passportPhoto: filesRef.current.passportPhotoPreview?.length || 0,
        birthCertificate: filesRef.current.birthCertificatePreview?.length || 0,
        terminalResult: filesRef.current.terminalResultPreview?.length || 0,
        medicalReport: filesRef.current.medicalReportPreview?.length || 0,
      }
    });
    
    // Save to IndexedDB asynchronously
    saveDocumentData(dataToStore).catch(error => {
      console.error('Failed to save document data to IndexedDB:', error);
    });

    // Also store in window object for immediate access
    window.__documentData = dataToStore;

    // Save ONLY file names to localStorage (file names are small, previews are huge)
    updateFormData('documents', {
      passportPhotoName: documentsData.passportPhotoName,
      birthCertificateName: documentsData.birthCertificateName,
      terminalResultName: documentsData.terminalResultName,
      medicalReportName: documentsData.medicalReportName,
    });
    
    setStatusModal({
      isOpen: true,
      isSuccess: true,
      title: isEditing ? 'Changes Saved Successfully' : 'Application Submitted Successfully',
      message: 'Your Documents have been saved and submitted for review',
      missingFields: []
    });

    setTimeout(() => {
      setStatusModal({ ...statusModal, isOpen: false });
      // Clear the editing flag from sessionStorage
      sessionStorage.removeItem('isEditing');
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
      <div className='flex justify-between fixed top-0 left-0 w-full p-4 px-3 bg-white shadow-md shadow-gray-200 z-index'>
        <Header open={open} setOpen={setOpen} menuRef={menuRef}/>
        <div className='flex flex-col justify-center items-center md:items-start gap-1 fixed bottom-0 left-0 right-0 border-t border-gray-300 md:border-none md:static bg-white md:bg-transparent p-5  md:p-0 '>
          <span className='flex gap-1 items-center'>
            <p className='text-blue-700 font-semibold'>Step 5</p>
            <p className='text-gray-400'>of 6</p>
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
          <div className='fixed top-15 left-0' ref={navRef}>
            <NavBar/>
          </div>
        )}
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-10 mt-20 mb-10'>
        <div className='flex flex-col gap-2 w-full'>
          <div className='flex flex-col gap-2'>
            <span className='text-3xl md:text-4xl font-extrabold text-center md:text-start text-[#002359]'>Required Documents</span>
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
          <span className='text-2xl font-bold text-[#002359]'>Please provide the required documents</span>
          <form noValidate onSubmit={handleSubmit} className='flex flex-col gap-6 mt-6'>  
            <div className='flex flex-col justify-center items-center gap-3 sm:gap-4 md:gap-6'>
              <div className='flex gap-1'>
                <span className='text-sm sm:text-base md:text-md font-bold text-[#002359]'>Passport Photography</span>
                <span className='text-red-500'>*</span>
              </div>
              {/* Passport */}
              <div className='bg-pink-100 border-2 border-dashed border-green-600 rounded-2xl w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 flex flex-col justify-center items-center group cursor-pointer mb-8' onClick={handlePassportPhotoClick}>
                <span className='bg-white rounded-full w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex justify-center items-center shrink-0'>
                  <img src={filesRef.current.passportPhotoPreview || userPic} alt="User Icon" className='w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-full' />
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
              <div className='grid grid-cols-[1fr_1.5fr_auto] gap-2 sm:gap-3 md:gap-6 md:text-start text-[#002359]'>
                <span className='font-bold text-sm sm:text-base md:text-lg'>DOCUMENT TYPE</span>
                <span className='font-bold text-sm sm:text-base md:text-lg'>DOCUMENT NAME</span>
                <span className='font-bold text-sm sm:text-base md:text-lg'>VIEW</span>
              </div>
              <div className='grid grid-cols-[1fr_1.5fr_auto] gap-2 sm:gap-3 md:gap-6 items-center'>
                <div className='flex gap-1'>
                  <span className='text-xs sm:text-sm md:text-md font-semibold text-blue-700 truncate'>Birth Certificate</span>
                  <span className='text-red-500'>*</span>
                </div>
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
                <div className='flex gap-1'>
                  <span className='text-xs sm:text-sm md:text-md font-semibold text-blue-700 truncate'>Testimonial/Result</span>
                  <span className='text-red-500'>*</span>
                </div>
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
          {/* Proceeding to Next page */}
            <div className={`${!isEditing ? 'flex' : 'hidden'} items-center justify-between mt-10 mb-10`}>
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
                value={modalDocType || ''}
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
                  value={chosenFileName || 'No document chosen'}
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
