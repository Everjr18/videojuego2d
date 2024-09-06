import { create } from "zustand";

interface LineState {
	linePosition: { x: number; y: number };
	setLinePosition: (position: { x: number; y: number }) => void;
	direction: string;
	setDirection: (direction: string) => void;
}

export const useLineStore = create<LineState>((set, get) => ({
	linePosition: { x: 100, y: 100 },
	setLinePosition: (position) => {
		set({ linePosition: position }); // Corrected: direct state update
	},
	direction: "",
	setDirection: (direction) => set(() => ({ direction: direction })),
}));
