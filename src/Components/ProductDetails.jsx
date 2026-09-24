import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../Services/api";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const response = await api.get(`/products/${id}`);

        setProduct(response.data);
      } catch (error) {
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <p className="text-center mt-10">
        Loading product details...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-red-500">
        {error}
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
      >
        ← Back
      </button>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Product Image */}
          <div>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-80 object-cover rounded-lg"
            />
          </div>

          {/* Product Information */}
          <div>

            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {product.title}
            </h1>

            <p className="text-gray-600 mb-3">
              {product.description}
            </p>

            <p className="mb-2">
              <strong>Category:</strong> {product.category}
            </p>

            <p className="mb-2">
              <strong>Brand:</strong> {product.brand || "N/A"}
            </p>

            <p className="text-xl font-bold mb-2">
              Price: ${product.price}
            </p>

            <p className="mb-2">
              <strong>Rating:</strong> ⭐ {product.rating}
            </p>

            <p className="mb-2">
              <strong>Stock:</strong> {product.stock}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;