"use client";

import { useState } from "react";

// Define the Guest type
type Guest = {
  id: number;
  name: string;
  contact: string;
  status: string;
  address: string;
};

export default function GuestList() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newGuest, setNewGuest] = useState<Guest>({
    id: 0,
    name: "",
    contact: "",
    status: "Pending",
    address: "",
  });

  // Pagination setup
  const [currentPage, setCurrentPage] = useState(1);
  const guestsPerPage = 5;
  const indexOfLastGuest = currentPage * guestsPerPage;
  const indexOfFirstGuest = indexOfLastGuest - guestsPerPage;
  const filteredGuests = guests.filter((guest) =>
    guest.name.toLowerCase().includes(search.toLowerCase())
  );
  const currentGuests = filteredGuests.slice(indexOfFirstGuest, indexOfLastGuest);
  const totalPages = Math.ceil(filteredGuests.length / guestsPerPage);

  // Handle guest deletion
  const handleDelete = (id: number) => {
    setGuests(guests.filter((guest) => guest.id !== id));
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewGuest({ ...newGuest, [name]: value });
  };

  // Handle adding a new guest
  const handleAddGuest = () => {
    if (!newGuest.name || !newGuest.contact || !newGuest.address) {
      alert("Please fill in all fields.");
      return;
    }
    setGuests([...guests, { ...newGuest, id: Date.now() }]);
    setShowForm(false);
    setNewGuest({ id: 0, name: "", contact: "", status: "Pending", address: "" });
  };

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Manage Your Guest List</h1>

      {/* Add Guest Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        {showForm ? "Close Form" : "Add Guest"}
      </button>

      {/* Add Guest Form */}
      {showForm && (
        <div className="bg-white p-4 shadow-md rounded-lg mb-4">
          <h2 className="text-xl font-semibold mb-2">Add New Guest</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full p-2 border rounded mb-2"
            value={newGuest.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact"
            className="w-full p-2 border rounded mb-2"
            value={newGuest.contact}
            onChange={handleInputChange}
          />
          <select
            name="status"
            className="w-full p-2 border rounded mb-2"
            value={newGuest.status}
            onChange={handleInputChange}
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
          </select>
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="w-full p-2 border rounded mb-2"
            value={newGuest.address}
            onChange={handleInputChange}
          />
          <button
            onClick={handleAddGuest}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          >
            Add Guest
          </button>
        </div>
      )}

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search guest..."
        className="p-2 border rounded w-full mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Guest List Table */}
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Contact</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Address</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentGuests.length > 0 ? (
            currentGuests.map((guest) => (
              <tr key={guest.id} className="border-t">
                <td className="p-3">{guest.name}</td>
                <td className="p-3">{guest.contact}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      guest.status === "Pending" ? "bg-yellow-500" : "bg-green-500"
                    }`}
                  >
                    {guest.status}
                  </span>
                </td>
                <td className="p-3">{guest.address}</td>
                <td className="p-3">
                  <button className="text-red-500" onClick={() => handleDelete(guest.id)}>
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center p-4">
                No guests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
