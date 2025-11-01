import { downloadSinglePDF } from '../services/api';

export default function PersonList({ people, onEdit, onDelete }) {
  const handleDownload = async (id) => {
    const response = await downloadSinglePDF(id);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${people.find(p => p._id === id).name}.pdf`);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="grid gap-4">
      {people.map(person => (
        <div key={person._id} className="border p-4 rounded">
          <h3 className="font-bold">{person.name}</h3>
          <p>{person.email} | {person.position || 'N/A'}</p>
          <div className="mt-2 flex gap-2">
            <button onClick={() => onEdit(person)} className="btn-sm">Edit</button>
            <button onClick={() => onDelete(person._id)} className="btn-danger">Delete</button>
            <button onClick={() => handleDownload(person._id)} className="btn-pdf">PDF</button>
          </div>
        </div>
      ))}
    </div>
  );
}