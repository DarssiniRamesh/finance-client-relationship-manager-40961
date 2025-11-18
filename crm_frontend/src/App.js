import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

import Dashboard from './pages/Dashboard';
import ClientsList from './pages/ClientsList';
import ClientForm from './pages/ClientForm';
import Leads from './pages/Leads';
import Activities from './pages/Activities';
import Communications from './pages/Communications';

/**
 * PUBLIC_INTERFACE
 * App
 * Application root with routing + layout.
 */
function AppShell() {
  const [theme, setTheme] = useState('light');
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  const titleMap = {
    '/': 'Dashboard',
    '/clients': 'Clients',
    '/clients/new': 'New Client',
    '/leads': 'Leads',
    '/activities': 'Activities',
    '/communications': 'Communications'
  };
  const path = location.pathname;
  const title = titleMap[path] || 'CRM';

  return (
    <div className="App">
      <Sidebar />
      <main className="main">
        <Topbar
          title={title}
          onToggleTheme={toggleTheme}
          themeLabel={theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        />
        <section className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clients" element={<ClientsList />} />
            <Route path="/clients/new" element={<ClientForm />} />
            <Route path="/clients/:id" element={<ClientForm />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/communications" element={<Communications />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </section>
      </main>
    </div>
  );
}

// PUBLIC_INTERFACE
export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
