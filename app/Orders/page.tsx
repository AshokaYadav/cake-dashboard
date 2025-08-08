// app/management/page.tsx
"use client";
import React, { useState } from "react";

const ManagementPage = () => {
  const [data] = useState([
    { id: 1, name: "Ashoka", address: "Delhi, India", detail: "Chocolate Cake", quantity: 5, phone: "+91 9876543210" },
    { id: 2, name: "Mantosh", address: "Mumbai, India", detail: "Blueberry Muffins", quantity: 12, phone: "+91 8765432109" },
    { id: 3, name: "Harish", address: "Pune, India", detail: "Cheesecake", quantity: 3, phone: "+91 7654321098" },
    { id: 4, name: "naresh", address: "Jaipur, India", detail: "Butter Croissants", quantity: 20, phone: "+91 6543210987" },
    { id: 5, name: "nitin", address: "Lucknow, India", detail: "Red Velvet Cupcakes", quantity: 15, phone: "+91 5432109876" },
  ]);

  const copyToClipboard = async (phone: string) => {
    try {
      await navigator.clipboard.writeText(phone);
      alert(`Number copied: ${phone}`);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Bakery Shop Management</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Address</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Item</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Phone</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={row.id}
                  className={`hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  <td className="px-6 py-4 text-sm text-gray-700">{row.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 font-medium">{row.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{row.address}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{row.detail}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{row.quantity}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 flex items-center gap-2">
                    {row.phone}
                    <button
                      onClick={() => copyToClipboard(row.phone)}
                      className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                    >
                      Copy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagementPage;
