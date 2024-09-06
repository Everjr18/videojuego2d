import { create } from "zustand";
import * as PIXI from "pixi.js";

// Zustand store for managing game state
interface GameState {
	collision: boolean;
	setCollision: (collision: boolean) => void;
}

export const useGameStore = create<GameState>((set) => ({
	collision: false,
	setCollision: (collision) => set(() => ({ collision: collision })),
}));
