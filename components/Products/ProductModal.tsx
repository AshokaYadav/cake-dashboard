'use client';

import React, { ChangeEvent } from 'react';
import { FaTimes, FaUpload } from 'react-icons/fa';
import { Category, SubCategory } from '@/Types/Product';
import { Product } from '@/Types/Product';

interface ProductModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  formData: {
    name: string;
    description: string;
    price: string;
    location: string;
    category_id: string;
    subcategory_id: string;
  };
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  categories: Category[];
  subcategories: SubCategory[];
  imagePreviews: (string | null)[];
  triggerFileInput: (index: number) => void;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
  removeImage: (index: number) => void;
  fileInputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
  selectedProduct: Product | null;
}

const ProductModal: React.FC<ProductModalProps> = ({
  show,
  onClose,
  onSubmit,
  formData,
  onInputChange,
  categories,
  subcategories,
  imagePreviews,
  triggerFileInput,
  handleImageChange,
  removeImage,
  fileInputRefs,
  selectedProduct,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {selectedProduct ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>

        <form onSubmit={onSubmit}>
          {/* Name & Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={onInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={onInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={onInputChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Location, Category & Subcategory */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <select
                name="location"
                value={formData.location}
                onChange={onInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="SLIDER">Slider</option>
                <option value="FEATURED">Featured</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={onInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
              <select
                name="subcategory_id"
                value={formData.subcategory_id}
                onChange={onInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                disabled={!formData.category_id}
              >
                <option value="">Select a subcategory</option>
                {subcategories.map((subcategory) => (
                  <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images (Max 4)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[0, 1, 2, 3].map((index) => (
                <div key={index} className="relative">
                  <input
                    type="file"
                    ref={(el) => {
                      fileInputRefs.current[index] = el;
                    }}
                    onChange={(e) => handleImageChange(e, index)}
                    accept="image/*"
                    className="hidden"
                  />
                  <div
                    onClick={() => triggerFileInput(index)}
                    className={`h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer ${
                      imagePreviews[index] ? 'border-transparent' : 'border-gray-300'
                    }`}
                  >
                    {imagePreviews[index] ? (
                      <>
                        <img
                          src={imagePreviews[index]!}
                          alt={`Preview ${index + 1}`}
                          className="h-full w-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(index);
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <FaTimes size={12} />
                        </button>
                      </>
                    ) : (
                      <>
                        <FaUpload className="text-gray-400 mb-1" />
                        <span className="text-xs text-gray-500">Image {index + 1}</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              {selectedProduct ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
