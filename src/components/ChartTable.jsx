import React, { useState, useEffect } from "react";
import { collection, doc, getDocs, setDoc, addDoc, deleteDoc } from "firebase/firestore";
import { FaPlus } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const ChartTable = ({ firestore, clientId }) => {
  const [tableData, setTableData] = useState([]);
  const [newRow, setNewRow] = useState({ date: "", item: "", amount: "" });

  // Fetch data for the selected client
  useEffect(() => {
    const fetchTableData = async () => {
      if (!clientId) return; // If no clientId, clear the table
      const tableCollection = collection(firestore,`clients/${clientId}/transactions`);
      const tableSnapshot = await getDocs(tableCollection);
      const fetchedData = tableSnapshot.docs.map((doc, index) => ({
        id: doc.id,
        serial: index + 1,
        ...doc.data(),
      }));
      setTableData(fetchedData);
    };

    fetchTableData();
  }, [firestore, clientId]);

  // Handle input changes for new rows
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRow((prev) => ({ ...prev, [name]: value }));
  };

  // Add a new row
  const addRow = async () => {
    // alert("row added")
    if (!newRow.date || !newRow.item || !newRow.amount) return; // Ensure valid input
    const newDoc = await addDoc(
      collection(firestore,`clients/${clientId}/transactions`),
      newRow
    );
    setTableData((prev) => [
      ...prev,
      { id: newDoc.id, serial: prev.length + 1, ...newRow },
    ]);
    setNewRow({ date: "", item: "", amount: "" }); // Clear input fields
  };

  // Update an existing row
  const updateRow = async (rowId, updatedRow) => {
    await setDoc(doc(firestore, `clients/${clientId}/transactions/${rowId}`), updatedRow);
    setTableData((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, ...updatedRow } : row))
    );
  };

  // Delete a row
  const deleteRow = async (rowId) => {
    await deleteDoc(doc(firestore, `clients/${clientId}/transactions/${rowId}`));
    setTableData((prev) =>
      prev.filter((row) => row.id !== rowId).map((row, index) => ({
        ...row,
        serial: index + 1, // Recalculate serial numbers
      }))
    );
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold mb-2">Transactions</h3>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Serial</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Item Description</th>
            <th className="border border-gray-300 px-4 py-2">Total Amount</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id}>
              <td className="border border-gray-300 px-4 py-2">{row.serial}</td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="date"
                  value={row.date}
                  onChange={(e) => updateRow(row.id, { ...row, date: e.target.value })}
                  className="w-full p-1"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="text"
                  value={row.item}
                  onChange={(e) => updateRow(row.id, { ...row, item: e.target.value })}
                  className="w-full p-1"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="number"
                  value={row.amount}
                  onChange={(e) => updateRow(row.id, { ...row, amount: e.target.value })}
                  className="w-full p-1"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  onClick={() => deleteRow(row.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  <MdCancel />
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td className="border border-gray-300 px-4 py-2">-</td>
            <td className="border border-gray-300 px-4 py-2">
              <input
                type="date"
                name="date"
                value={newRow.date}
                onChange={handleInputChange}
                className="w-full p-1"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2">
              <input
                type="text"
                name="item"
                value={newRow.item}
                onChange={handleInputChange}
                className="w-full p-1"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2">
              <input
                type="number"
                name="amount"
                value={newRow.amount}
                onChange={handleInputChange}
                className="w-full p-1"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              <button
                onClick={addRow}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
              
                <FaPlus />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ChartTable;
