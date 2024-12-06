import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../contexts/FirebaseContext";


const Sidebar = ({ selectClient }) => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "clients"), (snapshot) => {
      setClients(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  return (
    <aside className="w-1/4 bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-4">Clients</h2>
      <ul>
        {/* {clients.map((client) => (
          <li
            key={client.id}
            onClick={() => selectClient(client)}
            className="p-2 cursor-pointer hover:bg-gray-200"
          >
            {client.name}
          </li>
        ))} */}
        {clients.length === 0 ? (
  <p>Loading clients...</p>
) : (
  clients.map((client) => (
    <li key={client.id} onClick={() => selectClient(client)}>
      {client.name}
    </li>
  ))
)}
      </ul>
    </aside>
  );
};

export default Sidebar;
