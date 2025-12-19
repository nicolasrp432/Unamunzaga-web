import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, MessageSquare, LogOut, Home, Image, Users, Briefcase, FolderKanban } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

const Sidebar = () => {
    const location = useLocation();
    const { signOut } = useAuth();

    const isActive = (path) => location.pathname === path;

    return (
        <aside className="dashboard-sidebar">
            <div className="sidebar-header">
                <h2>Admin Panel</h2>
            </div>

            <nav className="sidebar-nav">
                <Link to="/dashboard" className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}>
                    <LayoutDashboard size={20} />
                    <span>Resumen</span>
                </Link>
                <Link to="/dashboard/projects" className={`nav-item ${isActive('/dashboard/projects') ? 'active' : ''}`}>
                    <FolderKanban size={20} />
                    <span>Proyectos</span>
                </Link>
                <Link to="/dashboard/media" className={`nav-item ${isActive('/dashboard/media') ? 'active' : ''}`}>
                    <Image size={20} />
                    <span>Multimedia</span>
                </Link>
                <Link to="/dashboard/team" className={`nav-item ${isActive('/dashboard/team') ? 'active' : ''}`}>
                    <Users size={20} />
                    <span>Equipo</span>
                </Link>
                <Link to="/dashboard/services" className={`nav-item ${isActive('/dashboard/services') ? 'active' : ''}`}>
                    <Briefcase size={20} />
                    <span>Servicios</span>
                </Link>
                <Link to="/dashboard/documents" className={`nav-item ${isActive('/dashboard/documents') ? 'active' : ''}`}>
                    <FileText size={20} />
                    <span>Documentos</span>
                </Link>
                <Link to="/dashboard/messages" className={`nav-item ${isActive('/dashboard/messages') ? 'active' : ''}`}>
                    <MessageSquare size={20} />
                    <span>Mensajes</span>
                </Link>
            </nav>

            <div className="sidebar-footer">
                <Link to="/" className="nav-item">
                    <Home size={20} />
                    <span>Volver a la Web</span>
                </Link>
                <button onClick={signOut} className="nav-item logout-btn">
                    <LogOut size={20} />
                    <span>Cerrar Sesión</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
