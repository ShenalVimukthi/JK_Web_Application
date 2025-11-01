import { useState } from 'react';


export default function PersonForm({ person, onSave, onCancel }) {
  const [formData, setFormData] = useState(person || {
    name: '', addr: '', nic: '', gsDiv: '', phone: '',family: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 space-x-4">
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="input border-black border-1 p-2 rounded-[5px]" />
      <input name="addr" value={formData.addr} onChange={handleChange} placeholder="Address" required className="input border-black border-1 p-2 rounded-[5px]" />
      <input name="nic" value={formData.nic} onChange={handleChange} placeholder="ID Number" className="input border-black border-1 p-2 rounded-[5px]" />
      <input name="gsDiv" value={formData.gsDiv} onChange={handleChange} placeholder="GS Division" className="input border-black border-1 p-2 rounded-[5px]" />
      <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="input border-black border-1 p-2 rounded-[5px]" />
      <input name="family" value={formData.phone} onChange={handleChange} placeholder="No of Family members" className="input border-black border-1 p-2 rounded-[5px]" />

      <div className="flex gap-2">
        <button type="submit" className="btn-primary bg-blue-500 p-2 rounded-[2px] text-white hover:bg-blue-400">Save</button>
        <button type="button" onClick={onCancel} className="btn-secondary bg-red-400 p-2 rounded-[2px] text-white hover:bg-red-300">Cancel</button>
      </div>
    </form>
  );
}