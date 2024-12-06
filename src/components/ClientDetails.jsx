import ChartTable from "./ChartTable";
import { db } from "./../contexts/FirebaseContext";
const ClientDetails = ({ client }) => {
    return (
      <div className="w-3/4 p-4">
        <h2 className="text-2xl font-bold mb-4">{client.name}</h2>
        <p>Client details </p>
        {/* Add ChartTable here */}
        <ChartTable firestore={db} clientId={client.id} />
      </div>
    );
  };
  
  export default ClientDetails;
  