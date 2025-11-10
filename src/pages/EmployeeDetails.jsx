
import { useParams, useNavigate } from "react-router-dom";
import employees from "../data/employees.json";

export default function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const employee = employees.find((e) => String(e.id) === String(id));

  if (!employee) {
    return (
      <div className="card">
        <p>Employee not found.</p>
        <button className="btn" onClick={() => navigate("/")}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <button className="btn-outline" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2 className="details-title">
        {employee.firstName} {employee.lastName}{" "}
        <span className="details-code">({employee.employeeCode})</span>
      </h2>
      <p className="details-subtitle">
        {employee.role} · {employee.department} · {employee.location}
      </p>

      <div className="details-grid">
        <section>
          <h3>Basic Info</h3>
          <ul>
            <li><strong>Status:</strong> {employee.status}</li>
            <li><strong>Employment Type:</strong> {employee.employmentType}</li>
            <li><strong>Grade:</strong> {employee.grade}</li>
            <li><strong>Date of Joining:</strong> {employee.dateOfJoining}</li>
            <li><strong>Date of Birth:</strong> {employee.dob}</li>
            <li><strong>Gender:</strong> {employee.gender}</li>
          </ul>
        </section>

        <section>
          <h3>Contact</h3>
          <ul>
            <li><strong>Email:</strong> {employee.email}</li>
            <li><strong>Phone:</strong> {employee.phone}</li>
            <li><strong>Address:</strong> {employee.address}</li>
          </ul>
        </section>

        <section>
          <h3>Employment</h3>
          <ul>
            <li><strong>Manager:</strong> {employee.manager}</li>
            <li><strong>Last Promotion:</strong> {employee.lastPromotionDate || "N/A"}</li>
            <li><strong>Salary (Mock):</strong> ₦{employee.salary.toLocaleString()}</li>
          </ul>
        </section>

        <section>
          <h3>Emergency & IDs</h3>
          <ul>
            <li><strong>Emergency Contact:</strong> {employee.emergencyContactName}</li>
            <li><strong>Emergency Phone:</strong> {employee.emergencyContactPhone}</li>
            <li><strong>National ID:</strong> {employee.nationalId}</li>
          </ul>
        </section>

        <section className="span-2">
          <h3>Bank Details (Internal Only)</h3>
          <ul>
            <li><strong>Bank:</strong> {employee.bankName}</li>
            <li><strong>Account Number:</strong> {employee.bankAccountNumber}</li>
          </ul>
        </section>

        <section className="span-2">
          <h3>Skills & Notes</h3>
          <p>
            <strong>Skills:</strong>{" "}
            {employee.skills && employee.skills.length
              ? employee.skills.join(", ")
              : "N/A"}
          </p>
          <p>
            <strong>Notes:</strong> {employee.notes || "No special notes."}
          </p>
        </section>
      </div>
    </div>
  );
}
