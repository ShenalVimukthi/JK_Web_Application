import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  fetchPeople,
  createPerson,
  updatePerson,
  deletePerson,
  downloadAllPDF,
  downloadAllExcel,      // ← NEW
  downloadSinglePDF,     // ← NEW
  downloadSingleExcel,   // ← NEW
} from '../services/api';
import PersonList from '../components/PersonList';
import PersonForm from '../components/PersonForm';
import { toast } from 'react-toastify';

export default function Dashboard() {
  const [people, setPeople] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [downloading, setDownloading] = useState({}); // { id: true } or { all: true }
  const navigate = useNavigate();

  useEffect(() => {
    loadPeople();
  }, []);

  const loadPeople = async () => {
    try {
      const res = await fetchPeople();
      setPeople(res.data);
    } catch (err) {
      toast.error('Failed to load people',err);
    }
  };

  const handleSave = async (data) => {
    try {
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
    } catch (err) {
      toast.error('Save failed',err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this person?')) return;
    try {
      await deletePerson(id);
      toast.success('Deleted');
      loadPeople();
    } catch (err) {
      toast.error('Delete failed',err);
    }
  };

  const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('tokenExpiry');
  toast.info('Logged out');
  navigate('/');
  };

  // ──────────────────────────────────────────────────────────────────────
  // Generic download helper
  // ──────────────────────────────────────────────────────────────────────
  const triggerDownload = async (promise, filename) => {
    try {
      const res = await promise;
      const blob = new Blob([res.data], { type: res.headers['content-type'] });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      toast.error('Download failed',err);
    }
  };

  // ──────────────────────────────────────────────────────────────────────
  // Download Handlers
  // ──────────────────────────────────────────────────────────────────────
  const handleDownloadAllPDF = () => {
    setDownloading({ all: 'pdf' });
    triggerDownload(downloadAllPDF(), 'all-people.pdf').finally(() =>
      setDownloading({})
    );
  };

  const handleDownloadAllExcel = () => {
    setDownloading({ all: 'excel' });
    triggerDownload(downloadAllExcel(), 'all-people.xlsx').finally(() =>
      setDownloading({})
    );
  };

  const handleDownloadSinglePDF = (id) => {
    setDownloading({ [id]: 'pdf' });
    triggerDownload(downloadSinglePDF(id), `${id}.pdf`).finally(() =>
      setDownloading((prev) => ({ ...prev, [id]: false }))
    );
  };

  const handleDownloadSingleExcel = (id) => {
    setDownloading({ [id]: 'excel' });
    triggerDownload(downloadSingleExcel(id), `${id}.xlsx`).finally(() =>
      setDownloading((prev) => ({ ...prev, [id]: false }))
    );
  };

  // ──────────────────────────────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────────────────────────────
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">
          NUPO Member Database (NMD)
        </h1>

        <div className="flex flex-wrap gap-2">
          {/* Download All */}
          <button
            onClick={handleDownloadAllPDF}
            disabled={!!downloading.all}
            className="btn px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            {downloading.all === 'pdf' ? 'Downloading...' : 'All (PDF)'}
          </button>

          <button
            onClick={handleDownloadAllExcel}
            disabled={!!downloading.all}
            className="btn px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {downloading.all === 'excel' ? 'Downloading...' : 'All (Excel)'}
          </button>

          {/* Add Person */}
          <button
            onClick={() => {
              setEditing(null);
              setShowForm(true);
            }}
            className="btn px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Person
          </button>

          {/* logout */}
          <button onClick={handleLogout} className="btn bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 ">Logout</button>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="mb-8 p-6 border rounded-lg bg-gray-50 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">
            {editing ? 'Edit' : 'Add'} Person
          </h2>
          <PersonForm
            person={editing}
            onSave={handleSave}
            onCancel={() => {
              setShowForm(false);
              setEditing(null);
            }}
          />
        </div>
      )}

      {/* List */}
      <PersonList
        people={people}
        onEdit={(p) => {
          setEditing(p);
          setShowForm(true);
        }}
        onDelete={handleDelete}
        // Pass download handlers
        onDownloadPDF={handleDownloadSinglePDF}
        onDownloadExcel={handleDownloadSingleExcel}
        downloading={downloading}
      />
    </div>
  );
}



// import { useEffect, useState } from 'react';
// import { fetchPeople, createPerson, updatePerson, deletePerson, downloadAllPDF } from '../services/api';
// import PersonList from '../components/PersonList';
// import PersonForm from '../components/PersonForm';
// import { toast } from 'react-toastify';

// export default function Dashboard() {
//   const [people, setPeople] = useState([]);
//   const [editing, setEditing] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   useEffect(() => {
//     loadPeople();
//   }, []);

//   const loadPeople = async () => {
//     const res = await fetchPeople();
//     setPeople(res.data);
//   };

//   const handleSave = async (data) => {
//     if (editing) {
//       await updatePerson(editing._id, data);
//       toast.success('Updated!');
//     } else {
//       await createPerson(data);
//       toast.success('Added!');
//     }
//     setEditing(null);
//     setShowForm(false);
//     loadPeople();
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Delete?')) {
//       await deletePerson(id);
//       toast.success('Deleted');
//       loadPeople();
//     }
//   };

//   const handleDownloadAll = async () => {
//     const res = await downloadAllPDF();
//     const url = window.URL.createObjectURL(new Blob([res.data]));
//     const link = document.createElement('a');
//     link.href = url;
//     link.setAttribute('download', 'all-people.pdf');
//     document.body.appendChild(link);
//     link.click();
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">NUPO Member Database (NMD)</h1>
//         <div className="flex gap-2">
//           <button onClick={handleDownloadAll} className="btn-primary p-4 m-4 bg-blue-500 rounded-[5px] hover:cursor-pointer
//           hover:bg-blue-600 hover:text-white">Download All (PDF)</button>
//           <button onClick={() => { setEditing(null); setShowForm(true); }} className="btn-success  m-4 p-4 bg-blue-500 rounded-[5px] hover:cursor-pointer
//           hover:bg-blue-600 hover:text-white ">Add Person</button>
//         </div>
//       </div>

//       {showForm && (
//         <div className="mb-6 p-4 border rounded bg-gray-50">
//           <h2 className="text-xl mb-4">{editing ? 'Edit' : 'Add'} Person</h2>
//           <PersonForm
//             person={editing}
//             onSave={handleSave}
//             onCancel={() => { setShowForm(false); setEditing(null); }}
//           />
//         </div>
//       )}

//       <PersonList
//         people={people}
//         onEdit={(p) => { setEditing(p); setShowForm(true); }}
//         onDelete={handleDelete}
//       />
//     </div>
//   );
// }