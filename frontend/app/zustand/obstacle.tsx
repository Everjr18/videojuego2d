import { create } from "zustand";

interface LineState {
	obstaclePositions: Array<{ x: number; y: number; type: string }>;
	setObstaclePosition: (
		index: number,
		position: { x: number; y: number; type: string },
	) => void;
}

export const useObstacleStore = create<LineState>((set) => ({
	obstaclePositions: [], // Inicialmente un array vacío
	setObstaclePosition: (index, position) => {
		set((state) => {
			const newPositions = [...state.obstaclePositions];
			newPositions[index] = position;
			return { obstaclePositions: newPositions };
		});
	},
}));
