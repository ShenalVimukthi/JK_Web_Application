// components/PersonList.jsx
export default function PersonList({
  people,
  onEdit,
  onDelete,
  onDownloadPDF,
  onDownloadExcel,
  downloading,
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {people.map((p) => (
        <div
          key={p._id}
          className="p-5 border rounded-lg bg-white shadow hover:shadow-md transition"
        >
          <h3 className="font-semibold text-lg">{p.name}</h3>
          <p className="text-sm text-gray-600">NIC: {p.nic}</p>
          <p className="text-sm text-gray-600">Phone: {p.phone || 'N/A'}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => onEdit(p)}
              className="text-xs px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(p._id)}
              className="text-xs px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>

            {/* PDF */}
            <button
              onClick={() => onDownloadPDF(p._id)}
              disabled={downloading[p._id] === 'pdf'}
              className="text-xs px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 disabled:opacity-50"
            >
              {downloading[p._id] === 'pdf' ? '...' : 'PDF'}
            </button>

            {/* Excel */}
            <button
              onClick={() => onDownloadExcel(p._id)}
              disabled={downloading[p._id] === 'excel'}
              className="text-xs px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
            >
              {downloading[p._id] === 'excel' ? '...' : 'Excel'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}


// import { downloadSinglePDF } from '../services/api';

// export default function PersonList({ people, onEdit, onDelete }) {
//   const handleDownload = async (id) => {
//     const response = await downloadSinglePDF(id);
//     const url = window.URL.createObjectURL(new Blob([response.data]));
//     const link = document.createElement('a');
//     link.href = url;
//     link.setAttribute('download', `${people.find(p => p._id === id).name}.pdf`);
//     document.body.appendChild(link);
//     link.click();
//   };

//   return (
//     <div className="grid gap-4">
//       {people.map(person => (
//         <div key={person._id} className="border p-4 rounded">
//           <h3 className="font-bold">Name : {person.name}</h3>
//           <p>Address: {person.addr} | NIC: {person.nic || 'N/A'}</p>
//           <div className="mt-4 flex gap-4 ">
//             <button onClick={() => onEdit(person)} className="btn-sm bg-blue-500 p-2 rounded-[2px] text-white hover:cursor-pointer 
//             hover:bg-blue-400">Edit</button>
//             <button onClick={() => onDelete(person._id)} className="btn-danger bg-red-400 p-2 rounded-[2px] hover:cursor-pointer 
//             hover:bg-red-300">Delete</button>
//             <button onClick={() => handleDownload(person._id)} className="btn-pdf bg-gray-400 p-2 rounded-[2px] hover:cursor-pointer ">PDF</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }