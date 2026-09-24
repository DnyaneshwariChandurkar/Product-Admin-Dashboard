import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../Services/api";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);

        const product = response.data;

        setTitle(product.title);
        setPrice(product.price);
        setCategory(product.category);
        setStock(product.stock);
        setDescription(product.description);
        setImage(product.thumbnail || product.images?.[0] || "");

      } catch (error) {
        setError("Failed to load product");
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");

    try {
      const response = await api.put(`/products/${id}`, {
        title,
        price: Number(price),
        category,
        stock: Number(stock),
        description,
        images: [image],
        thumbnail: image,
      });

      console.log("Updated product:", response.data);

      toast.success("Product updated successfully!");

    } catch (error) {
      console.log(error);

      setError("Failed to update product");
      toast.error("Failed to update product");

    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-10">
        Loading product...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">

        <button
          onClick={() => navigate("/")}
          className="mb-6 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
        >
          ← Back
        </button>

        <div className="bg-white rounded-lg shadow p-6">

          <h1 className="text-2xl font-bold mb-6">
            Edit Product
          </h1>

          <form onSubmit={handleSubmit}>

            <div className="mb-4">
              <label className="block font-medium mb-2">
                Product Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-2">
                Product Image URL
              </label>

              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                required
              />
            </div>

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

            <div className="mb-4">
              <label className="block font-medium mb-2">
                Price
              </label>

              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-2">
                Category
              </label>

              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-2">
                Stock
              </label>

              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-2">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                required
              />
            </div>

            {error && (
              <p className="text-red-500 mb-4">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Updating Product..." : "Update Product"}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}

export default EditProduct;