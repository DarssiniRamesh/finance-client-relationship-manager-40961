import React, { useEffect, useState } from 'react';
import { api } from '../api/client';

/**
 * PUBLIC_INTERFACE
 * Leads
 * Minimal list view for leads.
 */
export default function Leads() {
  const [state, setState] = useState({ loading: true, error: null, items: [] });

  useEffect(() => {
    let mounted = true;
    api.listLeads().then((res) => {
      if (!mounted) return;
      if (res.error) setState({ loading: false, error: res.error, items: [] });
      else setState({ loading: false, error: null, items: Array.isArray(res.data) ? res.data : [] });
    });
    return () => { mounted = false; };
  }, []);

  return (
    <div className="page">
      <div className="card">
        <h2>Leads</h2>
        {state.loading && <p>Loading…</p>}
        {state.error && <div className="alert error">Error: {String(state.error)}</div>}
        {!state.loading && !state.error && (
          <ul className="list">
            {state.items.length === 0 && <li className="muted">No leads found.</li>}
            {state.items.map((l, idx) => (
              <li key={l.id || idx}>
                <strong>{l.name || 'Lead'}</strong>
                <span className="muted"> — {l.status || 'Unknown'}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
