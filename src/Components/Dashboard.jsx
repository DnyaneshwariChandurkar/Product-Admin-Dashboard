import { useNavigate } from "react-router-dom";
import ProductList from "./ProductList";

function Dashboard({ onLogout }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">

        <h1 className="text-xl font-bold text-gray-800">
          Product Admin Dashboard
        </h1>

        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>

      </header>

      {/* Main Content */}
      <main className="p-6">

        {/* Products Heading + Add Button */}
        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold text-gray-800">
            Products
          </h2>

          <button
            onClick={() => navigate("/products/add")}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            + Add Product
          </button>

        </div>

        {/* Product List */}
        <ProductList />

      </main>

    </div>
  );
}

export default Dashboard;