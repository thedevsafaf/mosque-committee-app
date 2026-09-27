import { useState, useEffect } from 'react'
import './index.css'

function App() {
  const [view, setView] = useState('list'); // 'list' or 'form'
  const [members, setMembers] = useState([]);
  const [editingMember, setEditingMember] = useState(null);
  
  // Dummy data until backend is fully hooked up
  useEffect(() => {
    setMembers([
      { id: 1, first_name: 'Ahmed', last_name: 'Ali', role: 'President', status: 'Active', phone_number: '555-0123', email: 'ahmed@example.com', address: '123 Main St', joined_date: '2023-01-15' },
      { id: 2, first_name: 'Omar', last_name: 'Farooq', role: 'Treasurer', status: 'Active', phone_number: '555-0124', email: 'omar@example.com', address: '456 Side St', joined_date: '2023-02-20' },
      { id: 3, first_name: 'Zaid', last_name: 'Khan', role: 'General Member', status: 'Inactive', phone_number: '555-0125', email: 'zaid@example.com', address: '789 Back St', joined_date: '2023-03-10' },
    ]);
  }, []);

  const handleEditClick = (member) => {
    setEditingMember(member);
    setView('form');
  };

  const handleAddNewClick = () => {
    setEditingMember(null);
    setView('form');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // In the future, this will be an API call to Laravel (POST or PUT)
    const formData = new FormData(e.target);
    const memberData = {
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      phone_number: formData.get('phone_number'),
      email: formData.get('email'),
      address: formData.get('address'),
      role: formData.get('role'),
      status: formData.get('status') || 'Active', // Default to active for new
      joined_date: formData.get('joined_date')
    };

    if (editingMember) {
      // Update existing
      setMembers(members.map(m => m.id === editingMember.id ? { ...memberData, id: editingMember.id, status: editingMember.status } : m));
      alert('Member updated successfully (Mock)');
    } else {
      // Add new
      setMembers([...members, { ...memberData, id: Date.now() }]);
      alert('Member added successfully (Mock)');
    }
    
    setView('list');
  };

  return (
    <div className="app-container">
      <header>
        <h1>Mosque Committee</h1>
        <div>
          {view === 'list' ? (
            <button className="btn" onClick={handleAddNewClick}>+ Add Member</button>
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
                        <button 
                          onClick={() => handleEditClick(member)}
                          style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', marginRight: '1rem', fontWeight: '500' }}>
                          Edit
                        </button>
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
            <h2 style={{ marginBottom: '1.5rem', fontWeight: '600' }}>
              {editingMember ? 'Edit Member' : 'Register New Member'}
            </h2>
            <form onSubmit={handleFormSubmit}>
              
              <div className="grid-2">
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" name="first_name" className="form-control" required defaultValue={editingMember?.first_name || ''} placeholder="e.g. Ahmed" />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" name="last_name" className="form-control" required defaultValue={editingMember?.last_name || ''} placeholder="e.g. Ali" />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" name="phone_number" className="form-control" defaultValue={editingMember?.phone_number || ''} placeholder="e.g. +1 555-0123" />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" name="email" className="form-control" defaultValue={editingMember?.email || ''} placeholder="ahmed@example.com" />
                </div>
              </div>

              <div className="form-group">
                <label>Home Address</label>
                <textarea name="address" className="form-control" rows="2" defaultValue={editingMember?.address || ''} placeholder="Full residential address"></textarea>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>Committee Role</label>
                  <select name="role" className="form-control" defaultValue={editingMember?.role || 'General Member'}>
                    <option value="President">President</option>
                    <option value="Vice President">Vice President</option>
                    <option value="Treasurer">Treasurer</option>
                    <option value="Secretary">Secretary</option>
                    <option value="General Member">General Member</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Joining Date</label>
                  <input type="date" name="joined_date" className="form-control" defaultValue={editingMember?.joined_date || ''} />
                </div>
              </div>

              {/* Status field is only really useful to edit for existing members */}
              {editingMember && (
                <div className="form-group">
                  <label>Status</label>
                  <select name="status" className="form-control" defaultValue={editingMember.status}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              )}

              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setView('list')}>Cancel</button>
                <button type="submit" className="btn">{editingMember ? 'Update Member' : 'Save Member'}</button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
