"use client";
import { useState } from "react";
import FormEntry from "./fragments/FormEntry";
import PatientTable from "./fragments/PatientTable";

const Landing = () => {
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const triggerRefetch = () => {
    setRefetchTrigger((prev) => prev + 1);
  };

  return (
    <div className="mx-auto flex flex-col gap-5 md:flex-row">
      <div className="w-full md:w-1/3">
        <FormEntry onDataSubmitted={triggerRefetch} />
      </div>
      <div className="w-full md:w-2/3">
        <PatientTable refetchTrigger={refetchTrigger} />
      </div>
    </div>
  );
};

export default Landing;
