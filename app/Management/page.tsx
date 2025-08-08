"use client";
import React, { useState } from "react";

const ManagementPage = () => {
  const [names, setNames] = useState([
    "Cake-Slider",
    "Cake-Offers",
    "Cake-type1",
    "Cake-type2",
    "Cake-type3",
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleOpenModal = (index: number) => {
    setSelectedIndex(index);
    setNewName(names[index]);
    setShowModal(true);
  };

  const handleSave = () => {
    if (selectedIndex !== null) {
      const updatedNames = [...names];
      updatedNames[selectedIndex] = newName;
      setNames(updatedNames);
    }
    setShowModal(false);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Management Page</h1>

      {/* Table */}
      <table className="w-full bg-white rounded-lg shadow">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {names.map((name, index) => (
            <tr key={index} className="border-b">
              <td className="p-3">{name}</td>
              <td className="p-3 text-right">
                <button
                  onClick={() => handleOpenModal(index)}
                  className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Edit Name</h2>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border p-2 w-full mb-4 rounded"
              placeholder="Enter new name"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagementPage;
