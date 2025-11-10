import { useParams, useNavigate } from "react-router-dom";
import employees from "../data/employees.json";

export default function EmployeeDetails({ role }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const employee = employees.find((e) => String(e.id) === String(id));
  const isHR = role === "hr";

  if (!employee) {
    return (
      <div className="card card-fade">
        <button className="btn-outline" onClick={() => navigate("/")}>
          ← Back to Dashboard
        </button>
        <p>Employee not found.</p>
      </div>
    );
  }

  return (
    <div className="card card-fade">
      <button className="btn-outline" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2 className="details-title">
        {employee.firstName} {employee.lastName}{" "}
        <span className="details-code">({employee.employeeCode})</span>
      </h2>
      <p className="details-subtitle">
        {employee.role} · {employee.department} · {employee.location} · Status:{" "}
        {employee.status}
      </p>

      {!isHR && (
        <p className="access-note">
          You are viewing as <strong>Admin</strong>. Sensitive HR fields are hidden.
        </p>
      )}

      <div className="details-grid">
        {/* Basic Info - visible to all */}
        <section>
          <h3>Basic Info</h3>
          <ul>
            <li><strong>Employment Type:</strong> {employee.employmentType}</li>
            <li><strong>Grade:</strong> {employee.grade}</li>
            <li><strong>Date of Joining:</strong> {employee.dateOfJoining}</li>
            <li><strong>Date of Birth:</strong> {employee.dob}</li>
            <li><strong>Gender:</strong> {employee.gender}</li>
          </ul>
        </section>

        {/* Contact - visible to all */}
        <section>
          <h3>Contact</h3>
          <ul>
            <li><strong>Email:</strong> {employee.email}</li>
            <li><strong>Phone:</strong> {employee.phone}</li>
            <li><strong>Address:</strong> {employee.address}</li>
          </ul>
        </section>

        {/* Employment summary - visible to all */}
        <section>
          <h3>Employment</h3>
          <ul>
            <li><strong>Manager:</strong> {employee.manager}</li>
            <li><strong>Status:</strong> {employee.status}</li>
            <li>
              <strong>Last Promotion:</strong>{" "}
              {employee.lastPromotionDate || "N/A"}
            </li>
          </ul>
        </section>

        <section>
          <h3>Emergency Contact</h3>
          <ul>
            <li>
              <strong>Name:</strong> {employee.emergencyContactName}
            </li>
            <li>
              <strong>Phone:</strong> {employee.emergencyContactPhone}
            </li>
          </ul>
        </section>

        {/* HR-only: Salary, Bank, National ID */}
        {isHR && (
          <section className="span-2 sensitive-block">
            <h3>Compensation & Identity (HR Only)</h3>
            <ul>
              <li>
                <strong>Salary:</strong> ₦{employee.salary.toLocaleString()}
              </li>
              <li>
                <strong>Bank:</strong> {employee.bankName}
              </li>
              <li>
                <strong>Account Number:</strong> {employee.bankAccountNumber}
              </li>
              <li>
                <strong>National ID:</strong> {employee.nationalId}
              </li>
            </ul>
          </section>
        )}

        {/* HR-only: Skills & Notes full; Admin only partial */}
        <section className="span-2">
          <h3>Skills & Notes</h3>
          <p>
            <strong>Skills:</strong>{" "}
            {employee.skills && employee.skills.length
              ? employee.skills.join(", ")
              : "N/A"}
          </p>
          <p className={isHR ? "" : "blurred-note"}>
            <strong>Notes:</strong>{" "}
            {employee.notes
              ? employee.notes
              : isHR
              ? "No special notes."
              : "Notes are restricted to HR view."}
          </p>
        </section>
      </div>
    </div>
  );
}
