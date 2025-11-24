import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import check1 from '../assets/check1.png';
import check2 from '../assets/check3.png';
import logOut from '../assets/logout.png';
import logoutWhite from '../assets/logoutW.png';
import logoutPic from '../assets/logoutPic.png';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData, clearFormData } = useFormContext();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Get current page
  const currentPage = location.pathname.replace('/', '');

  // Map pages to keys
  const pageMap = {
    personal: 'personal',
    guardian: 'guardian',
    academic: 'academic',
    health: 'health',
    documents: 'documents',
    review: 'review',
  };

  const currentPageKey = pageMap[currentPage];

  // Check if a page is accessible (user has reached it or it's the first page)
  const isPageAccessible = (pageKey) => {
    // First page is always accessible
    if (pageKey === 'personal') return true;
    
    // Find the index of this page
    const pageOrder = ['personal', 'guardian', 'academic', 'health', 'documents', 'review'];
    const currentIndex = pageOrder.indexOf(pageKey);
    
    // Check if all previous pages are completed
    for (let i = 0; i < currentIndex; i++) {
      const previousPage = pageOrder[i];
      if (!isPageCompleted(previousPage)) {
        return false;
      }
    }
    return true;
  };

  // Check if a page is completed (has data)
  const isPageCompleted = (page) => {
    return formData[page] && Object.keys(formData[page]).length > 0;
  };

  // Get user initials and name
  const firstName = formData.personal?.firstName || 'User';
  const lastName = formData.personal?.lastName || '';
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  const fullName = firstName && lastName ? `${firstName} ${lastName}` : 'User Name';

  // Handle logout
  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  // Confirm logout
  const confirmLogout = () => {
    clearFormData();
    setShowLogoutConfirm(false);
    navigate('/');
  };

  // Cancel logout
  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  // Navigate to page
  const navigateToPage = (page) => {
    if (isPageAccessible(page)) {
      navigate(`/${page}`);
    }
  };

  const pages = [
    { key: 'personal', label: 'Personal Info' },
    { key: 'guardian', label: 'Guardian Info' },
    { key: 'academic', label: 'Academic History' },
    { key: 'health', label: 'Health Info' },
    { key: 'documents', label: 'Upload Document' },
    { key: 'review', label: 'Review' },
  ];

  return (
    <div className='shadow-2xl h-screen flex flex-col p-4 justify-around py-4 bg-white mt-3 animate-slide-in'>
      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className='fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg shadow-lg p-6 w-80 flex flex-col justify-center items-center'>
            <div>
              <img src={logoutPic} alt='lgout illustration' className='w-24 h-24' />
            </div>
            <div className='flex flex-col justify-center items-center gap-3 mt-3'>
              <span className='text-[#002359] text-2xl font-bold text-center'>Confirm Logout</span>
              <span className='text-gray-600'>Are you sure you want to logout?</span>
            </div>
            <div className='flex items-center mt-2 gap-8 mt-3 justify-between w-full'>
              <button 
                onClick={cancelLogout}
                className='bg-white border-2 border-blue-700 w-full text-[#002359] font-semibold px-4 py-2 rounded-lg flex gap-2 cursor-pointer hover:font-bold hover:scale-105 active:scale-105 transition-transform duration-150 ease-in-out justify-center'
              >
                <span>No</span>
              </button>
              <button 
                onClick={confirmLogout}
                className='bg-red-600 text-white w-full shadow-md shadow-red-300 font-semibold px-4 py-2 rounded-lg flex gap-2 cursor-pointer hover:font-bold hover:scale-105 active:scale-105 transition-transform duration-150 ease-in-out justify-center'
              >
                <span>Yes</span>
              </button>
            </div>
          </div>
        </div>
      )}
      <div className='flex flex-col gap-4 -mt-16'>
        {pages.map((page) => {
          const isCurrent = currentPageKey === page.key;
          const isCompleted = isPageCompleted(page.key);
          const isAccessible = isPageAccessible(page.key);
          const icon = (isCurrent || isCompleted) ? check1 : check2;

          let bgClass = '';
          let cursorClass = 'cursor-pointer';
          
          if (isCurrent) {
            bgClass = 'bg-[#08a13b] shadow-green-300 shadow-md';
          } else if (isCompleted) {
            bgClass = 'bg-[#0063FF] shadow-blue-300 shadow-md';
          }
          
          if (!isAccessible) {
            cursorClass = 'cursor-not-allowed opacity-50';
          }

          return (
            <div
              key={page.key}
              onClick={() => navigateToPage(page.key)}
              className={`${bgClass} ${cursorClass} rounded-2xl p-2 px-3 flex items-center justify-between w-60 ${isAccessible ? 'hover:scale-105 active:scale-105' : ''} transition-transform duration-150 ease-in-out`}
            >
              <span className={`font-semibold text-lg ${isCurrent || isCompleted ? 'text-white' : 'text-gray-700'}`}>
                {page.label}
              </span>
              <img src={icon} alt="Check Icon" className='w-5 h-5 inline-block ml-2' />
            </div>
          );
        })}
      </div>
      <div className='flex flex-col gap-2 -mt-5'>
        <div 
          onClick={handleLogout}
          className="flex items-center gap-4 w-60 cursor-pointer group hover:rounded-2xl active:rounded-2xl hover:bg-red-600 active:bg-red-600 hover:shadow-md active:shadow-md hover:shadow-red-400 active:shadow-red-400 hover:scale-105 active:scale-105 transition-transform duration-150 ease-in-out p-2"
        >
          {/* Default icon (visible until hover) */}
          <img
            src={logOut}
            alt="Log Out Icon"
            className="w-5 h-5 ml-2 transition-transform duration-150 ease-in-out group-hover:hidden group-active:hidden"
          />

          {/* Hover icon (hidden until hover) */}
          <img
            src={logoutWhite}
            alt="Log Out Icon Hover"
            className="w-5 h-5 ml-2 hidden transition-transform duration-150 ease-in-out group-hover:inline-block group-active:inline-block"
          />

          <span className="font-semibold group-hover:text-white group-active:text-white">Logout</span>
        </div>
        <div className='flex gap-4 items-center'>
          <div className='bg-linear-to-b from-[#0063FF] to-[#003B99] w-10 h-10 rounded-full flex justify-center items-center'>
            <span className='text-white font-bold text-xl'>{initials}</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-[#002359] text-xl font-extrabold'>{fullName}</span>
            <span className='text-gray-500'>Student</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
