// frontend/pages/reports/index.tsx
import { useEffect, useState } from 'react';
import api from '@/utils/axios'; // Import the configured axios instance

const ReportsPage = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const response = await api.get('/api/reports'); // Use 'api' instead of axios
      setReports(response.data);
    };
    fetchReports();
  }, []);

  return (
    <div>
      <h1>Reports</h1>
      <ul>
        {reports.map((report, index) => (
          <li key={index}>{report}</li>
        ))}
      </ul>
    </div>
  );
};

export default ReportsPage;