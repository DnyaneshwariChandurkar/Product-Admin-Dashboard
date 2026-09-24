import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../Services/api";

function ProductList() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Sorting
  const [sortBy, setSortBy] = useState("");

  const productsPerPage = 10;
  const totalPages = Math.ceil(
    totalProducts / productsPerPage
  );

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get(
          "/products/categories"
        );

        setCategories(response.data);
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed to load categories"
        );
      }
    };

    fetchCategories();
  }, []);

  // Fetch Products
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 500);

    return () => clearTimeout(timer);
  }, [
    currentPage,
    search,
    category,
    minPrice,
    maxPrice,
    sortBy,
  ]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const skip =
        (currentPage - 1) * productsPerPage;

      let url;

      // Search
      if (search.trim() !== "") {
        url = `/products/search?q=${search}&limit=0`;
      }

      // Category
      else if (category !== "") {
        url = `/products/category/${category}?limit=0`;
      }

      // All Products
      else {
        url = `/products?limit=0`;
      }

      const response = await api.get(url);

      let filteredProducts =
        response.data.products;

      // Minimum Price
      if (minPrice !== "") {
        filteredProducts =
          filteredProducts.filter(
            (product) =>
              product.price >=
              Number(minPrice)
          );
      }

      // Maximum Price
      if (maxPrice !== "") {
        filteredProducts =
          filteredProducts.filter(
            (product) =>
              product.price <=
              Number(maxPrice)
          );
      }

      // Sorting
      if (sortBy === "price-asc") {
        filteredProducts.sort(
          (a, b) => a.price - b.price
        );
      }

      if (sortBy === "price-desc") {
        filteredProducts.sort(
          (a, b) => b.price - a.price
        );
      }

      if (sortBy === "rating-desc") {
        filteredProducts.sort(
          (a, b) => b.rating - a.rating
        );
      }

      if (sortBy === "rating-asc") {
        filteredProducts.sort(
          (a, b) => a.rating - b.rating
        );
      }

      setTotalProducts(
        filteredProducts.length
      );

      // Pagination
      const paginatedProducts =
        filteredProducts.slice(
          skip,
          skip + productsPerPage
        );

      setProducts(paginatedProducts);

    } catch (error) {
      console.log(error);

      setError(
        "Failed to load products"
      );

      toast.error(
        "Failed to load products"
      );

    } finally {
      setLoading(false);
    }
  };

  // Delete Product
  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this product?"
      );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(
        `/products/${id}`
      );

      setProducts((prevProducts) =>
        prevProducts.filter(
          (product) =>
            product.id !== id
        )
      );

      setTotalProducts((prevTotal) =>
        Math.max(
          prevTotal - 1,
          0
        )
      );

      toast.success(
        "Product deleted successfully!"
      );

    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to delete product"
      );
    }
  };

  // Search
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCategory("");
    setCurrentPage(1);
  };

  // Category
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSearch("");
    setCurrentPage(1);
  };

  // Minimum Price
  const handleMinPrice = (e) => {
    setMinPrice(e.target.value);
    setCurrentPage(1);
  };

  // Maximum Price
  const handleMaxPrice = (e) => {
    setMaxPrice(e.target.value);
    setCurrentPage(1);
  };

  // Sorting
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  // Clear Filters
  const handleClearFilters = () => {
    setSearch("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("");

    setCurrentPage(1);
  };

  return (
    <div>

      {/* Filters */}
      <div className="mb-6 flex flex-col lg:flex-row gap-4">

        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search products..."
          className="w-full lg:w-72 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Category */}
        <select
          value={category}
          onChange={handleCategoryChange}
          className="w-full lg:w-56 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">
            All Categories
          </option>

          {categories.map((item) => (
            <option
              key={item.slug}
              value={item.slug}
            >
              {item.name}
            </option>
          ))}
        </select>

        {/* Min Price */}
        <input
          type="number"
          value={minPrice}
          onChange={handleMinPrice}
          placeholder="Min Price"
          className="w-full lg:w-36 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Max Price */}
        <input
          type="number"
          value={maxPrice}
          onChange={handleMaxPrice}
          placeholder="Max Price"
          className="w-full lg:w-36 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Sort */}
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="w-full lg:w-52 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">
            Sort By
          </option>

          <option value="price-asc">
            Price: Low → High
          </option>

          <option value="price-desc">
            Price: High → Low
          </option>

          <option value="rating-desc">
            Rating: High → Low
          </option>

          <option value="rating-asc">
            Rating: Low → High
          </option>
        </select>

        {/* Clear */}
        <button
          onClick={handleClearFilters}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Clear
        </button>

      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center mt-10">
          Loading products...
        </p>
      )}

      {/* Error */}
      {error && (
        <p className="text-center mt-10 text-red-500">
          {error}
        </p>
      )}

      {/* Product List */}
      {!loading && !error && (
        <>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {products.map((product) => (

              <div
                key={product.id}
                className="bg-white rounded-lg shadow p-4"
              >

                {/* Image */}
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-md"
                />

                {/* Title */}
                <h3 className="text-lg font-bold mt-3">
                  {product.title}
                </h3>

                {/* Category */}
                <p className="text-gray-500">
                  Category: {product.category}
                </p>

                {/* Price */}
                <p className="font-semibold mt-2">
                  Price: ${product.price}
                </p>

                {/* Rating */}
                <p>
                  Rating: ⭐ {product.rating}
                </p>

                {/* Stock */}
                <p>
                  Stock: {product.stock}
                </p>

                {/* View Details */}
                <button
                  onClick={() =>
                    navigate(
                      `/products/${product.id}`
                    )
                  }
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                >
                  View Details
                </button>

                {/* Edit + Delete */}
                <div className="flex gap-2 mt-2">

                  {/* Edit */}
                  <button
                    onClick={() =>
                      navigate(
                        `/products/edit/${product.id}`
                      )
                    }
                    className="w-1/2 bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() =>
                      handleDelete(product.id)
                    }
                    className="w-1/2 bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

          {/* No Products */}
          {products.length === 0 && (
            <p className="text-center mt-8 text-gray-500">
              No products found.
            </p>
          )}

          {/* Pagination */}
          {totalProducts > 0 && (
            <div className="flex justify-center items-center gap-2 mt-8">

              <button
                onClick={() =>
                  setCurrentPage(
                    currentPage - 1
                  )
                }
                disabled={
                  currentPage === 1
                }
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Previous
              </button>

              <span className="px-4 py-2 font-semibold">
                Page {currentPage} of{" "}
                {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage(
                    currentPage + 1
                  )
                }
                disabled={
                  currentPage === totalPages
                }
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>

            </div>
          )}

        </>
      )}

    </div>
  );
}

export default ProductList;