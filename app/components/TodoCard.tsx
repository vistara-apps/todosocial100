'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Check, User } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoCardProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onLike: (id: string) => void;
  onComment: (id: string, comment: string) => void;
  onUpdateProgress: (id: string, progress: number) => void;
}

export function TodoCard({ 
  todo, 
  onToggleComplete, 
  onLike, 
  onComment, 
  onUpdateProgress 
}: TodoCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'work':
        return 'from-blue-400 to-blue-600';
      case 'personal':
        return 'from-green-400 to-green-600';
      case 'health':
        return 'from-red-400 to-red-600';
      case 'learning':
        return 'from-purple-400 to-purple-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  const getCategoryBg = (category: string) => {
    switch (category) {
      case 'work':
        return 'bg-gradient-to-r from-blue-400/20 to-blue-600/20';
      case 'personal':
        return 'bg-gradient-to-r from-green-400/20 to-green-600/20';
      case 'health':
        return 'bg-gradient-to-r from-red-400/20 to-red-600/20';
      case 'learning':
        return 'bg-gradient-to-r from-purple-400/20 to-purple-600/20';
      default:
        return 'bg-gradient-to-r from-gray-400/20 to-gray-600/20';
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(todo.id);
  };

  const handleComment = () => {
    if (newComment.trim()) {
      onComment(todo.id, newComment);
      setNewComment('');
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseInt(e.target.value);
    onUpdateProgress(todo.id, newProgress);
  };

  return (
    <div className={`todo-card mb-6 ${getCategoryBg(todo.category)}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-white font-medium text-sm">@{todo.createdBy}</p>
            <p className="text-white/70 text-xs capitalize">{todo.category}</p>
          </div>
        </div>
        <button
          onClick={() => onToggleComplete(todo.id)}
          className={`w-6 h-6 rounded-full border-2 border-white/50 flex items-center justify-center transition-all ${
            todo.completed 
              ? 'bg-white text-green-600' 
              : 'hover:bg-white/20'
          }`}
        >
          {todo.completed && <Check className="w-4 h-4" />}
        </button>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h3 className={`text-white font-semibold text-lg mb-2 ${
          todo.completed ? 'line-through opacity-70' : ''
        }`}>
          {todo.title}
        </h3>
        {todo.description && (
          <p className="text-white/80 text-sm mb-3">{todo.description}</p>
        )}
        
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/70 text-xs">Progress</span>
            <span className="text-white font-medium text-sm">{todo.progress}%</span>
          </div>
          <div className="progress-bar bg-white/20">
            <div 
              className={`progress-fill bg-gradient-to-r ${getCategoryColor(todo.category)}`}
              style={{ width: `${todo.progress}%` }}
            />
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={todo.progress}
            onChange={handleProgressChange}
            className="w-full mt-2 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 transition-all ${
              isLiked ? 'text-red-300' : 'text-white/70 hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            <span className="text-sm">{todo.likes + (isLiked ? 1 : 0)}</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 text-white/70 hover:text-white transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">{todo.comments.length}</span>
          </button>
        </div>
        <div className="text-white/50 text-xs">
          {new Date(todo.createdAt).toLocaleDateString()}
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="space-y-2 mb-3">
            {todo.comments.map((comment) => (
              <div key={comment.id} className="bg-white/10 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white font-medium text-sm">@{comment.author}</span>
                  <span className="text-white/50 text-xs">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-white/90 text-sm">{comment.text}</p>
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 text-sm focus:outline-none focus:border-white/40"
            />
            <button
              onClick={handleComment}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all text-sm font-medium"
            >
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
