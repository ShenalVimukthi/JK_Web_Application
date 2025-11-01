import { useEffect, useState } from 'react';
import { fetchPeople, createPerson, updatePerson, deletePerson, downloadAllPDF } from '../services/api';
import PersonList from '../components/PersonList';
import PersonForm from '../components/PersonForm';
import { toast } from 'react-toastify';

export default function Dashboard() {
  const [people, setPeople] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadPeople();
  }, []);

  const loadPeople = async () => {
    const res = await fetchPeople();
    setPeople(res.data);
  };

  const handleSave = async (data) => {
    if (editing) {
      await updatePerson(editing._id, data);
      toast.success('Updated!');
    } else {
      await createPerson(data);
      toast.success('Added!');
    }
    setEditing(null);
    setShowForm(false);
    loadPeople();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete?')) {
      await deletePerson(id);
      toast.success('Deleted');
      loadPeople();
    }
  };

  const handleDownloadAll = async () => {
    const res = await downloadAllPDF();
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'all-people.pdf');
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">NUPO Member Database (NMD)</h1>
        <div className="flex gap-2">
          <button onClick={handleDownloadAll} className="btn-primary p-4 m-4 bg-blue-500 rounded-[5px] hover:cursor-pointer
          hover:bg-blue-600 hover:text-white">Download All (PDF)</button>
          <button onClick={() => { setEditing(null); setShowForm(true); }} className="btn-success  m-4 p-4 bg-blue-500 rounded-[5px] hover:cursor-pointer
          hover:bg-blue-600 hover:text-white ">Add Person</button>
        </div>
      </div>

      {showForm && (
        <div className="mb-6 p-4 border rounded bg-gray-50">
          <h2 className="text-xl mb-4">{editing ? 'Edit' : 'Add'} Person</h2>
          <PersonForm
            person={editing}
            onSave={handleSave}
            onCancel={() => { setShowForm(false); setEditing(null); }}
          />
        </div>
      )}

      <PersonList
        people={people}
        onEdit={(p) => { setEditing(p); setShowForm(true); }}
        onDelete={handleDelete}
      />
    </div>
  );
}