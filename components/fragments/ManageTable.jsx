import React from "react";

const ManageTable = ({ options, onDeleteOption }) => {
  return (
    <div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Option</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(options) &&
            options.map((option) => (
              <tr key={option.id}>
                <td>{option.name}</td>
                <td>
                  <button
                    onClick={() => onDeleteOption(option.id)}
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
