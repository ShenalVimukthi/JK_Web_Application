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
          <h3 className="font-bold">Name : {person.name}</h3>
          <p>Address: {person.addr} | NIC: {person.nic || 'N/A'}</p>
          <div className="mt-4 flex gap-4 ">
            <button onClick={() => onEdit(person)} className="btn-sm bg-blue-500 p-2 rounded-[2px] text-white hover:cursor-pointer 
            hover:bg-blue-400">Edit</button>
            <button onClick={() => onDelete(person._id)} className="btn-danger bg-red-400 p-2 rounded-[2px] hover:cursor-pointer 
            hover:bg-red-300">Delete</button>
            <button onClick={() => handleDownload(person._id)} className="btn-pdf bg-gray-400 p-2 rounded-[2px] hover:cursor-pointer ">PDF</button>
          </div>
        </div>
      ))}
    </div>
  );
}