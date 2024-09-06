import { useEffect } from "react";
import { useTick } from "@pixi/react";
import { useLineStore } from "../zustand/linestore";
import { useGameStore } from "../zustand/gameStore";
import { useObstacleStore } from "../zustand/obstacle";
import { checkCollision } from "../utils/checkcollision";

const LineMover: React.FC<{ stageWidth: number; stageHeight: number }> = ({
	stageWidth,
	stageHeight,
}) => {
	const direction = useLineStore((state) => state.direction);
	const setDirection = useLineStore((state) => state.setDirection);
	const setLinePosition = useLineStore((state) => state.setLinePosition);
	const linePosition = useLineStore((state) => state.linePosition);
	const setCollipion = useGameStore((state) => state.setCollision);
	const obstaclePositions = useObstacleStore(
		(state) => state.obstaclePositions,
	);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			setDirection(event.key);
		};

		const handleKeyUp = () => {
			setDirection("");
		};

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
		};
	}, [setDirection]);
	useTick(() => {
		const { x, y } = linePosition;
		let newX = x;
		let newY = y;

		// Adjust the step size for diagonal movement
		const stepSize = 1;

		if (direction === "ArrowUp") {
			newY -= stepSize;
			newX += stepSize;
		} else if (direction === "ArrowDown") {
			newY += stepSize;
			newX += stepSize;
		} else if (direction === "ArrowLeft") {
			newX -= stepSize;
			newY += stepSize;
		} else if (direction === "ArrowRight") {
			newX += 2;
		} else {
			// Default downward movement
			newY += stepSize;
		}

		// Constrain movement to the stage dimensions
		if (newY >= stageHeight) {
			newY = stageHeight; // Cap the Y position at the stage height
			setDirection("ArrowRight"); // Change direction to the right
			newX += 1;
		}
		if (newY < 0) newY = 0;
		if (newX > stageWidth - 50) newX = stageWidth - 50;
		if (newX < 0) newX = 0;

		setLinePosition({ x: newX, y: newY });

		// Check for collisions with each obstacle

		const mainRect = {
			x: newX - 88 / 2, // Adjust for anchor (0.5)
			y: newY - 73 / 2, // Adjust for anchor (0.5)
			width: 88,
			height: 73,
		};

		obstaclePositions.forEach((obstacle, index) => {
			const obstacleRect = {
				x: obstacle.x - 97 / 2,
				y: obstacle.y - 260 / 2,
				width: 97, // Adjust based on the obstacle sprite
				height: 260, // Adjust based on the obstacle sprite
			};

			if (checkCollision(mainRect, obstacleRect)) {
				setCollipion(true);
			}
		});
	});

	return null;
};

export default LineMover;
