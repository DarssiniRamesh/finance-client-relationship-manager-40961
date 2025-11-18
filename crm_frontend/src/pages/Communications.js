import React, { useEffect, useState } from 'react';
import { api } from '../api/client';

/**
 * PUBLIC_INTERFACE
 * Communications
 * Minimal list view for communications.
 */
export default function Communications() {
  const [state, setState] = useState({ loading: true, error: null, items: [] });

  useEffect(() => {
    let mounted = true;
    api.listComms().then((res) => {
      if (!mounted) return;
      if (res.error) setState({ loading: false, error: res.error, items: [] });
      else setState({ loading: false, error: null, items: Array.isArray(res.data) ? res.data : [] });
    });
    return () => { mounted = false; };
  }, []);

  return (
    <div className="page">
      <div className="card">
        <h2>Communications</h2>
        {state.loading && <p>Loading…</p>}
        {state.error && <div className="alert error">Error: {String(state.error)}</div>}
        {!state.loading && !state.error && (
          <ul className="list">
            {state.items.length === 0 && <li className="muted">No communications found.</li>}
            {state.items.map((c, idx) => (
              <li key={c.id || idx}>
                <strong>{c.channel || 'Message'}</strong>
                <span className="muted"> — {c.subject || c.preview || ''}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
