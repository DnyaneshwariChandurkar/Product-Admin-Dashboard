import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import ProductDetails from "./Components/ProductDetails";
import AddProduct from "./Components/AddProduct";
import EditProduct from "./Components/EditProduct";
import { Toaster } from "react-hot-toast";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return (
      <Login
        onLogin={() => setIsLoggedIn(true)}
      />
    );
  }

  return (
    <BrowserRouter>
    <Toaster position="top-right" />
      <Routes>

        {/* Dashboard */}
        <Route
          path="/"
          element={
            <Dashboard
              onLogout={() => setIsLoggedIn(false)}
            />
          }
        />

        {/* Product Details */}
        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        {/* Add Product */}
        <Route
          path="/products/add"
          element={<AddProduct />}
        />

        {/* Edit Product */}
        <Route
          path="/products/edit/:id"
          element={<EditProduct />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;