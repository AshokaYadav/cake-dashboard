'use client';
import React from 'react';

const WhatsApp = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="flex justify-between items-center bg-green-600 text-white px-4 py-3 rounded">
        <h1 className="text-xl font-bold">WhatsApp</h1>
        <div className="space-x-3">
          <span>🔍</span>
          <span>⋮</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-around bg-white mt-4 rounded shadow">
        <button className="py-2 px-4 text-green-600 font-semibold">Chats</button>
        <button className="py-2 px-4">Status</button>
        <button className="py-2 px-4">Calls</button>
      </div>

      {/* Chats */}
      <div className="mt-4 space-y-4">
        {[1, 2, 3].map((chat) => (
          <div key={chat} className="bg-white p-4 rounded shadow flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full" />
            <div className="flex-1">
              <h2 className="font-semibold">Contact {chat}</h2>
              <p className="text-sm text-gray-600">Last message here...</p>
            </div>
            <span className="text-xs text-gray-500">12:34 PM</span>
          </div>
        ))}
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 bg-green-600 text-white rounded-full w-14 h-14 text-2xl shadow-lg">
        ✉️
      </button>
    </div>
  );
};

export default WhatsApp;
