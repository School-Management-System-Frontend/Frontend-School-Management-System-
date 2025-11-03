import React, { useState } from "react";

export default function PupilForm() {
  const [data, setData] = useState({
    admissionNo: "",
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: "",
    nationality: "",
    classLevel: "",
    academicYear: "",
    dateOfAdmission: "",
    address: "",
    city: "",
    parent1Name: "",
    parent1Relation: "Mother",
    parent1Phone: "",
    parent1Email: "",
    parent2Name: "",
    parent2Relation: "Father",
    parent2Phone: "",
    parent2Email: "",
    emergencyName: "",
    emergencyPhone: "",
    doctorName: "",
    clinicName: "",
    medicalConditions: "",
    allergies: "",
    medications: "",
    bloodGroup: "",
    usesSchoolBus: "",
    pickupAuthorizedName: "",
    pickupAuthorizedPhone: "",
    photoConsent: false,
    dataConsent: false,
  });

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const required = [
      "firstName","lastName","gender","birthDate","classLevel",
      "parent1Name","parent1Phone","emergencyName","emergencyPhone"
    ];
    const missing = required.filter((k) => !String(data[k]).trim());
    if (missing.length) {
      alert(`Please complete: ${missing.join(", ")}`);
      return;
    }
    if (!data.dataConsent) {
      alert("Please accept the data use consent to proceed.");
      return;
    }
    console.log("PUPIL FORM →", data);
    alert("Submitted! Open the browser console to see the JSON payload.");
  };

  const inputCls =
    "w-full outline-none text-stone-800 placeholder:text-stone-600/60 border border-stone-200 text-sm py-2 px-2.5 shadow-sm bg-white rounded-lg hover:border-stone-300 focus:border-stone-400";
  const selectCls =
    "w-full outline-none text-stone-800 border border-stone-200 text-sm py-2 px-2.5 shadow-sm bg-white rounded-lg hover:border-stone-300 focus:border-stone-400";

  return (
    <main className="bg-white border border-stone-200 rounded-xl shadow-sm p-6">
      <h1 className=" font-semibold mb-1 ">Pupil Personal Information</h1>
      <p className="text-lg text-red-600  ">Fill in your child’s details. Fields marked * are required.</p>

      <form className="mt-8 space-y-8" onSubmit={onSubmit}>
        {/* Pupil Details */}
        <Section title="Pupil Details">
          <Grid>
            <Field label="Admission No." id="admissionNo">
              <input id="admissionNo" name="admissionNo" value={data.admissionNo} onChange={onChange} className={inputCls} placeholder="(if available)" />
            </Field>

            <Field label="First Name *" id="firstName">
              <input id="firstName" name="firstName" value={data.firstName} onChange={onChange} className={inputCls} placeholder="e.g., Ama" />
            </Field>

            <Field label="Last Name *" id="lastName">
              <input id="lastName" name="lastName" value={data.lastName} onChange={onChange} className={inputCls} placeholder="e.g., Mensah" />
            </Field>

            <Field label="Gender *" id="gender">
              <select id="gender" name="gender" value={data.gender} onChange={onChange} className={selectCls}>
                <option value="" disabled>Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
                <option>Prefer not to say</option>
              </select>
            </Field>

            <Field label="Date of Birth *" id="birthDate">
              <input id="birthDate" name="birthDate" type="date" value={data.birthDate} onChange={onChange} className={inputCls} />
            </Field>

            <Field label="Nationality" id="nationality">
              <input id="nationality" name="nationality" value={data.nationality} onChange={onChange} className={inputCls} placeholder="e.g., Ghanaian" />
            </Field>
          </Grid>
        </Section>

        {/* School Details */}
        <Section title="School Details">
          <Grid>
            <Field label="Class / Grade *" id="classLevel">
              <select id="classLevel" name="classLevel" value={data.classLevel} onChange={onChange} className={selectCls}>
                <option value="" disabled>Select class</option>
                <option>Nursery 1</option>
                <option>Nursery 2</option>
                <option>KG 1</option>
                <option>KG 2</option>
                <option>Primary 1</option>
                <option>Primary 2</option>
                <option>Primary 3</option>
                <option>Primary 4</option>
                <option>Primary 5</option>
                <option> JHS 1    </option>
                <option>JHS 1</option>
                <option>JHS 2</option>
                <option>JHS 3</option>
              </select>
            </Field>

            <Field label="Academic Year" id="academicYear">
              <input id="academicYear" name="academicYear" value={data.academicYear} onChange={onChange} className={inputCls} placeholder="2025/2026" />
            </Field>

            <Field label="Date of Admission" id="dateOfAdmission">
              <input id="dateOfAdmission" name="dateOfAdmission" type="date" value={data.dateOfAdmission} onChange={onChange} className={inputCls} />
            </Field>
          </Grid>
        </Section>

        {/* Home Address */}
        <Section title="Home Address">
          <Grid>
            <Field label="Street Address" id="address">
              <input id="address" name="address" value={data.address} onChange={onChange} className={inputCls} placeholder="House/Street" />
            </Field>

            <Field label="City / Town" id="city">
              <input id="city" name="city" value={data.city} onChange={onChange} className={inputCls} placeholder="e.g., Legon" />
            </Field>
          </Grid>
        </Section>

        {/* Parent / Guardian */}
        <Section title="Parent / Guardian">
          <Grid>
            <Field label="Parent/Guardian 1 Name *" id="parent1Name">
              <input id="parent1Name" name="parent1Name" value={data.parent1Name} onChange={onChange} className={inputCls} />
            </Field>
            <Field label="Relationship" id="parent1Relation">
              <select id="parent1Relation" name="parent1Relation" value={data.parent1Relation} onChange={onChange} className={selectCls}>
                <option>Mother</option><option>Father</option><option>Guardian</option><option>Other</option>
              </select>
            </Field>
            <Field label="Phone *" id="parent1Phone">
              <input id="parent1Phone" name="parent1Phone" value={data.parent1Phone} onChange={onChange} className={inputCls} placeholder="+233 24 000 0000" />
            </Field>
            <Field label="Email" id="parent1Email">
              <input id="parent1Email" name="parent1Email" type="email" value={data.parent1Email} onChange={onChange} className={inputCls} placeholder="name@email.com" />
            </Field>

            <Field label="Parent/Guardian 2 Name" id="parent2Name">
              <input id="parent2Name" name="parent2Name" value={data.parent2Name} onChange={onChange} className={inputCls} />
            </Field>
            <Field label="Relationship" id="parent2Relation">
              <select id="parent2Relation" name="parent2Relation" value={data.parent2Relation} onChange={onChange} className={selectCls}>
                <option>Father</option><option>Mother</option><option>Guardian</option><option>Other</option>
              </select>
            </Field>
            <Field label="Phone" id="parent2Phone">
              <input id="parent2Phone" name="parent2Phone" value={data.parent2Phone} onChange={onChange} className={inputCls} />
            </Field>
            <Field label="Email" id="parent2Email">
              <input id="parent2Email" name="parent2Email" type="email" value={data.parent2Email} onChange={onChange} className={inputCls} />
            </Field>
          </Grid>
        </Section>

        {/* Emergency & Medical */}
        <Section title="Emergency & Medical Information">
          <Grid>
            <Field label="Emergency Contact Name *" id="emergencyName">
              <input id="emergencyName" name="emergencyName" value={data.emergencyName} onChange={onChange} className={inputCls} />
            </Field>
            <Field label="Emergency Phone *" id="emergencyPhone">
              <input id="emergencyPhone" name="emergencyPhone" value={data.emergencyPhone} onChange={onChange} className={inputCls} />
            </Field>
            <Field label="Family Doctor" id="doctorName">
              <input id="doctorName" name="doctorName" value={data.doctorName} onChange={onChange} className={inputCls} />
            </Field>
            <Field label="Clinic / Hospital" id="clinicName">
              <input id="clinicName" name="clinicName" value={data.clinicName} onChange={onChange} className={inputCls} />
            </Field>
            <Field label="Medical Conditions" id="medicalConditions">
              <input id="medicalConditions" name="medicalConditions" value={data.medicalConditions} onChange={onChange} className={inputCls} placeholder="e.g., asthma" />
            </Field>
            <Field label="Allergies" id="allergies">
              <input id="allergies" name="allergies" value={data.allergies} onChange={onChange} className={inputCls} placeholder="e.g., peanuts" />
            </Field>
            <Field label="Medications" id="medications">
              <input id="medications" name="medications" value={data.medications} onChange={onChange} className={inputCls} placeholder="e.g., inhaler" />
            </Field>
            <Field label="Blood Group" id="bloodGroup">
              <input id="bloodGroup" name="bloodGroup" value={data.bloodGroup} onChange={onChange} className={inputCls} placeholder="e.g., O+" />
            </Field>
          </Grid>
        </Section>

        {/* Transport & Pickup */}
        <Section title="Transport & Pickup">
          <Grid>
            <Field label="Uses School Bus?" id="usesSchoolBus">
              <select id="usesSchoolBus" name="usesSchoolBus" value={data.usesSchoolBus} onChange={onChange} className={selectCls}>
                <option value="" disabled>Select</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </Field>
            <Field label="Authorized Pickup Person" id="pickupAuthorizedName">
              <input id="pickupAuthorizedName" name="pickupAuthorizedName" value={data.pickupAuthorizedName} onChange={onChange} className={inputCls} placeholder="Name" />
            </Field>
            <Field label="Pickup Phone" id="pickupAuthorizedPhone">
              <input id="pickupAuthorizedPhone" name="pickupAuthorizedPhone" value={data.pickupAuthorizedPhone} onChange={onChange} className={inputCls} placeholder="+233 ..." />
            </Field>
          </Grid>
        </Section>

        {/* Consent & Submit */}
        <section className="space-y-4">
            <label className="flex items-start gap-2 text-sm">
              <input type="checkbox" name="photoConsent" checked={data.photoConsent} onChange={onChange} className="mt-1" />
              <span className=" text-black font-bold text-lg ">I grant permission for the school to use my child’s photo/video for school activities and communications.</span>
            </label>
            <label className="flex items-start gap-2 text-sm">
              <input type="checkbox" name="dataConsent" checked={data.dataConsent} onChange={onChange} className="mt-1" />
              <span  className=" text-black font-bold text-lg ">I confirm the information provided is accurate and I consent to its use for school administration.*</span>
            </label>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg bg-stone-900 text-white px-4 py-2 text-sm font-medium hover:bg-stone-800 disabled:opacity-50"
              disabled={!data.dataConsent}
            >
              Submit Form
            </button>
        </section>
      </form>
    </main>
  );
}

/* Helpers */
function Section({ title, children }) {
  return (
    <section>
      <h2 className="text-sm font-semibold text-stone-800 mb-4">{title}</h2>
      {children}
    </section>
  );
}
function Grid({ children }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{children}</div>;
}
function Field({ label, id, children }) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block mb-1 text-sm font-semibold text-stone-800">
        {label}
      </label>
      {children}
    </div>
  );
}
