import { useState } from 'react';

export default function PersonForm({ person, onSave, onCancel }) {
  const [formData, setFormData] = useState(person || {
    name: '', email: '', phone: '', department: '', position: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="input" />
      <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="input" />
      <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="input" />
      <input name="department" value={formData.department} onChange={handleChange} placeholder="Department" className="input" />
      <input name="position" value={formData.position} onChange={handleChange} placeholder="Position" className="input" />
      <div className="flex gap-2">
        <button type="submit" className="btn-primary">Save</button>
        <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>
      </div>
    </form>
  );
}