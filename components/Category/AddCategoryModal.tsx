// components/AddCategoryModal.tsx
'use client';

import React from 'react';

type Props = {
  newCategoryName: string;
  setNewCategoryName: (val: string) => void;
  onClose: () => void;
  onSubmit: () => void;
};

const AddCategoryModal = ({ newCategoryName, setNewCategoryName, onClose, onSubmit }: Props) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add Category</h2>
        <input
          type="text"
          placeholder="Enter category name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-4"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;
