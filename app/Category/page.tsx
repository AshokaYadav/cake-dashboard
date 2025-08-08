"use client";

import React, { useEffect, useState } from "react";
import { BiCross, BiTrash } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { FaCross } from "react-icons/fa6";

type SubCategory = {
  name: string;
  id: string;
};

type Category = {
  name: string;
  id: string;
  SubCategories: SubCategory[];
};

const ShowCategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const [showAddSubCategoryModal, setShowAddSubCategoryModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [subCategoryName, setSubCategoryName] = useState("");

  const API_URL = "https://216r2ntv-3016.inc1.devtunnels.ms/api";

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/category`);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add Category
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;

    try {
      const res = await fetch(`${API_URL}/category`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategoryName }),
      });

      if (res.ok) {
        setShowAddCategoryModal(false);
        setNewCategoryName("");
        fetchCategories();
      } else {
        console.error("Failed to add category");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // Delete Category
  const handleDeleteCategory = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/category/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchCategories();
      } else {
        console.error("Failed to delete category");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // Add SubCategory
  const handleAddSubCategory = async () => {
    if (!selectedCategoryId || !subCategoryName.trim()) return;

    try {
      const res = await fetch(`${API_URL}/subcategory`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category_id: selectedCategoryId,
          name: subCategoryName,
        }),
      });

      if (res.ok) {
        setShowAddSubCategoryModal(false);
        setSubCategoryName("");
        setSelectedCategoryId(null);
        fetchCategories();
      } else {
        console.error("Failed to add subcategory");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // Delete SubCategory
  const handleDeleteSubCategory = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/subcategory/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchCategories();
      } else {
        console.error("Failed to delete subcategory");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  if (loading) return <p className="p-6 text-center text-lg">Loading...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Add Category Button */}
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setShowAddCategoryModal(true)}
        >
          + Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                {category.name}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  onClick={() => {
                    setSelectedCategoryId(category.id);
                    setShowAddSubCategoryModal(true);
                  }}
                >
                  + Add
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <BiTrash size={18} />
                </button>
              </div>
            </div>
            <ul className="flex flex-wrap gap-2">
              {category.SubCategories.map((sub) => (
                <li
                  key={sub.id}
                  className="relative bg-purple-100 text-purple-700 pl-4 pr-6 py-2 rounded text-sm shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <span>{sub.name}</span>

                  <button
                    onClick={() => handleDeleteSubCategory(sub.id)}
                    className="absolute top-1 right-1 border-2 rounded-full text-red-900 hover:text-red-700"
                  >
                    <FaTimes size={12} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Modal: Add Category */}
      {showAddCategoryModal && (
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
                onClick={() => {
                  setShowAddCategoryModal(false);
                  setNewCategoryName("");
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add SubCategory */}
      {showAddSubCategoryModal && (
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
                onClick={() => {
                  setShowAddSubCategoryModal(false);
                  setSubCategoryName("");
                  setSelectedCategoryId(null);
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSubCategory}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowCategoriesPage;
