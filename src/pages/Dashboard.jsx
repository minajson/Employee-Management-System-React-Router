import EmployeeList from "../components/EmployeeList";
import employees from "../data/employees.json";

export default function Dashboard({ role }) {
  return (
    <div>
      <h1 className="page-title">Admin Dashboard</h1>
      <p className="page-subtitle">
        Viewing as <strong>{role === "hr" ? "HR (Full Access)" : "Admin (Limited Access)"}</strong>. 
        Click <strong>View Details</strong> to inspect an employee profile.
      </p>
      <EmployeeList employees={employees} />
    </div>
  );
}
