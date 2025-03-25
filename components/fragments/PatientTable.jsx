"use client";
import React, { useState } from "react";

const PatientTable = ({ data }) => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = Array.isArray(data)
    ? data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleDetailsClick = (patient) => {
    setSelectedPatient(patient);
  };

  const closeModal = () => {
    setSelectedPatient(null);
  };

  return (
    <div className="overflow-x-auto border border-base-300 shadow-md rounded-xl p-2">
      <table className="table w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Treatment Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((patient) => (
            <tr key={patient.patientId}>
              <td>{patient.patientId}</td>
              <td>{patient.patientName}</td>
              <td>{patient.treatmentDate}</td>
              <td>
                <button
                  className="btn btn-sm btn-neutral"
                  onClick={() => handleDetailsClick(patient)}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination  */}
      <div className="flex justify-center mt-4">
        <div className="join">
          <button
            className="join-item btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            «
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`join-item btn ${
                currentPage === page ? "btn-active" : ""
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="join-item btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Patient Details</h2>
            <p>
              <strong>Name:</strong> {selectedPatient.patientName}
            </p>
            <p>
              <strong>ID:</strong> {selectedPatient.patientId}
            </p>
            <p>
              <strong>Treatment Date:</strong> {selectedPatient.treatmentDate}
            </p>
            <p>
              <strong>Treatment Descriptions:</strong>{" "}
              {selectedPatient.treatmentDescriptions.join(", ")}
            </p>
            <p>
              <strong>Medications:</strong>{" "}
              {selectedPatient.medications.join(", ")}
            </p>
            <p>
              <strong>Cost:</strong> ${selectedPatient.cost}
            </p>
            {selectedPatient.otherTreatment && (
              <p>
                <strong>Other Treatment:</strong>{" "}
                {selectedPatient.otherTreatment}
              </p>
            )}
            {selectedPatient.otherMedication && (
              <p>
                <strong>Other Medication:</strong>{" "}
                {selectedPatient.otherMedication}
              </p>
            )}
            <div className="mt-4 flex justify-end">
              <button className="btn btn-sm btn-secondary" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientTable;
