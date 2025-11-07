import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import Input from '../components/FormInput.jsx';
import AcademicPic from '../assets/Academic.png';

const AcademicHistory = () => {
  const { formData, updateFormData } = useFormContext();
  const [schoolAttended, setSchoolAttended] = useState("");
  const [address, setAddress] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [classCompleted, setClassCompleted] = useState("");

  useEffect(() => {
    if (formData.academic && Object.keys(formData.academic).length) {
      const a = formData.academic;
      setSchoolAttended(a.schoolAttended || a.lastSchool || "");
      setAddress(a.address || a.schoolAddress || "");
      setFromDate(a.fromDate || a.yearsAttended?.from || "");
      setToDate(a.toDate || a.yearsAttended?.to || "");
      setClassCompleted(a.classCompleted || "");
    }
  }, [formData.academic]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!schoolAttended || !address || !fromDate || !toDate || !classCompleted) {
      alert("Please fill in all required fields before proceeding.");
      return;
    }

    // Validate chronology: From must be earlier than To
    const from = new Date(fromDate);
    const to = new Date(toDate);
    if (!(from instanceof Date && !isNaN(from)) || !(to instanceof Date && !isNaN(to))) {
      alert("Please enter valid dates.");
      return;
    }
    if (from >= to) {
      alert("'From' date must be earlier than 'To' date.");
      return;
    }

    // Save to context
    updateFormData('academic', {
      schoolAttended,
      address,
      fromDate,
      toDate,
      classCompleted,
    });

    navigate("/health");
  };

  return (
    <div className="">
      <p className="text-4xl font-bold text-center mt-4 text-blue-600">Academic History</p>
      <div className="grid grid-cols-1 lg:grid-cols-[650px_auto]">
        <form  onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4 mb-6 p-6 lg:pl-42 order-2 lg:order-1">
          <Input 
            label="Last School Attended" 
            type='text'
            value={schoolAttended ?? ''} 
            onChange={(e) => setSchoolAttended(e.target.value)} 
            width="100%" 
            required={true}
          />
          <Input 
            label="Address" 
            type="text" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
            width="100%"
            required={true}
          />

          <span className="">
            <p className="font-bold text-lg text-blue-700">Years Attended</p>
            <span className="flex justify-between">
              <span>
                <Input 
                  label="From" 
                  type="date" 
                  width="150px" 
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)} 
                />
              </span>
              <span>
                <Input 
                  label="To" 
                  type="date" 
                  width="150px"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)} 
                />
              </span>
            </span>
          </span>

          <span className="flex flex-col gap-3">
            <p className="font-bold text-lg text-blue-700">Class Completed</p>
            <select
              value={classCompleted ?? ''}
              onChange={(e) => setClassCompleted(e.target.value)}
              className="w-72 p-3 rounded-md border-b-2 border-black bg-transparent text-black 
              focus:outline-none focus:ring-0 focus:border-blue-700 shadow-sm transition duration-150 ease-in-out"
            >
              <option value="" disabled>Select</option>
              <option value="JHS-3">JHS-3</option>
              <option value="JHS-2">JHS-2</option>
              <option value="JHS-1">JHS-1</option>
              <option value="Upper-Primary-6">Upper Primary 6</option>
              <option value="Upper-Primary-5">Upper Primary 5</option>
              <option value="Upper-Primary-4">Upper Primary 4</option>
              <option value="Lower-Primary-3">Lower Primary 3</option>
              <option value="Lower-Primary-2">Lower Primary 2</option>
              <option value="Lower-Primary-1">Lower Primary 1</option>
            </select>
          </span>

          <span className="mt-2">
            <p className="font-bold text-lg text-blue-700">Reason for Leaving (Optional)</p>
            <textarea
              className="w-full h-24 p-3 rounded-md border-b-2 border-black bg-transparent text-black 
              focus:outline-none focus:ring-0 focus:border-blue-700 shadow-lg transition duration-150 ease-in-out"
            />
          </span>

          <span className="mt-4 flex">
            <button
              type="submit"
              className="w-full mt-4 bg-blue-700 text-white font-bold cursor-pointer py-2 px-4 rounded-md 
                hover:bg-blue-800 transition duration-150 ease-in-out"
            >
              Next
            </button>
          </span>
        </form>

        <div className="flex-1 flex items-start justify-center pt-16 order-1 lg:order-2">
          <img src={AcademicPic} alt="Academic Illustration" className="w-60 lg:w-100 h-auto lg:fixed lg:top-20 lg:right-30" />
        </div>
      </div>
    </div>
  );
};

export default AcademicHistory;
