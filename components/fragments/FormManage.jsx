"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";

const FormManage = ({ onDataSubmitted }) => {
  const [newOption, setNewOption] = useState("");
  const [optionType, setOptionType] = useState("treatment");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (newOption.trim() === "") {
      toast.error("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`/api/manage/${optionType}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newOption }),
      });

      if (response.ok) {
        toast.success(`${optionType} added successfully!`);
        setNewOption("");
        setIsSubmitting(false);
        onDataSubmitted();
      } else {
        const errorData = await response.json();
        toast.error(
          `Failed to add ${optionType}: ${errorData.error || "Unknown error"}`
        );
      }
    } catch (error) {
      toast.error(`Failed to add ${optionType}: ${error.message}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`mb-4 border border-base-300 p-4 rounded-xl shadow-md flex flex-col gap-4 ${
        isSubmitting && "opacity-60"
      }`}
    >
      <p className="label-text">Add Treatment/Medication</p>

      <div className="flex space-x-2">
        <label className="floating-label w-full">
          <span className="label-text">
            New Option <span className="text-error">*</span>
          </span>
          <input
            type="text"
            placeholder="New Option"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </label>
        <select
          value={optionType}
          onChange={(e) => setOptionType(e.target.value)}
          className="select select-bordered"
          required
        >
          <option value="treatment">Treatment</option>
          <option value="medication">Medication</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        {isSubmitting ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : (
          "Add"
        )}
      </button>
    </form>
  );
};

export default FormManage;
