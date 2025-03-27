"use client";

import { useCallback } from "react"; // ✅ Import `useCallback`
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaTimes, FaSearch } from "react-icons/fa";

type Guest = {
  id: number;
  name: string;
  contact: string;
  status: string;
  address: string;
};

export default function GuestList() {
  const { id: weddingWebsiteId } = useParams();
  const [guests, setGuests] = useState<Guest[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingGuestId, setEditingGuestId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [guestsPerPage, setGuestsPerPage] = useState(10);
  const [newGuest, setNewGuest] = useState<Guest>({
    id: 0,
    name: "",
    contact: "",
    status: "Pending",
    address: "",
  });


const fetchGuests = useCallback(async () => {
  if (!weddingWebsiteId) return;

  try {
    const res = await fetch(`/api/wedding-websites/${String(weddingWebsiteId)}/guests`);
    const data = await res.json();
    setGuests(data);
  } catch (error) {
    console.error("Failed to load guests:", error);
  }
}, [weddingWebsiteId]); // ✅ Dependencies ensure function stability

useEffect(() => {
  fetchGuests();
}, [fetchGuests]); // ✅ Now safe to include `fetchGuests`

  
  



  const handleSaveGuest = async () => {
    if (!newGuest.name || !newGuest.contact || !newGuest.address) {
      alert("Please fill in all fields.");
      return;
    }
  
    try {
      const method = editingGuestId ? "PUT" : "POST";
      const body = editingGuestId
  ? JSON.stringify({ ...newGuest, id: editingGuestId }) // ✅ Only assign `id` when editing
  : JSON.stringify({ ...newGuest, id: undefined }); // ✅ Remove `id` when creating a new guest

  
      await fetch(`/api/wedding-websites/${String(weddingWebsiteId)}/guests`, {
        method,
        body,
        headers: { "Content-Type": "application/json" },
      });
  
      setNewGuest({ id: 0, name: "", contact: "", status: "Pending", address: "" });
      setEditingGuestId(null);
      setShowForm(false);
  
      await fetchGuests(); // ✅ Refresh guest list after saving
    } catch (error) {
      console.error("Error saving guest:", error);
    }
  };
  

  const handleDeleteGuest = async (id: number) => {
    try {
      await fetch(`/api/wedding-websites/${String(weddingWebsiteId)}/guests?guestId=${id}`, {
        method: "DELETE",
      });
  
      await fetchGuests(); // ✅ Refresh list after deleting
    } catch (error) {
      console.error("Error deleting guest:", error);
    }
  };
  

  

  const handleEditGuest = (id: number) => {
    const guest = guests.find((guest) => guest.id === id);
    if (guest) {
      setNewGuest(guest);
      setEditingGuestId(id);
      setShowForm(true);
    }
  };
  
  const filteredGuests = guests.filter((guest) =>
    Object.values(guest).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  

  // Pagination logic
  const totalPages = Math.ceil(filteredGuests.length / guestsPerPage) || 1;
  const currentGuests = filteredGuests.slice(
    (currentPage - 1) * guestsPerPage,
    currentPage * guestsPerPage
  );

  return (
    <div className="min-h-screen p-8 bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Your Guest List</h1>

      {/* Search & Entries per page */}
      <div className="flex justify-between w-full max-w-4xl mb-4">
      <div className="flex items-center space-x-2">
  <label className="text-gray-600 text-sm">Show</label>
  <select
    className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-600 focus:ring-2 focus:ring-[#ac263e] outline-none"
    value={guestsPerPage}
    onChange={(e) => {
      setGuestsPerPage(Number(e.target.value));
      setCurrentPage(1);
    }}
  >
    {[5, 10, 20, 50].map((num) => (
      <option key={num} value={num}>
        {num}
      </option>
    ))}
  </select>
</div>

 

        <div className="relative w-full max-w-xs">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search name, email, or etc."
              className="w-full p-2 pl-10 text-sm text-gray-800 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-[#ac263e] outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>


      </div>

      {/* 🚀 Add Guest Button */}
      {!showForm && (
        <button
          onClick={() => {
            setShowForm(true);
            setEditingGuestId(null);
            setNewGuest({ id: 0, name: "", contact: "", status: "Pending", address: "" });
          }}
          className="mb-4 px-7 py-2 bg-[#ac263e] text-sm text-white rounded-lg shadow-md hover:bg-[#ac263e] transition"
        >
          Add Guest
        </button>
      )}

      {/* 🚀 Guest Form */}
      {showForm && (
        <div className="bg-white p-6 text-gray-800 rounded-lg shadow-lg w-full max-w-lg mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">
              {editingGuestId ? "Edit Guest" : "Add New Guest"}
            </h2>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-600 hover:text-red-500"
            >
              <FaTimes size={20} />
            </button>
          </div>
          <input type="text" placeholder="Name" className="w-full p-2 border rounded mb-2" value={newGuest.name} onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })} />
          <input type="text" placeholder="Contact" className="w-full p-2 border rounded mb-2" value={newGuest.contact} onChange={(e) => setNewGuest({ ...newGuest, contact: e.target.value })} />
          <select className="w-full p-2 border rounded mb-2" value={newGuest.status} onChange={(e) => setNewGuest({ ...newGuest, status: e.target.value })}>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
          </select>
          <input type="text" placeholder="Address" className="w-full p-2 border rounded mb-2" value={newGuest.address} onChange={(e) => setNewGuest({ ...newGuest, address: e.target.value })} />
          <button onClick={handleSaveGuest} className="w-full bg-[#ac263e] text-white py-3 rounded-lg hover:bg-[#ac263e] transition">
            {editingGuestId ? "Save Changes" : "Add Guest"}
          </button>
        </div>
      )}

      {/* 🚀 Guest List Table */}
<div className="w-full max-w-4xl bg-white rounded-2xl border-1 border-gray-300 shadow-lg overflow-hidden mb-6 mx-auto">
  <table className="w-full text-center">
    <thead className="bg-gray-100 text-gray-600 text-sm">
      <tr>
        <th className="p-4">Name</th>
        <th className="p-4">Contact</th>
        <th className="p-4">Status</th>
        <th className="p-4">Address</th>
        <th className="p-4">Action</th>
      </tr>
    </thead>
    <tbody>
      {currentGuests.map((guest) => (
        <tr key={guest.id} className="border-t text-sm border-gray-300 text-gray-600 hover:bg-gray-100">
          <td className="p-4">{guest.name}</td>
          <td className="p-4">{guest.contact}</td>
          <td className="p-4">
            <span className={`px-4 py-1 text-white rounded-full text-sm ${guest.status === "Confirmed" ? "bg-green-500" : "bg-yellow-500"}`}>
              {guest.status}
            </span>
          </td>
          <td className="p-4">{guest.address}</td>
          <td className="p-4 flex justify-center gap-2">
            <button onClick={() => handleEditGuest(guest.id)} className="p-2">
              <FaEdit />
            </button>
            <button onClick={() => handleDeleteGuest(guest.id)} className="p-2">
              <FaTrash />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

{/* 🚀 Pagination Controls */}
<div className="flex justify-center items-center gap-2 mt-4">
  {/* Previous Button */}
  <button
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    className="px-2 py-1 text-sm bg-gray-600 rounded disabled:opacity-50"
  >
    ◀
  </button>

  {/* Page Numbers */}
  {Array.from({ length: totalPages }, (_, i) => (
    <button
      key={i + 1}
      onClick={() => setCurrentPage(i + 1)}
      className={`px-2 py-1 text-sm rounded ${currentPage === i + 1 ? "bg-black text-white" : "bg-gray-600"}`}
    >
      {i + 1}
    </button>
  ))}

  {/* Next Button */}
  <button
    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
    disabled={currentPage === totalPages}
    className="px-2 py-1 bg-gray-600 text-sm rounded disabled:opacity-50"
  >
    ▶
  </button>
</div>

    </div>
  );
}
