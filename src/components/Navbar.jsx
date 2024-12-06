import { useState } from "react";
import Modal from "./Modal";

const Navbar = ({ addClient }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 px-4 py-2 rounded shadow hover:bg-blue-600"
      >
        Add Client
      </button>
      {isModalOpen && (
        <Modal
          title="Add Client"
          onClose={() => setIsModalOpen(false)}
          onSubmit={(clientName) => {
            addClient(clientName);
            setIsModalOpen(false);
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;
