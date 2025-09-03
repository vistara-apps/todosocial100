'use client';

import { useState } from 'react';
import { Header } from './components/Header';
import { TodoCard } from './components/TodoCard';
import { AddTodoForm } from './components/AddTodoForm';
import { useTodos } from './hooks/useTodos';

export default function Home() {
  const [filter, setFilter] = useState<'all' | 'mine' | 'public'>('all');
  const { 
    addTodo, 
    toggleComplete, 
    updateProgress, 
    likeTodo, 
    addComment, 
    getFilteredTodos 
  } = useTodos();

  const filteredTodos = getFilteredTodos(filter);

  return (
    <div className="min-h-screen">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-slow" />
        <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-slow animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-slow animation-delay-4000" />
      </div>

      <Header filter={filter} onFilterChange={setFilter} />
      
      <main className="relative z-10 max-w-md mx-auto px-4 py-6">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2 text-shadow">
              No todos yet
            </h3>
            <p className="text-white/70 text-sm mb-6">
              {filter === 'mine' 
                ? "Create your first todo to get started!" 
                : "Be the first to share a todo with the community!"}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredTodos.map((todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                onToggleComplete={toggleComplete}
                onLike={likeTodo}
                onComment={addComment}
                onUpdateProgress={updateProgress}
              />
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-white text-2xl font-bold text-shadow">
              {filteredTodos.length}
            </div>
            <div className="text-white/70 text-xs">Total</div>
          </div>
          <div className="text-center">
            <div className="text-white text-2xl font-bold text-shadow">
              {filteredTodos.filter(t => t.completed).length}
            </div>
            <div className="text-white/70 text-xs">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-white text-2xl font-bold text-shadow">
              {Math.round(
                filteredTodos.length > 0 
                  ? filteredTodos.reduce((acc, todo) => acc + todo.progress, 0) / filteredTodos.length
                  : 0
              )}%
            </div>
            <div className="text-white/70 text-xs">Progress</div>
          </div>
        </div>

        <div className="pb-24" />
      </main>

      <AddTodoForm onAddTodo={addTodo} />
    </div>
  );
}
