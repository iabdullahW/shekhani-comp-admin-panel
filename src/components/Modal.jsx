import { useState } from "react";

const Modal = ({ title, onClose, onSubmit }) => {
  const [clientName, setClientName] = useState("");

  const handleSubmit = () => {
    if (clientName.trim()) {
      onSubmit(clientName);
      setClientName("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <input
          type="text"
          placeholder="Client Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className="w-full text-black p-2 border rounded mb-4"
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add

          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
