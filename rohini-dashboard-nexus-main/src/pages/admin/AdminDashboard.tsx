import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FileText, Users, Clock, AlertCircle, ChevronRight } from "lucide-react";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    users: 0
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [appsRes, statsRes] = await Promise.all([
          fetch("http://localhost:5000/api/applications/recent"),
          fetch("http://localhost:5000/api/admin/stats")
        ]);

        const appsData = await appsRes.json();
        const statsData = await statsRes.json();

        setApplications(appsData || []);
        setStats(statsData || {});
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "In Review":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // ... the rest of your JSX stays the same, except:
  // - Replace `recentApplications` with `applications`
  // - Replace dashboard values with `stats.total`, `stats.approved`, etc.

  return (
    <div className="animate-fade-in">
      {/* Dashboard Header */}
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Dashboard Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="p-4 shadow rounded bg-white">
              <p>Total Applications</p>
              <h3>{stats.total}</h3>
            </div>
            <div className="p-4 shadow rounded bg-white">
              <p>Approved</p>
              <h3>{stats.approved}</h3>
            </div>
            <div className="p-4 shadow rounded bg-white">
              <p>Pending</p>
              <h3>{stats.pending}</h3>
            </div>
            <div className="p-4 shadow rounded bg-white">
              <p>Registered Users</p>
              <h3>{stats.users}</h3>
            </div>
          </div>

          {/* Applications Table */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Recent Applications</h2>
            {applications.length > 0 ? (
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Applicant</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app: any) => (
                    <tr key={app.id}>
                      <td>{app.id}</td>
                      <td>{app.applicant}</td>
                      <td>{app.type}</td>
                      <td>{app.date}</td>
                      <td>
                        <span className={`px-2 py-1 rounded ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No applications found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
