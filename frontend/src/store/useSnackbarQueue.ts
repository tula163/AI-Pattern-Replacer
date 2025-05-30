// src/store/useSnackbarQueue.ts
import { create } from 'zustand';

export type SnackbarMessage = {
  id: number; // 唯一 ID
  message: string;
  severity: 'success' | 'error';
};

type SnackbarQueueState = {
  messages: SnackbarMessage[];
  showMessage: (severity: 'success' | 'error', message: string) => void;
  removeMessage: (id: number) => void;
};

export const useSnackbarQueue = create<SnackbarQueueState>((set) => ({
  messages: [],
  showMessage: (severity, message) => {
    const id = Date.now() + Math.random(); // 避免重复
    set((state) => ({
      messages: [...state.messages, { id, message, severity }],
    }));
  },
  removeMessage: (id) =>
    set((state) => ({
      messages: state.messages.filter((msg) => msg.id !== id),
    })),
}));
