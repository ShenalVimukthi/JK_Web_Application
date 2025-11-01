import { useState } from 'react';


export default function PersonForm({ person, onSave, onCancel }) {
  const [formData, setFormData] = useState(person || {
    name: '', addr: '', nic: '', gsDiv: '', phone: ''
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
      <input name="addr" value={formData.addr} onChange={handleChange} placeholder="Address" required className="input" />
      <input name="nic" value={formData.nic} onChange={handleChange} placeholder="ID Number" className="input" />
      <input name="gsDiv" value={formData.gsDiv} onChange={handleChange} placeholder="GS Division" className="input" />
      <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="input" />
      <div className="flex gap-2">
        <button type="submit" className="btn-primary">Save</button>
        <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>
      </div>
    </form>
  );
}