import React, { useState } from "react";

export default function PupilForm() {
  const [data, setData] = useState({
    // Pupil
    admissionNo: "",
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: "",
    nationality: "",
    // School
    classLevel: "",
    academicYear: "",
    dateOfAdmission: "",
    // Contact / Residence
    address: "",
    city: "",
    // Parents / Guardians
    parent1Name: "",
    parent1Relation: "Mother",
    parent1Phone: "",
    parent1Email: "",
    parent2Name: "",
    parent2Relation: "Father",
    parent2Phone: "",
    parent2Email: "",
    // Emergency & Medical
    emergencyName: "",
    emergencyPhone: "",
    doctorName: "",
    clinicName: "",
    medicalConditions: "",
    allergies:
 