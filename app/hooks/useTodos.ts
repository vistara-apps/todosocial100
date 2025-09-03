'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Todo } from '../types/todo';

// Mock data for demonstration
const mockTodos: Todo[] = [
  {
    id: '1',
    title: 'Complete OnchainKit Integration',
    description: 'Integrate wallet connection and identity components',
    completed: false,
    progress: 75,
    category: 'work',
    likes: 12,
    comments: [
      {
        id: '1',
        text: 'Looking forward to seeing this!',
        author: 'alice.eth',
        createdAt: new Date('2024-01-15'),
        likes: 3
      }
    ],
    createdBy: 'dev.base',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-15'),
    isPublic: true
  },
  {
    id: '2',
    title: 'Daily Workout Routine',
    description: '30 minutes of cardio and strength training',
    completed: true,
    progress: 100,
    category: 'health',
    likes: 8,
    comments: [],
    createdBy: 'fitness.base',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-15'),
    isPublic: true
  },
  {
    id: '3',
    title: 'Learn React Hooks',
    description: 'Master useState, useEffect, and custom hooks',
    completed: false,
    progress: 60,
    category: 'learning',
    likes: 15,
    comments: [
      {
        id: '2',
        text: 'Great choice! Hooks are powerful',
        author: 'react.dev',
        createdAt: new Date('2024-01-14'),
        likes: 5
      },
      {
        id: '3',
        text: 'Check out the official docs!',
        author: 'coder.base',
        createdAt: new Date('2024-01-14'),
        likes: 2
      }
    ],
    createdBy: 'student.eth',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-14'),
    isPublic: true
  }
];

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(mockTodos);
  const { address } = useAccount();

  const addTodo = (todoData: {
    title: string;
    description: string;
    category: 'work' | 'personal' | 'health' | 'learning';
    isPublic: boolean;
  }) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title: todoData.title,
      description: todoData.description,
      completed: false,
      progress: 0,
      category: todoData.category,
      likes: 0,
      comments: [],
      createdBy: address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'anonymous',
      createdAt: new Date(),
      updatedAt: new Date(),
      isPublic: todoData.isPublic
    };

    setTodos(prev => [newTodo, ...prev]);
  };

  const toggleComplete = (id: string) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id 
        ? { 
            ...todo, 
            completed: !todo.completed,
            progress: !todo.completed ? 100 : todo.progress,
            updatedAt: new Date() 
          }
        : todo
    ));
  };

  const updateProgress = (id: string, progress: number) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id 
        ? { 
            ...todo, 
            progress,
            completed: progress === 100,
            updatedAt: new Date() 
          }
        : todo
    ));
  };

  const likeTodo = (id: string) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id 
        ? { ...todo, likes: todo.likes + 1 }
        : todo
    ));
  };

  const addComment = (id: string, commentText: string) => {
    const newComment = {
      id: Date.now().toString(),
      text: commentText,
      author: address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'anonymous',
      createdAt: new Date(),
      likes: 0
    };

    setTodos(prev => prev.map(todo => 
      todo.id === id 
        ? { ...todo, comments: [...todo.comments, newComment] }
        : todo
    ));
  };

  const getFilteredTodos = (filter: 'all' | 'mine' | 'public') => {
    switch (filter) {
      case 'mine':
        return todos.filter(todo => 
          address && todo.createdBy.includes(address.slice(0, 6))
        );
      case 'public':
        return todos.filter(todo => todo.isPublic);
      case 'all':
      default:
        return todos;
    }
  };

  return {
    todos,
    addTodo,
    toggleComplete,
    updateProgress,
    likeTodo,
    addComment,
    getFilteredTodos
  };
}
