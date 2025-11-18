import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../api/client';

/**
 * PUBLIC_INTERFACE
 * ClientForm
 * Create or edit a client using a simple form.
 */
export default function ClientForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = id && id !== 'new';

  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [state, setState] = useState({ loading: isEdit, error: null, saving: false });

  useEffect(() => {
    let mounted = true;
    if (isEdit) {
      api.getClient(id).then((res) => {
        if (!mounted) return;
        if (res.error) {
          setState(s => ({ ...s, loading: false, error: res.error }));
        } else {
          setForm({
            name: res.data?.name || '',
            email: res.data?.email || '',
            phone: res.data?.phone || ''
          });
          setState(s => ({ ...s, loading: false, error: null }));
        }
      });
    }
    return () => { mounted = false; };
  }, [id, isEdit]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setState(s => ({ ...s, saving: true }));
    const payload = { ...form };
    const res = isEdit ? await api.updateClient(id, payload) : await api.createClient(payload);
    if (res.error) {
      alert(`Save failed: ${res.error}`);
      setState(s => ({ ...s, saving: false }));
    } else {
      navigate('/clients');
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>{isEdit ? 'Edit Client' : 'New Client'}</h2>
        {state.loading && <p>Loading…</p>}
        {state.error && <div className="alert error">Error: {String(state.error)}</div>}
        {!state.loading && (
          <form onSubmit={onSubmit} className="form">
            <div className="form-row">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" value={form.name} onChange={onChange} required />
            </div>
            <div className="form-row">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" value={form.email} onChange={onChange} type="email" />
            </div>
            <div className="form-row">
              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" value={form.phone} onChange={onChange} />
            </div>
            <div className="form-actions">
              <button type="button" className="btn secondary" onClick={() => navigate('/clients')}>Cancel</button>
              <button type="submit" className="btn" disabled={state.saving}>
                {state.saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
