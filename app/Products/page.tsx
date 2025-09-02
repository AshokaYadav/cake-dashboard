"use client";

import React, { useEffect, useState, useRef, ChangeEvent } from "react";
import { FaEdit, FaTrash, FaPlus, FaTimes, FaUpload } from "react-icons/fa";

import { SubCategory } from "@/Types/Product";
import { Category } from "@/Types/Product";
import { Product } from "@/Types/Product";
import ProductModal from "@/components/Products/ProductModal";
import ProductsTable from "@/components/Products/ProductsTable";

const ProductsPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [imagePreviews, setImagePreviews] = useState<(string | null)[]>(
    Array(4).fill(null)
  );
  const fileInputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [imageFiles, setImageFiles] = useState<(File | null)[]>(
    Array(4).fill(null)
  );
  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);

  const API_URL = "https://backend.fillerbay.in/api";
  const img_url = "https://backend.fillerbay.in";

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    location: "SLIDER",
    category_id: "",
    subcategory_id: "",
  });

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/category`);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
    fileInputRefs.current = Array(4).fill(null);
  }, []);

  useEffect(() => {
    if (formData.category_id) {
      const selectedCategory = categories.find(
        (cat) => cat.id === formData.category_id
      );
      if (selectedCategory) {
        setSubcategories(selectedCategory.SubCategories);
        // Only reset subcategory if we're not editing an existing product
        if (!selectedProduct) {
          setFormData((prev) => ({ ...prev, subcategory_id: "" }));
        }
      }
    } else {
      setSubcategories([]);
    }
  }, [formData.category_id, categories]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/product`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newImageFiles = [...imageFiles];
      newImageFiles[index] = file;
      setImageFiles(newImageFiles);

      const reader = new FileReader();
      reader.onload = () => {
        const newPreviews = [...imagePreviews];
        newPreviews[index] = reader.result as string;
        setImagePreviews(newPreviews);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = (index: number) => {
    fileInputRefs.current[index]?.click();
  };

  const removeImage = (index: number) => {
    const newImageFiles = [...imageFiles];
    newImageFiles[index] = null;
    setImageFiles(newImageFiles);

    const newPreviews = [...imagePreviews];
    newPreviews[index] = null;
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate subcategory selection
    if (!formData.subcategory_id) {
      alert("Please select a subcategory");
      return;
    }

    try {
      const formDataToSend = new FormData();

      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("category_id", formData.category_id);
      formDataToSend.append("subcategory_id", formData.subcategory_id);

      imageFiles.forEach((file, index) => {
        if (file) {
          formDataToSend.append(`image${index + 1}`, file);
        }
      });

      const url = selectedProduct
        ? `${API_URL}/product/${selectedProduct.id}`
        : `${API_URL}/product`;

      const method = selectedProduct ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: formDataToSend,
      });

      if (res.ok) {
        setShowModal(false);
        setSelectedProduct(null);
        setFormData({
          name: "",
          description: "",
          price: "",
          location: "SLIDER",
          category_id: "",
          subcategory_id: "",
        });
        setImageFiles(Array(4).fill(null));
        setImagePreviews(Array(4).fill(null));
        fetchProducts();
      } else {
        const errorData = await res.json();
        console.error("Error data:", errorData);
        alert("Operation failed: " + (errorData.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred while processing your request");
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);

    // First find the category to get subcategories
    const selectedCategory = categories.find(
      (cat) => cat.id === product.category_id
    );
    const subcats = selectedCategory ? selectedCategory.SubCategories : [];

    // Then set all form data including the subcategory
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      location: product.location,
      category_id: product.category_id,
      subcategory_id: product.subcategory_id,
    });

    setSubcategories(subcats);

    const previews = [
      product.image1 ? `${img_url}/${product.image1}` : null,
      product.image2 ? `${img_url}/${product.image2}` : null,
      product.image3 ? `${img_url}/${product.image3}` : null,
      product.image4 ? `${img_url}/${product.image4}` : null,
    ];
    setImagePreviews(previews);
    setImageFiles(Array(4).fill(null));
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await fetch(`${API_URL}/product/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          fetchProducts();
        } else {
          alert("Failed to delete product");
        }
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
        <button
          onClick={() => {
            setSelectedProduct(null);
            setShowModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaPlus /> Add Product
        </button>
      </div>

      <ProductsTable
        products={products}
        img_url={img_url}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      <ProductModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedProduct(null);
        }}
        onSubmit={handleSubmit}
        formData={formData}
        onInputChange={handleInputChange}
        categories={categories}
        subcategories={subcategories}
        imagePreviews={imagePreviews}
        triggerFileInput={triggerFileInput}
        handleImageChange={handleImageChange}
        removeImage={removeImage}
        fileInputRefs={fileInputRefs}
        selectedProduct={selectedProduct}
      />
    </div>
  );
};

export default ProductsPage;
