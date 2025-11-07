'use client';
import {React, useState} from "react";
import { useNavigate } from "react-router-dom";
export default function Login(){
    const [serialNumber, setSerialNumber] = useState('');
    const [pin, setPin] = useState('');

    const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!serialNumber || !pin) {
      alert("Please fill in all required fields before proceeding.");
      return;
    }

    navigate("/personal");
  };
    return(
        <div className="bg-[url('/background1.png')] bg-center  lg: min-h-screen flex items-center justify-center">

    <div className="w-170 max-w-md mx-auto shadow-2xl rounded-lg overflow-hidden bg-black/80 shadow-white border-t-6 border-blue-600 ">
        
        <div className="p-8 space-y-6 text-white">
            <h2 className="text-2xl font-bold text-center mb-6 ">Sign in to your account</h2>
            
            <form onSubmit={handleSubmit}  className="space-y-6">
                
                <div>
                    <label htmlFor="number" className="text-md font-medium block mb-2 text-white">Serial Number </label>
                    <input 
                        type="number" 
                        name="number" 
                        id="number" 
                        value={serialNumber}
                        onChange={(e) => {setSerialNumber(e.target.value)}}
                        placeholder="Enter your serial number" 
                        className="w-full p-3 rounded-md border-2 border-blue-500 bg-transparent text-white text-bold  placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-150 ease-in-out"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password" className="text-md font-medium block mb-2 text-white">Pin</label>
                    <input 

                        type="password" 
                        name="password" 
                        id="password" 
                        value={pin}
                        onChange={(e) => {setPin(e.target.value)}}
                        placeholder="Enter your pin" 
                        className="w-full p-3 rounded-md border-2 border-blue-500 bg-transparent text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-150 ease-in-out"
                        required
                    />
                </div>

                <button 
                    type="submit" 
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-md font-medium cursor-pointer text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                >
                    Login
                </button>
            </form>

            
         </div>
    </div>

</div>
    );
}