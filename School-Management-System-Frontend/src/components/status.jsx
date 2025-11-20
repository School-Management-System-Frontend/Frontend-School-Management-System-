import React from 'react'
import correctIcon from '../assets/correct.png';
import closeGreenIcon from '../assets/closeGreen.png'
import closeRedIcon from '../assets/closeRed.png';
import wrongIcon from '../assets/wrong.png'

const Status = ({ 
  isOpen = false, 
  isSuccess = false, 
  title = '', 
  message = '', 
  missingFields = [],
  onClose = () => {}
}) => {
  if (!isOpen) return null;

  return (
    <div>
        <div className='bg-black/80 fixed inset-0 flex items-center justify-center z-9999'>  
            <div className='bg-white p-6 rounded-2xl w-160 relative'>
                {/* Success State */}
                {isSuccess && (
                  <div className='flex flex-col'>
                      <div className='flex flex-col md:flex-row gap-4 items-center'>
                          <div className=''>
                              <span className='bg-[#08A170] flex justify-center items-center rounded-2xl p-4'>
                                  <img src={correctIcon} alt='Correct Icon' className='w-10 h-10' />
                              </span>
                          </div>
                          <div className='flex flex-col justify-center items-center gap-1'>
                              <span className='text-[#002359] text-2xl font-bold text-center'>{title}</span>
                              <span className='text-[#009063] text-center'>{message}</span>
                          </div>
                          <div className=''>
                              <span 
                                onClick={onClose}
                                className='bg-pink-100 rounded-2xl p-1 absolute top-3 right-5 cursor-pointer group'>
                                  <img src={closeGreenIcon} alt='Close icon' className='w-6 h-6 group-hover:rotate-90 active:scale-120 duration-200 ' />
                              </span>
                          </div>
                      </div>  
                      <hr className='border-4 rounded-2xl border-[#08A170] mt-4'/> 
                  </div>
                )}
                
                {/* Error State */}
                {!isSuccess && (
                  <div className='flex flex-col'>
                      <div className='flex flex-col md:flex-row gap-4 items-center'>
                          <div className=''>
                              <span className='bg-[#F02C2C] flex justify-center items-center rounded-2xl p-4'>
                                  <img src={wrongIcon} alt='Wrong Icon' className='w-10 h-10' />
                              </span>
                          </div>
                          <div className='flex flex-col justify-center items-center gap-1'>
                              <span className='text-[#002359] text-2xl font-bold'>{title}</span>
                              <div className='flex flex-col gap-2'>
                                  <span className='text-red-400'>{message}</span>
                                  {missingFields.length > 0 && (
                                    <div className='flex flex-col gap-1'>
                                      {missingFields.map((field, idx) => (
                                        <div key={idx} className='flex flex-row gap-1 text-xs font-semibold'>
                                            <span>{field}</span>
                                            <span className='text-red-500 font-bold'>*</span>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                              </div>
                          </div>
                          <div className=''>
                              <span 
                                onClick={onClose}
                                className='bg-pink-100 rounded-2xl p-1 absolute top-3 right-5 cursor-pointer group'>
                                  <img src={closeRedIcon} alt='Close icon' className='w-6 h-6 group-hover:rotate-90 active:scale-120 duration-200 ' />
                              </span>
                          </div>
                      </div>  
                      <hr className='border-4 rounded-2xl border-[#F02C2C] mt-4'/> 
                  </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default Status
