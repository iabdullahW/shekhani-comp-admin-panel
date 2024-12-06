import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../contexts/FirebaseContext";

// Add a document to Firestore
export const addClient = async (clientName) => {
  try {
    const docRef = await addDoc(collection(db, "clients"), { name: clientName });
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

// Retrieve all clients from Firestore
export const getClients = async () => {
  const querySnapshot = await getDocs(collection(db, "clients"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
