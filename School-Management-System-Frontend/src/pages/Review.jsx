import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import ReviewPic from '../assets/review.png';

const Review = () => {
  const navigate = useNavigate();
  const { formData } = useFormContext();

  const SectionTitle = ({ title }) => (
    <p className="font-bold text-lg text-blue-700 mb-2">{title}</p>
  );

  const InfoItem = ({ label, value }) => {
    // File object preview (from file inputs)
    if (value instanceof File) {
      const url = URL.createObjectURL(value);
      const isImage = value.type?.startsWith('image/');
      return (
        <div className="mb-3 p-2 bg-gray-50 rounded">
          <span className="font-semibold text-blue-700">{label}:</span>
          <div className="mt-2">
            {isImage ? (
              <img src={url} alt={label} className="h-32 object-contain" />
            ) : (
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline break-all"
              >
                {value.name || 'Document'}
              </a>
            )}
          </div>
        </div>
      );
    }

    // Blob URL or direct URL string
    if (typeof value === 'string') {
      const looksLikeUrl = /^(blob:|https?:\/\/|data:)/i.test(value);
      return (
        <div className="mb-3 p-2 bg-gray-50 rounded">
          <span className="font-semibold text-blue-700">{label}:</span>
          {looksLikeUrl ? (
            <a href={value} target="_blank" rel="noreferrer" className="ml-2 text-blue-600 underline break-all">
              Open
            </a>
          ) : (
            <span className="ml-2 text-gray-700">{value || 'Not provided'}</span>
          )}
        </div>
      );
    }

    // Generic object: render nested keys if any
    if (value && typeof value === 'object') {
      return (
        <div className="mb-3 p-2 bg-gray-50 rounded">
          <span className="font-semibold text-blue-700">{label}:</span>
          <div className="mt-2 grid grid-cols-1 gap-1">
            {Object.entries(value).map(([k, v]) => (
              <div key={k} className="text-gray-700">
                <span className="font-medium">{k.charAt(0).toUpperCase() + k.slice(1)}:</span>
                <span className="ml-2">{String(v)}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Default primitive
    return (
      <div className="mb-3 p-2 bg-gray-50 rounded">
        <span className="font-semibold text-blue-700">{label}:</span>
        <span className="ml-2 text-gray-700">{value || 'Not provided'}</span>
      </div>
    );
  };

  const Section = ({ title, data, editPath }) => (
    <div className="mb-6 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <SectionTitle title={title} />
        <button
          onClick={() => navigate(editPath)}
          className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 
            hover:scale-105 transition duration-150 ease-in-out cursor-pointer text-sm"
        >
          Edit
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(data).map(([key, value]) => {
          // For documents we want consistent rows for known keys
          const label = key.replace(/([A-Z])/g, ' $1').trim();

          // Handle nested objects (non-documents)
          if (typeof value === 'object' && value !== null && !(value instanceof File)) {
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
              label={label.charAt(0).toUpperCase() + label.slice(1)}
              value={value}
            />
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4">
      <p className="text-4xl font-bold text-blue-600 text-center mt-4 mb-6">Review Information</p>
      <div className="flex flex-col lg:flex-row">
        <div className="block lg:hidden w-full flex justify-center mb-6">
          <img 
            src={ReviewPic} 
            alt="Review" 
            className="w-60 h-auto" 
          />
        </div>
        <div className="w-full lg:w-[700px] lg:pl-26">
          <form className="flex flex-col gap-4 max-w-4xl mx-auto">
          
          {(() => {
            const p = formData?.personal || {};
            const normalizedPersonal = {
              firstName: p.firstName ?? null,
              lastName: p.lastName ?? null,
              middleName: p.middleName ?? null,
              gender: p.gender ?? null,
              dateOfBirth: p.dateOfBirth ?? null,
              nationality: p.nationality ?? null,
              address: p.address ?? null,
              phoneNumber: p.phoneNumber ?? null,
              email: p.email ?? null,
            };
            return (
              <Section 
                title="Personal Information" 
                data={normalizedPersonal}
                editPath="/personal"
              />
            );
          })()}

          {(() => {
            const g = formData?.guardian || {};
            const normalizedGuardian = {
              fullName: g.fullName ?? null,
              relationship: g.relationship ?? null,
              occupation: g.occupation ?? null,
              phoneNumber: g.phoneNumber ?? null,
              emergencyNumber: g.emergencyNumber ?? null,
              email: g.email ?? null,
              address: g.address ?? null,
            };
            return (
              <Section 
                title="Guardian Information" 
                data={normalizedGuardian}
                editPath="/guardian"
              />
            );
          })()}
          
          {(() => {
            const a = formData?.academic || {};
            const normalizedAcademic = {
              schoolAttended: a.schoolAttended ?? a.lastSchool ?? null,
              address: a.address ?? a.schoolAddress ?? null,
              fromDate: a.fromDate ?? a.yearsAttended?.from ?? null,
              toDate: a.toDate ?? a.yearsAttended?.to ?? null,
              classCompleted: a.classCompleted ?? null,
            };
            return (
              <Section 
                title="Academic History" 
                data={normalizedAcademic}
                editPath="/academic"
              />
            );
          })()}
          
          {(() => {
            const h = formData?.health || {};
            const normalizedHealth = {
              bloodGroup: h.bloodGroup ?? null,
              genotype: h.genotype ?? null,
              allergies: h.allergies ?? null,
              conditions: h.conditions ?? null,
              tel: h.tel ?? null,
            };
            return (
              <Section 
                title="Health Information" 
                data={normalizedHealth}
                editPath="/health"
              />
            );
          })()}
          
          {(() => {
            // Ensure consistent document keys even if context is empty or missing some
            const docs = formData?.documents || {};
            const normalizedDocs = {
              passportPhoto: docs.passportPhoto ?? null,
              birthCertificate: docs.birthCertificate ?? null,
              testimonial: docs.testimonial ?? null,
              medicalReport: docs.medicalReport ?? null,
            };
            return (
              <Section 
                title="Uploaded Documents" 
                data={normalizedDocs}
                editPath="/documents"
              />
            );
          })()}

          <span className="mt-0 mb-6 flex">
            <button
              type="submit"
              className="w-full mt-4 bg-blue-700 text-white font-bold cursor-pointer py-2 px-4 rounded-md 
                hover:bg-blue-800 transition duration-150 ease-in-out"
            >
              Submit Application
            </button>
          </span>
          </form>
        </div>
        
        <div className="hidden lg:block lg:w-1/3 flex justify-center items-start pl-12">
          <img 
            src={ReviewPic} 
            alt="Review" 
            className="w-60 lg:w-80 h-auto fixed top-40 right-40" 
          />
        </div>
      </div>
    </div>
  );
};

export default Review;