import { NavLink } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Sidebar
 * The left navigation with primary routes.
 */
export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="brand">Finance CRM</span>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/" end className="nav-item">Dashboard</NavLink>
        <NavLink to="/clients" className="nav-item">Clients</NavLink>
        <NavLink to="/leads" className="nav-item">Leads</NavLink>
        <NavLink to="/activities" className="nav-item">Activities</NavLink>
        <NavLink to="/communications" className="nav-item">Communications</NavLink>
      </nav>
      <div className="sidebar-footer">
        <small>v0.1</small>
      </div>
    </aside>
  );
}
