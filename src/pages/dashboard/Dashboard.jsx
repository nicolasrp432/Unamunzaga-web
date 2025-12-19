import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../../components/auth/ProtectedRoute';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import Overview from './Overview';
import Documents from './Documents';
import Messages from './Messages';
import MediaManager from '../../components/dashboard/modules/MediaManager';
import TeamManager from '../../components/dashboard/modules/TeamManager';
import ServicesManager from '../../components/dashboard/modules/ServicesManager';
import ProjectsManager from '../../components/dashboard/modules/ProjectsManager';

const Dashboard = () => {
    return (
        <ProtectedRoute>
            <Routes>
                <Route element={<DashboardLayout />}>
                    <Route index element={<Overview />} />
                    <Route path="documents" element={<Documents />} />
                    <Route path="messages" element={<Messages />} />
                    <Route path="media" element={<MediaManager />} />
                    <Route path="team" element={<TeamManager />} />
                    <Route path="services" element={<ServicesManager />} />
                    <Route path="projects" element={<ProjectsManager />} />
                </Route>
            </Routes>
        </ProtectedRoute>
    );
};

export default Dashboard;
