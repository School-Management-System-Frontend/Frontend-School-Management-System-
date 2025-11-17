// src/context/FormContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    personal: {},
    guardian: {},
    academic: {},
    health: {},
    documents: {},
  });

  const updateFormData = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  };

  const clearFormData = () => {
    setFormData({
      personal: {},
      guardian: {},
      academic: {},
      health: {},
      documents: {},
    });
    localStorage.removeItem("formData");
  };

    useEffect(() => {
  localStorage.setItem("formData", JSON.stringify(formData));
}, [formData]);

useEffect(() => {
  const savedData = localStorage.getItem("formData");
  if (savedData) setFormData(JSON.parse(savedData));
}, []);

  return (
    <FormContext.Provider value={{ formData, updateFormData, clearFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
