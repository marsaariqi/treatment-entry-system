"use client";
import React, { useEffect, useState } from "react";

const PatientTable = ({ refetchTrigger }) => {
  const [patientData, setPatientData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/patient");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPatientData(data.patients);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refetchTrigger]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };
  const formatIDRCurrency = (amount) => {
    const formatted = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
    return formatted.replace("Rp", "").trim();
  };

  const totalPages = Math.ceil(patientData.length / itemsPerPage);
  const paginatedData = patientData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDetailsClick = (patient) => {
    setSelectedPatient(patient);
  };

  const closeModal = () => {
    setSelectedPatient(null);
  };

  if (loading) {
    return (
      <div className="h-60 border border-base-300 shadow-md rounded-xl p-2 flex justify-center items-center">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  if (error)
    return (
      <div className="h-60 text-error text-2xl border border-base-300 shadow-md rounded-xl p-2 flex justify-center items-center">
        Error: {error.message}
      </div>
    );

  if (patientData.length === 0) {
    return (
      <div className="h-60 border border-base-300 shadow-md rounded-xl p-2 flex justify-center items-center">
        <p className="text-xl">No patient data available.</p>
      </div>
    );
  }

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
              <td>{formatDate(patient.treatmentDate)}</td>
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
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-40">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-xl font-semibold mb-4">Patient Details</h2>
            <p>
              <strong>Name:</strong> {selectedPatient.patientName}
            </p>
            <p>
              <strong>ID:</strong> {selectedPatient.patientId}
            </p>
            <p>
              <strong>Treatment Date:</strong>{" "}
              {formatDate(selectedPatient.treatmentDate)}
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
              <strong>Cost:</strong> IDR{" "}
              {formatIDRCurrency(selectedPatient.cost)}
            </p>
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
