'use client';
import React from "react";
export default function Login(){
    return(
        <div className="bg-[url('/background3.0.webp')] min-h-screen flex items-center justify-center">

    <div className="w-170 max-w-md mx-auto shadow-2xl rounded-lg overflow-hidden bg- backdrop-blur-sm bg-opacity-90">
        
        <div className="p-8 space-y-6 text-white">
            <h2 className="text-2xl font-bold text-center mb-6 ">Sign in to your account</h2>
            
            <form className="space-y-6">
                
                <div>
                    <label for="email" className="text-sm font-medium block mb-2 text-gray-900">Enter your Serial id </label>
                    <input 
                        type="text" 
                        name="text" 
                        id="text" 
                        placeholder="2233323" 
                        className="w-full p-3 rounded-md border border-gray-700 bg-transparent text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-150 ease-in-out"
                        required
                    />
                </div>

                <div>
                    <label for="password" className="text-sm font-medium block mb-2 text-gray-900">Pin</label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="••••••••" 
                        class="w-full p-3 rounded-md border border-gray-700 bg-transparent text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-150 ease-in-out"
                        required
                    />
                </div>

                <div classNameName="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                        <input 
                            id="remember-me" 
                            name="remember-me" 
                            type="checkbox" 
                            className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-700 rounded focus:ring-blue-500"
                        />
                        <label for="remember-me" className="ml-2 block text-gray-900">Remember me</label>
                    </div>
                  
                </div>

                <button 
                    type="submit" 
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                >
                    Log in to your account
                </button>
            </form>

            
         </div>
    </div>

</div>
    );
}