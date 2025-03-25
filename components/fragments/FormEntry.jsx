"use client";
import React, { useEffect, useRef, useState } from "react";

const FormEntry = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    patientId: "",
    treatmentDate: "",
    treatmentDescriptions: [],
    medications: [],
    cost: 0,
    otherTreatment: "",
    otherMedication: "",
  });
  const [treatmentDropdownOpen, setTreatmentDropdownOpen] = useState(false);
  const [medicationDropdownOpen, setMedicationDropdownOpen] = useState(false);
  const treatmentDropdownRef = useRef(null);
  const medicationDropdownRef = useRef(null);

  const treatmentOptions = [
    "Physical Examination",
    "Blood Test",
    "Urine Analysis",
    "Vital Signs Check",
    "X-Ray",
  ];

  const medicationOptions = [
    "Ibuprofen",
    "Acetaminophen",
    "Naproxen",
    "Oxycodone",
    "Amoxicillin",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => {
      if (type === "checkbox") {
        const currentValues = prevFormData[name] || [];
        if (checked) {
          return { ...prevFormData, [name]: [...currentValues, value] };
        } else {
          return {
            ...prevFormData,
            [name]: currentValues.filter((v) => v !== value),
          };
        }
      } else {
        return { ...prevFormData, [name]: value };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalFormData = {
      ...formData,
      treatmentDescriptions: [
        ...formData.treatmentDescriptions,
        formData.otherTreatment,
      ].filter((item) => item),
      medications: [...formData.medications, formData.otherMedication].filter(
        (item) => item
      ),
    };
    console.log(finalFormData);
  };

  const toggleTreatmentDropdown = () => {
    setTreatmentDropdownOpen(!treatmentDropdownOpen);
  };

  const toggleMedicationDropdown = () => {
    setMedicationDropdownOpen(!medicationDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        treatmentDropdownOpen &&
        treatmentDropdownRef.current &&
        !treatmentDropdownRef.current.contains(event.target)
      ) {
        setTreatmentDropdownOpen(false);
      }
      if (
        medicationDropdownOpen &&
        medicationDropdownRef.current &&
        !medicationDropdownRef.current.contains(event.target)
      ) {
        setMedicationDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [treatmentDropdownOpen, medicationDropdownOpen]);

  return (
    <div className="p-8 border border-base-300 rounded-xl shadow-md bg-white">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Patient Name:</span>
          </label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Patient ID:</span>
          </label>
          <input
            type="text"
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Date of Treatment:</span>
          </label>
          <input
            type="date"
            name="treatmentDate"
            value={formData.treatmentDate}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>
        {/* Treatment */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Treatment Description:</span>
          </label>
          <div className="relative w-full" ref={treatmentDropdownRef}>
            <button
              type="button"
              className="input input-bordered w-full text-left truncate"
              onClick={toggleTreatmentDropdown}
            >
              {formData.treatmentDescriptions.length > 0
                ? formData.treatmentDescriptions.join(", ")
                : "Select Treatments"}
            </button>
            {treatmentDropdownOpen && (
              <ul className="absolute z-10 mt-1 w-full bg-base-100 rounded-box shadow">
                {treatmentOptions.map((option) => (
                  <li key={option} className="p-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="treatmentDescriptions"
                        value={option}
                        checked={formData.treatmentDescriptions.includes(
                          option
                        )}
                        onChange={handleChange}
                        className="checkbox"
                      />
                      <span className="ml-2">{option}</span>
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {formData.treatmentDescriptions.includes("Other") && (
            <input
              type="text"
              placeholder="Other Treatment"
              name="otherTreatment"
              value={formData.otherTreatment}
              onChange={handleChange}
              className="input input-bordered w-full mt-2"
            />
          )}
        </div>
        {/* Medications */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Medications Prescribed:</span>
          </label>
          <div className="relative w-full" ref={medicationDropdownRef}>
            <button
              type="button"
              className="input input-bordered w-full text-left truncate"
              onClick={toggleMedicationDropdown}
            >
              {formData.medications.length > 0
                ? formData.medications.join(", ")
                : "Select Medications"}
            </button>
            {medicationDropdownOpen && (
              <ul className="absolute z-10 mt-1 w-full bg-base-100 rounded-box shadow">
                {medicationOptions.map((option) => (
                  <li key={option} className="p-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="medications"
                        value={option}
                        checked={formData.medications.includes(option)}
                        onChange={handleChange}
                        className="checkbox"
                      />
                      <span className="ml-2">{option}</span>
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {formData.medications.includes("Other") && (
            <input
              type="text"
              placeholder="Other Medication"
              name="otherMedication"
              value={formData.otherMedication}
              onChange={handleChange}
              className="input input-bordered w-full mt-2"
            />
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Cost of Treatment:</span>
          </label>
          <input
            type="number"
            step="0.01"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Submit
        </button>
      </form>
    </div>
  );
};
export default FormEntry;
