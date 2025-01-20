'use client';
import { useState, useEffect } from 'react';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { messageTable } from '@/db/schema';
import { text } from 'drizzle-orm/mysql-core';

interface Message {
  id: number;
  text: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [formData, setFormData] = useState({
    text: '',
  });

  const fetchMessages = async () => {
    const response = await fetch('/api/messages');
    const data = await response.json();
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: formData.text
        }),
      });

      if (response.ok) {
        setFormData({ text: '' });
        fetchMessages();
      }
    } catch (error) {
      console.error('Error creating message:', error);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Enter Message</h1>
        
        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <div>
            <label className="block mb-1">Text:</label>
            <input
              type="text"
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Message
          </button>
        </form>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">Messages</h2>
          {messages.map((message) => (
            <div
              key={message.id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-bold">{message.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
