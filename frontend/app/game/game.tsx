import { Stage, Sprite } from "@pixi/react";
import LineMover from "./linemove";
import { useLineStore } from "../zustand/linestore";
import { useRef } from "react";
import { useObstacleStore } from "../zustand/obstacle";
import { DrawBoundingBox } from "../debugging/drawBoundingBoxes";
import * as PIXI from "pixi.js";
import { useGameStore } from "../zustand/gameStore";
import PlayerLose from "./playerLose";

export const obstacles = [
	{ x: 400, y: 100, type: "top" }, // Top obstacle
	{ x: 600, y: 500, type: "bottom" }, // Bottom obstacle
	// Add more obstacles here
];

const Game: React.FC = () => {
	const spriteRef = useRef(null);
	const stageWidth = 800;
	const stageHeight = 600;
	const linePosition = useLineStore((state) => state.linePosition);
	const setObstaclePosition = useObstacleStore(
		(state) => state.setObstaclePosition,
	);
	const collision = useGameStore((state) => state.collision);
	console.log(collision);

	// Player bounds calculation
	const playerWidth = 88;
	const playerHeight = 73;
	const playerBounds = new PIXI.Rectangle(
		linePosition.x - playerWidth / 2,
		linePosition.y - playerHeight / 2,
		playerWidth,
		playerHeight,
	);

	return (
		<Stage
			width={stageWidth}
			height={stageHeight}
			options={{ backgroundColor: collision ? 0x00ff00 : 0x000000 }}
		>
			{collision && <PlayerLose />}
			{/* Solo renderiza el sprite si no hay colisión */}
			{!collision && (
				<Sprite
					ref={spriteRef}
					image="/planegreen3.png"
					x={linePosition.x}
					y={linePosition.y}
					anchor={{ x: 0.5, y: 0.5 }}
				/>
			)}

			{/* Renderizar obstáculos */}
			{!collision &&
				obstacles.map((obstacle, index) => {
					const obstacleX = obstacle.x - linePosition.x;
					const obstacleY = obstacle.type === "top" ? 130 : stageHeight - 130;
					setObstaclePosition(index, {
						x: obstacleX,
						y: obstacleY,
						type: obstacle.type,
					});

					return (
						<Sprite
							key={index}
							image="/tree22.png"
							x={obstacleX}
							y={obstacleY}
							anchor={{ x: 0.5, y: 0.5 }}
							width={97}
							height={260}
						/>
					);
				})}

			<LineMover stageWidth={stageWidth} stageHeight={stageHeight} />
		</Stage>
	);
};

export default Game;
