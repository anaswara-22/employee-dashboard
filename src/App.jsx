
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useNavigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// HOME / EMPLOYEE DASHBOARD
function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to fetch employees");
        }
        return response.json();
      })
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load employees. Please check your internet connection.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="page-container">
      <div className="dashboard-heading">
        <div>
          <p className="eyebrow">OVERVIEW</p>
          <h1>Employee Dashboard</h1>
          <p className="subtitle">
            View and manage your employee information.
          </p>
        </div>

        <NavLink to="/employee-form" className="btn add-button">
          + Add Employee
        </NavLink>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="stat-card">
            <p>Total Employees</p>
            <h2>{loading ? "..." : employees.length}</h2>
            <span>Employees from the API</span>
          </div>
        </div>

        <div className="col-md-4">
          <div className="stat-card">
            <p>Data Source</p>
            <h2>API</h2>
            <span>JSONPlaceholder</span>
          </div>
        </div>

        <div className="col-md-4">
          <div className="stat-card">
            <p>Dashboard Status</p>
            <h2>{error ? "Offline" : loading ? "Loading" : "Active"}</h2>
            <span>Employee records</span>
          </div>
        </div>
      </div>

      <div className="table-card">
        <div className="table-heading">
          <div>
            <h2>Employee Directory</h2>
            <p>Employee ID, name and email address</p>
          </div>
          <span className="record-badge">
            {employees.length} Records
          </span>
        </div>

        {loading ? (
          <p className="message">Loading employee details...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="table-responsive">
            <table className="table employee-table align-middle">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>EMPLOYEE</th>
                  <th>EMAIL ADDRESS</th>
                </tr>
              </thead>

              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>#{employee.id}</td>
                    <td>
                      <div className="employee-name">
                        <div className="avatar">
                          {employee.name.charAt(0)}
                        </div>
                        <strong>{employee.name}</strong>
                      </div>
                    </td>
                    <td>{employee.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// EMPLOYEE FORM
function EmployeeForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    location: "",
    salary: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    setMessage(
      "Employee form validated successfully! No data was sent to a server."
    );
  }

  return (
    <div className="page-container form-page">
      <div className="dashboard-heading">
        <div>
          <p className="eyebrow">EMPLOYEE MANAGEMENT</p>
          <h1>Add Employee</h1>
          <p className="subtitle">
            Enter the employee details in the form below.
          </p>
        </div>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="form-label">
              Employee Name
            </label>
            <input
              id="name"
              className="form-control"
              type="text"
              name="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="designation" className="form-label">
              Designation
            </label>
            <input
              id="designation"
              className="form-control"
              type="text"
              name="designation"
              placeholder="e.g. Software Developer"
              value={formData.designation}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              id="location"
              className="form-control"
              type="text"
              name="location"
              placeholder="Enter city or office location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="salary" className="form-label">
              Salary
            </label>
            <input
              id="salary"
              className="form-control"
              type="number"
              name="salary"
              placeholder="Enter salary"
              min="0"
              value={formData.salary}
              onChange={handleChange}
              required
            />
          </div>

          {message && (
            <div className="alert alert-success">{message}</div>
          )}

          <div className="d-flex gap-2">
            <button type="submit" className="btn add-button">
              Validate Form
            </button>
            <button
              type="button"
              className="btn cancel-button"
              onClick={() => navigate("/")}
            >
              Back to Dashboard
            </button>
          </div>

          <p className="form-note">
            Demo form only: this assignment does not require sending data
            to a backend.
          </p>
        </form>
      </div>
    </div>
  );
}

// MAIN APPLICATION
function AppLayout() {
  return (
    <>
      <nav className="navbar navbar-expand-lg app-navbar">
        <div className="container-fluid px-lg-5">
          <NavLink to="/" className="navbar-brand">
            <span className="brand-icon">E</span>
            Employ<span className="brand-highlight">Hub</span>
          </NavLink>

          <div className="navbar-nav ms-auto">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav-link ${isActive ? "active-link" : ""}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/employee-form"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active-link" : ""}`
              }
            >
              Employee Form
            </NavLink>
          </div>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employee-form" element={<EmployeeForm />} />
          <Route
            path="*"
            element={
              <div className="page-container">
                <h1>404 - Page not found</h1>
                <NavLink to="/">Return Home</NavLink>
              </div>
            }
          />
        </Routes>
      </main>

      <footer className="app-footer">
        Employee Dashboard · Built with React
      </footer>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
