import React from "react";
import FormManage from "./fragments/FormManage";
import ManageTable from "./fragments/ManageTable";

const Manage = () => {
  return (
    <div className="mx-auto flex flex-col gap-5">
      <FormManage />
      <ManageTable />
    </div>
  );
};

export default Manage;
