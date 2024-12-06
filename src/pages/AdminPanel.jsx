// import { useState } from "react";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import ClientDetails from "../components/ClientDetails";
// import { db } from "../contexts/FirebaseContext";
// import { addDoc, collection } from "firebase/firestore";

// const AdminPanel = () => {
//   const [selectedClient, setSelectedClient] = useState(null);

//   const addClient = async (name) => {
//     await addDoc(collection(db, "clients"), { name });
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       <Navbar addClient={addClient} />
//       <div className="flex flex-1">
//         <Sidebar selectClient={setSelectedClient} />
//         {selectedClient && <ClientDetails client={selectedClient} />}
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;
import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ClientDetails from "../components/ClientDetails";
import { db } from "../contexts/FirebaseContext";
import { addDoc, collection } from "firebase/firestore";

const AdminPanel = () => {
  const [selectedClient, setSelectedClient] = useState(null);

  const addClient = async (clientName) => {
    try {
      const docRef = await addDoc(collection(db, "clients"), { name: clientName });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar addClient={addClient} />
      <div className="flex flex-1">
        <Sidebar selectClient={setSelectedClient} />
        {selectedClient && <ClientDetails client={selectedClient} />}
      </div>
    </div>
  );
};

export default AdminPanel;

