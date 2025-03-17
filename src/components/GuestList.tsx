"use client";

import { useState } from "react";
import Image from "next/image";

interface Guest {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  address: string;
}

export default function GuestList() {
  const [guests, setGuests] = useState<Guest[]>([
    {
      id: 1,
      name: "Albert Flores",
      email: "flores@email.com",
      phone: "+1 (632) 8765-9878",
      status: "Attending",
      address: "Caillynton, Alaska",
    },
  ]);

  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);
  const [newGuest, setNewGuest] = useState<Guest>({
    id: Date.now(),
    name: "",
    email: "",
    phone: "",
    status: "Attending",
    address: "",
  });

  const handleDelete = (id: number) => {
    setGuests(guests.filter((guest) => guest.id !== id));
  };

  const handleEdit = (guest: Guest) => {
    setEditingGuest(guest);
  };

  const handleSave = () => {
    if (editingGuest) {
      setGuests(
        guests.map((guest) => (guest.id === editingGuest.id ? editingGuest : guest))
      );
      setEditingGuest(null);
    }
  };

  const handleAddGuest = () => {
    setGuests([...guests, { ...newGuest, id: Date.now() }]);
    setNewGuest({ id: Date.now(), name: "", email: "", phone: "", status: "Attending", address: "" });
  };

  return (
    <div className="container mx-auto px-5 py-10">
      <h1 className="text-2xl font-bold mb-5">Manage Your Guest List</h1>
      <button
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        onClick={handleAddGuest}
      >
        Add Guest
      </button>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-black">
              <th className="p-2"><input type="checkbox" /></th>
              <th className="p-2">Name</th>
              <th className="p-2">Contact</th>
              <th className="p-2">Status</th>
              <th className="p-2">Address</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest) => (
              <tr key={guest.id} className="border-t">
                <td className="p-2"><input type="checkbox" /></td>
                <td className="p-2 flex items-center gap-2">
                  <Image
                    src="/avatar.png"
                    alt="Profile"
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                  {guest.name}
                </td>
                <td className="p-2">
                  {guest.email}
                  <br />
                  {guest.phone}
                </td>
                <td className="p-2">
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded-lg">
                    {guest.status}
                  </span>
                </td>
                <td className="p-2">{guest.address}</td>
                <td className="p-2 flex gap-2">
                  <button
                    className="text-gray-600 hover:text-blue-600"
                    onClick={() => handleEdit(guest)}
                  >
                    ✏️
                  </button>
                  <button
                    className="text-gray-600 hover:text-red-600"
                    onClick={() => handleDelete(guest.id)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editingGuest && (
        <div className="mt-5 p-4 border rounded-lg bg-white shadow-md">
          <h2 className="text-lg font-semibold mb-3 text-black">Edit Guest</h2>
          <input
            type="text"
            className="border p-2 w-full mb-2 text-black"
            value={editingGuest.name}
            onChange={(e) => setEditingGuest({ ...editingGuest, name: e.target.value })}
          />
          <input
            type="text"
            className="border p-2 w-full mb-2 text-black"
            value={editingGuest.email}
            onChange={(e) => setEditingGuest({ ...editingGuest, email: e.target.value })}
          />
          <input
            type="text"
            className="border p-2 w-full mb-2 text-black"
            value={editingGuest.phone}
            onChange={(e) => setEditingGuest({ ...editingGuest, phone: e.target.value })}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}               