import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../../components/auth/ProtectedRoute';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import Overview from './Overview';
import Documents from './Documents';
import Messages from './Messages';

const Dashboard = () => {
    return (
        <ProtectedRoute>
            <Routes>
                <Route element={<DashboardLayout />}>
                    <Route index element={<Overview />} />
                    <Route path="documents" element={<Documents />} />
                    <Route path="messages" element={<Messages />} />
                </Route>
            </Routes>
        </ProtectedRoute>
    );
};

export default Dashboard;
