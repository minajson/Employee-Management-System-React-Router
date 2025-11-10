
export default function SearchBar({
  search,
  onSearchChange,
  department,
  onDepartmentChange,
  statusFilter,
  onStatusChange,
  sortBy,
  onSortByChange,
  departments,
  statuses,
}) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by name, code, role, department, location..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />

      <select
        value={department}
        onChange={(e) => onDepartmentChange(e.target.value)}
        className="search-select"
      >
        {departments.map((d) => (
          <option key={d} value={d}>
            {d === "All" ? "All Departments" : d}
          </option>
        ))}
      </select>

      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        className="search-select"
      >
        {statuses.map((s) => (
          <option key={s} value={s}>
            {s === "All" ? "All Status" : s}
          </option>
        ))}
      </select>

      <select
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value)}
        className="search-select"
      >
        <option value="name">Sort: Name</option>
        <option value="department">Sort: Department</option>
        <option value="doj">Sort: Date of Joining</option>
      </select>
    </div>
  );
}
