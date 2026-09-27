import { useState, useEffect } from 'react'
import './index.css'

function App() {
  const [view, setView] = useState('list'); // 'list' or 'add'
  const [members, setMembers] = useState([]);
  
  // Dummy data until backend is fully hooked up
  useEffect(() => {
    // In the future, this will be: fetch('http://localhost:8000/api/members')
    setMembers([
      { id: 1, first_name: 'Ahmed', last_name: 'Ali', role: 'President', status: 'Active', phone_number: '555-0123' },
      { id: 2, first_name: 'Omar', last_name: 'Farooq', role: 'Treasurer', status: 'Active', phone_number: '555-0124' },
      { id: 3, first_name: 'Zaid', last_name: 'Khan', role: 'General Member', status: 'Inactive', phone_number: '555-0125' },
    ]);
  }, []);

  return (
    <div className="app-container">
      <header>
        <h1>Mosque Committee</h1>
        <div>
          {view === 'list' ? (
            <button className="btn" onClick={() => setView('add')}>+ Add Member</button>
          ) : (
            <button className="btn btn-secondary" onClick={() => setView('list')}>← Back to List</button>
          )}
        </div>
      </header>

      <main>
        {view === 'list' ? (
          <div className="glass-panel">
            <h2 style={{ marginBottom: '1.5rem', fontWeight: '600' }}>Committee Members</h2>
            <div className="members-table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map(member => (
                    <tr key={member.id}>
                      <td>{member.first_name} {member.last_name}</td>
                      <td>{member.role}</td>
                      <td>{member.phone_number || '-'}</td>
                      <td>
                        <span className={`badge ${member.status === 'Inactive' ? 'inactive' : ''}`}>
                          {member.status}
                        </span>
                      </td>
                      <td>
                        <button style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', marginRight: '1rem' }}>Edit</button>
                      </td>
                    </tr>
                  ))}
                  {members.length === 0 && (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No members found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '1.5rem', fontWeight: '600' }}>Register New Member</h2>
            <form onSubmit={(e) => { e.preventDefault(); alert('In the future, this will save to Laravel!'); setView('list'); }}>
              
              <div className="grid-2">
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" className="form-control" required placeholder="e.g. Ahmed" />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" className="form-control" required placeholder="e.g. Ali" />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" className="form-control" placeholder="e.g. +1 555-0123" />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" className="form-control" placeholder="ahmed@example.com" />
                </div>
              </div>

              <div className="form-group">
                <label>Home Address</label>
                <textarea className="form-control" rows="2" placeholder="Full residential address"></textarea>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>Committee Role</label>
                  <select className="form-control" defaultValue="General Member">
                    <option>President</option>
                    <option>Vice President</option>
                    <option>Treasurer</option>
                    <option>Secretary</option>
                    <option>General Member</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Joining Date</label>
                  <input type="date" className="form-control" />
                </div>
              </div>

              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setView('list')}>Cancel</button>
                <button type="submit" className="btn">Save Member</button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
