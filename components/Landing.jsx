import React from "react";
import FormEntry from "./fragments/FormEntry";
import PatientTable from "./fragments/PatientTable";

const Landing = () => {
  const patientData = [
    {
      patientName: "John Doe",
      patientId: "JD123",
      treatmentDate: "2023-11-01",
      treatmentDescriptions: ["Physical Examination", "Blood Test"],
      medications: ["Ibuprofen", "Amoxicillin"],
      cost: 150.0,
      otherTreatment: "",
      otherMedication: "",
    },
    {
      patientName: "Jane Smith",
      patientId: "JS456",
      treatmentDate: "2023-11-05",
      treatmentDescriptions: ["Wound Dressing", "Sutures"],
      medications: ["Acetaminophen"],
      cost: 200.5,
      otherTreatment: "",
      otherMedication: "",
    },
    {
      patientName: "Alice Wonderland",
      patientId: "AW789",
      treatmentDate: "2023-11-10",
      treatmentDescriptions: ["Chemotherapy"],
      medications: ["Metformin", "Sertraline"],
      cost: 1000,
      otherTreatment: "Other Treatment Example",
      otherMedication: "Other Medication Example",
    },
  ];

  return (
    <div className="mx-auto flex flex-col gap-5 md:flex-row">
      <div className="grow">
        <FormEntry />
      </div>
      <PatientTable data={patientData} />
    </div>
  );
};

export default Landing;
