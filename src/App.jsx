import { useState } from "react";
import "./styles.css";
import { Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import EmployeeDetails from "./pages/EmployeeDetails";

export default function App() {
  const [role, setRole] = useState("admin"); // "admin" or "hr"

  return (
    <div className="app-root">
      <header className="top-bar">
        <div className="logo">Employee Manager Pro</div>

        <nav className="nav-links">
          <NavLink to="/" className="nav-link">
            Dashboard
          </NavLink>

          <div className="role-toggle">
            <span className="role-label">View as:</span>
            <button
              className={
                "role-btn" + (role === "admin" ? " active" : "")
              }
              onClick={() => setRole("admin")}
            >
              Admin
            </button>
            <button
              className={
                "role-btn" + (role === "hr" ? " active" : "")
              }
              onClick={() => setRole("hr")}
            >
              HR
            </button>
          </div>
        </nav>
      </header>

      <main className="main-layout">
        <section className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard role={role} />} />
            <Route
              path="/employee/:id"
              element={<EmployeeDetails role={role} />}
            />
          </Routes>
        </section>
      </main>
    </div>
  );
}
