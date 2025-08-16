"use client";
import React, { useState, useEffect } from "react";

const ManagementPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          "https://216r2ntv-3016.inc1.devtunnels.ms/api/order"
        );
        if (!res.ok) throw new Error("Failed to fetch orders");
        const orders = await res.json();
        setData(orders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);
//herere
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert(`Copied: ${text}`);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-300">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Bakery Shop Management
        </h1>

        {loading ? (
          <p className="text-gray-600">Loading orders...</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-300">
            <table className="min-w-full border-collapse">
              <thead className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white">
                <tr>
                  {[
                    "ID",
                    "Name",
                    "Address",
                    "Price",
                    "Quantity",
                    "Mobile",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-sm font-semibold uppercase border-b border-gray-300"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`transition-colors duration-200 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-pink-50`}
                  >
                    <td className="px-6 py-4 text-sm text-gray-700 border-b border-gray-200">
                      {index+1}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium border-b border-gray-200">
                      {row.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 border-b border-gray-200">
                      {row.address}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 border-b border-gray-200">
                      ₹{row.price}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 border-b border-gray-200">
                      {row.quantity}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 border-b border-gray-200">
                      9876514254
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 flex items-center gap-2 border-b border-gray-200">
                      <button
                        onClick={() => copyToClipboard(row.address)}
                        className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                      >
                        Copy Address
                      </button>
                      <button
                        onClick={() => copyToClipboard(row.id)}
                        className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                      >
                        Copy ID
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagementPage;
