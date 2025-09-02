"use client";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Product } from "@/Types/Product";

type Props = {
  products: Product[];
  img_url: string;
  handleEdit: (product: Product) => void;
  handleDelete: (id: string) => void;
};

const headersList = ["slider", "offer", "first", "second", "third"];

const ProductsTable: React.FC<Props> = ({
  products,
  img_url,
  handleEdit,
  handleDelete,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPositions, setSelectedPositions] = useState<Record<string, string>>({});
  const [selectedId, setSelectedId] = useState<string>("");

  const handleCheckboxChange = (header: string, index: number, checked: boolean) => {
    const key = index === 0 ? "location" : `location${index + 1}`;
    setSelectedPositions((prev) => {
      const updated = { ...prev };
      if (checked) {
        updated[key] = header;
      } else {
        delete updated[key];
      }
      return updated;
    });
  };

  useEffect(() => {
    console.log("Current Selected Positions:", selectedPositions);
  }, [selectedPositions]);

  const handleSubmit = async (id: string) => {
    const payload = { ...selectedPositions };
    console.log("Final Payload:", payload);

    try {
      const res = await fetch(
        `https://backend.fillerbay.in/api/product/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        alert("Position updated successfully!");
        setShowPopup(false);
        setSelectedPositions({});
      } else {
        const errData = await res.json();
        alert("Failed: " + (errData.message || "Unknown error"));
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
            <tr>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Location</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-1">
                    {[product.image1, product.image2, product.image3, product.image4]
                      .map(
                        (img, idx) =>
                          img && (
                            <img
                              key={idx}
                              src={`${img_url}/${img}`}
                              alt={product.name}
                              className="h-12 w-12 rounded-md object-cover"
                            />
                          )
                      )}
                  </div>
                </td>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500 w-64 max-h-24 overflow-y-auto whitespace-pre-line">
                  {product.description}
                </td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      setShowPopup(true);
                      setSelectedId(product.id);
                    }}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    {product.location}
                  </button>
                </td>
                <td className="px-6 py-4 flex gap-3">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[500px] shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Select Positions</h2>
            <table className="w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  {headersList.map((header) => (
                    <th key={header} className="border p-2 text-center">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {headersList.map((header, index) => (
                    <td key={header} className="border p-2 text-center">
                      <input
                        type="checkbox"
                        checked={Object.values(selectedPositions).includes(header)}
                        onChange={(e) => handleCheckboxChange(header, index, e.target.checked)}
                      />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
            <div className="flex justify-end mt-4 gap-3">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSubmit(selectedId)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsTable;
