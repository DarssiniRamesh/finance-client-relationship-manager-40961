//
// Minimal fetch-based API client for the CRM frontend.
// Uses REACT_APP_API_BASE (default http://localhost:3001).
//

const BASE_URL = process.env.REACT_APP_API_BASE || 'http://localhost:3001';

/**
 * PUBLIC_INTERFACE
 * makeRequest
 * Minimal wrapper around fetch to call the backend.
 * - path: string, path starting with '/'
 * - options: RequestInit
 * Returns: { data, error, status }
 */
export async function makeRequest(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  try {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      ...options
    });

    const contentType = res.headers.get('content-type') || '';
    let payload = null;
    if (contentType.includes('application/json')) {
      payload = await res.json();
    } else {
      payload = await res.text();
    }

    if (!res.ok) {
      return { data: null, error: payload || res.statusText, status: res.status };
    }
    return { data: payload, error: null, status: res.status };
  } catch (err) {
    return { data: null, error: err?.message || 'Network error', status: 0 };
  }
}

/**
 * PUBLIC_INTERFACE
 * api
 * Convenience endpoints for common resources used by the UI.
 */
export const api = {
  health: () => makeRequest('/'),
  // Clients
  listClients: () => makeRequest('/clients'),
  getClient: (id) => makeRequest(`/clients/${encodeURIComponent(id)}`),
  createClient: (client) => makeRequest('/clients', { method: 'POST', body: JSON.stringify(client) }),
  updateClient: (id, client) => makeRequest(`/clients/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(client) }),
  deleteClient: (id) => makeRequest(`/clients/${encodeURIComponent(id)}`, { method: 'DELETE' }),

  // Leads
  listLeads: () => makeRequest('/leads'),
  // Activities
  listActivities: () => makeRequest('/activities'),
  // Communications
  listComms: () => makeRequest('/communications')
};
