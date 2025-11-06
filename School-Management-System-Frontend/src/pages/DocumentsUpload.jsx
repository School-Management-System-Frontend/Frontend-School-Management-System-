import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DocumentPic from "../assets/document.png";

const DocumentsUpload = () => {
  const [documents, setDocuments] = useState({
    passportPhoto: null,
    birthCertificate: null,
    testimonial: null,
    medicalReport: null,
  });

  const [previews, setPreviews] = useState({
    passportPhoto: null,
    birthCertificate: null,
    testimonial: null,
    medicalReport: null,
  });

  const navigate = useNavigate();

  const fileConfigs = {
    passportPhoto: {
      accept: "image/*",
      required: true,
      title: "Passport Photograph",
      icon: "fa-image",
      maxSize: 10,
    },
    birthCertificate: {
      accept: ".pdf,image/*",
      required: true,
      title: "Birth Certificate",
      icon: "fa-file-pdf",
      maxSize: 20,
    },
    testimonial: {
      accept: ".pdf,image/*",
      required: true,
      title: "Testimonial / Previous Result",
      icon: "fa-file-lines",
      maxSize: 20,
    },
    medicalReport: {
      accept: ".pdf,image/*",
      required: false,
      title: "Medical Report",
      icon: "fa-file-medical",
      maxSize: 20,
    },
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > fileConfigs[fieldName].maxSize) {
      alert(`File size must be less than ${fileConfigs[fieldName].maxSize}MB`);
      e.target.value = null;
      return;
    }

    const previewURL = file.type.startsWith("image/")
      ? URL.createObjectURL(file)
      : file.type === "application/pdf"
      ? "/pdf-icon.png"
      : "/file-icon.png";

    setDocuments((prev) => ({ ...prev, [fieldName]: file }));
    setPreviews((prev) => ({ ...prev, [fieldName]: previewURL }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const missingFields = Object.entries(fileConfigs)
      .filter(([key, config]) => config.required && !documents[key])
      .map(([, config]) => config.title);

    if (missingFields.length > 0) {
      alert(
        `Please upload the following required documents:\n${missingFields.join(
          "\n"
        )}`
      );
      return;
    }

    // Simulate successful upload 
    alert("Documents uploaded successfully!");

    navigate("/review");
  };

  return (
    <div className="">
      <p className="text-4xl font-bold text-center mt-4 text-blue-600">Required Documents</p>
      <div className="grid grid-cols-1 lg:grid-cols-[650px_auto]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 mt-4 mb-6 p-6 lg:pl-42 order-2 lg:order-1"
        >
          {Object.entries(fileConfigs).map(([fieldName, config]) => (
            <div key={fieldName} className="mb-4">
              <p className="font-bold text-lg text-blue-700">
                {config.title}
                {config.required && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </p>

              {previews[fieldName] && (
                <div className="mt-2 mb-2">
                  <img
                    src={previews[fieldName]}
                    alt={`${config.title} preview`}
                    className="h-32 object-contain"
                  />
                </div>
              )}

              <input
                type="file"
                accept={config.accept}
                onChange={(e) => handleFileChange(e, fieldName)}
                required={config.required}
                className="w-full p-3 rounded-md border-b-2 border-black bg-transparent 
                  text-black placeholder-gray-400 focus:outline-none focus:ring-0 
                  focus:border-b-2 focus:border-blue-700 shadow-sm"
              />
              <p className="text-sm text-gray-600 mt-1">
                Max size: {config.maxSize}MB
              </p>
            </div>
          ))}
          <span className="flex">
            <button
              type="submit"
              className="w-full mt-4 bg-blue-700 text-white font-bold cursor-pointer py-2 px-4 rounded-md 
                hover:bg-blue-800 transition duration-150 ease-in-out"
            >
              Upload Documents
            </button>
          </span>
        </form>

        <div className="flex-1 flex items-start justify-center pt-16 order-1 lg:order-2">
          <img
            src={DocumentPic}
            alt="Documents Illustration"
            className="w-40 lg:w-70 h-auto lg:fixed lg:top-30 lg:right-40"
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentsUpload;
