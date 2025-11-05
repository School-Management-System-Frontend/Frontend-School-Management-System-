import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewPic from '../assets/review.png';

const Review = () => {
  const navigate = useNavigate();

  // This would normally come from a central state management system like Context or Redux
  // For now, we'll use mock data to demonstrate the layout
  const mockData = {
    personal: {
      firstName: "John",
      lastName: "Doe",
      gender: "Male",
      birthDate: "2015-05-15",
      nationality: "Nigerian",
      classLevel: "JSS 1",
      academicYear: "2023/2024",
      dateOfAdmission: "2023-09-01",
      address: "123 School Road",
      city: "Lagos",
      parent1Name: "Jane Doe",
      parent1Relation: "Mother",
      parent1Phone: "08012345678",
      parent1Email: "jane@example.com",
      parent2Name: "James Doe",
      parent2Relation: "Father",
      parent2Phone: "08087654321",
      parent2Email: "james@example.com"
    },
    guardian: {
      name: "Uncle Ben",
      relation: "Uncle",
      phone: "08011223344",
      email: ''
    },
    academic: {
      lastSchool: "Previous School Name",
      schoolAddress: "456 Education Street, Lagos",
      yearsAttended: {
        from: "2020-09-01",
        to: "2023-07-31"
      }
    },
    health: {
      bloodGroup: "O+",
      allergies: "None",
      medications: "None",
      conditions: "None"
    },
    documents: {
      passportPhoto: "Uploaded",
      birthCertificate: "Uploaded",
      testimonial: "Uploaded",
      medicalReport: "Not Required"
    }
  };

  const SectionTitle = ({ title }) => (
    <p className="font-bold text-lg text-blue-700 mb-2">{title}</p>
  );

  const InfoItem = ({ label, value }) => (
    <div className="mb-2">
      <span className="font-semibold">{label}:</span>
      <span className="ml-2">{value}</span>
    </div>
  );

  const Section = ({ title, data, editPath }) => (
    <div className="mb-6 p-4 border-b-2 border-black rounded-md">
      <div className="flex justify-between items-center mb-4">
        <SectionTitle title={title} />
        <button
          onClick={() => navigate(editPath)}
          className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 hover:scale-105 transition duration-150 ease-in-out cursor-pointer"
        >
          Edit
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(data).map(([key, value]) => {
          // Handle nested objects
          if (typeof value === 'object' && value !== null) {
            return Object.entries(value).map(([subKey, subValue]) => (
              <InfoItem
                key={`${key}-${subKey}`}
                label={subKey.charAt(0).toUpperCase() + subKey.slice(1)}
                value={subValue}
              />
            ));
          }
          return (
            <InfoItem
              key={key}
              label={key.replace(/([A-Z])/g, ' $1').charAt(0).toUpperCase() + key.replace(/([A-Z])/g, ' $1').slice(1)}
              value={value}
            />
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="">
          <p className="text-4xl font-bold mb-6 text-center">Review Information</p>
      <div className="flex-1">
        <form className="flex flex-col gap-2 mt-4 mb-6 pl-42 w-180">
          
          <Section 
            title="Personal Information" 
            data={mockData.personal}
            editPath="/personal"
          />
          <Section 
            title="Guardian Information" 
            data={mockData.guardian}
            editPath="/guardian"
          />
          
          <Section 
            title="Academic History" 
            data={mockData.academic}
            editPath="/academic"
          />
          
          <Section 
            title="Health Information" 
            data={mockData.health}
            editPath="/health"
          />
          
          <Section 
            title="Uploaded Documents" 
            data={mockData.documents}
            editPath="/documents"
          />

          <span className="flex">
            <button
              type="submit"
              className="w-full mt-4 bg-blue-700 text-white font-bold cursor-pointer py-2 px-4 rounded-md 
              hover:bg-blue-800 transition duration-150 ease-in-out"
            >
              Submit
            </button>
          </span>
        </form>
      </div>
      
      <div className="flex-1 flex items-start justify-center pt-16">
        <img src={ReviewPic} alt="Review" className="w-96 h-auto fixed top-30 right-35" />
      </div>
    </div>
  );
};

export default Review;