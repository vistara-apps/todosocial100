'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface AddTodoFormProps {
  onAddTodo: (todo: {
    title: string;
    description: string;
    category: 'work' | 'personal' | 'health' | 'learning';
    isPublic: boolean;
  }) => void;
}

export function AddTodoForm({ onAddTodo }: AddTodoFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'work' | 'personal' | 'health' | 'learning'>('personal');
  const [isPublic, setIsPublic] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTodo({
        title: title.trim(),
        description: description.trim(),
        category,
        isPublic
      });
      setTitle('');
      setDescription('');
      setCategory('personal');
      setIsPublic(true);
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-xl flex items-center justify-center text-white hover:shadow-2xl transition-all transform hover:scale-105 z-50"
      >
        <Plus className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="todo-card w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-xl font-bold">New Todo</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/70 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What do you want to accomplish?"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              required
            />
          </div>

          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details (optional)"
              rows={3}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40 resize-none"
            />
          </div>

          <div>
            <label className="block text-white/70 text-sm font-medium mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40"
            >
              <option value="personal" className="bg-gray-800">Personal</option>
              <option value="work" className="bg-gray-800">Work</option>
              <option value="health" className="bg-gray-800">Health</option>
              <option value="learning" className="bg-gray-800">Learning</option>
            </select>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="public"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="w-4 h-4 text-pink-500 bg-white/10 border-white/20 rounded focus:ring-pink-500"
            />
            <label htmlFor="public" className="text-white/90 text-sm">
              Share publicly
            </label>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg transition-all font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 rounded-lg transition-all font-medium"
            >
              Create Todo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
