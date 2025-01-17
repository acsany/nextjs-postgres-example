'use client';
import { useState, useEffect } from 'react';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { usersTable } from '@/db/schema';

interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
  });

  const fetchUsers = async () => {
    const response = await fetch('/api/users');
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          age: parseInt(formData.age),
          email: formData.email,
        }),
      });

      if (response.ok) {
        setFormData({ name: '', age: '', email: '' });
        fetchUsers();
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleDelete = async (email: string) => {
    try {
      const response = await fetch(`/api/users?email=${email}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">User Management</h1>
        
        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <div>
            <label className="block mb-1">Name:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Age:</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Email:</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add User
          </button>
        </form>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">Users</h2>
          {users.map((user) => (
            <div
              key={user.id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-bold">{user.name}</p>
                <p className="text-sm">Age: {user.age}</p>
                <p className="text-sm">{user.email}</p>
              </div>
              <button
                onClick={() => handleDelete(user.email)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
