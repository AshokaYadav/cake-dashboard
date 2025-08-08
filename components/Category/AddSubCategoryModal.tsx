// components/AddSubCategoryModal.tsx
'use client';

import React from 'react';

type Props = {
  subCategoryName: string;
  setSubCategoryName: (val: string) => void;
  onClose: () => void;
  onSubmit: () => void;
};

const AddSubCategoryModal = ({ subCategoryName, setSubCategoryName, onClose, onSubmit }: Props) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add SubCategory</h2>
        <input
          type="text"
          placeholder="Enter subcategory name"
          value={subCategoryName}
          onChange={(e) => setSubCategoryName(e.target.value)}
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

export default AddSubCategoryModal;
