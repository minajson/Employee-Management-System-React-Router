import EmployeeList from "../components/EmployeeList";
import employees from "../data/employees.json";

export default function Dashboard() {
  return (
    <div>
      <h1 className="page-title">Admin Dashboard</h1>
      <p className="page-subtitle">
        View all employees at a glance. Click <strong>View Details</strong> to see full profile.
      </p>
      <EmployeeList employees={employees} />
    </div>
  );
}
