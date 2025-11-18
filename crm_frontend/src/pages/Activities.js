import React, { useEffect, useState } from 'react';
import { api } from '../api/client';

/**
 * PUBLIC_INTERFACE
 * Activities
 * Minimal list view for activities.
 */
export default function Activities() {
  const [state, setState] = useState({ loading: true, error: null, items: [] });

  useEffect(() => {
    let mounted = true;
    api.listActivities().then((res) => {
      if (!mounted) return;
      if (res.error) setState({ loading: false, error: res.error, items: [] });
      else setState({ loading: false, error: null, items: Array.isArray(res.data) ? res.data : [] });
    });
    return () => { mounted = false; };
  }, []);

  return (
    <div className="page">
      <div className="card">
        <h2>Activities</h2>
        {state.loading && <p>Loading…</p>}
        {state.error && <div className="alert error">Error: {String(state.error)}</div>}
        {!state.loading && !state.error && (
          <ul className="list">
            {state.items.length === 0 && <li className="muted">No activities found.</li>}
            {state.items.map((a, idx) => (
              <li key={a.id || idx}>
                <strong>{a.type || 'Activity'}</strong>
                <span className="muted"> — {a.summary || ''}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
