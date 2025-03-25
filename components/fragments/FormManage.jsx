"use client";
import React, { useState } from "react";

const FormManage = ({ onAddTreatment, onAddMedication }) => {
  const [newOption, setNewOption] = useState("");
  const [optionType, setOptionType] = useState("treatment");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newOption.trim() === "") return;

    if (optionType === "treatment") {
      onAddTreatment({ id: Date.now(), name: newOption });
    } else {
      onAddMedication({ id: Date.now(), name: newOption });
    }

    setNewOption("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="New Option"
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          className="input input-bordered flex-grow"
        />
        <select
          value={optionType}
          onChange={(e) => setOptionType(e.target.value)}
          className="select select-bordered"
        >
          <option value="treatment">Treatment</option>
          <option value="medication">Medication</option>
        </select>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </div>
    </form>
  );
};

export default FormManage;
