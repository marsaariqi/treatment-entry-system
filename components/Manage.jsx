"use client";
import React, { useState } from "react";
import FormManage from "./fragments/FormManage";
import ManageTable from "./fragments/ManageTable";

const Manage = () => {
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const triggerRefetch = () => {
    setRefetchTrigger((prev) => prev + 1);
  };
  return (
    <div className="mx-auto flex flex-col gap-5 ">
      <FormManage onDataSubmitted={triggerRefetch} />
      <div className="flex flex-col gap-5 md:flex-row justify-center items-start w-full">
        <ManageTable manageType="Treatments" refetchTrigger={refetchTrigger} />
        <ManageTable manageType="Medications" refetchTrigger={refetchTrigger} />
      </div>
    </div>
  );
};

export default Manage;
