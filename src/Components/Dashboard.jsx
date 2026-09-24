function Dashboard({ onLogout }) {
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

      {/* Dashboard Content */}
      <main className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Dashboard
        </h2>

        <p className="text-gray-600">
          Welcome to the Product Admin Dashboard.
        </p>
      </main>

    </div>
  );
}

export default Dashboard;