
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function EmployeeList({ employees }) {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  const departments = useMemo(
    () => ["All", ...new Set(employees.map((e) => e.department))],
    [employees]
  );
  const statuses = useMemo(
    () => ["All", ...new Set(employees.map((e) => e.status))],
    [employees]
  );

  const filteredEmployees = useMemo(() => {
    const term = search.trim().toLowerCase();

    let list = employees.filter((e) => {
      const matchesSearch =
        !term ||
        e.firstName.toLowerCase().includes(term) ||
        e.lastName.toLowerCase().includes(term) ||
        e.employeeCode.toLowerCase().includes(term) ||
        e.department.toLowerCase().includes(term) ||
        e.location.toLowerCase().includes(term) ||
        e.role.toLowerCase().includes(term);

      const matchesDept = department === "All" || e.department === department;
      const matchesStatus = statusFilter === "All" || e.status === statusFilter;

      return matchesSearch && matchesDept && matchesStatus;
    });

    list = list.slice().sort((a, b) => {
      if (sortBy === "name") {
        const an = (a.firstName + " " + a.lastName).toLowerCase();
        const bn = (b.firstName + " " + b.lastName).toLowerCase();
        return an.localeCompare(bn);
      }
      if (sortBy === "department") {
        return a.department.localeCompare(b.department);
      }
      if (sortBy === "doj") {
        return new Date(a.dateOfJoining) - new Date(b.dateOfJoining);
      }
      return 0;
    });

    return list;
  }, [employees, search, department, statusFilter, sortBy]);

  return (
    <div className="card">
      <SearchBar
        search={search}
        onSearchChange={setSearch}
        department={department}
        onDepartmentChange={setDepartment}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        departments={departments}
        statuses={statuses}
      />

      <div className="table-wrapper">
        <table className="employee-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Employee</th>
              <th>Department</th>
              <th>Role</th>
              <th>Location</th>
              <th>Status</th>
              <th>Joined</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length === 0 && (
              <tr>
                <td colSpan="8" className="no-data">
                  No employees match your search/filter.
                </td>
              </tr>
            )}

            {filteredEmployees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.employeeCode}</td>
                <td>
                  {emp.firstName} {emp.lastName}
                </td>
                <td>{emp.department}</td>
                <td>{emp.role}</td>
                <td>{emp.location}</td>
                <td>
                  <span className={`status-pill status-${emp.status.replace(" ", "").toLowerCase()}`}>
                    {emp.status}
                  </span>
                </td>
                <td>{emp.dateOfJoining}</td>
                <td>
                  <Link to={`/employee/${emp.id}`} className="btn-link">
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="records-info">
        Showing <strong>{filteredEmployees.length}</strong> of{" "}
        <strong>{employees.length}</strong> employees
      </div>
    </div>
  );
}
