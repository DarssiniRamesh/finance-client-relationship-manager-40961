import React, { useEffect, useState } from 'react';
import { api } from '../api/client';

/**
 * PUBLIC_INTERFACE
 * Dashboard
 * Minimal dashboard showing backend health.
 */
export default function Dashboard() {
  const [health, setHealth] = useState({ loading: true, error: null, data: null });

  useEffect(() => {
    let mounted = true;
    api.health().then((res) => {
      if (!mounted) return;
      setHealth({ loading: false, error: res.error, data: res.data });
    });
    return () => { mounted = false; };
  }, []);

  return (
    <div className="page">
      <div className="card">
        <h2>System Health</h2>
        {health.loading && <p>Checking backend status…</p>}
        {!health.loading && health.error && <div className="alert error">Error: {String(health.error)}</div>}
        {!health.loading && !health.error && (
          <pre className="pre">{JSON.stringify(health.data, null, 2)}</pre>
        )}
      </div>
      <div className="grid">
        <div className="card">
          <h3>Clients</h3>
          <p>Manage client profiles, accounts, and KYC information.</p>
        </div>
        <div className="card">
          <h3>Leads</h3>
          <p>Track potential clients and pipeline progression.</p>
        </div>
        <div className="card">
          <h3>Activities</h3>
          <p>Log meetings, calls, and tasks for your team.</p>
        </div>
        <div className="card">
          <h3>Communications</h3>
          <p>View email threads and messages with clients.</p>
        </div>
      </div>
    </div>
  );
}
