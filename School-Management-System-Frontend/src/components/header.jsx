import React from 'react';
import menuIcon from '../assets/menu.png';
import hatIcon from '../assets/hat.png';

const Header = ({open, setOpen, menuRef}) => {
  return (
    <div className='flex gap-0 md:gap-4 items-center w-full'>
      <div onClick={() => setOpen(!open)} ref={menuRef}>
        <img src={menuIcon} alt="Menu Icon" className='w-10 h-10 cursor-pointer hover:shadow-lg rounded-xl active:scale-90' />
      </div>
      <div className='flex justify-center items-center w-full'>
      <div className='flex gap-2 items-center justify-center w-full md:justify-start'>
        <div>
            <img src={hatIcon} alt="School Hat Icon" className='w-14 h-10' />
        </div>
        <div className='flex text-2xl font-bold font-[Young_Serif]'>
            <span className='text-[#002359]' >Edu</span>
            <span className='text-blue-700'>Radiant</span>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Header;
