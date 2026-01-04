'use client';
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Lock, Eye, EyeOff, BookOpen, CheckCircle2 } from "lucide-react";
import loginIcon from '../assets/login.png';

export default function Login() {
    const [serialNumber, setSerialNumber] = useState('');
    const [pin, setPin] = useState('');
    const [showPin, setShowPin] = useState(false);
    const navigate = useNavigate();
    const targetRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!serialNumber || !pin) {
            alert("Please fill in all required fields before proceeding.");
            return;
        }
        navigate("/personal");
    };

    const scrollDown = () => {
        targetRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            {/* Left Side - Branding */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:w-1/2 bg-[#0f172a] text-white p-12 flex flex-col justify-center relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/20 to-transparent pointer-events-none" />

                <div className="relative z-10 max-w-lg mx-auto lg:mx-0">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="w-16 h-16 bg-pink-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-pink-500/30"
                    >
                        <BookOpen className="w-8 h-8 text-white" />
                    </motion.div>

                    <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                        School Management System
                    </h1>

                    <p className="text-blue-200 text-lg mb-10 md:mb-12 leading-relaxed">
                        Streamline your educational institution with our comprehensive management platformi.
                    </p>
                    <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            onClick={scrollDown}
                            className="w-full flex md:hidden justify-center items-center gap-1 py-3 px-3 mb-3 -mt-5 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200 cursor-pointer"
                        >
                            <span>
                                <img src={loginIcon} alt='login icon' className='w-6.5 h-auto' />
                            </span>
                            <p>Sign In</p>
                    </motion.button>


                    <div className="space-y-4">
                        {[
                            "Manage students, teachers, and staff efficiently",
                            "Track academic performance and attendance",
                            "Secure and reliable data management"
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + (index * 0.1) }}
                                className="flex items-center space-x-3"
                            >
                                <div className="bg-pink-500/20 p-1 rounded-full">
                                    <CheckCircle2 className="w-5 h-5 text-pink-500" />
                                </div>
                                <span className="text-gray-300">{feature}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Login view fron the right */}
            <div ref={targetRef} className="lg:w-1/2 bg-gray-50 flex flex-col gap-4 items-center justify-center p-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 lg:p-10"
                >
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                        <p className="text-gray-500">Please sign in to access your account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="serialNumber" className="text-sm font-semibold text-gray-700 block">
                                Serial Number
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    id="serialNumber"
                                    value={serialNumber}
                                    onChange={(e) => setSerialNumber(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                                    placeholder="Enter your serial number"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="pin" className="text-sm font-semibold text-gray-700 block">
                                PIN
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPin ? "text" : "password"}
                                    id="pin"
                                    value={pin}
                                    onChange={(e) => setPin(e.target.value)}
                                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                                    placeholder="Enter your PIN"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPin(!showPin)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer focus-none"
                                >
                                    {showPin ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200 cursor-pointer"
                        >
                            Sign In
                        </motion.button>

                        <div className="text-center mt-6"> 
                            <a href="#" className="text-sm text-gray-500 hover:text-pink-600 transition-colors">
                                Need help? <span className="font-semibold">Contact Administrator</span>
                            </a>
                        </div>
                    </form>
                </motion.div>

                <div className="md:absolute md:bottom-6 text-center text-gray-400 text-xs">
                    &copy; {new Date().getFullYear()} School Management System. All rights reserved.
                </div>
            </div>
        </div>
    );
}