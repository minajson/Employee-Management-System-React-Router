// src/data/components/EmployeeList.jsx
import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import Pagination from "../../components/Pagination";

export default function EmployeeList({ employees }) {
  // existing filters
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  // NEW: paging state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const departments = useMemo(
    () => ["All", ...new Set(employees.map((e) => e.department))],
    [employees]
  );
  const statuses = useMemo(
    () => ["All", ...new Set(employees.map((e) => e.status))],
    [employees]
  );

  // Your existing filter + sort, unchanged
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

  // ----- NEW: derive page slice -----
  const totalItems = filteredEmployees.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  // if filters change and current page is now out of range, reset to 1
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  const pageSlice = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredEmployees.slice(start, start + pageSize);
  }, [filteredEmployees, page, pageSize]);

  // helpers for “showing X–Y of Z”
  const from = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalItems);

  return (
    <div className="card">
      <SearchBar
        search={search}
        onSearchChange={(v) => { setSearch(v); setPage(1); }}         {/* reset page on filter */}
        department={department}
        onDepartmentChange={(v) => { setDepartment(v); setPage(1); }}  {/* reset page on filter */}
        statusFilter={statusFilter}
        onStatusChange={(v) => { setStatusFilter(v); setPage(1); }}    {/* reset page on filter */}
        sortBy={sortBy}
        onSortByChange={(v) => { setSortBy(v); setPage(1); }}          {/* reset page on sort */}
        departments={departments}
        statuses={statuses}
      />

      <div className="table-wrapper">
        <table className="employee-table rwd-table">
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
            {totalItems === 0 && (
              <tr>
                <td colSpan="8" className="no-data">
                  No employees match your search/filter.
                </td>
              </tr>
            )}

            {pageSlice.map((emp) => (
              <tr key={emp.id}>
                <td data-label="Code">{emp.employeeCode}</td>
                <td data-label="Employee">
                  {emp.firstName} {emp.lastName}
                </td>
                <td data-label="Department">{emp.department}</td>
                <td data-label="Role">{emp.role}</td>
                <td data-label="Location" className="employee-location">
                  {emp.location}
                </td>
                <td data-label="Status">
                  <span
                    className={`status-pill status-${emp.status
                      .replace(" ", "")
                      .toLowerCase()}`}
                  >
                    {emp.status}
                  </span>
                </td>
                <td data-label="Joined">{emp.dateOfJoining}</td>
                <td data-label="">
                  <Link to={`/employee/${emp.id}`} className="btn-link">
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* records info + pagination */}
      <div className="records-info">
        {totalItems > 0 ? (
          <>
            Showing <strong>{from}</strong>–<strong>{to}</strong> of{" "}
            <strong>{totalItems}</strong> filtered employees
            {" · "}
            Total in system: <strong>{employees.length}</strong>
          </>
        ) : (
          <>
            Showing <strong>0</strong> of <strong>{employees.length}</strong> employees
          </>
        )}
      </div>

      <Pagination
        page={page}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={(n) => { setPageSize(n); setPage(1); }}
        pageSizeOptions={[10, 20, 50]}
      />
    </div>
  );
}
