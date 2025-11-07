import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import Input from '../components/FormInput.jsx';
import HealthPic from '../assets/Health.png';

const HealthInfo = () => {
  const { formData, updateFormData } = useFormContext();
  const [bloodGroup, setBloodGroup] = useState('');
  const [genotype, setGenotype] = useState('');
  const [allergies, setAllergies] = useState('');
  const [conditions, setConditions] = useState('');
  const [tel, setTel] = useState('');

  useEffect(() => {
    if (formData.health && Object.keys(formData.health).length) {
      const h = formData.health;
      setBloodGroup(h.bloodGroup || '');
      setGenotype(h.genotype || '');
      setAllergies(h.allergies || '');
      setConditions(h.conditions || '');
      setTel(h.tel || '');
    }
  }, [formData.health]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!bloodGroup || !genotype || !allergies || !conditions || !tel.trim()) {
      alert('Please fill in all required fields before proceeding.');
      return;
    }

    // Save to context
    updateFormData('health', {
      bloodGroup,
      genotype,
      allergies,
      conditions,
      tel,
    });

    navigate('/documents');
  };

  return (
    <div>
      <p className="text-4xl font-bold text-center mt-4 text-blue-600">Health Information</p>
      <div className="grid grid-cols-1 lg:grid-cols-[650px_auto]">
        <form
          noValidate
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 mt-4 mb-6 p-6 lg:pl-42 order-2 lg:order-1"
        >
          <span className="flex flex-col gap-3">
            <p className="font-bold text-lg text-blue-700">Blood Group</p>
            <select
              value={bloodGroup ?? ''}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="w-72 p-3 rounded-md border-b-2 border-black bg-transparent text-black placeholder-gray-400 
              focus:outline-none focus:ring-0 focus:border-b-2 focus:border-blue-700 shadow-sm transition duration-150 ease-in-out"
            >
              <option value="" className="text-gray-400">
                Select
              </option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </span>

          <span className="flex flex-col gap-3">
            <p className="font-bold text-lg text-blue-700">Genotype</p>
            <select
              value={genotype ?? ''}
              onChange={(e) => setGenotype(e.target.value)}
              className="w-72 p-3 rounded-md border-b-2 border-black bg-transparent text-black placeholder-gray-400 
              focus:outline-none focus:ring-0 focus:border-b-2 focus:border-blue-700 shadow-sm transition duration-150 ease-in-out"
            >
              <option value="" className="text-gray-400">
                Select
              </option>
              <option value="AA">AA</option>
              <option value="AO">AO</option>
              <option value="BB">BB</option>
              <option value="BO">BO</option>
              <option value="AB">AB</option>
              <option value="OO">OO</option>
              <option value="AS">AS</option>
              <option value="SS">SS</option>
              <option value="RR">RR</option>
              <option value="Rr">Rr</option>
              <option value="rr">rr</option>
            </select>
          </span>

          <span className="mt-2">
            <p className="font-bold text-lg text-blue-700">Allergies</p>
            <textarea
              value={allergies ?? ''}
              onChange={(e) => setAllergies(e.target.value)}
              className="w-full h-24 p-3 rounded-md border-b-2 border-black bg-transparent text-black placeholder-gray-400 
              focus:outline-none focus:ring-0 focus:border-b-2 focus:border-blue-700 shadow-lg transition duration-150 ease-in-out"
            />
          </span>

          <span className="mt-2">
            <p className="font-bold text-lg text-blue-700">
              Existing Medical Conditions
            </p>
            <textarea
              value={conditions ?? ''}
              onChange={(e) => setConditions(e.target.value)}
              className="w-full h-24 p-3 rounded-md border-b-2 border-black bg-transparent text-black placeholder-gray-400 
              focus:outline-none focus:ring-0 focus:border-b-2 focus:border-blue-700 shadow-lg transition duration-150 ease-in-out"
            />
          </span>

          <Input
            label="Doctor's Contact"
            type="tel"
            placeholder="e.g., 0242345678"
            value={tel ?? ''}
            onChange={(e) => setTel(e.target.value)}
            width="100%"
          />

          <span className="flex">
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
          <img
            src={HealthPic}
            alt="Health Illustration"
            className="w-60 lg:w-100 h-auto lg:fixed lg:top-30 lg:right-30"
          />
        </div>
      </div>
    </div>
  );
};

export default HealthInfo;
