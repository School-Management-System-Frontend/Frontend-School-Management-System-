// src/context/FormContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const FormContext = createContext();

// Load initial data from localStorage synchronously
const loadInitialData = () => {
  try {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      return JSON.parse(savedData);
    }
  } catch (error) {
    console.error('Failed to load form data:', error);
  }
  return {
    personal: {},
    guardian: {},
    academic: {},
    health: {},
    documents: {},
  };
};

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState(loadInitialData());

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

  return (
    <FormContext.Provider value={{ formData, updateFormData, clearFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
