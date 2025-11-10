import { Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import EmployeeDetails from "./pages/EmployeeDetails";

export default function App() {
  return (
    <div className="app-root">
      <header className="top-bar">
        <div className="logo">Employee Manager Pro</div>
        <nav className="nav-links">
          <NavLink to="/" className="nav-link">
            Dashboard
          </NavLink>
        </nav>
      </header>

      <main className="main-layout">
        <section className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employee/:id" element={<EmployeeDetails />} />
          </Routes>
        </section>
      </main>
    </div>
  );
}
