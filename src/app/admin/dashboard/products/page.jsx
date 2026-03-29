"use client";

import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import {
  FiSearch,
  FiEye,
  FiEdit,
  FiTrash2,
  FiPlus,
  FiX,
} from "react-icons/fi";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  // const hasFetched = useRef(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();

  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);

      const token = localStorage.getItem("adminToken");
      if (!token) {
        toast.error("No admin token found. Please log in.");
        return;
      }

      const res = await fetch("/api/admin/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || "Failed to fetch products");
        return;
      }

      setProducts(data.products);
    } catch (error) {
      toast.error(error.message || "An error occurred while fetching products");
    } finally {
      setLoading(false);
    }
  }

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* Page Title */}
      <h1 className="text-2xl font-bold">
        Product Management
      </h1>

      {/* Top Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div className="relative w-full md:w-96 group">

          {/* Icon */}
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition" />

          {/* Input */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-10 py-2.5 bg-gray-100 rounded-xl outline-none 
               placeholder:text-gray-400 text-sm
               bg-white shadow-sm ring-1 ring-black/10
               transition-all duration-200"
          />

          {/* Clear Button */}
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition"
            >
              ✕
            </button>
          )}

        </div>

        {/* Create Button */}
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          <FiPlus />
          Create Product
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            {/* Header */}
            <thead className="text-gray-900 text-xs uppercase">
              <tr>
                <th className="p-4 text-left font-medium">Image</th>
                <th className="p-4 text-left font-medium">Name</th>
                <th className="p-4 text-left font-medium">Category</th>
                <th className="p-4 text-left font-medium">Price</th>
                <th className="p-4 text-left font-medium">Stock</th>
                <th className="p-4 text-left font-medium">Rating</th>
                <th className="p-4 text-right font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="p-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg" />
                    </td>
                    <td className="p-4">
                      <div className="h-4 bg-gray-100 rounded w-32" />
                    </td>
                    <td className="p-4">
                      <div className="h-4 bg-gray-100 rounded w-24" />
                    </td>
                    <td className="p-4">
                      <div className="h-4 bg-gray-100 rounded w-16" />
                    </td>
                    <td className="p-4">
                      <div className="h-4 bg-gray-100 rounded w-12" />
                    </td>
                    <td className="p-4">
                      <div className="h-4 bg-gray-100 rounded w-16" />
                    </td>
                    <td className="p-4">
                      <div className="h-4 bg-gray-100 rounded w-20 ml-auto" />
                    </td>
                  </tr>
                ))
                : filteredProducts.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-50 transition group"
                  >
                    {/* Image */}
                    <td className="p-4">
                      <img
                        src={product.images?.[0]}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    </td>

                    {/* Name */}
                    <td className="p-4 font-medium text-gray-900">
                      {product.name}
                    </td>

                    {/* Category */}
                    <td className="p-4 text-gray-900">
                      {product.category}
                    </td>

                    {/* Price */}
                    <td className="p-4 text-gray-900">
                      ${product.price}
                    </td>

                    {/* Stock (Badge style) */}
                    <td className="p-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-900">
                        {product.stock}
                      </span>
                    </td>

                    {/* Rating */}
                    <td className="p-4 text-yellow-500">
                      ⭐ {product.ratings}
                    </td>

                    {/* Actions */}
                    <td className="p-4">
                      <div className="flex justify-end gap-1  transition">
                        <button
                          className="p-2 rounded-lg text-black transition"
                          onClick={() => setSelectedProduct(product)}
                        >
                          <FiEye />
                        </button>

                        <button className="p-2 rounded-lg hover:bg-gray-100 text-black transition">
                          <FiEdit />
                        </button>

                        <button className="p-2 rounded-lg text-red-900 transition">
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* Product View Modal */}

      {selectedProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-[500px] rounded-xl shadow-lg p-6 relative">

            <button
              className="absolute right-4 top-4 text-gray-900"
              onClick={() => setSelectedProduct(null)}
            >
              <FiX size={20} />
            </button>

            <h2 className="text-xl font-bold mb-4">
              Product Details
            </h2>

            <img
              src={selectedProduct.images?.[0]}
              className="w-full h-48 object-cover rounded mb-4"
            />

            <div className="space-y-2 text-sm">

              <p>
                <span className="font-semibold">
                  Name:
                </span>{" "}
                {selectedProduct.name}
              </p>

              <p>
                <span className="font-semibold">
                  Brand:
                </span>{" "}
                {selectedProduct.brand}
              </p>

              <p>
                <span className="font-semibold">
                  Category:
                </span>{" "}
                {selectedProduct.category}
              </p>

              <p>
                <span className="font-semibold">
                  Price:
                </span>{" "}
                ${selectedProduct.price}
              </p>

              <p>
                <span className="font-semibold">
                  Discount:
                </span>{" "}
                ${selectedProduct.discountPrice}
              </p>

              <p>
                <span className="font-semibold">
                  Stock:
                </span>{" "}
                {selectedProduct.stock}
              </p>

              <p>
                <span className="font-semibold">
                  Rating:
                </span>{" "}
                ⭐ {selectedProduct.ratings}
              </p>

              <p>
                <span className="font-semibold">
                  Description:
                </span>{" "}
                {selectedProduct.description}
              </p>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}