import React, { useState } from "react";

export default function GuardianForm() {
  const [wardsName, setWardsName] = useState(""); // optional link to kid
  const [guardians, setGuardians] = useState([
    blankGuardian("Mother"),
  ]);

  const [consents, setConsents] = useState({
    financialResponsibility: false,
    pickupConsent: false,
    dataConsent: false,
  });

  const inputCls =
    "w-full outline-none text-stone-800 placeholder:text-stone-600/60 border border-stone-200 text-sm py-2 px-2.5 shadow-sm bg-white rounded-lg hover:border-stone-300 focus:border-stone-400";
  const selectCls =
    "w-full outline-none text-stone-800 border border-stone-200 text-sm py-2 px-2.5 shadow-sm bg-white rounded-lg hover:border-stone-300 focus:border-stone-400";

  function blankGuardian(defaultRelation = "") {
    return {
      relationToWard: defaultRelation, // Mother / Father / Guardian / Other
      title: "", // Mr/Mrs/Ms/Dr
      firstName: "",
      lastName: "",
      maritalStatus: "", // Married/Single/Separated/Divorced/Widowed
      custody: "", // Full / Joint / None / Court-ordered
      livesWithWard: "",
      // Contact & Address
      phonePrimary: "",
      phoneAlt: "",
      email: "",
      address: "",
      city: "",
      // Employment
      occupation: "",
      employer: "",
      workPhone: "",
      workAddress: "",
      // Availability (pickup/contact hours)
      availability: "",
      // Identification
      idType: "", // National ID / Passport / Driver’s License / Voter ID
      idNumber: "",
      // Emergency & Pickup (for this guardian)
      isEmergencyContact: "",
      authorizedForPickup: "",
      // Communication preferences
      preferredChannel: "", // SMS / Call / Email / WhatsApp
      preferredLanguage: "", // English, Twi, etc.
      // Notes
      notes: "",
    };
  }

  const addGuardian = () => setGuardians((g) => [...g, blankGuardian("Guardian")]);
  const removeGuardian = (index) =>
    setGuardians((g) => g.filter((_, i) => i !== index));

  const onGuardianChange = (index, field, value) => {
    setGuardians((g) => {
      const next = [...g];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Basic checks: at least one guardian with required fields
    if (!guardians.length) {
      alert("Please add at least one guardian/parent.");
      return;
    }
    const requiredPerGuardian = ["firstName", "lastName", "relationToWard", "phonePrimary"];
    const missing = [];
    guardians.forEach((g, i) => {
      requiredPerGuardian.forEach((k) => {
        if (!String(g[k] || "").trim()) missing.push(`Guardian ${i + 1}: ${k}`);
      });
    });
    if (missing.length) {
      alert("Please complete:\n" + missing.join("\n"));
      return;
    }
    if (!consents.dataConsent) {
      alert("Please accept the data consent to proceed.");
      return;
    }

    const payload = {
      wardsName: wardsName.trim() || null,
      guardians,
      consents,
      submittedAt: new Date().toISOString(),
    };

    console.log("GUARDIAN FORM →", payload);
    alert("Submitted! Open the console to see the JSON payload.");
  };

  return (
    <main className="bg-white border border-stone-200 rounded-xl shadow-sm p-6">
      <h1 className="text-lg font-semibold mb-1">Guardian / Parent Information</h1>
      <p className="text-sm text-stone-600">
        Provide detailed information for the parent(s)/guardian(s) of the pupil. Fields marked * are required.
      </p>

      <form className="mt-8 space-y-8" onSubmit={onSubmit}>
        {/* Link to Ward (optional) */}
        <section>
          <h2 className="text-sm font-semibold text-stone-800 mb-4">Ward</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Ward’s Full Name (optional)" id="wardsName">
              <input
                id="wardsName"
                value={wardsName}
                onChange={(e) => setWardsName(e.target.value)}
                className={inputCls}
                placeholder="e.g., Ama Asante"
              />
            </Field>
          </div>
        </section>

        {/* Guardians */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-stone-800">Guardians / Parents</h2>
            <button
              type="button"
              onClick={addGuardian}
              className="inline-flex items-center rounded-lg bg-stone-900 text-white px-3 py-1.5 text-xs font-medium hover:bg-stone-800"
            >
              + Add Guardian
            </button>
          </div>

          <div className="space-y-8">
            {guardians.map((g, i) => (
              <div key={i} className="rounded-lg border border-stone-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-stone-800">
                    Guardian {i + 1}
                  </h3>
                  {guardians.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeGuardian(i)}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>

                {/* Basic Identity */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Field label="Relation to Ward *" id={`relation-${i}`}>
                    <select
                      id={`relation-${i}`}
                      value={g.relationToWard}
                      onChange={(e) => onGuardianChange(i, "relationToWard", e.target.value)}
                      className={selectCls}
                    >
                      <option>Mother</option>
                      <option>Father</option>
                      <option>Guardian</option>
                      <option>Other</option>
                    </select>
                  </Field>

                  <Field label="Title" id={`title-${i}`}>
                    <select
                      id={`title-${i}`}
                      value={g.title}
                      onChange={(e) => onGuardianChange(i, "title", e.target.value)}
                      className={selectCls}
                    >
                      <option value="">Select</option>
                      <option>Mr</option>
                      <option>Mrs</option>
                      <option>Ms</option>
                      <option>Dr</option>
                    </select>
                  </Field>

                  <Field label="Marital Status" id={`maritalStatus-${i}`}>
                    <select
                      id={`maritalStatus-${i}`}
                      value={g.maritalStatus}
                      onChange={(e) => onGuardianChange(i, "maritalStatus", e.target.value)}
                      className={selectCls}
                    >
                      <option value="">Select</option>
                      <option>Married</option>
                      <option>Single</option>
                      <option>Separated</option>
                      <option>Divorced</option>
                      <option>Widowed</option>
                    </select>
                  </Field>

                  <Field label="Custody" id={`custody-${i}`}>
                    <select
                      id={`custody-${i}`}
                      value={g.custody}
                      onChange={(e) => onGuardianChange(i, "custody", e.target.value)}
                      className={selectCls}
                    >
                      <option value="">Select</option>
                      <option>Full</option>
                      <option>Joint</option>
                      <option>None</option>
                      <option>Court-ordered</option>
                    </select>
                  </Field>

                  <Field label="Lives with Ward?" id={`livesWithWard-${i}`}>
                    <select
                      id={`livesWithWard-${i}`}
                      value={g.livesWithWard}
                      onChange={(e) => onGuardianChange(i, "livesWithWard", e.target.value)}
                      className={selectCls}
                    >
                      <option value="">Select</option>
                      <option>Yes</option>
                      <option>No</option>
                      <option>Sometimes</option>
                    </select>
                  </Field>

                  <Field label="First Name *" id={`firstName-${i}`}>
                    <input
                      id={`firstName-${i}`}
                      value={g.firstName}
                      onChange={(e) => onGuardianChange(i, "firstName", e.target.value)}
                      className={inputCls}
                      placeholder="e.g., Akosua"
                    />
                  </Field>

                  <Field label="Last Name *" id={`lastName-${i}`}>
                    <input
                      id={`lastName-${i}`}
                      value={g.lastName}
                      onChange={(e) => onGuardianChange(i, "lastName", e.target.value)}
                      className={inputCls}
                      placeholder="e.g., Mensah"
                    />
                  </Field>

                  {/* Contact & Address */}
                  <Field label="Primary Phone *" id={`phonePrimary-${i}`}>
                    <input
                      id={`phonePrimary-${i}`}
                      value={g.phonePrimary}
                      onChange={(e) => onGuardianChange(i, "phonePrimary", e.target.value)}
                      className={inputCls}
                      placeholder="+233 24 000 0000"
                    />
                  </Field>

                  <Field label="Alternate Phone" id={`phoneAlt-${i}`}>
                    <input
                      id={`phoneAlt-${i}`}
                      value={g.phoneAlt}
                      onChange={(e) => onGuardianChange(i, "phoneAlt", e.target.value)}
                      className={inputCls}
                    />
                  </Field>

                  <Field label="Email" id={`email-${i}`}>
                    <input
                      id={`email-${i}`}
                      type="email"
                      value={g.email}
                      onChange={(e) => onGuardianChange(i, "email", e.target.value)}
                      className={inputCls}
                      placeholder="name@email.com"
                    />
                  </Field>

                  <Field label="Home Address" id={`address-${i}`}>
                    <input
                      id={`address-${i}`}
                      value={g.address}
                      onChange={(e) => onGuardianChange(i, "address", e.target.value)}
                      className={inputCls}
                      placeholder="House/Street"
                    />
                  </Field>

                  <Field label="City / Town" id={`city-${i}`}>
                    <input
                      id={`city-${i}`}
                      value={g.city}
                      onChange={(e) => onGuardianChange(i, "city", e.target.value)}
                      className={inputCls}
                      placeholder="e.g., Legon"
                    />
                  </Field>

                  {/* Employment */}
                  <Field label="Occupation" id={`occupation-${i}`}>
                    <input
                      id={`occupation-${i}`}
                      value={g.occupation}
                      onChange={(e) => onGuardianChange(i, "occupation", e.target.value)}
                      className={inputCls}
                      placeholder="e.g., Teacher"
                    />
                  </Field>

                  <Field label="Employer / Company" id={`employer-${i}`}>
                    <input
                      id={`employer-${i}`}
                      value={g.employer}
                      onChange={(e) => onGuardianChange(i, "employer", e.target.value)}
                      className={inputCls}
                    />
                  </Field>

                  <Field label="Work Phone" id={`workPhone-${i}`}>
                    <input
                      id={`workPhone-${i}`}
                      value={g.workPhone}
                      onChange={(e) => onGuardianChange(i, "workPhone", e.target.value)}
                      className={inputCls}
                    />
                  </Field>

                  <Field label="Work Address" id={`workAddress-${i}`}>
                    <input
                      id={`workAddress-${i}`}
                      value={g.workAddress}
                      onChange={(e) => onGuardianChange(i, "workAddress", e.target.value)}
                      className={inputCls}
                    />
                  </Field>

                  <Field label="Availability (Contact/Pickup)" id={`availability-${i}`}>
                    <input
                      id={`availability-${i}`}
                      value={g.availability}
                      onChange={(e) => onGuardianChange(i, "availability", e.target.value)}
                      className={inputCls}
                      placeholder="e.g., Weekdays 8am–5pm"
                    />
                  </Field>

                  {/* Identification */}
                  <Field label="ID Type" id={`idType-${i}`}>
                    <select
                      id={`idType-${i}`}
                      value={g.idType}
                      onChange={(e) => onGuardianChange(i, "idType", e.target.value)}
                      className={selectCls}
                    >
                      <option value="">Select</option>
                      <option>National ID</option>
                      <option>Passport</option>
                      <option>Driver’s License</option>
                      <option>Voter ID</option>
                    </select>
                  </Field>

                  <Field label="ID Number" id={`idNumber-${i}`}>
                    <input
                      id={`idNumber-${i}`}
                      value={g.idNumber}
                      onChange={(e) => onGuardianChange(i, "idNumber", e.target.value)}
                      className={inputCls}
                    />
                  </Field>

                  {/* Emergency & Pickup (per-guardian flags) */}
                  <Field label="Emergency Contact?" id={`isEmergency-${i}`}>
                    <select
                      id={`isEmergency-${i}`}
                      value={g.isEmergencyContact}
                      onChange={(e) => onGuardianChange(i, "isEmergencyContact", e.target.value)}
                      className={selectCls}
                    >
                      <option value="">Select</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </Field>

                  <Field label="Authorized for Pickup?" id={`authorizedPickup-${i}`}>
                    <select
                      id={`authorizedPickup-${i}`}
                      value={g.authorizedForPickup}
                      onChange={(e) => onGuardianChange(i, "authorizedForPickup", e.target.value)}
                      className={selectCls}
                    >
                      <option value="">Select</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </Field>

                  {/* Communication */}
                  <Field label="Preferred Contact Channel" id={`preferredChannel-${i}`}>
                    <select
                      id={`preferredChannel-${i}`}
                      value={g.preferredChannel}
                      onChange={(e) => onGuardianChange(i, "preferredChannel", e.target.value)}
                      className={selectCls}
                    >
                      <option value="">Select</option>
                      <option>SMS</option>
                      <option>Phone Call</option>
                      <option>Email</option>
                      <option>WhatsApp</option>
                    </select>
                  </Field>

                  <Field label="Preferred Language" id={`preferredLanguage-${i}`}>
                    <input
                      id={`preferredLanguage-${i}`}
                      value={g.preferredLanguage}
                      onChange={(e) => onGuardianChange(i, "preferredLanguage", e.target.value)}
                      className={inputCls}
                      placeholder="e.g., English, Twi"
                    />
                  </Field>

                  <Field label="Notes (optional)" id={`notes-${i}`}>
                    <input
                      id={`notes-${i}`}
                      value={g.notes}
                      onChange={(e) => onGuardianChange(i, "notes", e.target.value)}
                      className={inputCls}
                      placeholder="Any special instructions"
                    />
                  </Field>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Consents */}
        <section className="space-y-3">
          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              checked={consents.financialResponsibility}
              onChange={(e) =>
                setConsents((c) => ({ ...c, financialResponsibility: e.target.checked }))
              }
              className="mt-1"
            />
            <span>
              I accept financial responsibility for fees and related school charges for the ward.
            </span>
          </label>

          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              checked={consents.pickupConsent}
              onChange={(e) =>
                setConsents((c) => ({ ...c, pickupConsent: e.target.checked }))
              }
              className="mt-1"
            />
            <span>
              I authorize the listed guardian(s) marked “Authorized for Pickup” to collect the ward from school.
            </span>
          </label>

          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              checked={consents.dataConsent}
              onChange={(e) =>
                setConsents((c) => ({ ...c, dataConsent: e.target.checked }))
              }
              className="mt-1"
            />
            <span>
              I confirm the information provided is true and consent to its use for school administration.*
            </span>
          </label>
        </section>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-stone-900 text-white px-4 py-2 text-sm font-medium hover:bg-stone-800 disabled:opacity-50"
            disabled={!consents.dataConsent}
          >
            Submit Guardian Info
          </button>
        </div>
      </form>
    </main>
  );
}

// funcion(helper)//
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



