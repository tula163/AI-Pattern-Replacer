// store/useDataStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DataState {
    modifiedData: string[][];
    originalData: string[][];
    isTransformed: boolean;
    fileName: string | null; 
    setOriginalData: (data: string[][]) => void;
    setModifiedData: (data: string[][]) => void;
    setIsTransformed: (value: boolean) => void;
    setFileName: (name: string) => void;   
    clearAll: () => void;
  }
  
  export const useDataStore = create<DataState>()(
    persist(
      (set) => ({
        originalData: [],
        modifiedData: [],
        isTransformed: false,
        fileName: null, 
        setOriginalData: (data) => set({ originalData: data }),
        setModifiedData: (data) => set({ modifiedData: data }),
        setIsTransformed: (value) => set({ isTransformed: value }),
        setFileName: (name) => set({ fileName: name }),
        clearAll: () => set({
          originalData: [],
          modifiedData: [],
          isTransformed: false,
          fileName: null,
        }),
      }),
      {
        name: 'table-data-store',
        partialize: (state) => ({
          originalData: state.originalData,
          modifiedData: state.modifiedData,
          isTransformed: state.isTransformed,
          fileName: state.fileName, 
        }),
      }
    )
  );
  

