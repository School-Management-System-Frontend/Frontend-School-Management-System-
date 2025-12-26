
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { Menu, Bell, Download, X, User, Phone, Mail, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import gradeIcon from '../assets/grade.png';
import menuIcon from '../assets/logoMenu.png';
import noteIcon from '../assets/noteIcon.png';
import profile from '../assets/profileImg.png';
import logOut from '../assets/logout.png';
import logoutWhite from '../assets/logoutW.png'
import logoutPic from '../assets/logoutPic.png';

const StudentPortal = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [value, setValue] = useState("");
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const navigate = useNavigate();

    // fake dets
    const student = {
        name: "John Smith",
        id: "1001",
        grade: "JHS 2",
        dob: "June 20, 2013",
        gender: "Male",
        phone: "0559876543",
        email: "johnsmith12@gmail.com",
        guardian: "Mr. Daniel Ansah" 
    };

    const notifications = [
        { id: 1, sender: "Mr. Kwame Mensah", date: "Nov 7 2025, 3:25 PM", message: "Updated on assessment \"PROJECT WORK\" of \"MATHEMATICS\"" },
        { id: 2, sender: "Mr. Kwame Mensah", date: "Today, 3:25 PM", message: "Updated on assessment \"PROJECT WORK\" of \"MATHEMATICS\"" },
        { id: 3, sender: "Mr. Kwame Mensah", date: "Today, 3:25 PM", message: "Updated on assessment \"PROJECT WORK\" of \"MATHEMATICS\"" },
        { id: 4, sender: "Mr. Kwame Mensah", date: "Today, 3:25 PM", message: "Updated on assessment \"PROJECT WORK\" of \"MATHEMATICS\"" },
    ];

    const reportData = [
        { subject: "Mathematics", classTest1: 8, classTest2: 9, midSem: 18, project: 9, final: 48, total: 100, grade: 1, remark: "Excellent" },
        { subject: "English Language", classTest1: 7, classTest2: 9, midSem: 17, project: 8, final: 48, total: 70, grade: 2, remark: "Very good" },
        { subject: "Integrated Science", classTest1: 8, classTest2: 6, midSem: 11, project: 9, final: 34, total: 60, grade: 3, remark: "Good" },
        { subject: "Social Studies", classTest1: 8, classTest2: 9, midSem: 17, project: 8, final: 48, total: 93, grade: 1, remark: "Excellent" },
        { subject: "Ghanaian Lang", classTest1: 8, classTest2: 8, midSem: 18, project: 9, final: 48, total: 94, grade: 1, remark: "Excellent" },
        { subject: "RME", classTest1: 8, classTest2: 8, midSem: 18, project: 8, final: 35, total: 50, grade: 4, remark: "Average" },
        { subject: "ICT", classTest1: 8, classTest2: 9, midSem: 17, project: 8, final: 48, total: 40, grade: 5, remark: "Pass" },
        { subject: "History", classTest1: 8, classTest2: 9, midSem: 18, project: 8, final: 48, total: 91, grade: 1, remark: "Excellent" },
        { subject: "BDT", classTest1: 8, classTest2: 8, midSem: 18, project: 8, final: 48, total: 29, grade: 6, remark: "Fail" },
        { subject: "French", classTest1: 8, classTest2: 9, midSem: 16, project: 7, final: 48, total: 93, grade: 1, remark: "Excellent" },
    ];

    const classData = [
        { value: "JHS3", label: "JHS-3" },
        { value: "JHS2", label: "JHS-2" },
        { value: "JHS1", label: "JHS-1" },
        { value: "Class6", label: "Class 6" },
        { value: "Class5", label: "Class 5" },
        { value: "Class4", label: "Class 4" },
        { value: "Class3", label: "Class 3" },
        { value: "Class2", label: "Class 2" },
        { value: "Class1", label: "Class 1" },
    ];

    const academicYear =[
        {value: "2024/2025", label: "2024 / 2025"},
        {value: "2025/2026", label: "2025 / 2026"},
        {value: "2026/2027", label: "2026 / 2027"},
        {value: "2027/2028", label: "2027 / 2028"},
        {value: "2028/2029", label: "2028 / 2029"},
        {value: "2029/2030", label: "2029 / 2030"},
    ]
  

    // Components
    const GradeBadge = ({ grade }) => {
        let color = "text-green-800 font-bold border-3 border-green-800";
        if (grade === 2) color = "text-green-500 font-bold border-3 border-green-500";
        if (grade === 3) color = "text-[#AEEA00] font-bold border-3 border-[#AEEA00]";
        if (grade === 4) color = "text-yellow-400 font-bold border-3 border-yellow-400";
        if (grade === 5) color = "text-red-400 font-bold border-3 border-red-400";
        if (grade === 6) color = "text-red-700 font-bold border-3 border-red-700";

        return (
            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${color}`}>
                {grade}
            </div>
        );
    };

    // Handle logout
    const handleLogout = () => {
        setShowLogoutConfirm(true);
    };

    // Confirm logout
    const confirmLogout = () => {
        setShowLogoutConfirm(false);
        navigate('/');
    };

    // Cancel logout
    const cancelLogout = () => {
        setShowLogoutConfirm(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans text-gray-800 relative overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center p-2 md:p-6 bg-white shadow-sm  h-full md:h-20">
                <div className="flex items-center gap-4">
                    <span onClick={() => setIsMenuOpen(true)} className="w-27 md:w-15 p-2 hover:bg-gray-50 transition">
                        <img src={menuIcon} alt="Menu" className="w-10 h-10 cursor-pointer" />
                    </span>
                    <div>
                        <p className="text-lg md:text-3xl font-bold text-[#002359]">Welcome , {student.name}</p>
                        <p className="text-sm md:text-md text-gray-400 font-semibold">Access your records, assessments, and updates all in one place.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg">
                    <div 
                        onClick={() => setIsNotifOpen(true)}
                        className="relative mr-3 cursor-pointer group">
                        <span>
                            <img src={noteIcon} alt="notification" className="w-7 h-auto" />
                        </span>
                        <span className="absolute bottom-4 left-2 bg-red-600 px-2 rounded-full text-white text-xs text-center font-semibold group-hover:scale-120 transition-transform duration-300">99+</span>
                    </div>
                    <div className="flex flex-col-reverse md:flex-row justify-center items-center w-24 md:w-full gap-1 md:gap-3">
                        <div className="text-right">
                            <p className="hidden md:block text-sm md:text-md font-bold text-gray-800">{student.name}</p>
                            <p className="text-xs md:text-sm text-black md:text-gray-500 text-center ">{student.id}</p>
                        </div>
                        <div
                            onClick={() => setIsMenuOpen(true)}
                            className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden cursor-pointer">
                            <img src={profile} alt="profile image" className="" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 max-w-7xl mx-auto space-y-6">

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-3 rounded-xl border border-gray-100 flex flex-col">
                        <label className="text-xs text-gray-400 mb-1">Class/ Grade</label>
                        <div className="relative inline-block">
                        <select
                            className="
                            appearance-none
                            font-semibold
                            bg-gray-100
                            p-2
                            pr-10
                            w-full
                            rounded-2xl
                            text-gray-700
                            focus:outline-blue-600
                            cursor-pointer
                            "
                        >
                            <option value = {student.grade}>{student.grade} (Current)</option>
                            {classData.map((cls) => (
                                <option key={cls.value} value={cls.value}>
                                    {cls.label}
                                </option>
                            ))}
                        </select>

                        <ChevronDown
                            size={16}
                            className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                        />
                    </div>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-gray-100 flex flex-col">
                        <label className="text-xs text-gray-400 mb-1">Academic year</label>
                        <div className="relative inline-block">
                        <select
                            className="
                            appearance-none
                            font-semibold
                            bg-gray-100
                            p-2
                            pr-10
                            w-full
                            rounded-2xl
                            text-gray-700
                            focus:outline-blue-600
                            cursor-pointer
                            "
                        >
                            {academicYear.map((period) => (
                                <option key={period.value} value={period.value}>{period.label}</option>
                            ))}
                        </select>

                        <ChevronDown
                            size={16}
                            className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                        />
                    </div>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-gray-100 flex flex-col">
                        <label className="text-xs text-gray-400 mb-1">Term</label>
                        <div className="relative inline-block">
                        <select
                            className="
                            appearance-none
                            font-semibold
                            bg-gray-100
                            p-2
                            pr-10
                            w-full
                            rounded-2xl
                            text-gray-700
                            focus:outline-blue-600
                            cursor-pointer
                            "
                        >
                            <option value="first">1st Term</option>
                            <option value="second">2nd Term</option>
                            <option value="third">3rd Term</option>
                        </select>

                        <ChevronDown
                            size={16}
                            className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                        />
                    </div>
                    </div>
                </div>

                {/* Report Header */}
                <div className="grid grid-col-[1fr_1fr] md:grid-row-1fr gap-4">
                   <div className= "flex justify-start">
                        <div className='flex flex-col justify-start'>
                            <h2 className="text-xl font-bold text-gray-900">End of Term Report - 1st Term</h2>
                            <p className="text-sm text-gray-500">Academic Year : 2024/2025</p>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-6 py-2 rounded-full flex items-center gap-2 font-medium shadow-md transition-all">
                            <Download size={18} /> Download
                        </button>
                    </div>
                </div>

                {/* Main Content Area: Report Card */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">

                    {/* Stats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 bg-blue-50/90 p-4 rounded-xl">
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Term Period</p>
                            <p className="font-semibold text-gray-800">Sep 7, 2025 - Dec. 4, 2025</p>
                        </div>
                        <div className="grid grid-cols-2">
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Attendance</p>
                                <p className="font-semibold text-gray-800">40/41</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Class Position</p>
                                <p className="font-semibold text-gray-800">1/40</p>
                            </div>
                        </div>
                    </div> 
 
                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                            <thead>
                                <tr className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                                    <th className="pb-4 text-[#002359]">Subject</th>
                                    <th className="pb-4 text-center text-[#002359]">Class Test 1<br /><span className="text-[10px] font-normal">/10</span></th>
                                    <th className="pb-4 text-center text-[#002359]">Class Test 2<br /><span className="text-[10px] font-normal">/10</span></th>
                                    <th className="pb-4 text-center text-[#002359]">Mid Sem<br /><span className="text-[10px] font-normal">/20</span></th>
                                    <th className="pb-4 text-center text-[#002359]">Project Work<br /><span className="text-[10px] font-normal">/10</span></th>
                                    <th className="pb-4 text-center text-[#002359]">Final Exam<br /><span className="text-[10px] font-normal">/50</span></th>
                                    <th className="pb-4 text-center text-[#002359]">
                                        <div className="flex justify-center items-center">
                                            <span>
                                                <img src={gradeIcon} alt='Total grade' className="w-4 h-4" />
                                            </span>
                                            <span>Total Grade</span>
                                        </div>
                                        <span className="text-[10px] font-normal">100%</span></th>
                                    <th className="pb-4 text-center text-[#002359]">Grade</th>
                                    <th className="pb-4 text-right text-[#002359]">Remark</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {reportData.map((row, idx) => (
                                    <tr key={idx} onClick={() => setSelectedRow(idx)} className={`transition-colors cursor-pointer hover:bg-blue-50/90 ${selectedRow === idx ? 'bg-gray-100' : ''}`}>
                                        <td className="py-4 font-semibold text-[#002359]">{row.subject}</td>
                                        <td className="py-4 text-center text-gray-500">{row.classTest1}</td>
                                        <td className="py-4 text-center text-gray-500">{row.classTest2}</td>
                                        <td className="py-4 text-center text-gray-500">{row.midSem}</td>
                                        <td className="py-4 text-center text-gray-500">{row.project}</td>
                                        <td className="py-4 text-center text-gray-500">{row.final}</td>
                                        <td className="py-4 text-center font-bold text-gray-800">{row.total}</td>
                                        <td className="py-4 flex justify-center"><GradeBadge grade={row.grade} /></td>
                                        <td className="py-4 text-right font-semibold">{row.remark}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
                            <div className="p-2 bg-purple-100 rounded-full">
                                <User size={16} className="hidden md:block text-purple-600" />
                                <User size={32} className="block md:hidden text-purple-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 text-center md:text-start mb-1">Teacher's Comment</p>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    Kwame is a dedicated and hardworking student who shows great potential. He excels particularly in Mathematics and ICT. Encourage continued effort in all subjects.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Portal Menu (Left Sidebar) */}
            <AnimatePresence>
                {isMenuOpen && (
                    <div className="fixed inset-0 z-50 flex justify-end">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                            onClick={() => setIsMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="relative bg-white w-80 h-full shadow-2xl p-6 flex flex-col"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-xl font-bold text-gray-800">Portal Menu</h2>
                                <button onClick={() => setIsMenuOpen(false)} className="p-1 hover:bg-gray-100 rounded-full cursor-pointer"><X size={20} /></button>
                            </div>

                            <div className="flex flex-col items-center mb-8">
                                <div className="w-24 h-24 rounded-full bg-red-100 mb-4 overflow-hidden border-4 border-white shadow-lg">
                                    <img src={profile} alt="profile image" className="w-full h-full object-cover" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">{student.name}</h3>
                                <p className="text-gray-400">{student.id}</p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">Basic Information</h4>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-gray-400 text-xs">Gender</p>
                                            <p className="font-medium">{student.gender}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-xs">Date of Birth</p>
                                            <p className="font-medium">{student.dob}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">Contact Information</h4>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500"><Phone size={14} /></div>
                                            <div>
                                                <p className="text-xs text-gray-400">Guardian Phone</p>
                                                <p className="text-sm font-medium">{student.phone}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500"><Mail size={14} /></div>
                                            <div>
                                                <p className="text-xs text-gray-400">Student Mail</p>
                                                <p className="text-sm font-medium">{student.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500"><User size={14} /></div>
                                            <div>
                                                <p className="text-xs text-gray-400">Guardian Name</p>
                                                <p className="text-sm font-medium">{student.guardian}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div 
                            onClick={handleLogout}
                            className="flex justify-center items-center gap-2 mt-7 w-70 bg-blue-700 rounded-2xl shadow-md shadow-blue-300 cursor-pointer group hover:rounded-2xl active:rounded-2xl hover:bg-red-600 active:bg-red-600 hover:shadow-md active:shadow-md hover:shadow-red-400 active:shadow-red-400 hover:scale-105 active:scale-105 transition-transform duration-150 ease-in-out p-2"
                            >
                            {/* Default icon (visible until hover) */}
                            <img 
                                src={logoutWhite}
                                alt="Log Out Icon"
                                className="w-5 h-5 ml-2 transition-transform duration-150 ease-in-out group-hover:hidden group-active:hidden"
                            />

                            {/* Hover icon (hidden until hover) */}
                            <img
                                src={logoutWhite}
                                alt="Log Out Icon Hover"
                                className="w-5 h-5 ml-2 hidden transition-transform duration-150 ease-in-out group-hover:inline-block group-active:inline-block"
                            />

                            <span className="font-semibold text-white group-active:text-white">Logout</span>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Notification Panel (Right Sidebar) */}
            <AnimatePresence>
                {isNotifOpen && (
                    <div className="fixed inset-0 z-50 flex justify-end">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                            onClick={() => setIsNotifOpen(false)}
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="relative bg-white w-96 h-full shadow-2xl p-6 flex flex-col"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-800">Notification</h2>
                                <button onClick={() => setIsNotifOpen(false)} className="p-1 hover:bg-gray-100 rounded-full cursor-pointer"><X size={20} /></button>
                            </div>

                            <div className="space-y-4 overflow-y-auto">
                                {notifications.map(notif => (
                                    <div key={notif.id} className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 relative group hover:bg-blue-50 transition">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-semibold text-gray-800 text-sm">{notif.sender}</h4>
                                            <span className="text-[10px] text-gray-400">{notif.date}</span>
                                        </div>
                                        <p className="text-xs text-gray-600 leading-relaxed font-medium">
                                            {notif.message}
                                        </p>
                                        <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition">
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

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

        </div>
    );
};

export default StudentPortal;
