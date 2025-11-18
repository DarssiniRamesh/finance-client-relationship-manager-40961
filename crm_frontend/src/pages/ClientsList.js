import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';

/**
 * PUBLIC_INTERFACE
 * ClientsList
 * Displays a list of clients with basic actions.
 */
export default function ClientsList() {
  const [state, setState] = useState({ loading: true, error: null, items: [] });

  const load = async () => {
    setState(s => ({ ...s, loading: true }));
    const res = await api.listClients();
    if (res.error) {
      setState({ loading: false, error: res.error, items: [] });
    } else {
      setState({ loading: false, error: null, items: Array.isArray(res.data) ? res.data : [] });
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onDelete = async (id) => {
    if (!window.confirm('Delete this client?')) return;
    const res = await api.deleteClient(id);
    if (res.error) {
      alert(`Failed to delete: ${res.error}`);
    } else {
      load();
    }
  };

  return (
    <div className="page">
      <div className="page-actions">
        <Link to="/clients/new" className="btn">+ New Client</Link>
      </div>
      <div className="card">
        <h2>Clients</h2>
        {state.loading && <p>Loading…</p>}
        {state.error && <div className="alert error">Error: {String(state.error)}</div>}
        {!state.loading && !state.error && (
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th style={{ width: 140 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {state.items.length === 0 && (
                  <tr><td colSpan="4" className="muted">No clients found.</td></tr>
                )}
                {state.items.map((c) => (
                  <tr key={c.id || c._id || `${c.name}-${c.email}`}>
                    <td>{c.name || '-'}</td>
                    <td>{c.email || '-'}</td>
                    <td>{c.phone || '-'}</td>
                    <td>
                      <div className="actions">
                        <Link to={`/clients/${encodeURIComponent(c.id || c._id || '')}`} className="link">Edit</Link>
                        <button className="link danger" onClick={() => onDelete(c.id || c._id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
