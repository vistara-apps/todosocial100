export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  progress: number;
  category: 'work' | 'personal' | 'health' | 'learning';
  likes: number;
  comments: Comment[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
}

export interface Comment {
  id: string;
  text: string;
  author: string;
  createdAt: Date;
  likes: number;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
  address: string;
}
