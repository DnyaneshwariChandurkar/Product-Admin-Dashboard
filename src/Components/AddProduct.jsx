import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../Services/api";

function AddProduct() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/products/add", {
        title,
        price: Number(price),
        category,
        stock: Number(stock),
        description,
        images: [image],
        thumbnail: image,
      });

      console.log("Product added:", response.data);

      toast.success("Product added successfully!");

      // Clear form
      setTitle("");
      setPrice("");
      setCategory("");
      setStock("");
      setDescription("");
      setImage("");

    } catch (error) {
      console.log(error);

      setError("Failed to add product");

      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-2xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mb-6 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
        >
          ← Back
        </button>

        <div className="bg-white rounded-lg shadow p-6">

          <h1 className="text-2xl font-bold mb-6">
            Add Product
          </h1>

          <form onSubmit={handleSubmit}>

            {/* Product Title */}
            <div className="mb-4">
              <label className="block font-medium mb-2">
                Product Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter product title"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                required
              />
            </div>

            {/* Product Image */}
            <div className="mb-4">
              <label className="block font-medium mb-2">
                Product Image URL
              </label>

              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/product.jpg"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                required
              />
            </div>

            {/* Image Preview */}
            {image && (
              <div className="mb-4">
                <p className="font-medium mb-2">
                  Image Preview
                </p>

                <img
                  src={image}
                  alt="Product Preview"
                  className="w-40 h-40 object-cover rounded-md border"
                />
              </div>
            )}

            {/* Price */}
            <div className="mb-4">
              <label className="block font-medium mb-2">
                Price
              </label>

              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                required
              />
            </div>

            {/* Category */}
            <div className="mb-4">
              <label className="block font-medium mb-2">
                Category
              </label>

              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter category"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                required
              />
            </div>

            {/* Stock */}
            <div className="mb-4">
              <label className="block font-medium mb-2">
                Stock
              </label>

              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="Enter stock"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                required
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block font-medium mb-2">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter product description"
                rows="4"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                required
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 mb-4">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Adding Product..." : "Add Product"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default AddProduct;