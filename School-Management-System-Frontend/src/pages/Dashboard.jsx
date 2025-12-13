
import React, { useState } from 'react';
import { Menu, Bell, Download, X, User, Phone, Mail, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StudentPortal = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);

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
        { subject: "RME", classTest1: 8, classTest2: 8, midSem: 18, project: 8, final: 35, total: 45, grade: 5, remark: "Average" },
        { subject: "ICT", classTest1: 8, classTest2: 9, midSem: 17, project: 8, final: 48, total: 90, grade: 1, remark: "Excellent" },
        { subject: "History", classTest1: 8, classTest2: 9, midSem: 18, project: 8, final: 48, total: 91, grade: 1, remark: "Excellent" },
        { subject: "BDT", classTest1: 8, classTest2: 8, midSem: 18, project: 8, final: 48, total: 93, grade: 1, remark: "Excellent" },
        { subject: "French", classTest1: 8, classTest2: 9, midSem: 16, project: 7, final: 48, total: 93, grade: 1, remark: "Excellent" },
    ];

    // Components
    const GradeBadge = ({ grade }) => {
        let color = "text-green-500 border-green-500";
        if (grade > 2) color = "text-yellow-500 border-yellow-500";
        if (grade > 4) color = "text-yellow-600 border-yellow-600";

        return (
            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${color}`}>
                {grade}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#F8F9FC] font-sans text-gray-800 relative overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center p-6 bg-white shadow-sm  h-20">
                <div className="flex items-center gap-4">
                    <button onClick={() => setIsMenuOpen(true)} className="p-2 border rounded-full hover:bg-gray-50 transition">
                        <Menu size={24} className="text-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Welcome , {student.name}</h1>
                        <p className="text-xs text-gray-400">Access your records, assessments, and updates all in one place.</p>
                    </div>
                </div>
                <div onClick={() => setIsNotifOpen(true)} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition">
                    <div className="relative">
                        <Bell size={24} className="text-red-500" />
                        <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full border border-white"></span>
                    </div>
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-bold text-gray-800">{student.name}</p>
                        <p className="text-xs text-gray-500">{student.id}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`} alt="avatar" />
                    </div>
                </div>
            </div>

            <div className="p-6 max-w-7xl mx-auto space-y-6">

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-3 rounded-xl border border-gray-100 flex flex-col">
                        <label className="text-xs text-gray-400 mb-1">Class/ Grade</label>
                        <div className="flex justify-between items-center font-semibold text-gray-700">
                            {student.grade} <ChevronDown size={16} />
                        </div>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-gray-100 flex flex-col">
                        <label className="text-xs text-gray-400 mb-1">Academic year</label>
                        <div className="flex justify-between items-center font-semibold text-gray-700">
                            2024/2025 <ChevronDown size={16} />
                        </div>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-gray-100 flex flex-col">
                        <label className="text-xs text-gray-400 mb-1">Term</label>
                        <div className="flex justify-between items-center font-semibold text-gray-700">
                            1st Term <ChevronDown size={16} />
                        </div>
                    </div>
                </div>

                {/* Report Header */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">End of Term Report - 1st Term</h2>
                        <p className="text-sm text-gray-500">Academic Year : 2024/2025</p>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full flex items-center gap-2 font-medium shadow-md transition-all">
                        <Download size={18} /> Download
                    </button>
                </div>

                {/* Main Content Area: Report Card */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">

                    {/* Stats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 bg-blue-50/50 p-4 rounded-xl">
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Term Period</p>
                            <p className="font-semibold text-gray-800">Sep 7, 2025 - Dec. 4, 2025</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Attendance</p>
                            <p className="font-semibold text-gray-800">40/41</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Class Position</p>
                            <p className="font-semibold text-gray-800">1/40</p>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                            <thead>
                                <tr className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                                    <th className="pb-4">Subject</th>
                                    <th className="pb-4 text-center">Class Test 1<br /><span className="text-[10px] font-normal">/10</span></th>
                                    <th className="pb-4 text-center">Class Test 2<br /><span className="text-[10px] font-normal">/10</span></th>
                                    <th className="pb-4 text-center">Mid Sem<br /><span className="text-[10px] font-normal">/20</span></th>
                                    <th className="pb-4 text-center">Project Work<br /><span className="text-[10px] font-normal">/10</span></th>
                                    <th className="pb-4 text-center">Final Exam<br /><span className="text-[10px] font-normal">/50</span></th>
                                    <th className="pb-4 text-center">Total Grade<br /><span className="text-[10px] font-normal">100%</span></th>
                                    <th className="pb-4 text-center">Grade</th>
                                    <th className="pb-4 text-right">Remark</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {reportData.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="py-4 font-semibold text-gray-700">{row.subject}</td>
                                        <td className="py-4 text-center text-gray-500">{row.classTest1}</td>
                                        <td className="py-4 text-center text-gray-500">{row.classTest2}</td>
                                        <td className="py-4 text-center text-gray-500">{row.midSem}</td>
                                        <td className="py-4 text-center text-gray-500">{row.project}</td>
                                        <td className="py-4 text-center text-gray-500">{row.final}</td>
                                        <td className="py-4 text-center font-bold text-gray-800">{row.total}</td>
                                        <td className="py-4 flex justify-center"><GradeBadge grade={row.grade} /></td>
                                        <td className={`py-4 text-right font-medium ${row.remark === "Excellent" ? "text-green-600" : row.remark === "Average" ? "text-yellow-600" : "text-blue-600"}`}>{row.remark}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <div className="flex gap-4 items-start">
                            <div className="p-2 bg-purple-100 rounded-full">
                                <User size={16} className="text-purple-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 mb-1">Teacher's Comment</p>
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
                    <div className="fixed inset-0 z-50 flex">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                            onClick={() => setIsMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="relative bg-white w-80 h-full shadow-2xl p-6 flex flex-col"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-xl font-bold text-gray-800">Portal Menu</h2>
                                <button onClick={() => setIsMenuOpen(false)} className="p-1 hover:bg-gray-100 rounded-full"><X size={20} /></button>
                            </div>

                            <div className="flex flex-col items-center mb-8">
                                <div className="w-24 h-24 rounded-full bg-red-100 mb-4 overflow-hidden border-4 border-white shadow-lg">
                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`} alt="avatar" className="w-full h-full object-cover" />
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

                            <div className="mt-auto">
                                <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2">
                                    Log Out
                                </button>
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
                            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
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
                                <button onClick={() => setIsNotifOpen(false)} className="p-1 hover:bg-gray-100 rounded-full"><X size={20} /></button>
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

        </div>
    );
};

export default StudentPortal;
