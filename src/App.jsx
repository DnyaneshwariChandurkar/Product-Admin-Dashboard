import { useState } from "react";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";

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
    <Dashboard
      onLogout={() => setIsLoggedIn(false)}
    />
  );
}

export default App;