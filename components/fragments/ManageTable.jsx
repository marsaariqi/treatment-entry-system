"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ManageTable = ({ manageType, refetchTrigger }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/manage/${manageType.toLowerCase()}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOptions(data[manageType.toLowerCase()]);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [manageType, refetchTrigger]);

  const onDeleteOption = async (optionId) => {
    if (confirm("Are you sure you want to delete this option?")) {
      try {
        const response = await fetch(
          `/api/manage/${manageType.toLowerCase()}/${optionId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          toast.success(`${manageType} deleted successfully!`);
          setOptions(options.filter((option) => option._id !== optionId));
        } else {
          const errorData = await response.json();
          toast.error(
            `Failed to delete ${manageType}: ${
              errorData.error || "Unknown error"
            }`
          );
        }
      } catch (error) {
        toast.error(`Failed to delete ${manageType}: ${error.message}`);
      }
    }
  };

  if (loading) {
    return (
      <div className="h-60 w-full border border-base-300 shadow-md rounded-xl p-2 flex justify-center items-center">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full border border-base-300 p-4 rounded-xl shadow-md">
      <h1 className="text-xl text-center font-semibold">{manageType}</h1>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Option</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(options) &&
            options.map((option) => (
              <tr key={option._id}>
                <td>{option.name}</td>
                <td className="text-right">
                  <button
                    onClick={() => onDeleteOption(option._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageTable;
